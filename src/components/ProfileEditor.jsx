import { useEffect, useState } from 'react'
import { apiGet, apiPost, apiPut } from '../lib/api'

export default function ProfileEditor() {
  const [email, setEmail] = useState('')
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchProfile = async () => {
    setLoading(true)
    setError('')
    try {
      if (!email) return
      const res = await apiGet(`/api/profiles?email=${encodeURIComponent(email)}`)
      setProfile(res[0] || null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const createOrUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const payload = {
        name: e.target.name.value,
        email,
        headline: e.target.headline.value,
        bio: e.target.bio.value,
        skills: e.target.skills.value.split(',').map(s => s.trim()).filter(Boolean),
        interests: e.target.interests.value.split(',').map(s => s.trim()).filter(Boolean),
        timezone: e.target.timezone.value,
        availability: e.target.availability.value,
        goals: e.target.goals.value,
        links: e.target.links.value.split(',').map(s => s.trim()).filter(Boolean),
      }
      if (profile && profile.id) {
        const updated = await apiPut(`/api/profiles/${profile.id}`, payload)
        setProfile(updated)
      } else {
        const created = await apiPost('/api/profiles', payload)
        setProfile(created)
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="get-started" className="py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6 border border-slate-100">
        <h2 className="text-2xl font-bold mb-2">Create your profile</h2>
        <p className="text-slate-600 mb-4">Start with your email to load or create your profile.</p>
        <div className="flex gap-3 mb-6">
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" className="flex-1 px-3 py-2 rounded border" />
          <button onClick={fetchProfile} className="px-4 py-2 bg-slate-900 text-white rounded">Load</button>
        </div>
        <form onSubmit={createOrUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" defaultValue={profile?.name||''} placeholder="Full name" className="px-3 py-2 rounded border" />
          <input name="headline" defaultValue={profile?.headline||''} placeholder="Headline" className="px-3 py-2 rounded border" />
          <input name="timezone" defaultValue={profile?.timezone||''} placeholder="Timezone (e.g., America/NY)" className="px-3 py-2 rounded border" />
          <input name="availability" defaultValue={profile?.availability||''} placeholder="Availability" className="px-3 py-2 rounded border" />
          <textarea name="bio" defaultValue={profile?.bio||''} placeholder="Bio" className="px-3 py-2 rounded border md:col-span-2" />
          <input name="skills" defaultValue={(profile?.skills||[]).join(', ')} placeholder="Skills (comma-separated)" className="px-3 py-2 rounded border md:col-span-2" />
          <input name="interests" defaultValue={(profile?.interests||[]).join(', ')} placeholder="Interests (comma-separated)" className="px-3 py-2 rounded border md:col-span-2" />
          <input name="links" defaultValue={(profile?.links||[]).join(', ')} placeholder="Links (comma-separated URLs)" className="px-3 py-2 rounded border md:col-span-2" />
          <input name="goals" defaultValue={profile?.goals||''} placeholder="Current goals" className="px-3 py-2 rounded border md:col-span-2" />
          <div className="md:col-span-2 flex items-center gap-3">
            <button disabled={loading} className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded disabled:opacity-60">{loading? 'Saving...' : (profile ? 'Update profile' : 'Create profile')}</button>
            {error && <span className="text-red-600 text-sm">{error}</span>}
            {profile && <span className="text-green-700 text-sm">Profile loaded: {profile.name}</span>}
          </div>
        </form>
      </div>
    </section>
  )
}
