# nodejs

#### 项目介绍
nodejs简易爬取新浪体育的新闻数据 新浪体育地址：http://sports.sina.com.cn/

#### 软件架构
软件架构说明


#### 安装教程

1. 首先要有安装node环境
2. 创建一个文件夹包含要准备爬取数据的js文件
3. 用cmd进入到该文件夹,然后npm install cheerio（也可以先转用淘宝镜像npm install -g cnpm -registry=https://registry.npm.taobao.org，然后用cnpm install cheerio） cheerio是一个简化的jQuery库，可以让你操作DOM事半功倍。
4. 准备完毕则直接进入js文件写业务逻辑

#### 使用说明

1. var cheerio = require('cheerio');//引入下好的模块
2. 这里文件我没有把install 下来的 node_modules包push上来，众所周知，这包太大了，所以就自己下拉去npm install吧
3. 写完代码逻辑，去到cmd，进行node 你的文件名.js (例如：node crawl.js),就可以看到爬下来的数据了

#### 项目说明

1. 自己想做项目，但是对于数据太少，开始对于node爬虫爬取数据感兴趣，由于刚开始，爬取的数据比较粗略，后续会继续更新，请继续关注!
2. 导出excel 
![导出excel表格](https://images.gitee.com/uploads/images/2018/0821/191410_276b483b_1022787.jpeg "1534849938(1).jpg")


#### node执行错误记录

报错信息
`FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory`

解除执行报错
`node --max-old-space-size=8192 your_script.js`