import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { hotelDTO } from "./hotel.model";
import css from "./hotelDetails.module.css"
import { roomDTO } from "../rooms/room.model";
import Authorized from "../auth/authorize";
import FilterRooms from "../rooms/filterRooms";
import { userDTO } from "../auth/auth.model";

export default function HotelDetails() {
    const { id }: any = useParams();
    const [hotel, setHotel] = useState<hotelDTO>()
    const [rooms, setRooms] = useState<roomDTO[]>()
    const [user, setUser] = useState<userDTO>()

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotels/hotel/${id}`).then((response) => {
            setHotel(response.data);
        });
    }, [id]);

    useEffect(() => {
        axios.get(`https://localhost:7173/api/accounts/currentUser`).then((response) => {
            setUser(response.data);
        });
    }, []);

    return (
        <>
            {hotel ? (
                <div className={css.container}>
                    <h1>{hotel?.name}</h1>
                    <Authorized
                        authorized={
                            <>
                                {(user?.id == hotel.userId) ? (
                                    <>
                                        <Link className="edit-creation-link" to={`/hotels/edit/${hotel.id}`}>
                                            Edit
                                        </Link>
                                        <Link className="edit-creation-link" to={`/hotels/${hotel.id}/rooms/reservations`}>
                                            Show all reservations
                                        </Link>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        }
                        role="hotelOwner"
                    />

                    <h2>{hotel.country + ", " + hotel?.city + ", " + hotel?.address}</h2>
                    <h2>{"Contact information: " + hotel.contactInformation}</h2>
                    <Authorized
                        authorized={
                            <>
                                {(user?.id == hotel.userId) ? (
                                    <>
                                        <Link className="images-link" to={`/hotels/${hotel.id}/images/edit`}>
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
                        {hotel?.images?.map((image) => (
                            <img alt="Image" src={image.file}></img>
                        ))}
                    </div>
                    <text>{hotel?.description}</text>
                    <h1>Available Rooms</h1>
                    <Authorized
                        authorized={
                            <>
                                {(user?.id == hotel.userId) ? (
                                    <>
                                        <Link className="edit-creation-link" to={`/hotels/${hotel.id}/rooms/create`}>
                                            Add new room
                                        </Link>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        }
                        role="hotelOwner"
                    />
                    <FilterRooms hotelId={hotel.id} />
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    )
}