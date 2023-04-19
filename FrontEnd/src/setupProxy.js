// module import -> npm install http-proxy-middleware
// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");

// src/setupProxy.js
module.exports = function (app) {

    app.use(
        createProxyMiddleware('/todo', {
            // target: "http://springboot:8080", // 배포 서버 URL 설정
            target: "http://localhost:8080/", // 로컬 서버 URL 설정
            changeOrigin: true,
        })
    );

    app.use(
        createProxyMiddleware('/auth', {
            // target: "http://springboot:8080", // 배포 서버 URL 설정
            target: "http://localhost:8080/", // 로컬 서버 URL 설정
            changeOrigin: true,
        })
    );

};

/*
module.exports = function(app) {
    app.use(
        '/board',
        createProxyMiddleware({
            target: 'http://localhost:8080/board',
            changeOrigin: true,
        })
    );
};*/
