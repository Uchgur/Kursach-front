import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { hotelCreationDTO, hotelDTO } from "./hotel.model";
import axios from "axios";
import { convertHotelToFormData } from "../utils/FormDataUtil";
import HotelForm from "./hotelForm";
import Button from "../Forms/Button";
import { userDTO } from "../auth/auth.model";

export default function HotelEdit() {
    const { id }: any = useParams();
    const [hotel, setHotel] = useState<hotelCreationDTO>();
    const [user, setUser] = useState<userDTO>();
    const history = useHistory();

    function transform(hotel: hotelDTO): hotelCreationDTO {
        return {
            name: hotel.name,
            country: hotel.country,
            city: hotel.city,
            address: hotel.address,
            contactInformation: hotel.contactInformation,
            description: hotel.description,
            imageURL: hotel.image,
            userId: hotel.userId
        };
    }

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotels/hotel/${id}`).then((response) => {
            setHotel(transform(response.data));
        });
    }, [id]);

    useEffect(() => {
        axios.get(`https://localhost:7173/api/accounts/currentUser`).then((response) => {
            setUser(response.data);
        });
    }, []);

    async function edit(hotel: hotelCreationDTO) {
        const formData = convertHotelToFormData(hotel);
        const response = await axios({
            method: "put",
            url: `https://localhost:7173/api/hotels/edit/${id}`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        history.push(`/hotels/${response.data}`);
    }

    async function deleteHotel() {
        await axios.delete(`https://localhost:7173/api/hotels/delete/${id}`);
        history.push("/hotels");
    }

    return (
        <>
            {(user?.id == hotel?.userId) ? (
                <>
                    {hotel ? (<>
                        <HotelForm model={hotel}
                            onSubmit={async values => await edit(values)}
                            onEdit={true}
                        />
                        <Button onClick={deleteHotel} className="delete-button">
                            Delete
                        </Button>
                    </>
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </>
            ) : (
                <h4 className='block-message'>Hey you! You can't edit hotel of another user!</h4>
            )}
        </>
    )
}