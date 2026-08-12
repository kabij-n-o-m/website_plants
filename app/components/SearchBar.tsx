"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import {useState} from 'react';

export default function SearchBar() {
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("q")?? "");

    function handleSearch(e){
        e.preventDefault();
        const params = new URLSearchParams(searchParams);

        if (query) {params.set("q", query);} 
        else {params.delete("q");}

        router.push(`/search?${params.toString()}`);

    }


    return (
        <form onSubmit={handleSearch} className="flex gap-0 mb-2">
            <input
            placeholder="Enter plant name"
            className="flex-1 rounded-l-lg bg-amber-100 border-amber-900 border-3 px-4 py-3 focus:outline-none "
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />

            <button
            type="submit"
            className="rounded-r-lg bg-green-600 px-6 py-3 font-medium text-white hover:bg-green-800"
            >
            Search
            </button>
        </form>
    );
    }
