import axios from "axios";
import { convertRoomToFormData } from "../utils/FormDataUtil";
import { roomCreationDTO } from "./room.model";
import { useHistory, useParams } from "react-router-dom";
import RoomForm from "./roomForm";

export default function RoomCreation() {
    const { id }: any = useParams();
    const history = useHistory();

    async function create(hotel: roomCreationDTO) {
        const formData = convertRoomToFormData(hotel);
        const response = await axios({
            method: "post",
            url: "https://localhost:7173/api/hotel/rooms/create",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        history.push(`/hotels/${id}`);
    }

    return (
        <>
            <h1>Create new room</h1>
            <RoomForm model={{ type: '', beds: 0, price: '', description: '', hotelId: id }}
                onSubmit={async (values) => await create(values)} />
        </>
    )
}

interface roomCreationProps {
    hotelId: number;
}