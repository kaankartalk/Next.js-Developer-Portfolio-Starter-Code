import Head from 'next/head'
import Link from 'next/link'

const posts = [
  {
    slug: 'cloud-computing',
    title: 'Understanding Cloud Computing',
    date: '2025-05-21',
    summary: 'Diving deep into the world of cloud computing.',
    externalLink: 'https://medium.com/@kkaankartal/understanding-cloud-computing-e8696321788a',
    source: 'Medium',
  },
  {
    slug: 'azure-ai-data-services',
    title: 'A Simple Guide to Azure AI and Data Services',
    date: '2025-02-18',
    summary: "An introductory overview of Azure's AI and data capabilities.",
    externalLink:
      'https://medium.com/@kkaankartal/a-simple-guide-to-azure-ai-and-data-services-6f435440eba9',
    source: 'Medium',
  },
  {
    slug: 'salesforce-unique',
    title: 'What Makes Salesforce Unique?',
    date: '2024-12-02',
    summary: 'Exploring how Salesforce is a platform designed to bring people and data together.',
    externalLink: 'https://medium.com/@kkaankartal/what-makes-salesforce-unique-2f3d1930130e',
    source: 'Medium',
  },
  {
    slug: 'baas-part-3',
    title: 'Part III: Challenges & Opportunities and Future Trends & Prospects — Banking as a Service (BaaS)',
    date: '2024-11-04',
    summary: 'Addresses the challenges and opportunities shaping the BaaS sector going forward.',
    externalLink:
      'https://medium.com/@kkaankartal/part-iii-challenges-opportunities-and-future-trends-prospects-banking-as-a-service-baas-7b3bba1a8ccd',
    source: 'Medium',
  },
  {
    slug: 'baas-part-2',
    title: 'Part II: What is the Appropriate Level of Openness? — Banking as a Service (BaaS)',
    date: '2024-10-29',
    summary: 'Discusses open banking concepts and PSD2 regulations in Europe.',
    externalLink:
      'https://medium.com/@kkaankartal/part-ii-what-is-the-appropriate-level-of-openness-banking-as-a-service-baas-ee2f15bb595a',
    source: 'Medium',
  },
  {
    slug: '3lod-ai',
    title: 'Three Lines of Defence (3LOD) Meets AI: Transforming Risk Management',
    date: '2024-10-28',
    summary: 'Examines how the Three Lines of Defense model integrates with AI for modern risk management.',
    externalLink:
      'https://medium.com/@kkaankartal/three-lines-of-defence-3lod-meets-ai-transforming-risk-management-for-the-next-generation-of-2fff449506ab',
    source: 'Medium',
  },
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