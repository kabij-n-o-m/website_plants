import React from 'react'
import Image from 'next/image'
import {Plant} from '../page'
import "./Card.css"

interface PlantProp {
  plant: Plant
}

const PlantCard = (props: PlantProp) => {
  const plant = props.plant;
  return (
    <div className='card'>
      <div className = 'cardtext'>
        Name: {plant.common_name} <br/>
        Scientific name: {plant.scientific_name}
      </div>
      <div className="cardimg">
      <Image className="image" src={plant.image_url} alt={"image of "+plant.common_name} height={200} width={200}/>
    </div></div>
  )
}

export default PlantCard
