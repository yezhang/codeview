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

项目根目录下的 package.json 文件中，启动 electron 程序的脚本要指向 js 编译输出目录（out目录）。

## 里程碑

**milestone** 双击新建文本，tab 按键创建孩子文本节点。
