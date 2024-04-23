import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { reservationCreationDTO, reservationDTO } from "./reservation.model";
import ReservationForm from "./reservationForm";
import Button from "../Forms/Button";
import { convertReservationToFormData, formatDate } from "../utils/FormDataUtil";

export default function ReservationConfirmation() {
    const { id }: any = useParams();
    const { hotelId }: any = useParams();
    const history = useHistory();
    const [reservation, setReservation] = useState<reservationCreationDTO>();

    function transform(reservation: reservationDTO): reservationCreationDTO {
        return {
            startDate: new Date(reservation.startDate),
            endDate: new Date(reservation.endDate),
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

    async function edit(reservation: reservationCreationDTO) {
        const formData = convertReservationToFormData(reservation);
        const response = await axios({
            method: "put",
            url: `https://localhost:7173/api/hotel/room/reservations/confirmation/${id}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data'}
        })
        history.push(`/hotels/hotel/${hotelId}`);
    }

    return (
        <>
            {reservation ? (<>
                <ReservationForm model={reservation}
                    onSubmit={async values => await edit(values)}
                    onConfirmation={true}
                />
            </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    )
}