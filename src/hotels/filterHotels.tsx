import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { hotelDTO } from "./hotel.model";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "../Forms/Button";
import HotelsList from "./hotelsList";
import css from "./filterHotels.module.css"

export default function FilterHotels() {
    const initialValues: filterHotelsForm = {
        country: "",
        city: ""
    };

    const [hotels, sethotels] = useState<hotelDTO[]>([]);
    const history = useHistory();
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        if (query.get('country')) {
            initialValues.country = query.get('country')!;
        }

        if (query.get('city')) {
            initialValues.city = query.get('city')!;
        }

        searchHotels(initialValues);
    }, []);

    function searchHotels(values: filterHotelsForm) {
        modifyURL(values);
        axios
            .get("https://localhost:7173/api/hotels/filter", { params: values })
            .then((response) => {
                sethotels(response.data);
            })
    }

    function modifyURL(values: filterHotelsForm) {
        const queryStrings: string[] = [];

        if (values.country) {
            queryStrings.push(`country=${values.country}`);
        }

        if (values.city) {
            queryStrings.push(`city=${values.city}`);
        }


        history.push(`/hotels/filter?${queryStrings.join('&')}`);
    }

    return (
        <div className={css.div}>
            <h3>Filter Hotels</h3>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    searchHotels(values);
                }}
            >
                {(formikProps) => (
                    <>
                        <Form placeholder={"This is a placeholder"} className={css.form}>
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        id="country"
                                        placeholder="Hotel Country"
                                        {...formikProps.getFieldProps("country")}
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        id="city"
                                        placeholder="Hotel City"
                                        {...formikProps.getFieldProps("city")}
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
                                            searchHotels(initialValues);
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </Form>
                        <HotelsList hotels={hotels} />
                    </>
                )}
            </Formik>
        </div>
    );
}

interface filterHotelsForm {
    country: string;
    city: string;
}