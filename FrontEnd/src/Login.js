import React, {useEffect, useState} from "react";
import axios from "axios";
import instance from "./Interceptor/axiosInterceptor";
import {Button, Container, Grid, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";


export default function Login() {

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");

        console.log(username);
        console.log(password);

        instance.post("/auth/signin", {
            username: username,
            password: password
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem("ACCESS_TOKEN", response.data.token);
                // token이 존재하는 경우 Todo화면으로 리디릭트
                window.location.href = "/";
            }
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <Container component="main" maxWidth="xs" style={{marginTop: "8%"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h5">
                        로그인
                    </Typography>
                    <br/>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                {" "}
                {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="username"
                            label="이메일 주소"
                            name="username"
                            autoComplete="username"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="패스워드"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                        >
                            로그인
                        </Button>
                    </Grid>
                    <Grid item>
                        <Link to ="/signup" variant={"body2"}>
                            계정이 없습니까? 여기서 가입하세요
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}