import { useEffect, useState } from "react"
import { hotelDTO } from "./hotel.model";
import axios, { AxiosResponse } from "axios";
import HotelsList from "./HotelsList";

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