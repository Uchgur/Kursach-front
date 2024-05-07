import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import Button from "../Forms/Button";
import { userDTO } from "./auth.model";
import UsersPage from "./usersPage";
import css from "./filterUsers.module.css"

export default function FilterUsers() {
    const initialValues: filterUsersForm = {
        email: ""
    };

    const [users, setUsers] = useState<userDTO[]>([]);
    const query = new URLSearchParams(useLocation().search);

    useEffect(() => {
        if (query.get('email')) {
            initialValues.email = query.get('email')!;
        }

        searchUsers(initialValues);
    }, []);

    function searchUsers(values: filterUsersForm) {
        modifyURL(values);
        axios
            .get("https://localhost:7173/api/accounts/listUsers")
            .then((response) => {
                const filteredUsers = response.data.filter((user: { email: string | string[]; }) => user.email.includes(values.email));
                setUsers(filteredUsers);
            });
    }
    

    function modifyURL(values: filterUsersForm) {
        const queryStrings: string[] = [];

        if (values.email) {
            queryStrings.push(`email=${values.email}`);
        }
    }

    return (
        <div>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    searchUsers(values);
                }}
            >
                {(formikProps) => (
                    <>
                        <Form placeholder={"This is a placeholder"} className={css.form}>
                            <div>
                                <div>
                                    <input
                                        type="text"
                                        id="email"
                                        placeholder="Email"
                                        {...formikProps.getFieldProps("email")}
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
                                            searchUsers(initialValues);
                                        }}
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        </Form>
                        <UsersPage users={users} />
                    </>
                )}
            </Formik>
        </div>
    );
}

interface filterUsersForm {
    email: string;
}