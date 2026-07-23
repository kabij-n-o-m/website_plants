import React from 'react'
import Image from 'next/image'
import {Plant, imageHosts} from '../page'
import "./Card.css"

interface PlantProp {
  plant: Plant
}

const LoadImage = (props: PlantProp ) => {
  const plant = props.plant;
  if (imageHosts.includes((new URL (plant.image_url)).hostname)) return (
    <div className="cardimg">
      <Image className="image" src={plant.image_url} alt={"image of "+plant.common_name} height={200} width={200}/>
    </div>
  )
  console.log(plant.image_url)
}

const PlantCard = (props: PlantProp) => {
  const plant = props.plant;
  return (
    <div className='card'>
      <div className = 'cardtext'>
        { plant.common_name ? "Name: " + plant.common_name : "" } <br/>
        Scientific name: {plant.scientific_name}
      </div>
      <LoadImage plant = {props.plant} />
      </div>
  )
}

export default PlantCard
