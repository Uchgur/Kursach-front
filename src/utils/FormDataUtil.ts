import { hotelCreationDTO } from "../hotels/hotel.model";
import { roomCreationDTO } from "../rooms/room.model";

export function convertHotelToFormData(hotel: hotelCreationDTO): FormData {
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

export function convertRoomToFormData(room: roomCreationDTO): FormData {
    const formData = new FormData();

    formData.append('type', room.type);

    formData.append('beds', room.beds.toString());

    formData.append('price', room.price);

    if (room.description) {
        formData.append('description', room.description);
    }

    if (room.image) {
        formData.append('image', room.image);
    }

    formData.append('hotelId', room.hotelId.toString())

    return formData;
}