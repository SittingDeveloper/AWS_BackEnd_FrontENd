import axios from 'axios';

const ACCESS_TOKEN = "ACCESS_TOKEN";

const instance = axios.create({
    timeout: 2000
})

// 로컬 스토리지에서 ACCESS TOKEN 가져오기
const accessToken = localStorage.getItem(ACCESS_TOKEN);
if (accessToken && accessToken !== null) {
    instance.defaults.headers.common[
        "Authorization"
        ] = `Bearer ${accessToken}`;
}

instance.interceptors.response.use(
    (response) => {
        console.log(response.data);
        return response;
    },
    (error) => {
        console.log(error.response.status);
        if (error.response.status === 403) {
            window.location.href = "/login"; // redirect
        }
        return Promise.reject(error);
    }
);

export default instance;