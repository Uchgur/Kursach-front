import axios from "axios";
import { useEffect, useRef, useState } from "react"
import ImagesList from "./imagesList";
import { useParams } from "react-router-dom";
import css from "./imagesPage.module.css"
import { imageCreationDTO } from "./image.model";
import { convertImageToFormData } from "../utils/FormDataUtil";
import ImageField from "../Forms/ImageField";
import { Form, Formik } from "formik";
import Button from "../Forms/Button";
import ImageForm from "./imageForm";
import { userDTO } from "../auth/auth.model";

export default function ImagesPage(props: imagesPageProps) {
    const [images, setImages] = useState([]);
    const [users, setUser] = useState<userDTO>();
    const { id }: any = useParams();

    useEffect(() => {
        axios.get("https://localhost:7173/api/images", {
            params: {
                id: id,
                isRoom: props.isRoom
            }
        }).then((response) => {
            setImages(response.data);
        });
    }, [images]);

    useEffect(() => {
        axios.get(`https://localhost:7173/api/accounts/currentUser`).then((response) => {
            setUser(response.data);
        });
    }, []);

    async function create(image: imageCreationDTO) {
        const formData = convertImageToFormData(image);
        const response = await axios({
            method: "post",
            url: "https://localhost:7173/api/images/create",
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
    }

    return (
        <>
            <h1 className={css.h1}>Edit Images</h1>
            <ImagesList images={images} />
            {props.isRoom ? (
                <ImageForm model={{ fileURL: "", roomId: id }}
                    onSubmit={async (values) => await create(values)} />
            ) : (
                <ImageForm model={{ fileURL: "", hotelId: id }}
                    onSubmit={async (values) => await create(values)} />
            )}

        </>
    )
}

interface imagesPageProps {
    isRoom: boolean;
}