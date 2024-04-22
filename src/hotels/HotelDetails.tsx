import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { hotelDTO } from "./hotel.model";
import css from "./hotelDetails.module.css"
import { roomDTO } from "../rooms/room.model";
import RoomsList from "../rooms/roomsList";
import RoomCreation from "../rooms/roomCreation";

export default function HotelDetails() {
    const { id }: any = useParams();
    const [hotel, setHotel] = useState<hotelDTO>()
    const [rooms, setRooms] = useState<roomDTO[]>()

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotels/hotel/${id}`).then((response) => {
            setHotel(response.data);
        });
    }, [id]);

    function getRooms(hotelId?: number) {
        axios.get(`https://localhost:7173/api/hotel/rooms?hotelId=${hotelId}`).then((response) => {
            setRooms(response.data);
        });

        return rooms;
    }

    return (
        <>
            {hotel ? (
                <div className={css.container}>
                    <h1>{hotel?.name}</h1>
                    <Link className="edit-creation-link" to={`/hotels/edit/${hotel.id}`}>
                        Edit
                    </Link>
                    <Link className="edit-creation-link" to={`/hotels/${hotel.id}/rooms/reservations`}>
                        Show all reservations
                    </Link>
                    <h2>{hotel?.city + ", " + hotel?.address}</h2>
                    <Link className="images-link" to={`/hotels/images/create/${hotel.id}`}>
                        Add new images
                    </Link>
                    <div className={css.div}>
                        {hotel?.images?.map((image) => (
                            <img alt="Image" src={image.file}></img>
                        ))}
                    </div>
                    <text>{hotel?.description}</text>
                    <h1>Available Rooms</h1>
                    <Link className="edit-creation-link" to={`/hotels/${hotel.id}/rooms/create`}>
                            Add new room
                    </Link>
                    <RoomsList rooms={getRooms(hotel?.id)} />
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>

    )
}