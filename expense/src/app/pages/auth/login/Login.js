import React, { useContext, useState } from "react";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    Link,
    Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import api from "../../../service/api";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUserData } = useContext(AuthContext)
    const navigate = useNavigate()
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password })
            const data = response?.data
            if (data) {
                console.log(data?.data);
                localStorage.setItem("Auth", JSON.stringify(data?.data))
                setUserData && setUserData(data?.data)
                navigate("/dashboard")
            }
        } catch (err) {
            debugger
            toast.error(err?.response?.data?.error?.message || "Something went wrong!")
            console.log(err?.message);
            console.log(err?.response?.data);
        }
    };

    return (
        <Box
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "linear-gradient(to right, #6a11cb, #2575fc)",
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    maxWidth: 400,
                    width: "100%",
                    borderRadius: 3,
                    textAlign: "center",
                }}
            >
                <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5" fontWeight="bold" mb={2}>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ mt: 2, py: 1.2, fontSize: "1rem" }}
                    >
                        Login
                    </Button>
                </form>
                <Typography variant="body2" sx={{ mt: 3 }}>
                    Don't have an account?{" "}
                    <Link href="/register" underline="hover">
                        Sign up
                    </Link>
                </Typography>
            </Paper>
        </Box>
    );
};

export default LoginPage;
