import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-neutral-600">404</h1>
        <p className="mt-4 text-neutral-400">Page not found.</p>
        <Link to="/" className="mt-6 inline-block text-indigo-400 hover:underline">
          Go home
        </Link>
      </div>
    </section>
  )
}
