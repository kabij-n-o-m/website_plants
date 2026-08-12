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
  growth: {
    days_to_harvest:number; 
    ph_maximum:number; 
    ph_minimum:number; 
    light: number;
    atmospheric_humidity: number;
    minimum_temperature: {deg_c:number;};
    maximum_temperature: {deg_c:number;};

  };
  distribution: {native: string[]; introduced: string[];}
  images: {flower: PlantImage[] ; fruit: PlantImage[] ; other: PlantImage[] ;}

}

export default async function PlantInfoPage({ params }: PageProps) {
  const { slug } = await params;
  console.log({slug});
  const res = await fetch ("https://trefle.io/api/v1/species/"+slug+"?"+api_key);
  const { data } = await res.json();
  const plant: MorePlant = data;

  const growthFields = [
    { label: 'Number of days from planting until harvest', value: plant.growth.days_to_harvest },
    { label: 'Ideal light level', value: plant.growth.light },
    { label: 'Maximum ph', value: plant.growth.ph_maximum },
    { label: 'Minimum ph', value: plant.growth.ph_minimum },
    { label: 'Ideal humidity level', value: plant.growth.atmospheric_humidity },
    { label: 'Maximum temperature', value: plant.growth.maximum_temperature?.deg_c, unit: '°C' },
    { label: 'Minimum temperature', value: plant.growth.minimum_temperature?.deg_c, unit: '°C' },
  ].filter(f => f.value != null);


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

              <li>Native to: {
                plant.distribution.native.length <= 8
                  ? plant.distribution.native.join(', ')
                  : (
                    <>
                      {plant.distribution.native.slice(0, 8).join(', ')}
                      <details className="inline">
                        <summary className="inline cursor-pointer text-green-700 underline hover:text-green-900 list-none">
                          {' '}see more...
                        </summary>
                        <span>{', ' + plant.distribution.native.slice(8).join(', ')}</span>
                      </details>
                    </>
                  )}
              </li>
            </ul>
            <div className='imageWrapper'>
            <SafeImage className="imageclass" src= {plant.image_url} alt = {"image of " + plant.slug} height={100} width={100} />
            </div>
            </div>
          {growthFields.length > 0 && (<>
          <h2>Growth information</h2>
          <div className='contentsection'>
            <ul>
              {growthFields.map(f => (
                <li key={f.label}>{f.label}: {f.value}{f.unit ?? ''}</li>
              ))}
            </ul>
          </div></>
          )}
          </div>
        <Navbar />
        </div>
        
      </main>
  )
}

/*come back to teh stuff about displaying different images of the plant*/