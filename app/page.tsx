import Image from "next/image";
import Link from "next/link";

export interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
  edible_part: string[];
}

export default function Home() {
  return (
    <main> <h1>Home page yay</h1>
    //<Link href="/sub">subpage</Link>
    <h1> hlo?</h1>
    </main>
  );
}
