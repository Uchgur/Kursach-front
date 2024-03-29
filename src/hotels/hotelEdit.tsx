import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom"
import { hotelCreationDTO, hotelDTO } from "./hotel.model";
import axios from "axios";
import { convertHotelToFormData } from "../utils/FormDataUtil";
import HotelForm from "./hotelForm";
import Button from "../Forms/Button";

export default function HotelEdit() {
    const { id }: any = useParams();
    const [hotel, setHotel] = useState<hotelCreationDTO>()
    const history = useHistory();

    function transform(hotel: hotelDTO): hotelCreationDTO {
        return {
            name: hotel.name,
            city: hotel.city,
            address: hotel.address,
            contactInformation: hotel.contactInformation,
            description: hotel.description,
            imageURL: hotel.image
        };
    }

    useEffect(() => {
        axios.get(`https://localhost:7173/api/hotels/hotel/${id}`).then((response) => {
            setHotel(transform(response.data));
        });
    }, [id]);

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
            <h1>Edit Hotel</h1>
            {hotel ? (<>
                <HotelForm model={hotel}
                    onSubmit={async values => await edit(values)}
                />
                <Button onClick={deleteHotel}>
                    Delete
                </Button>
            </>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    )
}