import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import CreateAnswer from "./create-answer/CreateAnswer";

export default function Post() {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [answers, setAnswers] = useState([]);
    const params = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5050/api/post/${params.threadID}`)
        .then((res) => {
            setAuthor(res.data.post.authorID);
            // axios.get(`http://localhost:5050/api`)
            setTitle(res.data.post.title);
            setContent(res.data.post.content);
            setAnswers(res.data.answers);
            console.log(answers);
        })
    }, [])
    return (
        <>
        <h1>Author: {author}</h1>
        <h1>Title: {title}</h1>
        <h2>Content: {content}</h2>
        {answers.map((answer) => 
            <h3>Answer: {answer.content}</h3>
        )}
        <CreateAnswer />
        </>
        
    )
}