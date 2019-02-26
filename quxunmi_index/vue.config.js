const webpack = require("webpack")

module.exports = {
    lintOnSave: false,
    baseUrl: "./",
    devServer: {
        proxy: {
            "/line": {
                target: "http://47.104.193.28:8080", //代理地址
                changeOrigin: true, //代理跨域
                ws: true,
                pathRewrite: {
                    "^/line": ""
                },

            },

        }
    },
}
