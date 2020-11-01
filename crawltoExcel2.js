/*
 * @Author: shichuyu
 * @Date: 2020-08-26 15:44:38
 * @LastEditors: shichuyu
 * @LastEditTime: 2020-08-27 10:05:06
 * @Description: 
 */
const superagent = require('superagent');
const cheerio = require('cheerio');
var fs = require("fs");//引入文件读写的模块
var xlsx = require("node-xlsx");//引入要用于导出excel的模块
// const url = 'http://www.ituring.com.cn/book/1993';
const url = 'http://3g.d1xz.net/yunshi/today/Aries/';

// 输入月 日 返回星座名称
function getAstro(month, day) {
    var s = "摩羯水瓶双鱼白羊金牛双子巨蟹狮子处女天秤天蝎射手摩羯";
    var arr = [20, 19, 21, 20, 21, 22, 23, 23, 23, 24, 23, 22];
    var numArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    var start = month * 2 - (day < arr[month - 1] ? 2 : 0); // 获取当前星座的索引的首位置
    var result = s.substr(start, 2); // 输出星座名称
    var numArrIndex = (start / 2 == 0 ? 0 : start / 2 - 1); // 获取星座获取后对应的数组的索引
    var num = numArr[numArrIndex]; // 根据索引输出 0~11 分别表示摩羯~射手座
    return result;
}
getAstro(2,29);
var obj = [
    {
        name:'firstSheet',
        data:[
            [
                '星座名','运势解答'
            ]
        ]
    },
];
superagent.get(url).end( function(err, res) {
    // 抛错拦截
    if (err) {
        return
    }

    const book = {};
    const constellation = {};
    console.log('res.text',res.text)
    let $ = cheerio.load(res.text,{
        decodeEntities: false,
        normalizeWhitespace: true,
        xmlMode: true
    });

    /* book.title = $('.book-title h2').text().trim();
    $('.book-author').children().each((i, e)=>{
  
        let name = $(e).text().trim();
        if (name.indexOf('(作者)')  != -1) {
          book.auther = name.replace(/\(作者\)/, '').trim();
        }
      
        if (name.indexOf('(译者)')  != -1) {
          book.translator = name.replace(/\(译者\)/, '').trim();
        }
    }); */
    constellation.name = $('.public_yd_name').text().replace('今日运势','').trim();
    // constellation.name2 = $('.public_yd_effective').text().trim();
    constellation.text = $('.public_yd_info').text().trim();

    // var slideListData = [book.title,book.auther,book.translator]
    var slideListData = [constellation.name,constellation.text]
    console.log(slideListData)
    obj[0].data.push(slideListData)
    // console.log(obj);
    //调用写出文件的方法
    // writeFile(obj);

    // console.log(book);
});

//写出文件到excel的方法
function writeFile(params){
    fs.writeFileSync('crawltoExcel.xlsx',xlsx.build(params),'binary');
}