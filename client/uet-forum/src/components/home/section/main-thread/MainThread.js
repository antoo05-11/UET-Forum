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
        <Link to={`mt/${props.id}`}>{props.title}</Link>
        <br/>
        {childThreadList.map((childThread) =>
            <>
                <Link to={`st/${childThread._id}`}>{childThread.title}</Link>
                <br />
            </>
            )}
        </div>
        
        
    )
}