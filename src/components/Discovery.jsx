import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

export default function Discovery() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const searchPeople = async (e) => {
    e?.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await apiGet(`/api/profiles?q=${encodeURIComponent(query)}`)
      setResults(res)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const matchPeople = async (e) => {
    e?.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await apiPost('/api/matches', { skills: query.split(',').map(s=>s.trim()).filter(Boolean) })
      setResults(res.results)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{ /* initial no-op */ },[])

  return (
    <section className="py-10">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow p-6 border">
          <h3 className="text-xl font-bold mb-2">Discover people</h3>
          <p className="text-slate-600 mb-4">Search by keyword or list skills to get smart matches.</p>
          <form onSubmit={searchPeople} className="flex gap-3">
            <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="e.g., react, design systems" className="flex-1 px-3 py-2 rounded border" />
            <button className="px-4 py-2 bg-slate-900 text-white rounded">Search</button>
            <button type="button" onClick={matchPeople} className="px-4 py-2 bg-indigo-600 text-white rounded">Match</button>
          </form>
          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {results.map((p) => (
              <div key={p.id} className="p-4 rounded-lg border bg-white shadow">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{p.name}</h4>
                  {p.match_score!==undefined && <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">Score {Math.round(p.match_score)}</span>}
                </div>
                <p className="text-sm text-slate-600">{p.headline}</p>
                {p.skills?.length>0 && <div className="flex flex-wrap gap-1 mt-2">
                  {p.skills.map((s) => (
                    <span key={s} className="text-xs px-2 py-1 bg-indigo-50 text-indigo-700 rounded">{s}</span>
                  ))}
                </div>}
                <p className="text-xs text-slate-500 mt-2">{p.goals}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
