import HotelIndividual from "./HotelIndividual";
import { hotelDTO } from "./hotel.model";
import GenericList from './../utils/GenericList';

export default function HotelsList(props: hotelsListProps) {
    return (
    <GenericList list={props.hotels}>
        <div>
            {props.hotels?.map(hotel => <HotelIndividual {...hotel} key={hotel.id} />)}
        </div>
    </GenericList>
    );
}

interface hotelsListProps {
    hotels?: hotelDTO[];
}