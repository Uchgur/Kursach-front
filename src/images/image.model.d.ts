export interface imageDTO {
    id: number;
    file: string;
    hotelId?: number;
    roomId?: number;
}

export interface imageCreationDTO {
    file?: File;
    fileURL: string;
    hotelId?: number;
    roomId?: number;
}