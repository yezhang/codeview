const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


var prjDir = path.resolve(__dirname, "..");

var config = {
    "target": "electron-main",
    "mode": "development",
    "devtool": "inline-source-map",
    "module": {
        "rules": [{
                "test": /\.tsx?$/,
                "exclude": /node_modules/,
                "use": {
                    "loader": "ts-loader",
                    "options": {
                        "transpileOnly": true
                    }
                }
            },
        ]
    }
};

var mainOutputPath = prjDir + '/out/main';

var mainConfig = Object.assign({}, config, {
    name: "mainConfig",
    entry: prjDir + "/src/main/index.ts",
    output: {
        "path": mainOutputPath,
        "filename": "[name].[chunkhash:8].js"
    },
    devServer: {
        contentBase: mainOutputPath,
        port: 8000
    },
    plugins: [
    ],
});

// 返回数组
module.exports = [
    mainConfig,
];