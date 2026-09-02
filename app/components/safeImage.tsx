import React from 'react'
import { allowedImages } from '../page';
import Image, {type ImageProps} from 'next/image';


function safeImageCheck(props: string): boolean {
  if (props == "" || props == null || props == undefined){ return false}
  let url: URL;

  try {
    url = new URL(props);
  } catch {
    return false;
  }
  return allowedImages.some((pattern) => {
    
    if (
      pattern.protocol &&
      url.protocol !== pattern.protocol
    ) {      
      return false;
    }
    if (url.hostname !== pattern.hostname) {
      return false;
    }
    if (!pattern.pathname) {
      return true;
    }
    if (pattern.pathname === "/**") {
      return true;
    }
    const prefix = pattern.pathname.replace("/**", "");
    return url.pathname.startsWith(prefix);
  });
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

        if (!safeImageCheck(props.src)&&props.src!=""){
            console.log("using img")
            return (
                <img src={props.src} alt={props.alt} width={props.width} height={props.height} className={props.className}/>
            )
            
        }
        return(<Image {...props}  />)

    }
}

export default SafeImage

