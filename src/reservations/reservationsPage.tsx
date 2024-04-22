import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReservationsList from "./reservationsList";

export default function ReservationsPage() {
    const { hotelId }: any = useParams();
    const [reservations, setReservations] = useState();

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotel/room/reservations?hotelId=${hotelId}`).then((response) => {
            setReservations(response.data);
        });
    });

    return(
        <>
            <ReservationsList reservations={reservations} />
        </>
    )
}