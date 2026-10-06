import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>This room is empty.</h1>
      <p>The page you requested is not part of this exhibition.</p>
      <Link className="button button-dark" to="/">Return home</Link>
    </section>
  )
}
