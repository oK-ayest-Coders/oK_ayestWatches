import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import image1 from '../img/login.jpg';
import image2 from '../img/login.jpg';
import image3 from '../img/signup.jpg';


const AllWatches = () => {
    const [watches, setWatches] = useState([])
    console.log("watches", watches)
    console.log(typeof watches)
    useEffect(() => {
        async function getWatches() {
            try {
                const { data: watches } = await axios.get("/api/watches");
                console.log(watches)
                setWatches(watches)
            } catch (error) {
                console.error(error)
            }
        }
        getWatches()
    }, [])

   const addToCart = async (watch) => {
    try {
        const token = window.localStorage.getItem('TOKEN');
        
        if (!token) {
            console.error('Authentication token not found');
            return;
        }

        const { id: watchId, price, name } = watch;
        const quantity = 1; 

        const response = await axios.post('/api/cart', {
            watch_id: watchId,
            price,
            quantity,
            name
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
};


    return (
        <div>
            <h1>All Watches</h1>
            {watches.length > 0 && watches.map((watch, index) => {

                let imageloop;
                if (index === 0) {
                    imageloop = image1;
                } else if (index === 1) {
                    imageloop = image3;
                } else {
                    imageloop = image2;
                }

                return (
                    <div key={watch.id}>
                        <Link to={`/watches/${watch.id}`}>
                            <img src={imageloop} alt={`${watch.name}`} style={{ width: '300px', height: '300px' }} />                           
                             <h2>{watch.brand}</h2>
                            <h2>{watch.name}</h2>
                            <h2>{watch.price}</h2>
                        </Link>
                        <button onClick={() => addToCart(watch)}>Add To Cart</button>
                    </div>
                );
            })}
        </div>
    );

}

export default AllWatches;