import { Outlet } from 'react-router-dom'
import Marquee from '../components/Marquee'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-black font-sans">
      <Marquee />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
