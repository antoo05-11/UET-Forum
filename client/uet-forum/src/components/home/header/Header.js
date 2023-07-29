import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./login/Login";
export function CheckAthorization(props) {
    if(props.name == '') {
      return (<Login />); 
    }
    else {
      return (
        <h1>Hi, {props.name}</h1>
      )
    }
}
export default function Header() {
  
  const[username, setUsername] = useState("");
  useEffect(() => {
    axios.get('http://localhost:5050/api/user/view', {
      headers: {
      Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    }).then((res)=> {
      console.log(res)
      setUsername(res.data.name)
    }).catch((err) => {
      console.log(err)
      window.localStorage.removeItem("token");
    })
  },[]) 
  return (
  
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-10"></div>
        <div class="col-sm-2 d-flex justify-content-around">
          <button
            type="button"
            class="btn btn-primary btn-block mr-2"
            data-toggle="modal"
            data-target="#loginModal"
          >
            Login
          </button>
          <CheckAthorization />

          <button
            type="button"
            class="btn btn-primary btn-block"
            data-toggle="modal"
            data-target="#registerModal"
          >
            Register
          </button>

          <div class="modal" id="registerModal">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">Register</h4>
                  <button type="button" class="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div class="modal-body">Modal body..</div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-danger"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
