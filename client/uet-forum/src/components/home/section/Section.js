import MainThread from "./main-thread/MainThread"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";


export default function Content() {
    const [mainThreadList, setMainThreadList] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5050/api/thread/').then((res) => {
            setMainThreadList(res.data);
        })
    }, [])
    return (
        <div class="container-fluid ">
            <div class="row">
                <div class="col-md-1"></div>
                <div class="col-md-10">
                    <div class="row">
                        {
                            mainThreadList.map((mainThread) => (
                                <MainThread title={mainThread.title} id={mainThread._id} />
                            ))
                        }
                    </div>
                </div>
                <div class="col-md-1"></div>

            </div>
        </div>
    )
}