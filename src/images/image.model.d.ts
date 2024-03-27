export interface imageDTO {
    id: number;
    file: string;
    hotelId?: number;
}

export interface imageCreationDTO {
    file: File;
    hotelId?: number;
    roomId?: number;
}