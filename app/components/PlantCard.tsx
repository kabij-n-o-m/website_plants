import React from 'react'
import {Plant} from '../page'


const PlantCard = (props: Plant) => {
  return (
    <div>
      <p>
        Name: {props.common_name}
        Scientific name: {props.scientific_name}
        Edible parts: {props.edible_part}
      </p>
    </div>
  )
}

export default PlantCard
