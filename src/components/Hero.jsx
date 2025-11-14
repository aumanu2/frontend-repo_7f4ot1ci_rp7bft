import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-900 to-blue-900">
      <div className="absolute inset-0 opacity-30 pointer-events-none" style={{background:'radial-gradient(1200px 600px at 50% -10%, rgba(99,102,241,0.45), transparent), radial-gradient(800px 600px at 100% 50%, rgba(56,189,248,0.25), transparent)'}} />
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center relative z-10">
        <div className="text-white max-w-xl">
          <span className="text-xs tracking-widest uppercase text-indigo-300/80">Outcome-based networking</span>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold leading-tight">
            Meet the right collaborators, faster
          </h1>
          <p className="mt-4 text-indigo-100/90">
            Smart matches, verified skills, and integrated rooms to connect, build, and grow your professional graph.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#get-started" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg font-semibold shadow-lg shadow-indigo-500/25 transition">Find collaborators</a>
            <a href="#post-project" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold backdrop-blur border border-white/20">Post a project</a>
          </div>
        </div>
        <div className="h-[420px] sm:h-[520px] lg:h-[600px] rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/40 bg-black/30">
          <Spline scene="https://prod.spline.design/qQUip0dJPqrrPryE/scene.splinecode" />
        </div>
      </div>
    </section>
  )
}
