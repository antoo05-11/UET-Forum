import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  function submitLoginForm(e) {
    e.preventDefault();
    const data = {
      username: userName,
      password: password,
    };
    axios
      .post('http://localhost:5050/api/auth/login', data)
      .then((res) => {
        window.localStorage.setItem("token", res.data.accessToken);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      
      });
      
  }
  function handleUserName(event) {
    console.log("Username changed:", event.target.value);
    setUserName(event.target.value);
  }

  function handlePassword(event) {
    console.log("Password changed:", event.target.value);
    setPassword(event.target.value);
  }
  return (
    <div class="modal" id="loginModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Login</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <form>
              <label for="myEmail">UserName</label>
              <input
                type="text"
                id="myUserName"
                class="form-control"
                placeholder="UserName"
                value={userName}
                onChange={handleUserName}
              />
              <label for="myPassword">Password</label>
              <input
                type="password"
                id="myPassword"
                class="form-control"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
            </form>
          </div>
          <div class="modal-footer">
            <button
              onClick={submitLoginForm}
              type="button"
              class="btn btn-success"
              data-dismiss="modal"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
