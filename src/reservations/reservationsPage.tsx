import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReservationsList from "./reservationsList";
import { userDTO } from "../auth/auth.model";
import { roomDTO } from "../rooms/room.model";
import { hotelDTO } from "../hotels/hotel.model";

export default function ReservationsPage() {
    const { hotelId }: any = useParams();
    const [reservations, setReservations] = useState();
    const [user, setUser] = useState<userDTO>();
    const [hotel, setHotel] = useState<hotelDTO>();

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotel/room/reservations?hotelId=${hotelId}`).then((response) => {
            setReservations(response.data);
        });
    });

    useEffect(() => {
        axios.get(`https://localhost:7173/api/accounts/currentUser`).then((response) => {
            setUser(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotels/hotel/${hotelId}`).then((response) => {
            setHotel(response.data);
        });
    }, [hotelId]);

    return (
        <>
            {(user?.id == hotel?.userId) ? (
                <ReservationsList reservations={reservations} />
            ) : (
                <h4 className='block-message'>Hey you! You can't see reservations of another user's hotel!</h4>
            )}
        </>
    )
}