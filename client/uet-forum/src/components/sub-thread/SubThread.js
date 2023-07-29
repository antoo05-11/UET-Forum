import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function SubThread() {
    const params = useParams();
    const [childPostList, setChildPostList] = useState([])
    const [title, setTitle] = useState("")

    useEffect(() => {
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
                    <h3>{title}</h3>
                    <br />
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