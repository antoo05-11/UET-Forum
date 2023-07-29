import { useEffect, useState } from "react";
import axios from "axios";
import LoginBtn from "./login/LoginBtn";
import RegisterBtn from "./register/RegisterBtn";
import LoginModal from "./login/LoginModal";
import RegisterModal from "./register/RegisterModal";
import LogoutBtn from "./logout/LogoutBtn";
export function CheckAthorization(props) {
    if (props.name == '') {
        return (
            <div class="col-sm-2 d-flex justify-content-around">
                <LoginBtn />
                <RegisterBtn />
                <LoginModal />
                <RegisterModal />
            </div>
        )
    }
    else {
        return (
            <div class="col-sm-2 d-flex justify-content-around">
                <p>Hello, {props.name}</p>
                <LogoutBtn />
            </div>
        )
    }
}
export default function Header() {

    const [username, setUsername] = useState("");
    useEffect(() => {
        axios.get('http://localhost:5050/api/user/view', {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        }).then((res) => {
            console.log("name: " + res.data.name)
            setUsername(res.data.name)
        }).catch((err) => {
            console.log(err)
            window.localStorage.removeItem("token");
        })
    }, [])
    return (

        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-10"></div>


                <CheckAthorization name={username} />
                
            </div>
        </div>

    );
}
