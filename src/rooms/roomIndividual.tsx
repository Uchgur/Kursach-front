import { Link } from "react-router-dom";
import { roomDTO } from "./room.model";
import ReactMarkdown from "react-markdown";

export default function HotelIndividual(props: roomDTO) {
    const buildLink = () => `/rooms/${props.id}`;

    function truncateText(text: string, maxLength: number) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    }

    return (
        <div>
          <Link to={buildLink()}>
            <img alt="Image" src={props.image} />
          </Link>
          <h1>
            <Link to={buildLink()}>{props.type}</Link>
          </h1>
          <p>
            <ReactMarkdown>{truncateText(props.description!, 230)}</ReactMarkdown>
          </p>
        </div>
      );
}