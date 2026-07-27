//need to make use client or change so it works

import Navbar from '@/app/components/Navbar';
import Image from 'next/image';
import './DetailsLayout.css'
import SafeImage from '@/app/components/safeImage';

const api_key = "token=usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
};

interface PlantImage{
  id: number;
  image_url: string;
  copyright: string;
}

interface MorePlant{
  id: string;
  slug: string; 
  common_name: string;
  scientific_name: string;
  image_url: string;
  edible: boolean;
  growth: {light: number;};
  distribution: {native: string[]; introduced: string[];}
  images: {flower: PlantImage[] ; fruit: PlantImage[] ; other: PlantImage[] ;}

}

export default async function PlantInfoPage({ params }: PageProps) {
  const { slug } = await params;
  console.log({slug});
  const res = await fetch ("https://trefle.io/api/v1/species/"+slug+"?"+api_key);
  const { data } = await res.json();
  const plant: MorePlant = data;


  return (
      <main><h1>{plant.common_name ? plant.common_name : plant.slug}</h1>

      <div className='contentandnav'>
        <div className='content'>
            <h2>Overview</h2>
            <div className='contentsection'>
            <ul>
              <li>{plant.common_name ? "Common name: " + plant.common_name : "" }</li>
              <li>Scientific name: {plant.scientific_name} </li>

              {plant.edible != null && <li>Edible? {plant.edible ? "Yes" : "No"}</li>}

              <li>Native to: {plant.distribution.native.map(region => region).join(', ')}
              </li>
            </ul>
            <div className='imageWrapper'>
            <SafeImage className="imageclass" src= {plant.image_url} alt = {"image of " + plant.slug} height={100} width={100} />
            </div>
          </div>
            <h2>Growth information</h2>
            <div className='contentsection'>            
            <ul>
              <li>Light level needed for growth: {plant.growth.light}</li>            
            </ul>
          </div>
        </div>
        <Navbar />
      </div>
      </main>
  )
}

/*come back to teh stuff about displaying different images of the plant*/