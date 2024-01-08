import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../client/App.css"
import image1 from "../img/Yatch-Master.png";
import { useNavigate } from 'react-router-dom';


const SingleWatch = () => {
    const {id} = useParams()
    const [watch , setWatch] = useState({})
    console.log("watch", watch)
    const navigate = useNavigate(); 

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

    const handleBackClick = () => {
      navigate('/watches'); // Navigates to AllWatches page
  };

    return(
        <div className="singleWatches">
            <img src={image1} alt="Yatch Master" style={{ width: '160px', height: '160px', border: 'solid black 5px'}} />
        <h3>{watch.name}</h3>
        <h3>{watch.price}</h3>
        <h3>{watch.description}</h3>
        <button onClick={handleBackClick}>Back to Watches</button>
        </div>
    )

}

export default SingleWatch;