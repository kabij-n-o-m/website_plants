import Link from "next/link";
import "./components/almostGlobal.css"

export interface Plant {
  id: string;
  slug: string;
  common_name: string;
  scientific_name: string;
  image_url: string;
}

export default function Home() {
  return (
    <main> <h1>the plant info site</h1>
    <Link href="/sub">example search page: tomatoes</Link>
    <div className="contentandnav">    
      <div className="content"> main content of the page </div> 
      <div className="navbar">navigation placeholder<br/> abc</div>
      
    </div>
    <h2> hlo?</h2>
    </main>
  );
}
