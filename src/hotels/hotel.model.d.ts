import { roomDTO } from "../rooms/room.model";
import { imageDTO } from "../images/image.model";

export interface hotelDTO {
    id: number;
    name: string;
    city: string;
    address: string;
    contactInformation: string;
    description: string;
    image?: string;
    images?: imageDTO[];
    rooms?: roomDTO[];
}

export interface hotelCreationDTO {
    name: string;
    city: string;
    address: string;
    contactInformation: string;
    description: string;
    image?: File;
    imageURL?: string;
}