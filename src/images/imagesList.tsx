import GenericList from "../utils/GenericList";
import { imageDTO } from "./image.model"
import ImageIndividual from "./imageIndividual";
import css from "./imagesList.module.css"

export default function ImagesList(props: imagesListProps) {
    return (
        <GenericList list={props.images}>
            <div className={css.div}>
                {props.images?.map(image => <ImageIndividual {...image} key={image.id} />)}
            </div>
        </GenericList>
        );
}

interface imagesListProps {
    images: imageDTO[];
}