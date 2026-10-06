import { useState, useEffect } from 'react'
import {getRandomFact} from '../logic/facts.js'

export function useCatsFact (){
    const [fact, setFact] = useState()
    
    const getNewFact = async () => {
        const newFact = await getRandomFact()
        setFact(newFact)
    }

    useEffect(()=>{
       getNewFact()
    },[])

    return {fact, getNewFact}
}

