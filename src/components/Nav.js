import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Nav({ showLogo }) {
  const router = useRouter()
  const isActive = (href) => router.pathname === href

  return (
    <nav className={showLogo ? 'navbar' : 'nav'}>
      {showLogo ? (
        <Link href="/" className="nav-logo">
          Kaan Kartal Kuyucu
        </Link>
      ) : null}
      <div className={showLogo ? 'nav-links' : 'nav-links nav-links-plain'}>
        <Link href="/" className={isActive('/') ? 'active' : ''}>
          Home
        </Link>
        <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>
          Medium Stories
        </Link>
        <Link href="/#contact">Contact</Link>
      </div>

      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #262626;
        }
        .nav {
          display: flex;
          margin-bottom: 3rem;
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
        .nav-links :global(a) {
          color: #b0b0b0;
          text-decoration: none;
          font-size: 0.95rem;
        }
        .nav-links-plain :global(a) {
          color: #ededed;
          opacity: 0.8;
        }
        .nav-links :global(a:hover) {
          color: #ededed;
        }
        .nav-links-plain :global(a:hover) {
          opacity: 1;
          color: #ededed;
          text-decoration: underline;
        }
        .nav-links :global(a.active) {
          color: #83c5a0;
          font-weight: 600;
        }
        .nav-links-plain :global(a.active) {
          opacity: 1;
        }
      `}</style>
    </nav>
  )
}
