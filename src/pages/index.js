import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import { categories } from '../data/projects'

const skills = ['SQL', 'Python', 'Scikit-learn', 'Pandas', 'NumPy']

export default function Home() {
  return (
    <>
      <Head>
        <title>Kaan Kartal Kuyucu | Portfolio</title>
        <meta name="description" content="Kaan Kartal Kuyucu - Data Science & ML Enthusiast Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="page">
        <Nav showLogo />

        {/* HERO / HAKKIMDA */}
        <section className="hero">
          <h1>Kaan Kartal Kuyucu</h1>
          <h2>I turn messy business data into clear, profitable strategy.</h2>
          <p className="about">
            Think of me as a Strategy Analyst powered by data science and grounded in
            project management. I look at how businesses perform, find the friction
            points, and build the strategic frameworks to eliminate them. By combining
            management consulting principles with predictive data insights, I help
            organizations look around corners and turn messy operational challenges
            into structured, highly profitable strategies.
          </p>
        </section>

        {/* YETENEKLER */}
        <section className="section">
          <h3>Yetenekler</h3>
          <div className="skills">
            {skills.map((skill) => (
              <span className="skill-badge" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* WHAT I'M CURIOUS ABOUT */}
        <section className="section" id="projects">
          <h3>What I&apos;m curious about</h3>
          <div className="curious-list">
            {categories.map((category) => {
              const visibleTags = (category.tags || []).slice(0, 4)
              const extraTagCount = (category.tags || []).length - visibleTags.length
              return (
                <Link href={`/topics/${category.id}`} className="curious-card" key={category.id}>
                  <h4>{category.label}</h4>
                  <p>{category.blurb}</p>
                  {visibleTags.length > 0 ? (
                    <div className="tag-row">
                      {visibleTags.map((tag) => (
                        <span className="tag-chip" key={tag}>
                          {tag}
                        </span>
                      ))}
                      {extraTagCount > 0 ? <span className="tag-overflow">+{extraTagCount}</span> : null}
                    </div>
                  ) : null}
                </Link>
              )
            })}
          </div>
        </section>

        {/* İLETİŞİM */}
        <section className="section" id="contact">
          <h3>İletişim</h3>
          <div className="contact">
            <a href="mailto:kkaankartal@gmail.com">kkaankartal@gmail.com</a>
            <a href="https://github.com/kaankartalk" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Kaan Kartal Kuyucu</p>
        </footer>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ededed;
          padding: 4rem 2 rem;
          max-width: 1100px;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #262626;
        }
        .nav-logo {
          font-weight: 700;
          color: #ededed;
          text-decoration: none;
        }
        .nav-links {
          display: flex;
          gap: 1.5rem;
        }
        .nav-links a {
          color: #b0b0b0;
          text-decoration: none;
          font-size: 0.95rem;
        }
        .nav-links a:hover {
          color: #ededed;
        }
        .hero {
          margin-bottom: 3rem;
        }
        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 0.25rem;
        }
        .hero h2 {
          font-size: 1.1rem;
          font-weight: 400;
          color: #9ca3af;
          margin-bottom: 1.5rem;
        }
        .about {
          line-height: 1.7;
          color: #d1d5db;
        }
        .section {
          margin-bottom: 3rem;
        }
        .section h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #262626;
          padding-bottom: 0.5rem;
        }
        .skills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .skill-badge {
          background: #1a1a1a;
          border: 1px solid #333;
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          font-size: 0.9rem;
        }
        .curious-list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;
        }
        @media (max-width: 700px) {
          .curious-list {
            grid-template-columns: 1fr;
          }
        }
        .curious-card {
          display: block;
          background: #141414;
          border: 1px solid #262626;
          border-radius: 12px;
          padding: 1.4rem;
          text-decoration: none;
          color: inherit;
          transition: background-color 0.2s, border-color 0.2s, transform 0.2s;
        }
        .curious-card:hover {
          background: #1c3a2c;
          border-color: #83c5a0;
          transform: translateY(-2px);
        }
        .curious-card h4 {
          font-size: 1.1rem;
          margin-bottom: 0.4rem;
        }
        .curious-card p {
          color: #b0b0b0;
          font-size: 0.9rem;
          line-height: 1.6;
        }
        .tag-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.4rem;
          margin-top: 0.9rem;
        }
        .tag-chip {
          background: #1c1c1c;
          border: 1px solid #2e2e2e;
          border-radius: 6px;
          padding: 0.25rem 0.55rem;
          font-size: 0.72rem;
          color: #9ca3af;
          white-space: nowrap;
        }
        .tag-overflow {
          font-size: 0.72rem;
          color: #6b6b6b;
        }
        .contact {
          display: flex;
          gap: 1.5rem;
        }
        .contact a {
          color: #ededed;
          text-decoration: underline;
        }
        .footer {
          margin-top: 4rem;
          color: #6b6b6b;
          font-size: 0.85rem;
        }
      `}</style>
    </>
  )
}