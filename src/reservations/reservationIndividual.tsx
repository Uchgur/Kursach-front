import { Link } from "react-router-dom";
import { reservationDTO } from "./reservation.model";

export default function ReservationIndividual(props: reservationDTO) {
    const buildLink = () => `/hotels/${props.hotelId}/rooms/${props.roomId}/reservation/${props.id}/confirm`

    return(
        <>
            <Link to={buildLink()}>
                <h1>{props.id}</h1>
            </Link>
        </>
    )
}