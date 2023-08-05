import { useState } from "react";
import axios from "axios";

export default function CreateAnswer(props) {
    const [content, setContent] = useState("")
    function handleAnswer(e) {
        setContent(e.target.value)   
        console.log(props)
    }
    function handleClick() {
        const data = {
            postID: props.id,
            content: content
            
        }
       
        axios
        .post(`http://localhost:5050/api/post/${props.id}/answer`,data, {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            console.log("Successfully");
            console.log(res);
        }).catch((err) => {
            console.log(err);
            console.log(props.id)
        })
    }
    return(
            <form>
            <div class="form-group mt-4">
               <input type="text" id = "answer" class="form-control" placeholder="Answer" value = {content} onChange ={handleAnswer} style={{"width": "800px"}}/>
               <button class="btn btn-primary mt-2" onClick={handleClick}>Post</button>
            </div>
         </form>
        
    )
}