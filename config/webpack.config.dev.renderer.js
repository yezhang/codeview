const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var prjDir = path.resolve(__dirname, "..");

var config = {
    "target": "electron-renderer",
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
            {
                "test": /\.css$/,
                "use": [
                    "style-loader",
                    "css-loader",
                    {
                        "loader": "postcss-loader",
                        "options": {
                            "ident": "postcss",
                            "plugins": (loader) => [require('postcss-import')(), require('postcss-cssnext')(), require('autoprefixer')(), require('cssnano')()]
                        }
                    }
                ]
            }
        ]
    }
};

var artboardSrc = prjDir + "/src/renderer/artboard";
var artboardOutputPath = prjDir + '/out/renderer/artboard';

var artboardConfig = Object.assign({}, config, {
    name: "artboardConfig",
    entry: artboardSrc + "/index.ts",
    output: {
        "path": artboardOutputPath,
        "filename": "[name].[chunkhash:8].js"
    },
    devServer: {
        contentBase: artboardOutputPath,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
          title: 'Development',
          template: artboardSrc + '/index.html'
        })
    ],
});

// 返回数组
module.exports = [
    artboardConfig,
];