import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Always scroll to top on reload
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual'
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')).render(<App />)
