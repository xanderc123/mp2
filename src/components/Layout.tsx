import { NavLink, Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label="Open Gallery home">
          <span className="brand-mark" aria-hidden="true">
            OG
          </span>
          <span>Open Gallery</span>
        </NavLink>
        <nav className="primary-nav" aria-label="Primary navigation">
          <NavLink to="/list">List</NavLink>
          <NavLink to="/gallery">Gallery</NavLink>
        </nav>
      </header>

      <main id="main-content">
        <Outlet />
      </main>

      <footer className="site-footer">
        <p>Artwork data and images provided by the Art Institute of Chicago.</p>
        <a href="https://api.artic.edu/docs/" target="_blank" rel="noreferrer">
          View API documentation
        </a>
      </footer>
    </div>
  )
}
