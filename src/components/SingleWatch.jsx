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
    
    // const goBackToAll = async (watchId) => {
    //     try {
    //         // Assuming you have an endpoint '/api/allWatches' and you're sending the watch ID
    //         const response = await axios.post('/api/cart', { watchId });
    //         console.log(response.data); // Or handle the response appropriately
    //     } catch (error) {
    //         console.error('Error adding to cart:', error);
    //     }
    // };

    return(
        <div className="singleWatches"><h1>Single Watch</h1>
        <h3>{watch.image}</h3>
        <h3>{watch.name}</h3>
        <h3>{watch.price}</h3>
        <h3>{watch.description}</h3>
        <button onClick={() => `/watches` }>Back to Watches</button>
        </div>
    )

}

export default SingleWatch