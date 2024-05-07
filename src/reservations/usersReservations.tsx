import axios from "axios";
import { useEffect, useState } from "react";
import { reservationDTO } from "./reservation.model";
import ReservationsList from "./reservationsList";

export default function UsersReservations() {
    const [reservations, setReservations] = useState<reservationDTO[]>();

    useEffect(() => {
        axios.get('https://localhost:7173/api/hotel/room/reservations/myreservations').then((response) => {
            setReservations(response.data);
        });
    });

    return(
        <ReservationsList reservations={reservations} />
    )
}