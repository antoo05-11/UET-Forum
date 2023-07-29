import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import CreateAnswer from "./create-answer/CreateAnswer";
import Answer from "./answer/Answer";

export default function Post() {
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [answers, setAnswers] = useState([]);
    const params = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5050/api/post/${params.threadID}`)
        .then((res) => {
            // console.log(res.data);
            setAuthor(res.data.post.authorName);
            setTitle(res.data.post.title);
            setContent(res.data.post.content);
            setAnswers(res.data.fullAns);
            // console.log(answers);
        })
    }, [])
    return (
        <>
        <h1>Author: {author}</h1>
        <h1>Title: {title}</h1>
        <h2>Content: {content}</h2>
        {answers.map((answer) => 
           <Answer author={answer.authorName} content={answer.content} />
        )}
        <CreateAnswer />
        </>
        
    )
}