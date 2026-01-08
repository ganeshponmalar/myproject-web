import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

  
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle input change
    const handleChange = (e) => {
        setFormData({
            ...formData,   //Copies existing values so they are not erased.
            [e.target.name]: e.target.value,//Dynamically selects field
        });
    };


    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch(
                "http://localhost:5000/api/users/reg",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // IMPORTANT (cookie)
                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();
        
            if (!res.ok) {
                throw new Error(data.message || "Registration failed");
            }

            //  Registration success
            alert("Registration successful");
            navigate("/login");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>

                {error && <p className="error">{error}</p>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>

                <p className="login-link">
                    Already have an account?{" "}
                    <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Register;
