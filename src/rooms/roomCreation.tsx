import axios from "axios";
import { convertRoomToFormData } from "../utils/FormDataUtil";
import { roomCreationDTO } from "./room.model";
import { useHistory, useParams } from "react-router-dom";
import RoomForm from "./roomForm";
import { useEffect, useState } from "react";
import { hotelDTO } from "../hotels/hotel.model";
import { userDTO } from "../auth/auth.model";

export default function RoomCreation() {
    const { id }: any = useParams();
    const history = useHistory();
    const [hotel, setHotel] = useState<hotelDTO>();
    const [user, setUser] = useState<userDTO>();

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotels/hotel/${id}`).then((response) => {
            setHotel(response.data);
        });
    }, [])

    useEffect(() => {
        axios.get(`https://localhost:7173/api/accounts/currentUser`).then((response) => {
            setUser(response.data);
        });
    }, []);

    async function create(room: roomCreationDTO) {
        const formData = convertRoomToFormData(room);
        const response = await axios({
            method: "post",
            url: "https://localhost:7173/api/hotel/rooms/create",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        history.push(`/hotels/hotel/${id}`);
    }

    return (
        <>
            {(user?.id == hotel?.userId) ? (
                <RoomForm model={{ type: '', beds: 0, price: '', description: '', hotelId: id, userId: '' }}
                    onSubmit={async (values) => await create(values)}
                    onEdit={false}
                />
            ) : (
                <h4 className='block-message'>Hey you! You can't create room for another user's hotel!</h4>
            )}

        </>
    )
}