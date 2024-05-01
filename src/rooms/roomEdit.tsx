import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { roomCreationDTO, roomDTO } from "./room.model";
import axios from "axios";
import { convertRoomToFormData } from "../utils/FormDataUtil";
import RoomForm from "./roomForm";
import Button from "../Forms/Button";

export default function RoomEdit() {
    const { id }: any = useParams();
    const { hotelId }: any = useParams();
    const [room, setRoom] = useState<roomCreationDTO>()
    const history = useHistory();

    function transform(room: roomDTO): roomCreationDTO {
        return {
            type: room.type,
            beds: room.beds,
            price: room.price,
            description: room.description,
            imageURL: room.image,
            hotelId: room.hotelId
        };
    }

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotel/rooms/room/${id}`).then((response) => {
            setRoom(transform(response.data));
        });
    }, [id]);

    async function edit(room: roomCreationDTO) {
        const formData = convertRoomToFormData(room);
        const response = await axios({
            method: "put",
            url: `https://localhost:7173/api/hotel/rooms/edit/${id}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        history.push(`/hotels/hotel/${hotelId}`);
    }

    async function deleteRoom() {
        await axios.delete(`https://localhost:7173/api/hotel/rooms/delete/${id}`);
        history.push(`/hotels/hotel/${hotelId}`);
    }

    return (
        <>
            {room ? (<>
                <RoomForm model={room}
                    onSubmit={async values => await edit(values)}
                    onEdit={true}
                />
                <Button onClick={deleteRoom} className="delete-button">
                    Delete
                </Button>
            </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    )
}