var http = require('http');
var cheerio = require('cheerio');
var url = 'http://sports.sina.com.cn';
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
http.get(url,(res) => {
    var html = '';

    res.on('data',(data) => {
        html+=data;

       	// var a = filterList(html);
       	// console.log(a);
    })

    res.on('end',() =>{
    	const $ = cheerio.load(html);
    	$('#j_tianYiMainFeed a').each(function(){
    		const newUrl = $(this).attr('href');
    		console.log(newUrl);
    	});
        //console.log(html);
       	// printInfo(filterList(html));
    });
}).on('error',(e) =>{
    console.log('获取数据出错');
});

function filterList(html){
	if(html){
		const $ = cheerio.load(html);
		

		return  listData;
	}else{
		console.log('无数据传入！');
	}
}
