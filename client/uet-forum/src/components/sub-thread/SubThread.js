import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function SubThread() {
    const params = useParams();
    const[childPostList, setChildPostList] = useState([])
    const [title, setTitle] = useState("")
    
    useEffect(() => {
        axios.get(`http://localhost:5050/api/thread/${params.threadID}`)
            .then((res) => {
                console.log(res.data);
                setChildPostList(res.data.children);
                setTitle(res.data.thread.title);
            })
        },[])
    return (
        <>
            <h1>{title}</h1>
            {childPostList.map((childPost) => 
                <h2><Link to = {`/p/${childPost._id}`}>{childPost.title}</Link></h2>
            )}
        </>
    ); 
}