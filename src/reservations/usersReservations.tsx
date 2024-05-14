import axios from "axios";
import { useEffect, useState } from "react";
import { reservationDTO } from "./reservation.model";
import ReservationsList from "./reservationsList";
import GenericList from "../utils/GenericList";
import css from "./reservationsList.module.css"
import ReservationUserIndividual from "./reservationUserIndividual";

export default function UsersReservations() {
    const [reservations, setReservations] = useState<reservationDTO[]>();

    useEffect(() => {
        axios.get('https://localhost:7173/api/hotel/room/reservations/myreservations').then((response) => {
            setReservations(response.data);
        });
    });

    return (
        <>
            {reservations ? (
                <GenericList list={reservations}>
                    <div className={css.div}>
                        {reservations?.map(reservation => <ReservationUserIndividual {...reservation} key={reservation.id} />)}
                    </div>
                </GenericList>
            ) : (
                <h1>There are no reservations</h1>
            )}
        </>
    )
}