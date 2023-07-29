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
                setAuthor(res.data.post.authorName);
                setTitle(res.data.post.title);
                setContent(res.data.post.content);
                setAnswers(res.data.fullAns);
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
                                <p>{author}</p>
                            </div>
                            <div class="col-md-10 border">
                                <p>29/07/2023</p>
                                <h1>{title}</h1>
                                <p>{content}</p>
                            </div>
                        </div>
                    </div>
                    {answers.map((answer) => 
                        <Answer author={answer.authorName} content={answer.content} />
                    )}
                    <CreateAnswer />
                </div>
                <div class="col-md-2"></div>
            </div>
        </div>

    )
}