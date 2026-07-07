import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
  LabelList,
} from 'recharts'
import Nav from '../../components/Nav'

const COLORS = {
  surface: '#141414',
  border: '#262626',
  ink: '#ededed',
  inkSecondary: '#b0b0b0',
  inkMuted: '#7c7c7c',
  grid: '#262626',
  good: '#0ca30c',
  warning: '#fab219',
  critical: '#d03b3b',
  blue: '#3987e5',
  aqua: '#199e70',
  yellow: '#c98500',
}

const RISK_COLOR = { Low: COLORS.good, Medium: COLORS.warning, High: COLORS.critical }
const CONTRACTS = ['Month-to-month', 'One year', 'Two year']
const RISK_LABELS = ['Low', 'Medium', 'High']

function formatMoney(n) {
  if (Math.abs(n) >= 1000000) return `$${(n / 1000000).toFixed(2)}M`
  if (Math.abs(n) >= 1000) return `$${(n / 1000).toFixed(0)}K`
  return `$${n.toFixed(0)}`
}

function StatTile({ label, value, sub, accent }) {
  return (
    <div className="stat-tile">
      <div className="stat-label">{label}</div>
      <div className="stat-value" style={accent ? { color: accent } : undefined}>
        {value}
      </div>
      {sub ? <div className="stat-sub">{sub}</div> : null}
      <style jsx>{`
        .stat-tile {
          background: ${COLORS.surface};
          border: 1px solid ${COLORS.border};
          border-radius: 10px;
          padding: 1.1rem 1.2rem;
        }
        .stat-label {
          font-size: 0.78rem;
          color: ${COLORS.inkMuted};
          margin-bottom: 0.45rem;
        }
        .stat-value {
          font-size: 1.6rem;
          font-weight: 700;
          color: ${COLORS.ink};
          font-variant-numeric: tabular-nums;
        }
        .stat-sub {
          font-size: 0.78rem;
          color: ${COLORS.inkSecondary};
          margin-top: 0.3rem;
        }
      `}</style>
    </div>
  )
}

function ChartCard({ title, children, height = 280 }) {
  return (
    <div className="chart-card">
      <h4>{title}</h4>
      <div style={{ width: '100%', height }}>{children}</div>
      <style jsx>{`
        .chart-card {
          background: ${COLORS.surface};
          border: 1px solid ${COLORS.border};
          border-radius: 10px;
          padding: 1.2rem;
        }
        h4 {
          font-size: 0.95rem;
          color: ${COLORS.ink};
          margin-bottom: 1rem;
          font-weight: 600;
        }
      `}</style>
    </div>
  )
}

const tooltipStyle = {
  background: '#0a0a0a',
  border: `1px solid ${COLORS.border}`,
  borderRadius: 8,
  fontSize: 12,
  color: COLORS.ink,
}

export default function TelecomChurnDashboard() {
  const [customers, setCustomers] = useState(null)
  const [loadError, setLoadError] = useState(false)

  const [contractFilter, setContractFilter] = useState(new Set(CONTRACTS))
  const [riskFilter, setRiskFilter] = useState(new Set(RISK_LABELS))
  const [tenureMin, setTenureMin] = useState(0)
  const [tenureMax, setTenureMax] = useState(72)

  const [offerCost, setOfferCost] = useState(100)
  const [successRate, setSuccessRate] = useState(30)

  useEffect(() => {
    fetch('/data/telco_churn_scored.json')
      .then((res) => res.json())
      .then(setCustomers)
      .catch(() => setLoadError(true))
  }, [])

  const filtered = useMemo(() => {
    if (!customers) return []
    return customers.filter(
      (c) =>
        contractFilter.has(c.Contract) &&
        riskFilter.has(c.RiskLabel) &&
        c.tenure >= tenureMin &&
        c.tenure <= tenureMax
    )
  }, [customers, contractFilter, riskFilter, tenureMin, tenureMax])

  const toggleSet = (setter, current, value) => {
    const next = new Set(current)
    if (next.has(value)) next.delete(value)
    else next.add(value)
    setter(next)
  }

  const kpis = useMemo(() => {
    const n = filtered.length
    const highRisk = filtered.filter((c) => c.RiskLabel === 'High').length
    const revenueAtRisk = filtered
      .filter((c) => c.RiskLabel !== 'Low')
      .reduce((sum, c) => sum + c.CLTV, 0)

    const alpha = successRate / 100
    let targetCount = 0
    let netValue = 0
    for (const c of filtered) {
      const benefit = c.ChurnProbability * alpha * c.CLTV
      const net = benefit - offerCost
      if (net > 0) {
        targetCount += 1
        netValue += net
      }
    }
    return { n, highRisk, revenueAtRisk, targetCount, netValue }
  }, [filtered, offerCost, successRate])

  const riskChartData = useMemo(() => {
    return RISK_LABELS.map((label) => ({
      label,
      count: filtered.filter((c) => c.RiskLabel === label).length,
      fill: RISK_COLOR[label],
    }))
  }, [filtered])

  const contractChartData = useMemo(() => {
    const palette = [COLORS.blue, COLORS.aqua, COLORS.yellow]
    return CONTRACTS.map((label, i) => ({
      label,
      count: filtered.filter((c) => c.Contract === label).length,
      fill: palette[i],
    }))
  }, [filtered])

  const probabilityHistogram = useMemo(() => {
    const bins = 10
    const counts = new Array(bins).fill(0)
    filtered.forEach((c) => {
      const idx = Math.min(bins - 1, Math.floor(c.ChurnProbability * bins))
      counts[idx] += 1
    })
    return counts.map((count, i) => ({
      label: `${i * 10}-${i * 10 + 10}%`,
      count,
      fill: i >= 6 ? COLORS.critical : i >= 3 ? COLORS.warning : COLORS.good,
    }))
  }, [filtered])

  const strategyData = useMemo(() => {
    const alpha = successRate / 100
    const strategyValue = (predicate) => {
      let n = 0
      let net = 0
      filtered.forEach((c) => {
        if (predicate(c)) {
          n += 1
          net += c.ChurnProbability * alpha * c.CLTV - offerCost
        }
      })
      return net
    }
    return [
      { label: 'Target all (P>0.5)', value: strategyValue((c) => c.ChurnProbability > 0.5), fill: COLORS.blue },
      { label: 'High-risk only (P>0.7)', value: strategyValue((c) => c.ChurnProbability > 0.7), fill: COLORS.aqua },
      { label: 'Target everyone', value: strategyValue(() => true), fill: COLORS.yellow },
      {
        label: 'Optimized (EV > 0)',
        value: strategyValue((c) => c.ChurnProbability * alpha * c.CLTV - offerCost > 0),
        fill: COLORS.good,
      },
    ]
  }, [filtered, offerCost, successRate])

  return (
    <>
      <Head>
        <title>Telecom Churn — Interactive Retention Dashboard | Kaan Kartal Kuyucu</title>
      </Head>

      <main className="page">
        <Nav />

        <Link href="/topics/finance" className="back-link">
          Back to Finance
        </Link>

        <h1>Telecom Churn — Interactive Retention Dashboard</h1>
        <p className="subtitle">
          Live-filterable view over 7,032 scored customers. Adjust the filters and the retention-offer
          assumptions below — every tile and chart recomputes immediately from the same underlying data.
          Full methodology in the{' '}
          <Link href="/projects/telecom-churn-retention">notebook write-up</Link>.
        </p>

        {loadError ? (
          <p className="error">Couldn&apos;t load the scored dataset. Please refresh.</p>
        ) : !customers ? (
          <p className="loading">Loading 7,032 scored customers…</p>
        ) : (
          <>
            <section className="controls">
              <div className="control-group">
                <span className="control-label">Contract</span>
                <div className="chip-row">
                  {CONTRACTS.map((c) => (
                    <button
                      key={c}
                      className={`chip ${contractFilter.has(c) ? 'chip-active' : ''}`}
                      onClick={() => toggleSet(setContractFilter, contractFilter, c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <span className="control-label">Risk label</span>
                <div className="chip-row">
                  {RISK_LABELS.map((r) => (
                    <button
                      key={r}
                      className={`chip ${riskFilter.has(r) ? 'chip-active' : ''}`}
                      style={riskFilter.has(r) ? { borderColor: RISK_COLOR[r], color: RISK_COLOR[r] } : undefined}
                      onClick={() => toggleSet(setRiskFilter, riskFilter, r)}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="control-group">
                <span className="control-label">
                  Tenure (months): {tenureMin}–{tenureMax}
                </span>
                <div className="range-row">
                  <input
                    type="range"
                    min={0}
                    max={72}
                    value={tenureMin}
                    onChange={(e) => setTenureMin(Math.min(Number(e.target.value), tenureMax))}
                  />
                  <input
                    type="range"
                    min={0}
                    max={72}
                    value={tenureMax}
                    onChange={(e) => setTenureMax(Math.max(Number(e.target.value), tenureMin))}
                  />
                </div>
              </div>
            </section>

            <section className="controls assumptions">
              <div className="control-group">
                <span className="control-label">Retention offer cost: ${offerCost}</span>
                <input
                  type="range"
                  min={20}
                  max={300}
                  step={10}
                  value={offerCost}
                  onChange={(e) => setOfferCost(Number(e.target.value))}
                />
              </div>
              <div className="control-group">
                <span className="control-label">Offer success rate: {successRate}%</span>
                <input
                  type="range"
                  min={5}
                  max={70}
                  step={5}
                  value={successRate}
                  onChange={(e) => setSuccessRate(Number(e.target.value))}
                />
              </div>
            </section>

            <section className="stats">
              <StatTile label="Customers in view" value={kpis.n.toLocaleString()} />
              <StatTile
                label="High risk customers"
                value={kpis.highRisk.toLocaleString()}
                accent={COLORS.critical}
              />
              <StatTile
                label="Revenue at risk (Medium+High CLTV)"
                value={formatMoney(kpis.revenueAtRisk)}
                accent={COLORS.warning}
              />
              <StatTile
                label="Recommended to target"
                value={kpis.targetCount.toLocaleString()}
                sub={`of ${kpis.n.toLocaleString()} customers`}
              />
              <StatTile
                label="Expected campaign net value"
                value={formatMoney(kpis.netValue)}
                accent={COLORS.good}
              />
            </section>

            <section className="charts">
              <ChartCard title="Customers by risk label">
                <ResponsiveContainer>
                  <BarChart data={riskChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
                    <XAxis dataKey="label" stroke={COLORS.inkMuted} fontSize={12} />
                    <YAxis stroke={COLORS.inkMuted} fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {riskChartData.map((d, i) => (
                        <Cell key={i} fill={d.fill} />
                      ))}
                      <LabelList dataKey="count" position="top" fill={COLORS.inkSecondary} fontSize={11} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Customers by contract type">
                <ResponsiveContainer>
                  <BarChart data={contractChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
                    <XAxis dataKey="label" stroke={COLORS.inkMuted} fontSize={12} />
                    <YAxis stroke={COLORS.inkMuted} fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                      {contractChartData.map((d, i) => (
                        <Cell key={i} fill={d.fill} />
                      ))}
                      <LabelList dataKey="count" position="top" fill={COLORS.inkSecondary} fontSize={11} />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Churn probability distribution">
                <ResponsiveContainer>
                  <BarChart data={probabilityHistogram}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
                    <XAxis dataKey="label" stroke={COLORS.inkMuted} fontSize={10} interval={1} />
                    <YAxis stroke={COLORS.inkMuted} fontSize={12} />
                    <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                    <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                      {probabilityHistogram.map((d, i) => (
                        <Cell key={i} fill={d.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              <ChartCard title="Targeting strategy comparison — expected net value ($)">
                <ResponsiveContainer>
                  <BarChart data={strategyData} layout="vertical" margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} horizontal={false} />
                    <XAxis type="number" stroke={COLORS.inkMuted} fontSize={11} tickFormatter={formatMoney} />
                    <YAxis
                      type="category"
                      dataKey="label"
                      stroke={COLORS.inkMuted}
                      fontSize={11}
                      width={140}
                    />
                    <Tooltip
                      contentStyle={tooltipStyle}
                      cursor={{ fill: 'rgba(255,255,255,0.04)' }}
                      formatter={(v) => formatMoney(v)}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {strategyData.map((d, i) => (
                        <Cell key={i} fill={d.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>
            </section>
          </>
        )}

        <footer className="footer">
          <p>
            Data: IBM Telco Customer Churn (7,043 customers) · Model: tuned XGBoost, out-of-fold scored ·{' '}
            <a
              href="https://github.com/kaankartalk/Telecom-churn-retention"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </footer>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ededed;
          padding: 3rem 1.5rem 4rem;
          max-width: 1100px;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .back-link {
          display: inline-block;
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        .back-link:hover {
          color: #ededed;
        }
        h1 {
          font-size: 1.9rem;
          margin-bottom: 0.6rem;
        }
        .subtitle {
          color: #b0b0b0;
          line-height: 1.6;
          font-size: 0.95rem;
          max-width: 720px;
          margin-bottom: 2rem;
        }
        .subtitle :global(a) {
          color: #83c5a0;
        }
        .loading,
        .error {
          color: #7c7c7c;
          padding: 3rem 0;
        }
        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1.8rem;
          background: #101010;
          border: 1px solid #262626;
          border-radius: 10px;
          padding: 1.2rem 1.4rem;
          margin-bottom: 1rem;
        }
        .assumptions {
          margin-bottom: 2rem;
        }
        .control-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          min-width: 180px;
        }
        .control-label {
          font-size: 0.78rem;
          color: #9ca3af;
          font-variant-numeric: tabular-nums;
        }
        .chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .chip {
          background: transparent;
          border: 1px solid #333;
          color: #9ca3af;
          border-radius: 6px;
          padding: 0.3rem 0.65rem;
          font-size: 0.78rem;
          cursor: pointer;
          font-family: inherit;
        }
        .chip-active {
          background: rgba(131, 197, 160, 0.1);
          border-color: #83c5a0;
          color: #ededed;
        }
        .range-row {
          display: flex;
          gap: 0.6rem;
        }
        .range-row input,
        .control-group > input[type='range'] {
          flex: 1;
          accent-color: #83c5a0;
        }
        .stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .charts {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
        }
        @media (max-width: 900px) {
          .stats {
            grid-template-columns: repeat(2, 1fr);
          }
          .charts {
            grid-template-columns: 1fr;
          }
        }
        .footer {
          margin-top: 3rem;
          color: #6b6b6b;
          font-size: 0.85rem;
        }
        .footer a {
          color: #9ca3af;
        }
      `}</style>
    </>
  )
}
