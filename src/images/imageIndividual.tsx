import axios from "axios";
import { imageDTO } from "./image.model";
import Button from "../Forms/Button";
import css from "./imageIndividual.module.css"
import { useEffect, useState } from "react";
import { userDTO } from "../auth/auth.model";

export default function ImageIndividual(props: imageDTO) {
    async function deleteImage() {
        await axios.delete(`https://localhost:7173/api/images/delete/${props.id}`)
    }

    return (
        <div className={css.div}>
            <div>
                <img alt="Image" src={props.file} />
            </div>
            <Button onClick={deleteImage} className="delete-button">
                Delete
            </Button>
        </div>
    )
}