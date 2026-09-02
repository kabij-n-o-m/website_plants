'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import "../components/almostGlobal.css"
import Navbar from '../components/Navbar';

type Claims = { sub: string; email?: string; [key: string]: unknown }


export default function AccountForm({ claims }: { claims: Claims | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      if (!claims?.sub) {
        setLoading(false)
        return
      }

      setLoading(true)

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username`)
        .eq('id', claims.sub)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setUsername(data.username)
      }
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [claims, supabase])

  useEffect(() => {
    getProfile()
  }, [claims, getProfile])

  async function updateProfile({
    username,
    
  }: {
    username: string | null
  }) {
    try {
      if (!claims?.sub) {
        alert('You must be logged in to update your profile')
        return
      }

      setLoading(true)

      const { error } = await supabase.from('profiles').upsert({
        id: claims.sub,
        username,
        updated_at: new Date().toISOString(),
      })

       if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main> <h1>account settings</h1>
    <div className='contentandnav'>
        <div className='content'>
        <div className="space-y-3">

        <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={claims?.email ?? ''} disabled 
            className="flex-1 rounded-lg bg-gray-300 border-amber-900 border-3 ml-3 px-4 py-3 focus:outline-none "/>
        </div>
        
        <div>
            <label htmlFor="username">Name</label>
            <input
            id="username"
            type="text"
            className="flex-1 rounded-lg bg-amber-100 border-amber-900 border-3 ml-3 px-4 py-3 focus:outline-none "
            value={username || ''}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        

        <div>
            <button
            className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-800"
            onClick={() => updateProfile({ username })}
            disabled={loading || !claims?.sub}
            >
            {loading ? 'Loading ...' : 'Update'}
            </button>
        </div>

        <div>
            <form action="/auth/signout" method="post">
            <button className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-800" type="submit">
                Sign out
            </button>
            </form>
        </div>
        </div>
        </div>
        <Navbar/>
    </div>
    </main>
  )
}