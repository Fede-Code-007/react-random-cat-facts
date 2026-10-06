import {useCatsFact} from './hooks/useCatsFact.js'
import {useCatsImage} from './hooks/useCatsImage.js'
import './App.css'


export function App (){
    const {fact, getNewFact} = useCatsFact()
    const {imageUrl} = useCatsImage({fact})
    
    return (
        <main>
            <h1>Datos random de gatitos.</h1>
            <section>
                {fact && <p>{fact}</p>}
                {imageUrl && <img src={imageUrl} alt = 'cat image extract of the second api based on the first word of the fact extracted from the first api.'/>}
            </section>
            <button onClick = {getNewFact}>Obtener otro dato</button>
        </main>
    )
}