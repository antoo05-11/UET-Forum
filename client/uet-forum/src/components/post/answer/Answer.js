import { Link } from "react-router-dom" 
export default function Answer(props) {
    return (
        <div class="container-fulid">
            <div class="row mt-4">
                <div class="col-md-2 bg-secondary" style={{"display": "flex", "flex-direction": "column", "alignItems": "center", "justifyContent": "center"}}>
                <img src={`https://uet-forum.000webhostapp.com/imageResource/avatar/${props.id}.jpg`} style={{"width": "70px", "height": "70px", "border" : "1px solid black", "border-radius": "50%"}} />
                    <p><Link className="text-white" to = {`/user/${props.id}`}>{props.author}
                    </Link></p>
                </div>
                <div class="col-md-9 border">
                    <p>{props.time}</p>
                    <h1></h1>
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    )
}