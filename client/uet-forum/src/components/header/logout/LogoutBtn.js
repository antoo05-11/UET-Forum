export default function LogoutBtn() {
    function handleOnclick() {
        window.localStorage.removeItem("token");
        window.location.reload();
    }


    return (
        <p onClick={handleOnclick}
        >
            Logout
        </p>
    )
}