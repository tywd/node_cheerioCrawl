var request, cheerio, xlsx, fs;
request = require('request');
cheerio = require('cheerio');
xlsx = require('node-xlsx');
fs = require('fs');
var url = 'http://wemedia.ifeng.com/33757248/wemedia.shtml';
// 数据格式 
// 提取网页的重要信息，我们可以定义数据格式：

// [{
//     rankTitle : rankTitle,
//     rankData :[{
//         rankNum : rankNum,
//         content : content
//     }]
// }]
// 
request(url, (err,res,body)=>{
    if(!err && res.statusCode == 200){
        var $ = cheerio.load(body); // 令我们可以像jq一样操作DOM
        console.log($('.yc_con').text())
    }else{
        console.error(err)
    }
})
