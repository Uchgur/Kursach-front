import { useHistory, useParams } from "react-router-dom";
import { reservationCreationDTO } from "./reservation.model";
import { convertReservationToFormData } from "../utils/FormDataUtil";
import axios from "axios";
import ReservationForm from "./reservationForm";

export default function ReservationCreation() {
    const { id }: any = useParams();
    const { hotelId }: any = useParams();
    const history = useHistory();

    async function create(reservation: reservationCreationDTO) {
        const formData = convertReservationToFormData(reservation);
        const response = await axios({
            method: "post",
            url: "https://localhost:7173/api/hotel/room/reservations/create",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        history.push(`/hotels/hotel/${hotelId}`);
    }

    return(
        <>
            <h1>Create new reservation</h1>
            <ReservationForm model={{startDate: new Date(), endDate: new Date(), hotelId: hotelId, roomId: id, confirmation: false, canceled: false}} 
                onSubmit={async (values) => await create(values)} />
        </>
    )
}