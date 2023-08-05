import { useEffect, useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";

export default function Ranking() {
    const [rankingList, setRankingList] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5050/api/rank")
        .then((res) => {
            setRankingList(res.data);
        })
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">

                </div>
                <div className="col-md-8">
                    <h2>Ranking</h2>
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Reputation</th>
                                <th>Post number</th>
                                <th>Answer number</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankingList.map((user, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>
                                        <Link to={`/user/${user.userID}`}>{user.name}</Link>
                                    </td>
                                    <td>{user.reputation}</td>
                                    <td>{user.postsNum}</td>
                                    <td>{user.ansNum}</td>
                                    <td>{user.total}</td>
                                </tr>
                            ))}
                            
                        </tbody>
                    </table>
                </div>
                <div className="col-md-2">

                </div>
            </div>
        </div>
    )
}