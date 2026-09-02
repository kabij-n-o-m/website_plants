"use client";

import { use, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import "../components/almostGlobal.css"
import Navbar from "../components/Navbar"

export default function LoginPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null> (null);
    
    const supabase = createClient();

    async function handleLogin(e: React.SubmitEvent){
        e.preventDefault();
        setLoading(true);
        setError(null);

        const {error} = await supabase.auth.signInWithPassword({
            email, password,
        });

        if (error){
            setError(error.message);
            setLoading(false);
            return;
        }
        window.location.href = "/"; // redirects to homepage for now
    }

    async function handleSignup(e: React.MouseEvent<HTMLButtonElement>){
        e.preventDefault();
        setLoading(true);
        setError(null);

        const {error} = await supabase.auth.signUp({
            email, password,
        });

        if (error){
            setError(error.message);
            setLoading(false);
            return;
        }
        window.location.href = "/"; // redirects to homepage for now
    }

  return (
    <main><h1>Log in</h1>
    <div className='contentandnav'>
      <div className='content'>
      <div className="w-full max-w-md rounded-lg bg-white p-8">
        {error && (<div className="mb-4 rounded bg-red-300 p-3 text-sm text-black">{error}</div>)}
        <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label htmlFor="email" className="mb-1 block text-m font-medium">
                    Email: 
                </label>
                <input id="email" type="email" required value={email}
                onChange={(e)=> setEmail(e.target.value)}
                className="w-full rounded border px-3 py-2"
                placeholder="email@example.com" />
            </div>

            <div>
                <label htmlFor="password" className= "mb-1 block text-m font-medium">
                    Password: 
                </label>
                <input id="password" type="password" required value={password}
                onChange = {(e) => setPassword(e.target.value)}
                className = "w-full rounded border px-3 py-2" 
                placeholder="********"/>
            </div>

            <button type="submit" disabled={loading} 
            className="submitButton">
                {loading ? "loading..." : "Log in"}
            </button>

            <button type="button" onClick={handleSignup} disabled={loading} 
            className="submitButton">
                {loading ? "loading..." : "Sign up"}
            </button>
        </form>
      </div>
      </div>
      <Navbar/> 
    </div>
    </main>
  )
}

