import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { projects } from '../../data/projects'

export default function ProjectDetail() {
  const router = useRouter()
  const { slug } = router.query

  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <main className="page">
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <>
      <Head>
        <title>{project.title} | Kaan Kartal Kuyucu</title>
      </Head>

      <main className="page">
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <Link href="/#projects" className="back-link">
          ← Back to Projects
        </Link>

        <h1>{project.title}</h1>
        <p className="tech">{project.tech}</p>

        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="github-link"
          >
            View on GitHub →
          </a>
        )}

        <div className="sections">
          {project.sections.map((section) => (
            <div className="section-block" key={section.heading}>
              <h3>{section.heading}</h3>
              <p>{section.body}</p>
            </div>
          ))}
        </div>

        <div className="images">
          {project.images.map((image) => (
            <figure key={image.src}>
              <img src={image.src} alt={image.alt} />
              <figcaption>{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </main>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ededed;
          padding: 3rem 1.5rem;
          max-width: 800px;
          margin: 0 auto;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .nav {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .nav :global(a) {
          color: #ededed;
          text-decoration: none;
          font-size: 0.95rem;
          opacity: 0.8;
        }
        .nav :global(a:hover) {
          opacity: 1;
          text-decoration: underline;
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
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .tech {
          color: #7c7c7c;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        .github-link {
          display: inline-block;
          color: #ededed;
          text-decoration: underline;
          font-size: 0.9rem;
          margin-bottom: 2.5rem;
        }
        .sections {
          display: grid;
          gap: 1.8rem;
          margin-bottom: 3rem;
        }
        .section-block h3 {
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
          color: #ededed;
        }
        .section-block p {
          color: #d1d5db;
          line-height: 1.7;
          font-size: 0.95rem;
        }
        .images {
          display: grid;
          gap: 2rem;
        }
        .images figure {
          margin: 0;
        }
        .images img {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #262626;
        }
        .images figcaption {
          color: #7c7c7c;
          font-size: 0.85rem;
          margin-top: 0.6rem;
          text-align: center;
        }
      `}</style>
    </>
  )
}