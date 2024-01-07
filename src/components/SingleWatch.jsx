import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../client/App.css"

const SingleWatch = () => {
    const {id} = useParams()
    const [watch , setWatch] = useState({})
    console.log("watch", watch)

    useEffect(()=> {
        async function getWatch() {
            try {
                const {data: watch} = await axios.get(`/api/watches/${id}`)
                setWatch(watch)
            } catch (error) {
                
            }
        }
        getWatch()
    },[])

    return(
        <div className="singleWatches">
        <h3 style={{ width: '160px', height: '160px', border: 'solid black 5px'}}>{watch.image}</h3>
        <h3>{watch.name}</h3>
        <h3>{watch.price}</h3>
        <h3>{watch.description}</h3>
        <button onClick={() => `/watches` }>Back to Watches</button>
        </div>
    )

}

export default SingleWatch;