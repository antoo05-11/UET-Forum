import { Link } from "react-router-dom" 
export default function Answer(props) {
    return (
        <div class="container-fulid">
            <div class="row mt-4">
                <div class="col-md-2 bg-secondary">
                    <p><Link to = {`/user/${props.id}`}>{props.author}
                    </Link></p>
                </div>
                <div class="col-md-10 border">
                    <p>{props.time}</p>
                    <h1></h1>
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    )
}