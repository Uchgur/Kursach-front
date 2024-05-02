import { useEffect, useState } from "react"
import axios from "axios";
import HotelsList from "./hotelsList";

export default function MyHotelsPage() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7173/api/hotels/myhotels').then((response) => {
          setHotels(response.data);
        });
      }, []);

    return (
        <>
            <HotelsList hotels={hotels} />
        </>
    )
}