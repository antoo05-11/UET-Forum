export default function Header() {
    return (
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-10">
                </div>
                <div class="col-sm-2 d-flex justify-content-around">

                    <button type="button" class="btn btn-primary btn-block mr-2" data-toggle="modal" data-target="#loginModal">
                        Login
                    </button>


                    <div class="modal" id="loginModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Login</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                <form>
                                    <label for="myEmail">Email</label>
                                    <input type="email" id = "myEmail" class="form-control" placeholder="Email"></input>
                                    <label for="myPassword">Password</label>
                                    <input type="password" id="myPassword" class="form-control" placeholder="Password"></input>

                                </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" data-dismiss="modal">Login</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="button" class="btn btn-primary btn-block" data-toggle="modal" data-target="#registerModal">
                        Register
                    </button>


                    <div class="modal" id="registerModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h4 class="modal-title">Register</h4>
                                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                                </div>
                                <div class="modal-body">
                                    Modal body..
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}