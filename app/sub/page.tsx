import React from 'react'
import {Plant} from '../page'
import PlantCard from '../components/PlantCard'

const api_key = "token=usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE";
const api_hasname = "filter_not[common_name]=null"



const SubPage = async() => {
  const res = await fetch('https://trefle.io/api/v1/plants/search?'+api_key+'&q=tomato&'+api_hasname+'&limit=10');
  const { data } = await res.json();
  const plants: Plant[] = data;
  //console.log(data);
  return (
    <div>
      <h1>Types of tomatoes</h1>
      <ul>
        {plants.map(plant=> <li key= {plant.id}><PlantCard plant = {plant}/></li>)}
      </ul>
        
    </div>
  )
}

export default SubPage

        //{plants.map(plant => <li key={plant.id}>{plant.common_name}</li>)}

//usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE

//https://trefle.io/api/v1/plants?token=usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE

//       

