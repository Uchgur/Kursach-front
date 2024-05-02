import axios from "axios";
import { hotelCreationDTO } from "./hotel.model";
import { useHistory } from "react-router-dom";
import { convertHotelToFormData } from "../utils/FormDataUtil";
import HotelForm from "./hotelForm";

export default function HotelCreation() {
    const history = useHistory();

    async function create(hotel: hotelCreationDTO) {
        const formData = convertHotelToFormData(hotel);
        const response = await axios({
            method: "post",
            url: "https://localhost:7173/api/hotels/create",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
        history.push(`/hotels/${response.data}`);
    }

    return (
        <>
            <HotelForm model={{ name: '', country: '', city: '', address: '', contactInformation: '', description: '', userId: '' }}
                onSubmit={async (values) => await create(values)}
                onEdit={false}
            />
        </>
    )
}