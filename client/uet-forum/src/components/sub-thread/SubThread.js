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
    const [postList, setPostList] = useState([])
    const [title, setTitle] = useState("")
    const isLoggedIn = useSelector(state => state.loginInfo.logged);
    
    useEffect(() => {
        async function fetchData() {
            try {
                const res1 = await axios.get(`http://localhost:5050/api/thread/${params.threadID}`);
                setTitle(res1.data.thread.title);
                //res1 laays ra .children -> for loop
                const children = res1.data.children;
                let data = [];
                for(const post of children) {
                    const authorID = post.author;
                    const res2 = await axios.get(`http://localhost:5050/api/user/view/${authorID}`);
                    const element = {
                        postId: post._id,
                        userId: authorID,
                        username : res2.data.user.username,
                        title : post.title
                    }
                    console.log(element);
                    data.push(element);
                }
                setPostList(data);
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
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
                        {postList.map((post) =>
                            <li>
                                <div class="container-fluid border" style={{ "height": "80px" }}>
                                    <div class="row h-100">
                                        <div class="col-md-1 border d-flex">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png" style={{"width": "40px", "height": "40px", "border" : "1px solid black", "border-radius": "50%"}} />
                                            <Link to ={`/user/${post.userId}`}>{post.username}</Link>
                                        </div>
                                        <div class="col-md-7 border">
                                            <Link to={`/p/${post.postId}`}>{post.title}</Link>
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