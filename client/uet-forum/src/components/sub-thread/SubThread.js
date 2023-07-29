import { useParams } from "react-router-dom";

export default function SubThread() {
    const params = useParams();
    return (
        <h1>SubThread {params.threadID}</h1>
    ); 
}