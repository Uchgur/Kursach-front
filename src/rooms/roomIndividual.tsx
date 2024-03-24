import { Link } from "react-router-dom";
import { roomDTO } from "./room.model";
import ReactMarkdown from "react-markdown";
import css from './roomIndividual.module.css'

export default function HotelIndividual(props: roomDTO) {
    const buildLink = () => `/rooms/${props.id}`;

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
          <h1>{"Type: " + props.type}</h1>
          <p>
            <ReactMarkdown>{truncateText(props.description!, 230)}</ReactMarkdown>
          </p>
        </div>
      );
}