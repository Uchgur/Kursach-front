import GenericList from "../utils/GenericList";
import { reservationDTO } from "./reservation.model";
import ReservationIndividual from "./reservationIndividual";

export default function ReservationsList(props: reservationListProps) {
    return (
        <>
            {props.reservations ? (
                <GenericList list={props.reservations}>
                    <div>
                        {props.reservations?.map(reservation => <ReservationIndividual {...reservation} key={reservation.id} />)}
                    </div>
                </GenericList>
            ) : (
                <h1>There are no reservations</h1>
            )}
        </>
    )
}

interface reservationListProps {
    reservations?: reservationDTO[];
}