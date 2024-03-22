import { useEffect, useState } from "react"
import axios from "axios";
import HotelsList from "./hotelsList";

export default function HotelPage() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7173/api/hotels').then((response) => {
          setHotels(response.data);
        });
      }, []);

    return (
        <>
            <HotelsList hotels={hotels} />
        </>
    )
}