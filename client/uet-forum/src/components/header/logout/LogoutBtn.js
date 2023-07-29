export default function LogoutBtn() {
    function handleOnclick() {
        window.localStorage.removeItem("token");
        window.location.reload();
    }


    return (
        <button onClick={handleOnclick}
            type="button"
            class="btn btn-primary btn-block mr-2"
        >
            Logout
        </button>
    )
}