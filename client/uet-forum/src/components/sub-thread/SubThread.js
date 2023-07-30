import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsPencilSquare } from "react-icons/bs";
import { useSelector} from "react-redux";
import { UseSelector } from "react-redux";

export function CreatePostModal(props) {

    function handleTitleOnChange(e) {
        setTitle(e.target.value);
    }

    function handleContentOnChange(e) {
        setContent(e.target.value);
    }

    function post() {

        const data = {
            "rootID": props.rootID,
            "title": title,
            "content": content
        }
        console.log(data);
        console.log(`Bearer ${window.localStorage.getItem("token")}`);
        axios.post("http://localhost:5050/api/post/create", data, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            window.location.reload();
        })
        .catch((error) => {
            console.log("ERROR");
        })
    }

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    
    return (
        
        <div class="modal" id="createPostModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">New post</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label>title</label>
                            <br/>
                            <input type="text" onChange={handleTitleOnChange}></input>
                            <br/>
                            <label>content</label>
                            <textarea cols="60" rows="10" onChange={handleContentOnChange}/>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={post}>Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function SubThread() {
    const params = useParams();
    const [childPostList, setChildPostList] = useState([])
    const [title, setTitle] = useState("")
    const isLoggedIn = useSelector(state => state.loginInfo.logged);
    
    useEffect(() => {
        console.log(isLoggedIn)
        axios.get(`http://localhost:5050/api/thread/${params.threadID}`)
            .then((res) => {
                console.log(res.data);
                setChildPostList(res.data.children);
                setTitle(res.data.thread.title);
            })
    }, [])
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <div class="row d-flex justify-content-between">
                        <h3>{title} </h3>
                        <h3
                            data-toggle="modal"
                            data-target= {isLoggedIn ? "#createPostModal" : "#loginModal"}
                        >
                            <BsPencilSquare />
                        </h3>
                        <CreatePostModal rootID={params.threadID}/>
                    </div>
                    <ul style={{ "list-style-type": "none" }}>
                        {childPostList.map((childPost) =>
                            <li>
                                <div class="container-fluid border" style={{ "height": "80px" }}>
                                    <div class="row h-100">
                                        <div class="col-md-1 border">
                                            <p>userInfo</p>
                                        </div>
                                        <div class="col-md-7 border">
                                            <Link to={`/p/${childPost._id}`}>{childPost.title}</Link>
                                        </div>
                                        <div class="col-md-2 border">
                                            <p>info</p>
                                        </div>
                                        <div class="col-md-2 border">
                                            <p>last activity</p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )}
                    </ul>

                </div>
                <div class="col-2"></div>
            </div>
        </div>
    );
}