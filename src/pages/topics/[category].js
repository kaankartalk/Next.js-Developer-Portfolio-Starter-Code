import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Nav from '../../components/Nav'
import SpaceBackground from '../../components/SpaceBackground'
import { categories, projects } from '../../data/projects'

export default function TopicDetail() {
  const router = useRouter()
  const { category: categorySlug } = router.query
  const category = categories.find(function (c) {
    return c.id === categorySlug
  })

  if (!category) {
    return (
      <main className="page">
        <p>Loading...</p>
      </main>
    )
  }

  const categoryProjects = projects.filter((p) => p.category === category.id)

  return (
    <>
      <Head>
        <title>{category.label} | Kaan Kartal Kuyucu</title>
      </Head>

      <main className={`page ${category.id === 'space' ? 'page-space' : ''}`}>
        {category.id === 'space' ? <SpaceBackground /> : null}

        <div className="content">
          <Nav />

          <Link href="/#projects" className="back-link">
            Back to What I&apos;m curious about
          </Link>

          <h1>{category.label}</h1>
          <p className="blurb">{category.blurb}</p>

          <div className="items">
            {categoryProjects.length > 0 ? (
              categoryProjects.map((project) => (
                <Link href={`/projects/${project.slug}`} className="item-card" key={project.slug}>
                  <h2>{project.title}</h2>
                  <p>{project.shortDescription}</p>
                  <span className="tech">{project.tech}</span>
                </Link>
              ))
            ) : (
              <p className="empty">Nothing published under this topic yet — check back soon.</p>
            )}
          </div>
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
        .page-space {
          background: transparent;
        }
        .content {
          position: relative;
          z-index: 1;
          padding: 3rem 1.5rem;
          max-width: 800px;
          margin: 0 auto;
        }
        :global(.page-space .item-card) {
          background: rgba(18, 18, 22, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-color: rgba(131, 197, 160, 0.25);
        }
        :global(.page-space .item-card:hover) {
          background: rgba(24, 32, 28, 0.7);
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
        .blurb {
          color: #b0b0b0;
          line-height: 1.6;
          margin-bottom: 2.5rem;
        }
        .items {
          display: grid;
          gap: 1rem;
        }
        :global(.item-card) {
          display: block;
          background: #141414;
          border: 1px solid #262626;
          border-radius: 10px;
          padding: 1.2rem;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s;
        }
        :global(.item-card:hover) {
          border-color: #83c5a0;
        }
        :global(.item-card) h2 {
          font-size: 1.1rem;
          margin-bottom: 0.4rem;
        }
        :global(.item-card) p {
          color: #b0b0b0;
          font-size: 0.95rem;
          margin-bottom: 0.6rem;
        }
        .tech {
          font-size: 0.8rem;
          color: #7c7c7c;
        }
        .empty {
          color: #7c7c7c;
          font-size: 0.95rem;
        }
      `}</style>
    </>
  )
}
