import HotelIndividual from "./HotelIndividual";
import { hotelDTO } from "./hotel.model";
import GenericList from './../utils/GenericList';
import css from './hotelsList.module.css'

export default function HotelsList(props: hotelsListProps) {
    return (
    <GenericList list={props.hotels}>
        <div className={css.div}>
            {props.hotels?.map(hotel => <HotelIndividual {...hotel} key={hotel.id} />)}
        </div>
    </GenericList>
    );
}

interface hotelsListProps {
    hotels?: hotelDTO[];
}