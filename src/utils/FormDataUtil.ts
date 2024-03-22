import { hotelCreationDTO } from "../hotels/hotel.model";

export function convertHotelToFormData(hotel: hotelCreationDTO): FormData{
    const formData = new FormData();

    formData.append('name', hotel.name);

    formData.append('city', hotel.city);

    formData.append('address', hotel.address);

    formData.append('contactInformation', hotel.contactInformation);

    formData.append('description', hotel.description);

    if (hotel.image) {
        formData.append('image', hotel.image);
    }
    return formData;
}