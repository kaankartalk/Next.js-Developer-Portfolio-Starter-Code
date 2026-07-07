import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { projects } from '../../data/projects'

export default function ProjectDetail() {
  const router = useRouter()
  const { slug } = router.query
  const project = projects.find(function (p) {
    return p.slug === slug
  })

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
          Back to Projects
        </Link>

        <h1>{project.title}</h1>
        <p className="tech">{project.tech}</p>

        {project.githubLink ? (
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
            View on GitHub
          </a>
        ) : null}

        <div className="sections">
          {project.sections.map(function (section) {
            return (
              <div className="section-block" key={section.heading}>
                <h3>{section.heading}</h3>
                {section.body ? <p>{section.body}</p> : null}
                {section.code ? (
                  <pre className="code-block">
                    <code>{section.code}</code>
                  </pre>
                ) : null}
                {section.output ? (
                  <pre className="output-block">
                    <code>{section.output}</code>
                  </pre>
                ) : null}
                {section.image ? (
                  <figure className="inline-figure">
                    <img src={section.image.src} alt={section.image.alt} />
                    <figcaption>{section.image.caption}</figcaption>
                  </figure>
                ) : null}
              </div>
            )
          })}
        </div>

        <div className="images">
          {project.images.map(function (image) {
            return (
              <figure key={image.src}>
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.caption}</figcaption>
              </figure>
            )
          })}
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
        .code-block {
          background: #0d1117;
          border: 1px solid #262626;
          border-radius: 8px;
          padding: 1rem;
          overflow-x: auto;
          font-size: 0.85rem;
          line-height: 1.5;
          color: #c9d1d9;
          margin-top: 0.8rem;
          font-family: Menlo, monospace;
        }
        .output-block {
          background: #050505;
          border-left: 3px solid #4C72B0;
          border-radius: 4px;
          padding: 0.8rem 1rem;
          overflow-x: auto;
          font-size: 0.8rem;
          line-height: 1.5;
          color: #9ca3af;
          margin-top: 0.6rem;
          font-family: Menlo, monospace;
        }
        .inline-figure {
          margin: 1rem 0 0 0;
        }
        .inline-figure img {
          width: 100%;
          border-radius: 10px;
          border: 1px solid #262626;
        }
        .inline-figure figcaption {
          color: #7c7c7c;
          font-size: 0.85rem;
          margin-top: 0.6rem;
          text-align: center;
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