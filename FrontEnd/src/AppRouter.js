import {Box, Typography} from "@mui/material";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./Login";
import App from "./App";
import SignUp from "./SignUp";

function Copyright () {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright "}
            fsoftwareengineer, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

function AppRouter () {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element = {<App />} />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/signup"} element={<SignUp />} />
                </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    )
}

export default AppRouter;