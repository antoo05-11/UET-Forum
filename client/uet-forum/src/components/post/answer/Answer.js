export default function Answer(props) {
    return (
        <div class="container-fulid">
            <div class="row mt-4">
                <div class="col-md-2 bg-secondary">
                    <p>{props.author}</p>
                </div>
                <div class="col-md-10 border">
                    <p>29/07/2023</p>
                    <h1></h1>
                    <p>{props.content}</p>
                </div>
            </div>
        </div>
    )
}