import Head from 'next/head'
import Link from 'next/link'

const posts = [
  {
    slug: 'baas-part-1',
    title: 'Understanding Banking as a Service (BaaS) — Part I',
    date: '2024-10-22',
    summary:
      'This article discusses the rise of open banking, the role of PSD1/PSD2 regulations in this change, and the difference between BaaS and open banking.',
    externalLink:
      'https://medium.com/@kkaankartal/understanding-banking-as-a-service-baas-and-its-role-in-the-digital-transformation-of-financial-8fe212af37ef',
    source: 'Medium',
  },
  {
    slug: 'Coming Soon',
    title: '...',
    date: '2026-07-04',
    summary: "I will add posts here about new topics I've learned, my projects, and my observations.",
  },
]

export default function Blog() {
  return (
    <>
      <Head>
        <title>Blog | Kaan Kartal Kuyucu</title>
      </Head>

      <main className="page">
        <nav className="nav">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/#contact">Contact</Link>
        </nav>

        <h1>Blog</h1>

        <div className="posts">
          {posts.map((post) =>
            post.externalLink ? (
              <a
                href={post.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="post-card"
                key={post.slug}
              >
                <span className="date">
                  {post.date} · {post.source}
                </span>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
              </a>
            ) : (
              <div className="post-card" key={post.slug}>
                <span className="date">{post.date}</span>
                <h2>{post.title}</h2>
                <p>{post.summary}</p>
              </div>
            )
          )}
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
          margin-bottom: 3rem;
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
        h1 {
          font-size: 2rem;
          margin-bottom: 2rem;
        }
        .posts {
          display: grid;
          gap: 1.2rem;
        }
        .post-card {
          display: block;
          background: #141414;
          border: 1px solid #262626;
          border-radius: 10px;
          padding: 1.4rem;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.2s;
        }
        .post-card:hover {
          border-color: #555;
        }
        .date {
          font-size: 0.8rem;
          color: #7c7c7c;
        }
        .post-card h2 {
          font-size: 1.2rem;
          margin: 0.4rem 0;
        }
        .post-card p {
          color: #b0b0b0;
          font-size: 0.95rem;
        }
      `}</style>
    </>
  )
}