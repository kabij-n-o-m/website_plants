import React from 'react'

const api_key = "token=usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE";

interface PlantProp{
  slug: string
}

interface MorePlant{
  id: string;
  slug: string; 
  common_name: string;
  scientific_name: string;
  edible: boolean;
  growth: {light: number;};

}

const PlantDetails = async({slug}: PlantProp) => {
  const res = await fetch("https://trefle.io/api/v1/species/"+slug+"?"+api_key);
  const { data } = await res.json();
  const plant: MorePlant = data;

  return (
    <div>
      {slug}
      {plant.common_name}
    </div>
  )
}

export default PlantDetails

