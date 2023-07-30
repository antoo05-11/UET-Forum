import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function UserProfile() {
    const loginInfo = useSelector((state) => state.loginInfo);
    const params = useParams();
    const [role, setRole] = useState("");
    const [name, setName] = useState("");
    const [posts, setPosts] = useState([]);
    const [answers, setAnswers] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5050/api/user/view`,{
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        }
        )
            .then((response) => {
                console.log(response)
                setRole(response.data.user.role)
                setName(response.data.user.username)
                setPosts(response.data.posts)
                setAnswers(response.data.answers)
            })
    }, [])
    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-md-1">
                </div>
                <div className="col-md-10">
                    <div className="d-flex flex-column justify-content-center" style={{ "display": "flex", "alignItems": "center" }}>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" style={{ "width": "100px", "height": "100px", "border": "1px solid black", "border-radius": "50%" }} />
                        <h2>{name}</h2>
                        <h3>Role: {role}</h3>
                    </div>

                    <div class="row">
                    <div class="col-md-6 px-4">
                        <div class="container-fulid" style={{ height: "300px" }}>
                            <div class="container-fulid bg-secondary rounded-top py-1 pl-3">
                               
                                    <h3 class="text-white">
                                        Post
                                    </h3>
                                
                            </div>

                            <div class="container-fluid h-100 border px-0" style={{ "overflow-y": "scroll" }}>
                                <ul style={{ "list-style-type": "none", "padding": "0px" }}>
                                    {posts.map((post) =>
                                        <li>
                                            <Link to={`p/${post.id}`}>
                                                <div class="container-fluid border py-1">
                                                    <p class="text-dark">
                                                        {post.title}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                            </div>

                        </div>
                    </div>

                    <div class="col-md-6 px-4 pt-0">
                        <div class="container-fulid" style={{ height: "300px" }}>
                            <div class="container-fulid bg-secondary rounded-top py-1 pl-3">
                               
                                    <h3 class="text-white">
                                        Reply
                                    </h3>
                                
                            </div>

                            <div class="container-fluid h-100 border px-0" style={{ "overflow-y": "scroll" }}>
                                <ul style={{ "list-style-type": "none", "padding": "0px" }}>
                                    {answers.map((answer) => 
                                        <li>
                                            <Link to={`p/${answer.postID}`}>
                                                <div class="container-fluid border py-1">
                                                    <p class="text-dark">
                                                        {answer.title}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    )}
                                </ul>

                            </div>

                        </div>
                    </div>
                    </div>


                    
                </div>

                <div className="col-md-1">

                </div>
            </div>
        </div>

    )
}