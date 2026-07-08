import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/Nav'
import ConstellationBackground from '../components/ConstellationBackground'
import CardAccent from '../components/CardAccent'
import { categories } from '../data/projects'

const skillGroups = [
  { label: 'Languages & Data', skills: ['Python', 'SQL', 'Pandas', 'NumPy'] },
  { label: 'Modeling', skills: ['Scikit-learn', 'XGBoost', 'Statistical Modeling'] },
  { label: 'Visualization & Dashboards', skills: ['Matplotlib', 'React / Recharts'] },
]

export default function Home() {
  return (
    <>
      <Head>
        <title>Kaan Kartal Kuyucu | Portfolio</title>
        <meta name="description" content="Kaan Kartal Kuyucu - Data Science & ML Enthusiast Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main className="page">
        <ConstellationBackground />

        <div className="content">
        <Nav showLogo />

        {/* HERO / ABOUT */}
        <section className="hero">
          <h1>Kaan Kartal Kuyucu</h1>
          <p className="about">
            I'm learning machine learning and data science, drawn to turning messy, real-world
            data into decisions worth acting on. Business strategy is the lens I point it through.
          </p>
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
                  <CardAccent type={category.id} />
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

        {/* SKILLS */}
        <section className="section">
          <h3>Skills</h3>
          <div className="skill-groups">
            {skillGroups.map((group) => (
              <div className="skill-group" key={group.label}>
                <span className="skill-group-label">{group.label}</span>
                <div className="skills">
                  {group.skills.map((skill) => (
                    <span className="skill-badge" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <h3>Contact</h3>
          <div className="contact">
            <a href="mailto:kkaankartal@gmail.com">kkaankartal@gmail.com</a>
            <a href="https://github.com/kaankartalk" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://medium.com/@kkaankartal" target="_blank" rel="noopener noreferrer">
              Medium
            </a>
          </div>
        </section>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Kaan Kartal Kuyucu</p>
        </footer>
        </div>
      </main>

      <style jsx>{`
        .page {
          position: relative;
          min-height: 100vh;
          background: #0a0a0a;
          color: #ededed;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .content {
          position: relative;
          z-index: 1;
          padding: 4rem 2rem;
          max-width: 1100px;
          margin: 0 auto;
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
          margin-bottom: 1.2rem;
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
        .skill-groups {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .skill-group-label {
          display: block;
          font-size: 0.78rem;
          color: #7c7c7c;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          margin-bottom: 0.6rem;
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
        :global(.curious-card) {
          position: relative;
          overflow: hidden;
          display: block;
          background: #141414;
          border: 1px solid #262626;
          border-radius: 12px;
          padding: 1.4rem;
          text-decoration: none;
          color: inherit;
          transition: background-color 0.2s, border-color 0.2s, transform 0.2s;
        }
        :global(.curious-card:hover) {
          background: #1c3a2c;
          border-color: #83c5a0;
          transform: translateY(-2px);
        }
        :global(.curious-card) h4 {
          position: relative;
          z-index: 1;
          font-size: 1.1rem;
          margin-bottom: 0.4rem;
          max-width: 75%;
        }
        :global(.curious-card) p {
          position: relative;
          z-index: 1;
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