import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

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
        <div><h1>Single Watch</h1>
        <h3>{watch.brand}</h3>
        <h3>{watch.name}</h3>
        <h3>{watch.price}</h3>
        <button>Add To Cart</button>
        </div>
    )

}

export default SingleWatch