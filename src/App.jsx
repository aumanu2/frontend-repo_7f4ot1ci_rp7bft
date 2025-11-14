import Hero from './components/Hero'
import ProfileEditor from './components/ProfileEditor'
import ProjectBoard from './components/ProjectBoard'
import Discovery from './components/Discovery'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/70 border-b">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="font-extrabold text-slate-900">CollabNet</a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#get-started" className="text-slate-700 hover:text-slate-900">Profile</a>
            <a href="#post-project" className="text-slate-700 hover:text-slate-900">Projects</a>
            <a href="#discover" className="text-slate-700 hover:text-slate-900">Discover</a>
            <a href="/test" className="text-slate-700 hover:text-slate-900">System</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <ProfileEditor />
        <ProjectBoard />
        <section id="discover"><Discovery /></section>
      </main>

      <footer className="py-10 text-center text-slate-500">
        <p>Built for outcome‑driven collaboration.</p>
      </footer>
    </div>
  )
}

export default App
