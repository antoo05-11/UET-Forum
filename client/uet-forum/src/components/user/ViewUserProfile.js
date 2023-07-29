import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function ViewUserProfile() {
    const params = useParams();
    const [id, setId] = useState("");
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:5050/api/user/view/${params.userID}`, {headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`
        }})
        .then((response) => {
            console.log(response)
            setId(response.data._id)
            setRole(response.data.role)
            setName(response.data.name)
        })
    },[])
    return (
        <div className="user_profile">
            <div>Id: {id}</div>
            <div>Name: {name}</div>
            <div>Role: {role}</div>
        </div>
    )
}