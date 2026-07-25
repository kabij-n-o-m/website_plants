import React from 'react'
import { allowedImages } from '../page';
import Image, {type ImageProps} from 'next/image';


function safeImageCheck (props: string) : boolean  {
    let url: URL;
    try{
        url = new URL(props);
    } catch {return false;}

  return allowedImages.some(pattern => {

    if (
      pattern.protocol &&
      url.protocol.replace(":", "") !== pattern.protocol
    ) {
      return false;
    }

    // hostname
    if (url.hostname !== pattern.hostname) {
      return false;
    }

    // pathname
    if (pattern.pathname) {
      if (pattern.pathname === "/**") {
        
        return true;
      }

      const prefix = pattern.pathname.replace("/**", "");

      return url.pathname.startsWith(prefix);
    }

  }
   
  )
}

interface imageProp {
    src: string;
    alt: string;
    width: number;
    height: number;
    placeholder?: string;
    className?: string;
}

const SafeImage = (props: ImageProps) => {
    if (typeof props.src == "string"){
        if (!safeImageCheck(props.src)){
            return (
                <img src={props.src} alt={props.alt} width={props.width} height={props.height} className={props.className}/>
            )
            
        }
    }
    return(<Image {...props}  />)
}

export default SafeImage

