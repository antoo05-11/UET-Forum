import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import CreateAnswer from "./create-answer/CreateAnswer";
import Answer from "./answer/Answer";
import { Link } from "react-router-dom";
export default function Post() {
    const [author, setAuthor] = useState("");
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
            })
    }, [])
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-2"></div>
                <div class="col-md-8">
                    <div class="container-fulid">
                        <div class="row mt-5">
                            <div class="col-md-2 bg-secondary">
                                <p><Link to = {`/user/${authorId}`} >{author}</Link></p>
                            </div>
                            <div class="col-md-10 border">
                                <p>{time.split('T')[0]}</p>
                                <h1>{title}</h1>
                                <p>{content}</p>
                            </div>
                        </div>
                    </div>
                    {answers.map((answer) => 
                        <Answer author={answer.authorName} content={answer.content} id = {answer.author} time = {answer.lastUpdated.split('T')[0]} />
                    )}
                    <CreateAnswer />
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>

    )
}