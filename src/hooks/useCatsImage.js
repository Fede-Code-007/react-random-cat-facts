
import { useState, useEffect } from 'react'
import {getImgUrl} from '../logic/image.js'

export const useCatsImage = ({fact}) => {
    const [imageUrl, setImageUrl] = useState()

    useEffect(()=>{
        if(!fact){return}
        const newImageUrl = getImgUrl(fact) 
        setImageUrl(newImageUrl)
    },[fact])

    return {imageUrl}
}
