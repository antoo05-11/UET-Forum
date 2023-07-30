import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import CreateAnswer from "./create-answer/CreateAnswer";
import Answer from "./answer/Answer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi"

export function Check(props) {
    const navigation = useNavigate();
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);

    function handleTitleOnChange(e) {
        setTitle(e.target.value);
    }

    function handleContentOnChange(e) {
        setContent(e.target.value);
    }

    function edit() {
        console.log("edit");
        const data = {
            "title": title,
            "content": content
        }
        axios.put(`http://localhost:5050/api/post/${props.postId}/edit`, data, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                console.log("alsdkfjads");
                window.location.reload();
            })
            .catch(() => {
                console.log("error");
            })
    }

    function deletePost() {
        console.log(`http://localhost:5050/api/post/${props.postId}/close`);
        axios.put(`http://localhost:5050/api/post/${props.postId}/close`, {}, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                navigation('/');
            })

    }

    const loginInfo = useSelector((state) => state.loginInfo);
    if (loginInfo.userId == props.authorId) {
        return (
            <div>
                <p class="dropdown-toggle"

                    id="dropdownMenuButton" data-toggle="dropdown">
                    <PiDotsThreeOutlineVerticalFill />
                </p>
                <div class="dropdown-menu">
                    <p class="dropdown-item" data-toggle="modal" data-target="#editPostModal">Edit</p>
                    <p class="dropdown-item" onClick={deletePost}>Delete</p>
                </div>
                {/* --------------------------------------------------------------------------------------------- */}
                <div class="modal" id="editPostModal">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">Edit Post</h4>
                                <button type="button" class="close" data-dismiss="modal">
                                    &times;
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <label for="myEmail">Title</label>
                                    <input
                                        type="text"
                                        id="myUserName"
                                        class="form-control"
                                        value={title}
                                        onChange={handleTitleOnChange}

                                    />
                                    <label for="myPassword">Content</label>
                                    <textarea
                                        rows={10}
                                        id="myPassword"
                                        class="form-control"
                                        value={content}
                                        onChange={handleContentOnChange}

                                    />
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button
                                    type="button"
                                    class="btn btn-success"
                                    data-dismiss="modal"
                                    onClick={edit}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default function Post() {
    const [author, setAuthor] = useState("");
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [answers, setAnswers] = useState([]);
    const [authorId, setAuthorId] = useState("");
    const [time, setTime] = useState("");
    const params = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5050/api/post/${params.threadID}`)
            .then((res) => {
                setAuthor(res.data.post.authorName);
                setTitle(res.data.post.title);
                setContent(res.data.post.content);
                setAnswers(res.data.fullAns);
                setAuthorId(res.data.post.author);
                setTime(res.data.post.dateTime);
                setId(res.data.post._id)
            })
    }, [])



    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="container-fulid">
                        <div class="row mt-5">
                            <div class="col-md-2 bg-secondary" style={{"display": "flex", "flex-direction": "column", "alignItems": "center", "justifyContent": "center"}}>
                            <img src={`https://uet-forum.000webhostapp.com/imageResource/avatar/${authorId}.jpg`} style={{"width": "70px", "height": "70px", "border" : "1px solid black", "border-radius": "50%"}} />
                                <p><Link className="text-white" to={`/user/${authorId}`} >{author}</Link></p>
                            </div>
                            <div class="col-md-9 border">
                                <p>{time.split('T')[0]}</p>
                                <h1>{title}</h1>
                                <p>{content}</p>
                                
                            </div>
                            <div class="col-md-1">
                            <Check authorId={authorId} title={title} content={content} postId={params.threadID} />
                            </div>
                        </div>
                    </div>
                    {answers.map((answer) =>
                        <Answer author={answer.authorName} content={answer.content} id={answer.author} time={answer.lastUpdated.split('T')[0]} />
                    )}
                    <CreateAnswer id={id} />
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>

    )
}