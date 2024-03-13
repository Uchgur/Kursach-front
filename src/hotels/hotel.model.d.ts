import { roomDTO } from "../rooms/room.model";

export interface hotelDTO {
    id: number;
    name: string;
    address: string;
    contactInformation: string;
    description: string;
    image?: string;
    rooms?: roomDTO[];
}