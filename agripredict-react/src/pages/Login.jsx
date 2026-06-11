import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {

    e.preventDefault();

    const response = await fetch(
        "http://127.0.0.1:5000/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }
    );

    const result = await response.json();

    if(result.success){

        localStorage.setItem(
            "user",
            result.name
        );

        navigate("/dashboard");

    } else {

        alert(
            "Invalid Email or Password"
        );

    }
};

    return (
        <div style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#f0fdf4"
        }}>

            <div style={{
                background: "white",
                padding: "30px",
                width: "350px",
                borderRadius: "10px",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)"
            }}>

                <h1 style={{textAlign:"center"}}>
                    AgriPredict
                </h1>

                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        style={{
                            width:"100%",
                            padding:"10px",
                            marginBottom:"15px"
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        style={{
                            width:"100%",
                            padding:"10px",
                            marginBottom:"15px"
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            width:"100%",
                            padding:"10px",
                            background:"green",
                            color:"white",
                            border:"none"
                        }}
                    >
                        Login
                    </button>
                    <p
                        style={{
                        textAlign: "center",
                        marginTop: "15px"
                        }}
                    >
                        Don't have an account?

                        <Link to="/register">
                            Register
                        </Link>
                    </p>

                </form>

            </div>

        </div>
    );
}

export default Login;