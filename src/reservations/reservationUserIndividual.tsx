import { Link } from "react-router-dom";
import { reservationDTO } from "./reservation.model";
import { useEffect, useState } from "react";
import axios from "axios";
import { roomDTO } from "../rooms/room.model";
import { formatDate } from "../utils/FormDataUtil";
import css from "./reservationsIndividual.module.css"

export default function ReservationIndividual(props: reservationDTO) {
    const [room, setRoom] = useState<roomDTO>()
    const startdateString = formatDate(props.startDate);
    const endDateString = formatDate(props.endDate);

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotel/rooms/room/${props.roomId}`).then((response) => {
            setRoom(response.data);
        });
    }, [props.roomId]);

    return (
        <div className={css.div}>
            <h1>{props.surname + " " + props.name}</h1>
            <text>{"Room Type: " + [room?.type]}</text>
            <text>{startdateString + " --- " + endDateString}</text>
            {props.confirmation ? (
                <text className={css.green}>Confirmed</text>
            ) : (
                <text className={css.red}>Not Confirmed</text>
            )}
            {props.canceled ? (
                <text className={css.red}>Canceled</text>
            ) : (
                <text className={css.green}>Not Canceled</text>
            )}
        </div>
    )
}