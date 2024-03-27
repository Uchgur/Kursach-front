import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { roomDTO } from "./room.model";
import axios from "axios";
import css from './roomDetails.module.css' 

export default function RoomDetails() {
    const {id}: any = useParams();
    const [room, setRoom] = useState<roomDTO>()

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotel/rooms/room/${id}`).then((response) => {
            setRoom(response.data);
        });
    }, [id]);

    return (
        <>
            {room ? (
                <div className={css.container}>
                    <h1>{"Room Type: " + room?.type}</h1>
                    <Link className="edit-link" to={`/hotels/${room.hotelId}/rooms/edit/${room.id}`}>
                        Edit
                    </Link>
                    <h2>{"Room Price: " + room?.price}</h2>
                    <h2>{"Number of Beds: " + room?.beds}</h2>
                    <div className={css.div}>
                        {room?.images?.map((image) => (
                            <img alt="Image" src={image.file}></img>
                        ))}
                    </div>
                    <text>{room?.description}</text>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>

    )
}