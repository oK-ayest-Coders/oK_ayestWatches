import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const AllWatches = () => {
    const [watches, setWatches] = useState([])
    console.log("watches", watches)
    useEffect(() => {
        async function getWatches() {
            try {
                const {data: watches} = await axios.get("/api/watches");
                setWatches(watches)
            } catch (error) {
                console.error(error)
            }
        }
        getWatches()
    }, [])
    return (
        <div>
            <h1>All Watches</h1>
            {watches.map(watch => (
                <div key={watch.id}>
                    <Link to={`/watches/${watch.id}`}>
                    <h2>{watch.brand}</h2>
                    <h2>{watch.name}</h2>
                    <h2>{watch.price}</h2>
                    </Link>
                    <button>Add To Cart</button>
                </div>
            ))}
            </div>
    )
}

export default AllWatches