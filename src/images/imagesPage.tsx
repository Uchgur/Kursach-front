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
import { roomDTO } from "../rooms/room.model";
import { hotelDTO } from "../hotels/hotel.model";

export default function ImagesPage(props: imagesPageProps) {
    const [images, setImages] = useState([]);
    const [user, setUser] = useState<userDTO>();
    const [room, setRoom] = useState<roomDTO>();
    const [hotel, setHotel] = useState<hotelDTO>();
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

    useEffect(() => {
        if (props.isRoom) {
            axios.get(`https://localhost:7173/api/hotel/rooms/room/${id}`).then((response) => {
                setRoom(response.data);
            });
        } else {
            axios.get(`https://localhost:7173/api/hotels/hotel/${id}`).then((response) => {
                setHotel(response.data);
            });
        }
    }, [props.isRoom]);

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
            {props.isRoom ? (
                (user?.id == room?.userId) ? (
                    <>
                        <h1 className={css.h1}>Edit Images</h1>
                        <ImagesList images={images} />
                        <ImageForm model={{ fileURL: "", roomId: id }}
                            onSubmit={async (values) => await create(values)} />
                    </>

                ) : (
                    <h4 className='block-message'>Hey you! You can't edit images of another user's room!</h4>
                )
            ) : (
                (user?.id == hotel?.userId) ? (
                    <>
                        <h1 className={css.h1}>Edit Images</h1>
                        <ImagesList images={images} />
                        <ImageForm model={{ fileURL: "", hotelId: id }}
                            onSubmit={async (values) => await create(values)} />
                    </>

                ) : (
                    <h4 className='block-message'>Hey you! You can't edit images of another user's hotel!</h4>
                )

            )}

        </>
    )
}

interface imagesPageProps {
    isRoom: boolean;
}