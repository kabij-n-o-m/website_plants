import React from 'react'
import Image from 'next/image'
import {type Plant} from '../page'
import SafeImage from './safeImage'
import "./Card.css"
import Heart from './Heart'

interface PlantProp {
  plant: Plant
}

const PlantCard = (props: PlantProp) => {
  const plant = props.plant;
  return (
    <div className='card'>
      <div className = 'flex-3 text-base relative'>
        <div className='mb-2'>
        { plant.common_name ? "Name: " + plant.common_name : "" } <br/>
        Scientific name: {plant.scientific_name}
        </div>
        <Heart type="small"/>
      </div>
      <div className='cardimg'>
      <SafeImage className="image" src={plant.image_url} alt={"image of "+plant.common_name} height={200} width={200} />
      </div>
    </div>
  )
}

export default PlantCard
