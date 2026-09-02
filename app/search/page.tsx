import React from 'react';
import {Plant} from '../page';
import PlantCard from '../components/PlantCard';
import "./CardLayout.css";
import Link from 'next/link';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import "../components/almostGlobal.css"

const api_key = process.env.TREFLE_API_KEY;
const api_base = "https://trefle.io/api/v1/species/search?"



type SearchParams = Promise<{
  q?: string;
  edible?: string;
  native?: string;
  minLight?: string;
  maxLight?: string;
  minPh?: string;
  maxPh?: string;
}>;

async function makeUrl (searchParams: SearchParams) : Promise<string> {
  const params = await searchParams;
  const output = api_base+api_key+(params.q?"&q="+params.q :"")+(params.edible?"&filter[edible]="+params.edible:"")+
  (params.minLight?"&range[light]="+params.minLight+","+params.maxLight :"")+
  (params.minPh?"&range[ph_maximum]="+params.minPh :"")+
  (params.maxPh?"&range[ph_minimum]=,"+params.maxPh:"")+"&limit=12"
  return (output); 
}

function PlantsExist (plants: {plants:Plant[]}){
  if (plants){
    const plantList = plants.plants
  if (plantList){
  if (plantList.length >0) {return(
  <div className='cardGridContainer'>      
  {plantList.map(plant=> <Link href={"../plant-details/"+plant.slug} key= {plant.slug}><PlantCard plant = {plant}/></Link>)}
  </div>)
  } 
  }}else {
    return;}
}

async function SearchPage ({searchParams}:{searchParams:SearchParams;}) {
  let plants:Plant[]=[];

  if (await searchParams){
  const queryUrl = await makeUrl(searchParams);
  const res = await fetch(queryUrl);
  const { data } = await res.json();
  plants = data;
  console.log(queryUrl);}
  
  return (
    <main><h1>Search plants</h1>
    <div className='contentandnav'>
      <div className='content'>
        <SearchBar /> 
        <PlantsExist plants = {plants}/>
      </div>
      <Navbar/> 
    </div>
    </main>
  )
}

export default SearchPage
     

