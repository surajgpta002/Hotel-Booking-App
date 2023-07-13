import { Link } from "react-router-dom";
import Header from "../Header";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPage() {

  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get('/places').then(response => {
      setPlaces(response.data);
    });
  }, [])


  return (

    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-5" >

      {places.length > 0 && places.map(place => (
        <Link to={'/place/' + place._id} key={place.title}>

          <div className="rounded-2xl mb-2 bg-gray-500 flex" >
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
            )}
          </div>

          <h2 className="font-bold">{place.address}</h2>
          <h3 className="text-sm text-gray-700"> {place.title}</h3>

          <div className="mt-1">
            <span className="font-bold">₹{place.price}</span> per night
          </div>

        </Link>
      ))}

    </div>
  );
}