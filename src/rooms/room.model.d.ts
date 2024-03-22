import { imageDTO } from "../images/image.model";

export interface roomDTO {
    id: number;
    type: string;
    beds: number;
    price: string;
    description?: string;
    image?: string;
    images?: imageDTO[];
    hotelId: number;
}