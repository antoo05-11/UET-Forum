import { useParams } from "react-router-dom"

export default function MainThread() {
    const params = useParams();
    return (
        <h1>
            MainThread {params.threadID}
        </h1>
    )
}