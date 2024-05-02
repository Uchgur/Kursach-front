import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "../Forms/Button";
import css from "./filterRooms.module.css"
import { roomDTO } from "./room.model";
import RoomsList from "./roomsList";

export default function FilterRooms(props: filterRoomsProps) {
    const initialValues: filterRoomsForm = {
        type: "",
        price: ""
    };

    const [rooms, setRooms] = useState<roomDTO[]>([]);
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        if (query.get('type')) {
            initialValues.type = query.get('type')!;
        }

        if (query.get('price')) {
            initialValues.price = query.get('price')!;
        }

        searchRooms(initialValues);
    }, []);

    function searchRooms(values: filterRoomsForm) {
        modifyURL(values);
        axios
            .get(`https://localhost:7173/api/hotel/rooms/filter?hotelId=${props.hotelId}`, { params: values })
            .then((response) => {
                setRooms(response.data);
            })
    }

    function modifyURL(values: filterRoomsForm) {
        const queryStrings: string[] = [];

        if (values.type) {
            queryStrings.push(`type=${values.type}`);
        }

        if (values.price) {
            queryStrings.push(`price=${values.price}`);
        }
    }

    return (
        <div className={css.div}>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    searchRooms(values);
                }}
            >
                {(formikProps) => (
                    <>
                        <Form placeholder={"This is a placeholder"} className={css.form}>
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        id="type"
                                        placeholder="Room Type"
                                        {...formikProps.getFieldProps("type")}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        id="price"
                                        placeholder="Room Price"
                                        {...formikProps.getFieldProps("price")}
                                    />
                                </div>
                                <div>
                                    <Button
                                        className="filter-btn"
                                        onClick={() => formikProps.submitForm()}
                                    >
                                        Filter
                                    </Button>
                                    <Button
                                        className="filter-btn"
                                        onClick={() => {
                                            formikProps.setValues(initialValues);
                                            searchRooms(initialValues);
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </Form>
                        <RoomsList rooms={rooms} />
                    </>
                )}
            </Formik>
        </div>
    );
}

interface filterRoomsForm {
    type: string;
    price: string;
}

interface filterRoomsProps {
    hotelId: number;
}