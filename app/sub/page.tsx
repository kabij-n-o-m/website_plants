import React from 'react';
import {Plant} from '../page';
import PlantCard from '../components/PlantCard';
import "./CardLayout.css";
import Link from 'next/link';
import Navbar from '../components/Navbar';

const api_key = "token=usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE";
const api_hasname = "filter_not[common_name]=null"



const SubPage = async() => {
  const res = await fetch('https://trefle.io/api/v1/plants/search?'+api_key+'&q=tomato&'+api_hasname+'&limit=12');
  const { data } = await res.json();
  const plants: Plant[] = data;
  //console.log(data);
  return (
    <main><h1>Types of tomatoes</h1>
    <div className='contentandnav'>
      <div className='content'>
      <div className='cardGridContainer'>
        {plants.map(plant=> <Link href={"../plant-details/"+plant.slug} key= {plant.slug}><PlantCard plant = {plant}/></Link>)}
  
      </div> 
      </div>
      <Navbar/> 
    </div>
    </main>
  )
}

export default SubPage

        //{plants.map(plant => <li key={plant.id}>{plant.common_name}</li>)}

//usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE

//https://trefle.io/api/v1/plants?token=usr-dEYjk4v-jeB2YGfG2lPBfgwrGuBNpOBdLKkJbhg2sAE

//       

