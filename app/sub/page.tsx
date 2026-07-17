import React from 'react'

const api_key = "token=usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE";

interface Plant {
  id: number;
  common_name: string;
  scientific_name: string;
}

const SubPage = async() => {
  const res = await fetch('https://trefle.io/api/v1/plants/search?'+api_key+'&q=tomato');
  const { data } = await res.json();
  const plants: Plant[] = data;
  //console.log(data);
  return (
    <div>
      <h1>Types of tomatoes</h1>
      <ul>
        {plants.map(plant => <li key={plant.id}>{plant.common_name}</li>)}
      </ul>
        
    </div>
  )
}

export default SubPage

//usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE

//https://trefle.io/api/v1/plants?token=usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE

//       

