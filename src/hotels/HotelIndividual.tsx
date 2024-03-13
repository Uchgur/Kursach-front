import { Link } from "react-router-dom";
import { hotelDTO } from "./hotel.model";

export default function HotelIndividual(props: hotelDTO) {
    const buildLink = () => `/hotels/${props.id}`;

    return (
        <div>
          <Link to={buildLink()}>
            <img alt="Image" src={props.image} />
          </Link>
          <p>
            <Link to={buildLink()}>{props.name}</Link>
          </p>
        </div>
      );
}