import React,{ useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const AllWatches = () => {
    const [watches, setWatches] = useState([])
    console.log("watches", watches)
    console.log(typeof watches)
    useEffect(() => {
        async function getWatches() {
            try {
                const {data:watches} = await axios.get("/api/watches");
                console.log (watches)
                setWatches(watches)
            } catch (error) {
                console.error(error)
            }
        }
        getWatches()
    }, [])

    const addToCart = async (watchId) => {
        try {
            // Assuming you have an endpoint '/api/cart/add' and you're sending the watch ID
            const response = await axios.post('/api/cart/post', { watchId });
            console.log(response.data); // Or handle the response appropriately
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div>
            <h1>All Watches</h1>
            {watches.length > 0 && watches.map(watch => (
                <div key={watch.id}>
                    <Link to={`/watches/${watch.id}`}>
                    <h2>{watch.brand}</h2>
                    <h2>{watch.name}</h2>
                    <h2>{watch.price}</h2>
                    </Link>
<button onClick={() => addToCart(watch.id)}>Add To Cart</button>
                </div>
            ))}
            </div>
    )
}

export default AllWatches;