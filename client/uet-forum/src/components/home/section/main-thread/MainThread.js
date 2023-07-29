import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MainThread(props) {
    const [childThreadList, setChildThreadList] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5050/api/thread/${props.id}`)
            .then((res) => {
                setChildThreadList(res.data.children);
            })
    })
    return (
        <div class="col-md-6 border">
        <h1><Link to={`mt/${props.id}`}>{props.title}</Link></h1>
        <br/>
        {childThreadList.map((childThread) =>
            <>
                <h2><Link to={`st/${childThread._id}`}>{childThread.title}</Link></h2>
                <br />
            </>
            )}
        </div>
        
        
    )
}