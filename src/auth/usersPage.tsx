import axios from "axios";
import GenericList from "../utils/GenericList";
import { useEffect, useState } from "react";
import { userDTO } from "./auth.model";
import { useHistory } from "react-router-dom";
import Button from "../Forms/Button";
import css from "./usersPage.module.css"

export default function UsersPage(props: usersPageProps) {
  const history = useHistory();

  async function makeAdmin(id: string) {
    await doAdmin(`https://localhost:7173/api/accounts/makeAdmin`, id);
    history.push("/hotels")
  }

  async function removeAdmin(id: string) {
    await doAdmin(`https://localhost:7173/api/accounts/removeAdmin`, id);
  }

  async function makeHotelOwner(id: string) {
    await doHotelOwner(`https://localhost:7173/api/accounts/makeHotelOwner`, id);
    history.push("/hotels")
  }

  async function removeHotelOwner(id: string) {
    await doHotelOwner(`https://localhost:7173/api/accounts/removeHotelOwner`, id);
    history.push("/hotels")
  }

  async function doAdmin(url: string, id: string) {
    await axios.post(url, JSON.stringify(id), {
      headers: { "Content-Type": "application/json" },
    });
  }

  async function doHotelOwner(url: string, id: string) {
    await axios.post(url, JSON.stringify(id), {
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <>
      <GenericList list={props.users}>
        <table
          className={css.table}
          style={{ textAlign: "center", verticalAlign: "middle" }}
        >
          <thead>
            <th>User ID</th>
            <th>Email</th>
            <th>Make Admin</th>
            <th>Make hotel owner</th>
            <th>Remove Admin</th>
            <th>Remove hotel owner</th>
          </thead>
          <tbody>
            {props.users?.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td><Button className="promote-button" onClick={() => makeAdmin(user.id)}>Make Admin</Button></td>
                <td><Button className="promote-button" onClick={() => makeHotelOwner(user.id)}>Make Hotel Owner</Button></td>
                <td><Button className="demote-button" onClick={() => removeAdmin(user.id)}>Remove Admin</Button></td>
                <td><Button className="demote-button" onClick={() => removeHotelOwner(user.id)}>Remove Hotel Owner</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericList>
    </>
  );
}

interface usersPageProps {
  users: userDTO[];
}