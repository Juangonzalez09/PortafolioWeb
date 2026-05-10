import Navbar from '../components/Navbar'

function TechBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,#0f172a_0%,#000000_50%,#0c0a09_100%)]" />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-indigo-600/15 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/8 blur-[100px]" />

      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <line x1="10%" y1="0" x2="40%" y2="100%" stroke="white" strokeWidth="0.5" />
        <line x1="30%" y1="0" x2="60%" y2="100%" stroke="white" strokeWidth="0.5" />
        <line x1="60%" y1="0" x2="85%" y2="100%" stroke="white" strokeWidth="0.5" />
        <line x1="80%" y1="0" x2="50%" y2="100%" stroke="white" strokeWidth="0.5" />
        <line x1="95%" y1="0" x2="20%" y2="100%" stroke="white" strokeWidth="0.5" />
      </svg>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />
    </div>
  )
}

export default function Home() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-6 py-10 overflow-hidden">
      <TechBackground />

      <div className="relative z-10 flex min-h-[85vh] w-full max-w-5xl flex-col bg-white shadow-2xl">
        <Navbar />

        <div className="flex flex-1 flex-col justify-between px-10 pb-10 pt-6 md:px-16">
          <div className="flex justify-end pt-16">
            <div className="max-w-sm">
              <span className="mb-4 block text-base text-neutral-400">(1)</span>
              <p className="text-base leading-relaxed text-neutral-400 capitalize">
                <span className="text-neutral-900 font-medium">Software Engineer</span> Focused On
                Backend Development And Data Engineering,
                Leveraging AWS And Cloud Infrastructure To
                Deliver Robust Solutions. Experienced In
                Networking And Server Management — A
                Versatile, Ever-Evolving Profile Committed
                To Mastering The Full Spectrum Of
                Technology.
              </p>
            </div>
          </div>

          <div className="mt-auto">
            <span className="mb-2 block text-sm text-neutral-400">(2)</span>
            <h1 className="font-serif text-[clamp(2.5rem,7vw,7.5rem)] leading-[0.85] tracking-tight text-neutral-900">
              Juan Manuel<br />Gonzalez
            </h1>
          </div>
        </div>
      </div>
    </section>
  )
}
