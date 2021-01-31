const path = require("path");

module.exports = {
    entry: {
        "sume.min": "./src/index.js"
    },
    devtool: "source-map",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js"
    },
    optimization: {
        minimize: true,
        moduleIds: "size"
    }
};
