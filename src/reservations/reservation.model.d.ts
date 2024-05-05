export interface reservationDTO {
    id: number;
    startDate: Date;
    endDate: Date;
    name: string;
    surname: string;
    payOffline: boolean;
    payOnline: boolean;
    confirmation: boolean;
    canceled: boolean;
    hotelId: number;
    roomId: number;
    userId: string;
}

export interface reservationCreationDTO {
    startDate: Date;
    endDate: Date;
    name: string;
    surname: string;
    payOffline: boolean;
    payOnline: boolean;
    confirmation: boolean;
    canceled: boolean;
    hotelId: number;
    roomId: number;
}