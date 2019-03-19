# 项目简介

JS 代码可视化工具。
可以绘制函数调用图、时序图、对象图。

## 技术方案

Electron  
d3.js  
React  

## 目录结构

build：存放构建脚本
dist：程序打包（DMG、exe）后目录
out：JS 编译输出目录，主进程、渲染进程都在 out 下分别输出为不同的子目录。

## 开发环境配置

webpack：https://webpack.docschina.org/configuration/target/

webpack 配置文件生成：https://generatewebpackconfig.netlify.com

项目根目录下的 package.json 文件中，启动 electron 程序的脚本要指向 js 编译输出目录（out目录）。

配置过程参考：https://juejin.im/entry/5a4bbbd66fb9a04525787f66


启动开发环境

1. 启动渲染进程：npm run watch:renderer
1. 启动主进程：npm run start:main
主进程也可以通过 VS Code 直接启动。


__webpack配置文件__

开发


生产

html-webpack-plugin
MiniCssExtractPlugin

## 里程碑

**milestone** 双击新建文本，tab 按键创建孩子文本节点。
