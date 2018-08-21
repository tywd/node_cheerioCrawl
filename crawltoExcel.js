// 加载http模块
var http = require('http');
// Cheerio 是一个Node.js的库， 它可以从html的片断中构建DOM结构，然后提供像jquery一样的css选择器查询
var cheerio = require('cheerio');

var fs = require("fs");//引入文件读写的模块
var xlsx = require("node-xlsx");//引入要用于导出excel的模块
// 定义网络爬虫的目标地址：自如友家的主页
var url = 'http://www.ziroom.com/';
//数据导出到excel的格式
var obj = [
    {
        name:'firstSheet',
        data:[
            [
                '图片跳转链接','新闻图片描述','图片链接'
            ]
        ]
    },
];
http.get(url, function(res) {
    var html = '';
    // 获取页面数据
    res.on('data', function(data) {
        html += data;
    });
    // 数据获取结束
    res.on('end', function() {
        // 通过过滤页面信息获取实际需求的轮播图信息
        var slideListData = filterSlideList(html);
        // console.log(slideListData);
        // 将返回来的数据和要导出的obj的excel格式的数组连接起来
        obj[0].data.concat(slideListData); 
        console.log(obj);
        //调用写出文件的方法
        writeFile(obj);
    });
}).on('error', function() {
    console.log('获取数据出错！');
});

/* 过滤页面信息 */
function filterSlideList(html) {
    if (html) {
        // 沿用JQuery风格，定义$
        var $ = cheerio.load(html);
        // 根据id获取轮播图列表信息
        var slideList = $('#foucsSlideList');
        // 轮播图数据
        var slideListData = obj[0].data;

        /* 轮播图列表信息遍历 */
        slideList.find('li').each(function(item) {
            //console.log($(this).find('a').attr('href'));
            var pic = $(this);
            // 找到a标签并获取href属性
            var pic_href = pic.find('a').attr('href');
            // 找到a标签的子标签img并获取_src
            var pic_src = pic.find('a').children('img').attr('_src');
            // 找到a标签的子标签img并获取alt
            var pic_message = pic.find('a').children('img').attr('alt');
            // 向数组插入数据
            var listArr = [pic_href,pic_message,pic_src];
            //将遍历回来的每条数据都push进listArr
            slideListData.push(listArr);
        });
        // 返回轮播图列表信息
        return slideListData;
    } else {
        console.log('无数据传入！');
    }
}

//写出文件到excel的方法
function writeFile(params){
    fs.writeFileSync('crawltoExcel.xlsx',xlsx.build(params),'binary');
}