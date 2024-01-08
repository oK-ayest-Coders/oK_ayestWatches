import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../client/App.css";
import image1 from "../img/Yatch-Master.png";
import image2 from "../img/submariner.png";
import image3 from "../img/Sky-Dweller.jpg";
import image4 from "../img/Air-king.png";
import image5 from "../img/Sea-Dweller.jpg";
import image6 from "../img/Day-Date.jpg";
import image7 from "../img/Explorer.png";
import image8 from "../img/Date-Just.jpg";
import image9 from "../img/GMT-Master2.jpg";
import image10 from "../img/DeepSea.jpg";

const AllWatches = () => {
  const [watches, setWatches] = useState([]);
  console.log("watches", watches);
  console.log(typeof watches);
  useEffect(() => {
    async function getWatches() {
      try {
        const { data: watches } = await axios.get("/api/watches");
        console.log(watches);
        setWatches(watches);
      } catch (error) {
        console.error(error);
      }
    }
    getWatches();
  }, []);

  const addToCart = async (watch) => {
    try {
      const token = window.localStorage.getItem("TOKEN");

      if (!token) {
        console.error("Authentication token not found");
        return;
      }

      const { id: watchId, price, name } = watch;
      const quantity = 1;

      const response = await axios.post(
        "/api/cart",
        {
          watch_id: watchId,
          price,
          quantity,
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="WatchesPage">

      <h1 className="heading"></h1>
    <div className="allWatches-container"> 
      {watches.length > 0 &&
        watches.map((watch, index) => {
          let imageloop;
          if (index === 0) {
            imageloop = image1;
          } else if (index === 1) {
            imageloop = image2;
          } else if (index === 2) {
            imageloop = image3;
          } else if (index === 3) {
            imageloop = image4;
          } else if (index === 4) {
            imageloop = image5;
          } else if (index === 5) {
            imageloop = image6;
          } else if (index === 6) {
            imageloop = image7;
          } else if (index === 7) {
            imageloop = image8;
          } else if (index === 8) {
            imageloop = image9;
          } else if (index === 9) {
            imageloop = image10;
          } else {
            return "Sorry for the inconvienence, Image not avalible at this time";
          }

          return (
            <div
              className="allWatches"
              key={watch.id}
              style={{
                textAlign: "center",
                border: "solid black",
                padding: "65px",
                width: "300px",
                height: "300px",
              }}
            >
              <Link to={`/watches/${watch.id}`}>
                <img
                  src={imageloop}
                  alt={`${watch.name}`}
                  style={{
                    width: "160px",
                    height: "160px",
                    border: "solid black 5px",
                  }}
                />
                <h2>{watch.brand}</h2>
                <h2>{watch.name}</h2>
                <h2>{watch.price}</h2>
              </Link>
              <button className= "addtocart" onClick={() => addToCart(watch)}>Add To Cart</button>
            </div>
          );
        })}
    </div>
    </div>
  );
};

export default AllWatches;








// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "../client/App.css";
// import image1 from "../img/Yatch-Master.png";
// import image2 from "../img/submariner.png";
// import image3 from "../img/Sky-Dweller.jpg";
// import image4 from "../img/Air-king.png";
// import image5 from "../img/Sea-Dweller.jpg";
// import image6 from "../img/Day-Date.jpg";
// import image7 from "../img/Explorer.png";
// import image8 from "../img/Date-Just.jpg";
// import image9 from "../img/GMT-Master2.jpg";
// import image10 from "../img/DeepSea.jpg";

// const AllWatches = () => {
//   const [watches, setWatches] = useState([]);
//   console.log("watches", watches);
//   console.log(typeof watches);
//   useEffect(() => {
//     async function getWatches() {
//       try {
//         const { data: watches } = await axios.get("/api/watches");
//         console.log(watches);
//         setWatches(watches);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     getWatches();
//   }, []);

//   const addToCart = async (watch) => {
//     try {
//       const token = window.localStorage.getItem("TOKEN");

//       if (!token) {
//         console.error("Authentication token not found");
//         return;
//       }

//       const { id: watchId, price, name } = watch;
//       const quantity = 1;

//       const response = await axios.post(
//         "/api/cart",
//         {
//           watch_id: watchId,
//           price,
//           quantity,
//           name,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//     }
//   };

//   return (
//     <div>
//       <h1 className="heading">All Watches</h1>
//       {watches.length > 0 &&
//         watches.map((watch, index) => {
//           let imageloop;
//           if (index === 0) {
//             imageloop = image1;
//           } else if (index === 1) {
//             imageloop = image2;
//           } else if (index === 2) {
//             imageloop = image3;
//           } else if (index === 3) {
//             imageloop = image4;
//           } else if (index === 4) {
//             imageloop = image5;
//           } else if (index === 5) {
//             imageloop = image6;
//           } else if (index === 6) {
//             imageloop = image7;
//           } else if (index === 7) {
//             imageloop = image8;
//           } else if (index === 8) {
//             imageloop = image9;
//           } else if (index === 9) {
//             imageloop = image10;
//           } else {
//             return "Sorry for the inconvienence, Image not avalible at this time";
//           }

//           return (
//             <div
//               className="allWatches"
//               key={watch.id}
//               style={{
//                 textAlign: "center",
//                 border: "solid black",
//                 padding: "65px",
//                 width: "300px",
//                 height: "300px",
//               }}
//             >
//               <Link to={`/watches/${watch.id}`}>
//                 <img
//                   src={imageloop}
//                   alt={`${watch.name}`}
//                   style={{
//                     width: "160px",
//                     height: "160px",
//                     border: "solid black 5px",
//                   }}
//                 />
//                 <h2>{watch.brand}</h2>
//                 <h2>{watch.name}</h2>
//                 <h2>{watch.price}</h2>
//               </Link>
//               <button onClick={() => addToCart(watch)}>Add To Cart</button>
//             </div>
//           );
//         })}
//     </div>
//   );
// };

// export default AllWatches;
