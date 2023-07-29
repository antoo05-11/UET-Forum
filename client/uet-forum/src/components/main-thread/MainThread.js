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
        <>
            <h1>{title}</h1>
            <br/>
        {childThreadList.map((childThread) =>
            <>
                <h2><Link to={`/st/${childThread._id}`}>{childThread.title}</Link></h2>
                <br />
            </>
            )}
        </>
    )
}