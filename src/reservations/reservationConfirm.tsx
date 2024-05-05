import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { reservationCreationDTO, reservationDTO } from "./reservation.model";
import ReservationForm from "./reservationForm";
import Button from "../Forms/Button";
import { convertReservationToFormData, formatDate } from "../utils/FormDataUtil";
import { userDTO } from "../auth/auth.model";
import { roomDTO } from "../rooms/room.model";

export default function ReservationConfirmation() {
    const { id }: any = useParams();
    const { hotelId }: any = useParams();
    const history = useHistory();
    const [reservation, setReservation] = useState<reservationCreationDTO>();
    const [user, setUser] = useState<userDTO>();
    const [room, setRoom] = useState<roomDTO>();

    function transform(reservation: reservationDTO): reservationCreationDTO {
        return {
            startDate: new Date(reservation.startDate),
            endDate: new Date(reservation.endDate),
            name: reservation.name,
            surname: reservation.surname,
            payOffline: reservation.payOffline,
            payOnline: reservation.payOnline,
            confirmation: reservation.confirmation,
            canceled: reservation.canceled,
            hotelId: reservation.hotelId,
            roomId: reservation.roomId
        };
    }

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotel/room/reservations/reservation/${id}`).then((response) => {
            setReservation(transform(response.data));
        });
    }, [id]);

    useEffect(() => {
        axios.get(`https://localhost:7173/api/accounts/currentUser`).then((response) => {
            setUser(response.data);
        });
    }, []);

    useEffect(() => {
        if (reservation) {
            axios.get(`https://localhost:7173/api/hotel/rooms/room/${reservation?.roomId}`).then((response) => {
                setRoom(response.data);
            });
        }
    }, [reservation]);

    async function edit(reservation: reservationCreationDTO) {
        const formData = convertReservationToFormData(reservation);
        const response = await axios({
            method: "put",
            url: `https://localhost:7173/api/hotel/room/reservations/confirmation/${id}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        history.push(`/hotels/${hotelId}/rooms/reservations`);
    }

    return (
        <>
            {reservation ? (<>
                {(user?.id == room?.userId) ? (
                    <ReservationForm model={reservation}
                        onSubmit={async values => await edit(values)}
                        onConfirmation={true}
                    />
                ) : (
                    <h4 className='block-message'>Hey you! You can't edit reservations of another user's hotel!</h4>
                )}
            </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    )
}