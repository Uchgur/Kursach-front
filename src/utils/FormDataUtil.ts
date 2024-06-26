import { hotelCreationDTO } from "../hotels/hotel.model";
import { imageCreationDTO } from "../images/image.model";
import { reservationCreationDTO } from "../reservations/reservation.model";
import { roomCreationDTO } from "../rooms/room.model";

export function convertHotelToFormData(hotel: hotelCreationDTO): FormData {
    const formData = new FormData();

    formData.append('name', hotel.name);

    formData.append('country', hotel.country);

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

export function convertReservationToFormData(reservation: reservationCreationDTO): FormData {
    const formData = new FormData();

    formData.append('startDate', formatDate(reservation.startDate));

    formData.append('endDate', formatDate(reservation.endDate));

    formData.append('name', reservation.name);

    formData.append('surname', reservation.surname);

    formData.append('payOffline', String(reservation.payOffline));

    formData.append('payOnline', String(reservation.payOnline));

    formData.append('confirmation', String(reservation.confirmation));

    formData.append('canceled', String(reservation.canceled));

    formData.append('hotelId', reservation.hotelId.toString());

    formData.append('roomId', reservation.roomId.toString());

    return formData;
}

export function convertImageToFormData(image: imageCreationDTO): FormData {
    const formData = new FormData();

    formData.append('file', image.file!);

    if (image.hotelId) {
        formData.append('hotelId', image.hotelId.toString());
    }

    if (image.roomId) {
        formData.append('roomId', image.roomId.toString());
    }

    return formData;
}

export function formatDate(date: Date){
    date = new Date(date);
    const format = new Intl.DateTimeFormat("en", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = format.formatToParts(date);

    return `${year}-${month}-${day}`;
}