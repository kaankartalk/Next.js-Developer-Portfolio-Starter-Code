import Head from 'next/head'
import Link from 'next/link'

const projects = [
  {
    title: 'Proje Adı 1',
    description: 'Bu projenin kısa açıklamasını buraya yazacaksın.',
    tech: 'Python, Pandas, Scikit-learn',
    link: '#',
  },
  {
    title: 'Proje Adı 2',
    description: 'Bu projenin kısa açıklamasını buraya yazacaksın.',
    tech: 'SQL, NumPy',
    link: '#',
  },
]

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
        {/* NAVBAR */}
        <nav className="navbar">
          <Link href="/" className="nav-logo">KKK</Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
            <a href="#contact">Contact</a>
          </div>
        </nav>

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

        {/* PROJELER */}
        <section className="section">
          <h3>Projeler</h3>
          <div className="projects">
            {projects.map((project) => (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card"
                key={project.title}
              >
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <span className="tech">{project.tech}</span>
              </a>
            ))}
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
          padding: 4rem 1.5rem;
          max-width: 800px;
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
        .projects {
          display: grid;
          gap: 1rem;
        }
        .project-card {
          display: block;
          background: #141414;
          border: 1px solid #262626;
          border-radius: 10px;
          padding: 1.2rem;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s;
        }
        .project-card:hover {
          border-color: #555;
        }
        .project-card h4 {
          margin-bottom: 0.4rem;
        }
        .project-card p {
          color: #b0b0b0;
          font-size: 0.95rem;
          margin-bottom: 0.6rem;
        }
        .tech {
          font-size: 0.8rem;
          color: #7c7c7c;
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