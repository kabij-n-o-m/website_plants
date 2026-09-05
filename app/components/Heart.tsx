"use client"

import { useState, useTransition } from 'react';
import { Lineicons } from '@lineiconshq/react-lineicons';
import { HeartOutlined, HeartSolid } from '@lineiconshq/free-icons';
import { addFavourite } from '../actions';
import { MorePlant } from '../plant-details/[slug]/page';

type heartOptions = "big" | "small"

interface HeartProps{
    type: heartOptions;
    plant?: MorePlant;
}




function Heart(props : HeartProps) {
    const [isPending, startTransition] = useTransition();
    const [liked, setLiked] = useState(false);

    function handleClick(){
        if (props.plant){
        startTransition(async () => {
            await addFavourite(props.plant);
        });}
        else{
            console.log("no plant")
            console.log(props)
        }
        setLiked(!liked);
    }


  if (props.type == "small"){
    return (
    <div>
    {liked ? <Lineicons icon={HeartSolid}  className={"text-cpink-500 w-6 h-6 absolute bottom-1 left-2"}/> : <Lineicons icon={HeartOutlined}  className={"text-cpink-500 w-6 h-6 absolute bottom-1 left-2"}/>}
    </div>
  )}
  else{
  return (
    <div>
    <button onClick= {handleClick} aria-label={liked? "unfavourite" : "favourite"}>
    {liked ? <Lineicons icon={HeartSolid}  className={"text-cpink-500 w-8 h-8 absolute left-4 top-0.5"}/> : <Lineicons icon={HeartOutlined}  className={"text-cpink-500 w-8 h-8 absolute left-4 top-0.5"}/>}
    </button>
    </div>
  )}
}

export default Heart
