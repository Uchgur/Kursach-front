import GenericList from "../utils/GenericList";
import { roomDTO } from "./room.model";
import RoomIndividual from "./roomIndividual";
import css from "./roomsList.module.css"

export default function RoomsList(props: roomsListProps) {
    return (
        <>
            {props.rooms ? (
                <GenericList list={props.rooms}>
                    <div className={css.div}>
                        {props.rooms?.map(room => <RoomIndividual {...room} key={room.id} />)}
                    </div>
                </GenericList>
            ) : (
                <h1>There are no rooms</h1>
            )}
        </>
    );
}
interface roomsListProps {
    rooms?: roomDTO[];
}