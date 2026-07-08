import Head from 'next/head'
import Link from 'next/link'
import Nav from '../../components/Nav'
import { regulations } from '../../data/regulations'

export default function RegulationsIndex() {
  return (
    <>
      <Head>
        <title>AI & Data Regulations | Kaan Kartal Kuyucu</title>
        <meta
          name="description"
          content="An overview of the EU regulations most relevant to teams building and deploying AI and data-driven systems."
        />
      </Head>

      <main className="page">
        <Nav />

        <div className="content">
          <h1>AI & Data Regulations</h1>
          <p className="blurb">
            An overview of the EU regulations most relevant to teams building and deploying AI and
            data-driven systems — what each one covers, who it applies to, and why it matters in practice.
          </p>

          <div className="items">
            {regulations.map((reg) => (
              <Link href={`/regulations/${reg.slug}`} className="reg-card" key={reg.slug}>
                <h2>{reg.name}</h2>
                <span className="ref">{reg.officialRef}</span>
                <p>{reg.shortDescription}</p>
              </Link>
            ))}
          </div>
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
          padding: 3rem 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }
        h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .blurb {
          color: #b0b0b0;
          line-height: 1.6;
          max-width: 640px;
          margin-bottom: 2.5rem;
        }
        .items {
          display: grid;
          gap: 1rem;
        }
        :global(.reg-card) {
          display: block;
          background: #141414;
          border: 1px solid #262626;
          border-radius: 10px;
          padding: 1.3rem 1.4rem;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s;
        }
        :global(.reg-card:hover) {
          border-color: #83c5a0;
        }
        :global(.reg-card) h2 {
          display: inline;
          font-size: 1.15rem;
          margin-right: 0.6rem;
        }
        .ref {
          font-size: 0.78rem;
          color: #7c7c7c;
        }
        :global(.reg-card) p {
          color: #b0b0b0;
          font-size: 0.95rem;
          line-height: 1.6;
          margin-top: 0.5rem;
        }
      `}</style>
    </>
  )
}
