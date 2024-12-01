import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const FormLogin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.username === "" || user.password === "") {
            toast.error("Username dan Password Tidak Boleh Kosong!");
            return;
        } else if (user.password.length !== 5 || user.username !== "El" || user.password !== "12060") {
            toast.error("Username harus El dan Password harus sama dengan 12060!");
            return;
        } else {
            const newUser = {
                ...user,
                loginAt: new Date(),
            };
            localStorage.setItem("user", JSON.stringify(newUser));
            toast.success("Login berhasil!");
            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); 
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "auto" }}>
            <Alert variant="info">
                <strong>Info:</strong> Username harus dengan nama depan dan password harus 5 digit NPM
            </Alert>
            <FloatingLabel controlId="floatingInput" label="Username" className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="username"
                    name="username"
                    onChange={handleChange}
                />
            </FloatingLabel>
            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    onChange={handleChange}
                    autoComplete="off"
                />
                <Button
                    variant="link"
                    onClick={togglePasswordVisibility}
                    style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#808080" 
                    }}
                >
                    {showPassword ? <AiFillEye size={20} /> : <AiFillEyeInvisible size={20} />}
                </Button>
            </FloatingLabel>
            <Button variant="primary" type="submit" className="mt-3 w-100">
                Login
            </Button>
        </form>
    );
};

export default FormLogin;
