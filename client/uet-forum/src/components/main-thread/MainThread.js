import { useParams } from "react-router-dom"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



export default function MainThread() {
    const params = useParams();
    const [childThreadList, setChildThreadList] = useState([]);
    const [title, setTitle] = useState("");
    useEffect(() => {
        axios.get(`http://localhost:5050/api/thread/${params.threadID}`)
            .then((res) => {
                console.log(res.data);
                setChildThreadList(res.data.children);
                setTitle(res.data.thread.title)
            })
    }, [])

    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-2"></div>
                <div class="col-8">
                    <h3 className="mt-4">{title}</h3>
                    <br />
                    <ul style={{"list-style-type": "none"}}>
                        {childThreadList.map((childThread) =>
                            <li>
                                <div class="container-fluid border" style={{"height" : "80px"}}>
                                    <div class="row h-100">
                                        <div class="col-md-7 border" style={{"display": "flex", "flex-direction": "row", "alignItems": "center"}}>
                                            <Link to={`/st/${childThread._id}`} style={{"font-size": "25px"}}>{childThread.title}</Link>
                                        </div>
                                        <div class="col-md-2 border" style={{"display": "flex", "flex-direction": "row", "alignItems": "center"}}>
                                            <p>Threads: {childThread.children.length}</p>
                                        </div>
                                        <div class="col-md-3 border" style={{"display": "flex", "flex-direction": "row", "alignItems": "center"}}>
                                            <p>Last update: {childThread.lastUpdated}</p>
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
    )
}