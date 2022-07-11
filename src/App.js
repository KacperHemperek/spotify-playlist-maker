import { useEffect } from "react";

function App() {
    const client_id = "71a0250dc8674aa0b6d49ec82695bfab";
    const redirect = "http://localhost:3000";
    const auth = "https://accounts.spotify.com/authorize";
    const type = "token";

    

    return (
        <div className="App text-center ">
            <a
                className="btn btn-primary btn-lg"
                href={`${auth}?response_type=${type}&client_id=${client_id}&redirect_uri=${redirect}`}
            >
                Log in
            </a>
        </div>
    );
}

export default App;
