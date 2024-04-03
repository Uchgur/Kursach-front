import axios from "axios";
import GenericList from "../utils/GenericList";
import { useEffect, useState } from "react";
import { userDTO } from "./auth.model";
import { useHistory } from "react-router-dom";
import Button from "../Forms/Button";

export default function UsersPage() {
  const [users, setUsers] = useState<userDTO[]>([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("https://localhost:7173/api/accounts/listUsers")
      .then((response) => {
        setUsers(response.data);
      });
  }, []);

  async function makeAdmin(id: string) {
    await doAdmin(`https://localhost:7173/api/accounts/makeAdmin`, id);
    history.push("/hotels")
  }

  async function makeHotelOwner(id: string) {
    await doHotelOwner(`https://localhost:7173/api/accounts/makeHotelOwner`, id);
    history.push("/hotels")
  }

  async function doAdmin(url: string, id: string) {
    await axios.post(url, JSON.stringify(id), {
      headers: { "Content-Type": "application/json" },
    });
  }

  async function doHotelOwner(url: string, id: string) {
    await axios.post(url, JSON.stringify(id), {
        headers: {"Content-Type": "application/json"},
    });
  }

  return (
    <>
      <GenericList list={users}>
        <table
          className="table table-striped"
          style={{ textAlign: "center", verticalAlign: "middle" }}
        >
          <thead>
            <td></td>
            <td>User ID</td>
            <td></td>
            <td>Email</td>
            <td>Make Admin</td>
            <td></td>
            <td>Make hotel owner</td>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user.id}>
                <td></td>
                <td>{user.id}</td>
                <td></td>
                <td>{user.email}</td>
                <td><Button onClick={() => makeAdmin(user.id)}>Make Admin</Button></td>
                <td></td>
                <td><Button onClick={() => makeHotelOwner(user.id)}>Make Hotel Owner</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </GenericList>
    </>
  );
}