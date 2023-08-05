import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  
  function submitRegisterForm(e) {
    e.preventDefault();
    const data = {
      username: userName,
      password: password,
    };
    axios
      .post('http://localhost:5050/api/user/create', data)
      .then((res) => {
        window.localStorage.setItem("token", res.data.accessToken);
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => {
        e.preventDefault();
        alert(`Register Error: ${err.message}`)
        alert(`Please try again`)
        console.log(err);
        console.log(data)
      
      });
      
  }
  function handleEmail(event) {
    setEmail(event.target.value);
  }
  function handleUserName(event) {
    setUserName(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }
  return (
    <div class="modal" id="registerModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Register</h4>
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <form>
              <label for="myEmail">Email</label>
              <input
                type="text"
                id="myUserName"
                class="form-control"
                placeholder="Nhập Email"
                value={email}
                onChange={handleEmail}
              />
              <label for="myEmail">UserName</label>
              <input
                type="text"
                id="myUserName"
                class="form-control"
                placeholder="Nhập UserName"
                value={userName}
                onChange={handleUserName}
              />
              <label for="myPassword">Password</label>
              <input
                type="password"
                id="myPassword"
                class="form-control"
                placeholder="Nhập mật khẩu"
                value={password}
                onChange={handlePassword}
              />
            </form>
          </div>
          <div class="modal-footer">
            <button
              onClick={submitRegisterForm}
              type="button"
              class="btn btn-success"
              data-dismiss="modal"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
