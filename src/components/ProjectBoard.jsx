import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

export default function ProjectBoard() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchProjects = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await apiGet('/api/projects')
      setProjects(res)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchProjects() }, [])

  const createProject = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        owner_id: e.target.owner_id.value,
        title: e.target.title.value,
        brief: e.target.brief.value,
        tags: e.target.tags.value.split(',').map(s=>s.trim()).filter(Boolean),
        roles_needed: e.target.roles.value.split(',').map(s=>s.trim()).filter(Boolean),
        visibility: 'public'
      }
      const created = await apiPost('/api/projects', payload)
      setProjects([created, ...projects])
      e.target.reset()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="post-project" className="py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow p-6 border">
          <h3 className="text-xl font-bold mb-2">Post a project</h3>
          <p className="text-slate-600 mb-4">Share what you're building and roles you need.</p>
          <form onSubmit={createProject} className="space-y-3">
            <input name="owner_id" placeholder="Your profile id (from profile editor)" className="w-full px-3 py-2 rounded border" />
            <input name="title" placeholder="Project title" className="w-full px-3 py-2 rounded border" />
            <textarea name="brief" placeholder="Brief" className="w-full px-3 py-2 rounded border" />
            <input name="tags" placeholder="Tags (comma-separated)" className="w-full px-3 py-2 rounded border" />
            <input name="roles" placeholder="Roles needed (comma-separated)" className="w-full px-3 py-2 rounded border" />
            <button disabled={loading} className="px-5 py-2 bg-slate-900 text-white rounded">{loading? 'Posting...' : 'Post Project'}</button>
            {error && <span className="text-red-600 text-sm">{error}</span>}
          </form>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Latest projects</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map(p => (
              <div key={p.id} className="bg-white rounded-lg border shadow p-4">
                <h4 className="font-semibold">{p.title}</h4>
                <p className="text-sm text-slate-600 line-clamp-3 my-2">{p.brief}</p>
                {p.tags?.length>0 && <div className="flex flex-wrap gap-1 mt-1">
                  {p.tags.map(t=> <span key={t} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded">#{t}</span>)}
                </div>}
                {p.roles_needed?.length>0 && <p className="text-xs text-slate-500 mt-2">Needs: {p.roles_needed.join(', ')}</p>}
              </div>
            ))}
            {projects.length===0 && <p className="text-slate-600">No projects yet.</p>}
          </div>
        </div>
      </div>
    </section>
  )
}
