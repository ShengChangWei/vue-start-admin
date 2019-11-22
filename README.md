# vue-start-admin

## 项目介绍

```shell
vue 前端起步项目框架
```


## 全局环境

```shell
node 10.14.1
npm 3.10.10
vue-cli3（注意）
```
## 技术栈

```shell
 * vue@2.6.6
 * vue-cli3
 * vuex
 * vue-router
 * axios
 * scss
 * element-ui
 * font-awesome
 * nprogress
```

## 实现功能
> 2019-04-09
```shell
1、根据用户的角色信息，获取对应权限菜单信息，动态加载路由及动态设置按钮权限
2、优化页面内容较多时，滚动条样式
3、集成ui设计字体图标
4、设置全局样式`index.scss`，以及项目整体主题颜色`variables.scss`
5、全屏显示效果
```
> 2019-04-10

```shell
1、使用express,mock请求后台数据登录，获取动态路由，以及退出功能。
2、路由跳转动画效果
3、基于element-ui的tree实现树节点的增加，编辑，删除等功能
```
> 2019-04-11

```shell
1、实现访问本地静态json数据，从而能够将项目部署到个人博客中
2、本地mock数据存在public/mock/中，mock数据需要使用get方式请求
```

> 2019-08-06

```shell
1、新建environments文件夹，添加environment.dev.js、environment.prod.js 管理开发环境和生成环境的配置
2、在services文件夹中，新建config.service.js文件引入生成环境和开发环境的变量。
3、新建utils文件夹存放通用的方法

```


## 请求代理
```shell
    在axios的baseURL路径中，判断是否为开发环境，如果是开发环境，在所有的请求路径中拼接`/api`,
    那么在开发环境中，以api开始的路径就会被`vue.config.js`中devServer中的路径替代
```
> vue.config.js

```javascript
    {
    publicPath: './',
    outputDir: 'dist',
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: 'assets',
    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: "index.html",
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://xxxxx',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};
```
> request.service.js

```javascript

import configService from './config.service'

let url = configService.domain;
// 创建一个axios
const request = axios.create({
    baseURL: url,
});

```

## 后端接口路由格式

```shell
    返回的是个数组，必须有name,icon,url及children(二级菜单)，children没有设置[] 即可
```
```javascript
[
        {
          name: "Example",
          url: "/home",
          icon: "fa fa-adjust",
          children: [
            {
              name: "table",
              url: "/table",
              icon: "fa fa-circle-o",
              children: []
            },
            {
            
              name: "progress",
              url: "/progress",
              icon: "fa fa-circle-o",
              children: []
            }
          ]
```

## 构建

```shell
npm install

npm start

npm run build
```


# License

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE)