export interface reservationDTO {
    id: number;
    startDate: Date;
    endDate: Date;
    confirmation: boolean;
    hotelId: number;
    roomId: number;
    userId: string;
}

export interface reservationCreationDTO {
    startDate: Date;
    endDate: Date;
    confirmation: boolean;
    hotelId: number;
    roomId: number;
}