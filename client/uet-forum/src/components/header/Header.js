import { useEffect, useState } from "react";
import axios from "axios";
import LoginBtn from "./login/LoginBtn";
import RegisterBtn from "./register/RegisterBtn";
import LoginModal from "./login/LoginModal";
import RegisterModal from "./register/RegisterModal";
import LogoutBtn from "./logout/LogoutBtn";
import NavBar from "./nav-bar/NavBar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setLoginInfo } from "../../features/loginInfo/loginInfoSlice";

export function CheckAthorization(props) {
    
    const params = useParams();
    if (props.name == '') {
        return (
            <div class="container-fluid d-flex justify-content-end">
                <LoginBtn />
                <p>/</p>
                <RegisterBtn />
                <LoginModal />
                <RegisterModal />
            </div>
        )
    }
    else {
        return (
            <div class="container-fluid d-flex justify-content-end">
                
                <Link to = {`/user`}> {props.name}</Link>
                <p>/</p>
                <LogoutBtn />
            </div>
        )
    }
}
export default function Header() {
    const dispatch = useDispatch();
    const loginInfo = useSelector((state) => state.loginInfo);
    useEffect(() => {
        axios.get(`http://localhost:5050/api/user/view`, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        }).then((res) => {
            console.log(res.data);
            dispatch(setLoginInfo({"username": res.data.user.username, "logged": true, "userId": res.data.user._id}));
        }).catch((err) => {
            console.log(err)
            window.localStorage.removeItem("token");
        })
    }, [])
    return (

        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2">
                    <h1>UET FORUM</h1>
                </div>
                <div class="col-md-7">
                </div>
                <div class="col-md-3">
                    <CheckAthorization name={loginInfo.username} />
                </div>
            </div>
            <div class="row bg-secondary .d-flex justify-content-end">
                <NavBar />
            </div>
        </div>

    );
}
