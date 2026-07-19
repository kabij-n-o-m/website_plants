import React from 'react'
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
      <img src={plant.image_url} className="cardimg" alt={"image of "+plant.common_name} />
    </div>
  )
}

export default PlantCard
