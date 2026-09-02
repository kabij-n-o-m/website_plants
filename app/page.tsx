import Link from "next/link";
import "./components/almostGlobal.css"
import Navbar from "./components/Navbar"

export interface Plant {
  id: string;
  slug: string;
  common_name: string;
  scientific_name: string;
  image_url: string;
}

export const allowedImages = [new URL('https://bs.plantnet.org/image/**'), new URL('https://d2seqvvyy3b8p2.cloudfront.net/**')];

export default function Home() {
  return (
    <main> <h1>the plant info site</h1>
    <div className="contentandnav">    
      <div className="content"> Welcome to my website! I'll think of more stuff to write here later<br/>
        The general vibe is that you can find out useful information about plants for growing them. <br/>
        All plant info and photos are from trefle.io <br/>
        More features will be added soon tm.
      
      </div> 
      <Navbar />
      
    </div>
    </main>
  );
}
