import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Nav from '../../components/Nav'
import { regulations } from '../../data/regulations'

export default function RegulationDetail() {
  const router = useRouter()
  const { slug } = router.query
  const reg = regulations.find(function (r) {
    return r.slug === slug
  })

  if (!reg) {
    return (
      <main className="page">
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>{reg.name} | AI & Data Regulations | Kaan Kartal Kuyucu</title>
        <meta name="description" content={reg.shortDescription} />
      </Head>

      <main className="page">
        <Nav />

        <div className="content">
          <Link href="/regulations" className="back-link">
            Back to AI & Data Regulations
          </Link>

          <h1>{reg.name}</h1>
          <p className="ref">{reg.officialRef}</p>

          <div className="sections">
            {reg.sections.map(function (section) {
              return (
                <div className="section-block" key={section.heading}>
                  <h3>{section.heading}</h3>
                  {section.body ? <p>{section.body}</p> : null}
                  {section.list ? (
                    <ul>
                      {section.list.map(function (item, i) {
                        return <li key={i}>{item}</li>
                      })}
                    </ul>
                  ) : null}
                </div>
              )
            })}
          </div>

          <p className="disclaimer">
            This page is for general educational purposes and does not constitute legal advice.
          </p>
        </div>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ededed;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .content {
          padding: 3rem 1.5rem 4rem;
          max-width: 760px;
          margin: 0 auto;
        }
        :global(.back-link) {
          display: inline-block;
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }
        :global(.back-link:hover) {
          color: #ededed;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 0.3rem;
        }
        .ref {
          color: #7c7c7c;
          font-size: 0.9rem;
          margin-bottom: 2.5rem;
        }
        .sections {
          display: grid;
          gap: 2rem;
        }
        .section-block h3 {
          font-size: 1.1rem;
          margin-bottom: 0.6rem;
          color: #ededed;
        }
        .section-block p {
          color: #d1d5db;
          line-height: 1.7;
          font-size: 0.95rem;
        }
        .section-block ul {
          margin-top: 0.6rem;
          padding-left: 1.2rem;
        }
        .section-block li {
          color: #d1d5db;
          line-height: 1.7;
          font-size: 0.95rem;
          margin-bottom: 0.6rem;
        }
        .disclaimer {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid #262626;
          color: #6b6b6b;
          font-size: 0.82rem;
          font-style: italic;
        }
      `}</style>
    </>
  )
}
