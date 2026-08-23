"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import {useState} from 'react';
import "./almostGlobal.css";
import * as Slider from "@radix-ui/react-slider";

export default function SearchBar() {

    const regions = {
        Uk: "127",
        France: "126",
        Ireland: "286",
        Spain: "135",
        Germany: "284"
    }
    
    const router = useRouter();
    const searchParams = useSearchParams();

    const [query, setQuery] = useState(searchParams.get("q")?? "");

    const [edible, setEdible] = useState("");
    const [nativeTo, setNativeTo] = useState("");
    const [lightLv, setLightLv] = useState([Number(searchParams.get("minLight"))|1, Number(searchParams.get("maxLight"))|10]);
    const [phLv, setphLv] = useState([Number(searchParams.get("minPh"))|0,Number(searchParams.get("maxPh"))|14]);


    function handleSearch(e: React.ChangeEvent){
        e.preventDefault();
        const params = new URLSearchParams(searchParams);

        if (query) {params.set("q", query);} 
        else {params.delete("q");}

        if (edible) {params.set("edible", edible);} else {params.delete("edible")}
        if (nativeTo) {params.set("native", nativeTo);} else {params.delete("native")}
        if (lightLv[0]!=1 || lightLv[1]!=10) {params.set("minLight", lightLv[0].toString()); params.set("maxLight", lightLv[1].toString())} else {params.delete("minLight"); params.delete("maxLight")}
        if (phLv[0]!=0 || phLv[1]!=14) {params.set("minPh", phLv[0].toString()); params.set("maxPh", phLv[1].toString())} else {params.delete("minPh"); params.delete("maxPh")}
        
        router.push(`/search?${params.toString()}`);

    }


    return (
        <form onSubmit={handleSearch} className="searchGrid">
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
            
            <details className="border rounded-lg p-3 w-fit">
                <summary className="cursor-pointer font-medium select-none">
                    Apply filters
                </summary>
                <fieldset className="flex gap-1 m-1 mt-2">
                    <label className="flex items-center gap-2 text-sm bg-pink-200 rounded-lg p-1.5">
                        Edible
                        <input
                        type="radio"
                        checked={edible == "true"}
                        onChange={() => setEdible("true")}
                        />
                        
                    </label>
                    <label className="flex items-center gap-2 text-sm bg-pink-200 rounded-lg p-1.5">
                        Non-edible
                        <input
                        type="radio"
                        checked={edible=="false"}
                        onChange={() => setEdible("false")}
                        />
                        
                    </label>
                    <label className="flex items-center gap-2 text-sm bg-pink-200 rounded-lg p-1.5">
                        Any
                        <input
                        type="radio"
                        checked={edible==""}
                        onChange={() => setEdible("")}
                        />
                        
                    </label>
                </fieldset>

                <fieldset className= "flex text-base gap-1 m-1 mt-2">
                    Native to: 
                    <div className= "grid grid-cols-4 gap-1">
                    
                    <label className="flex items-center justify-between gap-2 text-sm bg-pink-200 rounded-lg p-1.5 pr-2.5 pl-2.5">
                        UK
                        <input
                        type="radio"
                        checked={nativeTo == regions.Uk}
                        onChange={() => setNativeTo(regions.Uk)}
                        />
                    </label>
                    
                    <label className="flex items-center justify-between gap-2 text-sm bg-pink-200 rounded-lg p-1.5 pr-2.5 pl-2.5">
                        France
                        <input
                        type="radio"
                        checked={nativeTo == regions.France}
                        onChange={() => setNativeTo(regions.France)}
                        />
                    </label>
                    
                    <label className="flex items-center justify-between gap-2 text-sm bg-pink-200 rounded-lg p-1.5 pr-2.5 pl-2.5">
                        Ireland
                        <input
                        type="radio"
                        checked={nativeTo == regions.Ireland}
                        onChange={() => setNativeTo(regions.Ireland)}
                        />
                    </label>

                    <label className="flex items-center justify-between gap-2 text-sm bg-pink-200 rounded-lg p-1.5 pr-2.5 pl-2.5">
                        Spain
                        <input
                        type="radio"
                        checked={nativeTo == regions.Spain}
                        onChange={() => setNativeTo(regions.Spain)}
                        />
                    </label>

                    <label className="flex items-center justify-between gap-2 text-sm bg-pink-200 rounded-lg p-1.5 pr-2.5 pl-2.5">
                        Germany
                        <input
                        type="radio"
                        checked={nativeTo == regions.Germany}
                        onChange={() => setNativeTo(regions.Germany)}
                        />
                    </label>
                    </div>
                </fieldset>

                <fieldset className = "flex text-base gap-1 m-1 mt-2">
                    Ideal ph level: 
                    <Slider.Root className="relative flex items-center w-48 h-6 ml-2"
                    min={0} max={14} step={1} minStepsBetweenThumbs={0} value={phLv} onValueChange={setphLv}
                    aria-label="Ideal ph level range"> 
                        <Slider.Track className="relative h-1 flex-1 rounded bg-gray-300">
                        <Slider.Range className="absolute h-full rounded bg-blue-500" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-4 h-4 rounded-full bg-blue-600 
                        border-2 border-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        aria-label="Minimum ph level" />
                        <Slider.Thumb className="block w-4 h-4 rounded-full bg-blue-600 
                        border-2 border-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        aria-label="Maximum ph level"/>
                    </Slider.Root>

                    <span className="ml-2 text-sm">
                    {phLv[0]} - {phLv[1]}
                    </span>
                </fieldset>

                <fieldset className = "flex text-base gap-1 m-1 mt-2">
                    Ideal light level: 
                    <Slider.Root className="relative flex items-center w-48 h-6 ml-2"
                    min={1} max={10} step={1} minStepsBetweenThumbs={0} value={lightLv} onValueChange={setLightLv}
                    aria-label="Ideal light level range"> 
                        <Slider.Track className="relative h-1 flex-1 rounded bg-gray-300">
                        <Slider.Range className="absolute h-full rounded bg-blue-500" />
                        </Slider.Track>
                        <Slider.Thumb className="block w-4 h-4 rounded-full bg-blue-600 
                        border-2 border-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        aria-label="Minimum light level" />
                        <Slider.Thumb className="block w-4 h-4 rounded-full bg-blue-600 
                        border-2 border-white shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        aria-label="Maximum light level"/>
                    </Slider.Root>
                    
                    <span className="ml-2 text-sm">
                    {lightLv[0]} - {lightLv[1]}
                    </span>
                </fieldset>

            </details>
            
        </form>
        
    );
    }
