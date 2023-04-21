// module import -> npm install http-proxy-middleware
// src/setupProxy.js
const { createProxyMiddleware } = require("http-proxy-middleware");
// const {API_BASE_URL} = require("./app-config");

// src/setupProxy.js
module.exports = function (app) {

    let target;
    if (process.env.HOSTNAME ==='localhost') {
        target = 'http://localhost:8080';
    } else {
        target = "http://kms-aws-practice.ap-northeast-2.elasticbeanstalk.com/";
    }

    app.use(
        createProxyMiddleware('/todo', {
            // target: "http://localhost:8080", // 배포 서버 URL 설정
            // target: "http://kms-aws-practice.ap-northeast-2.elasticbeanstalk.com/", // 로컬 서버 URL 설정
            target,
            changeOrigin: true,
        })
    );

    app.use(
        createProxyMiddleware('/auth', {
            // target: "http://localhost:8080", // 배포 서버 URL 설정
            // target: "http://kms-aws-practice.ap-northeast-2.elasticbeanstalk.com/", // 로컬 서버 URL 설정
            target,
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
