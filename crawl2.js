var http = require('http');
var cheerio = require('cheerio');
var fs = require("fs");
var xlsx = require("node-xlsx");
var url = 'http://sports.sina.com.cn';
var obj = [
    {
        name:'firstSheet',
        data:[
            [
                'nerUrl','newSrc'
            ]
        ]
    },
];
// 数据格式 
// 提取网页的重要信息，我们可以定义数据格式：

http.get(url,(res) => {
    var html = '';

    res.on('data',(data) => {
        html+=data;

        // var a = filterList(html);
        // console.log(a);
    });
    res.on('end',() =>{
        const $ = cheerio.load(html);
        var listData = []
        $('#j_wrap_5 li.thumbnail-b-gra').each(function(){
            const newUrl = $(this).find('a').attr('href');
            const newSrc = $(this).find('a').find('img').attr('src');
            // console.log(newUrl,newSrc);
            listData.push({
                newUrl: newUrl,
                newSrc: newSrc,
            });
            var listArr = [newUrl,newSrc];
            obj[0].data.push(listArr);
        });
            console.log(obj);
            writeFile(obj);
    });
}).on('error',(e) =>{
    console.log('获取数据出错');
});

function writeFile(params){
    fs.writeFileSync('hello2.xlsx',xlsx.build(params),'binary');
}