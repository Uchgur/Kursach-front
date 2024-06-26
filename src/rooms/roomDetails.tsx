import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { roomDTO } from "./room.model";
import axios from "axios";
import css from './roomDetails.module.css'
import Authorized from "../auth/authorize";
import { userDTO } from "../auth/auth.model";

export default function RoomDetails() {
    const { id }: any = useParams();
    const [room, setRoom] = useState<roomDTO>();
    const [user, setUser] = useState<userDTO>();

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotel/rooms/room/${id}`).then((response) => {
            setRoom(response.data);
        });
    }, [id]);

    useEffect(() => {
        axios.get(`https://localhost:7173/api/accounts/currentUser`).then((response) => {
            setUser(response.data);
        });
    }, []);

    return (
        <>
            {room ? (
                <div className={css.container}>
                    <h1>{"Room Type: " + room?.type}</h1>
                    <Link className="edit-creation-link" to={`/hotels/${room.hotelId}/rooms/${room.id}/reservation/create`}>
                        Reserve
                    </Link>
                    <Authorized
                        authorized={
                            <>
                                {(user?.id == room.userId) ? (
                                    <>
                                        <Link className="edit-creation-link" to={`/hotels/${room.hotelId}/rooms/edit/${room.id}`}>
                                            Edit
                                        </Link>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        }
                        role="hotelOwner"
                    />

                    <h2>{"Room Price: " + room?.price}</h2>
                    <h2>{"Number of Beds: " + room?.beds}</h2>
                    <Authorized
                        authorized={
                            <>
                                {(user?.id == room.userId) ? (
                                    <>
                                        <Link className="images-link" to={`/hotels/${room.hotelId}/rooms/${room.id}/images/edit`}>
                                            Edit Images
                                        </Link>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        }
                        role="hotelOwner"
                    />
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