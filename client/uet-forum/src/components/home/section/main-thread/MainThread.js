import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function MainThread(props) {
    const [childThreadList, setChildThreadList] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:5050/api/thread/${props.id}`)
            .then((res) => {
                setChildThreadList(res.data.children);
            })
    }, [])
    return (
        <div class="col-md-6 px-4 pt-3">
            <div class="container-fulid" style={{ height: "300px" }}>
                <div class="container-fulid bg-secondary rounded-top py-1 pl-3">
                    <Link to={`mt/${props.id}`}>
                        <h3 class="text-white">
                            {props.title}
                        </h3>
                    </Link>
                </div>

                <div class="container-fluid h-100 border px-0" style={{ "overflow-y": "scroll" }}>
                    <ul style={{"list-style-type": "none", "padding": "0px"}}>
                        {childThreadList.map((childThread) =>
                            <li>
                                <Link to={`st/${childThread._id}`}>
                                    <div class="container-fluid border py-1">
                                        <p class="text-dark">
                                            {childThread.title}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        )}
                    </ul>

                </div>

            </div>
        </div>


    )
}