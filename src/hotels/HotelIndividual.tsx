import { Link } from "react-router-dom";
import { hotelDTO } from "./hotel.model";
import css from "./hotelIndividual.module.css"
import ReactMarkdown from "react-markdown";

export default function HotelIndividual(props: hotelDTO) {
    const buildLink = () => `/hotels/${props.id}`;

    function truncateText(text: string, maxLength: number) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    }

    return (
        <div className={css.div}>
          <Link to={buildLink()}>
            <img alt="Image" src={props.image} />
          </Link>
          <h1>
            <Link to={buildLink()}>{props.name}</Link>
          </h1>
          <p>
            <ReactMarkdown>{truncateText(props.description, 250)}</ReactMarkdown>
          </p>
        </div>
      );
}