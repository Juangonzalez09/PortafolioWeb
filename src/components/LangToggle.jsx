import { useLanguage } from '../context/LanguageContext'

export default function LangToggle() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex items-center gap-2 text-xs font-medium tracking-wider">
      <button
        onClick={() => setLang('es')}
        className={`transition-colors ${
          lang === 'es' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
        }`}
      >
        ES
      </button>
      <span className="text-neutral-300">/</span>
      <button
        onClick={() => setLang('en')}
        className={`transition-colors ${
          lang === 'en' ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
        }`}
      >
        EN
      </button>
    </div>
  )
}
