/*
 * @Description: 
 * @Author: shichuyu
 * @Date: 2020-11-02 19:36:39
 * @LastEditTime: 2020-11-03 21:14:16
 * @LastEditors: shichuyu
 */
// 奇趣测试网
var http = require('http');
var cheerio = require('cheerio');
var fs = require("fs");//引入文件读写的模块
const iconv = require('iconv-lite')
var url = 'http://m.ydl.com/ceshi/testing/2731?fromPath=eyJzdGFydF91cmwiOiIvY2VzaGkvc3RhcnQvMjczMSIsInRlc3RpbmdfdXJsIjoiIiwicmVwb3J0X3VybCI6IiJ9';
// 数据格式 
// 提取网页的重要信息，我们可以定义数据格式：

http.get(url, (res) => {
  var html = '';

  res.on('data', (data) => {
    // html += data;
    html += iconv.decode(data, 'utf-8') // 解码，处理抓取的中文数据乱码
  });
  res.on('end', () => {
    const $ = cheerio.load(html, { decodeEntities: false });
    let fx1 = jsdom.getElementsByClassName('df')[0].childNodes
    console.log(jsdom)
    for (item in fx1) {
      if (item < 8) {
        console.log(fx1[item].querySelectorAll('.mb25')[0].innerText.split('.')[1])
      }
    }
    var q_data = {
      "seqId": 0,
      "name": "",
      "tipsTitle": "",
      "price": "0",
      "originalPrice": "0",
      "visitNum": 0,
      "elapsedTime": 0,
      "questionNumber": 0,
      "commentNum": 0,
      "desc": "<p>我们的生命中来来往往的人那么多，究竟谁才是过客，而谁又是命中注定令自己沦陷的那一个Mr.Right？你是否也因为匆匆的行者而迷乱了渴望的双眼？还是一如既往站在原地等待TA的出现？想知道哪种爱人你遇到就<span style=\"white-space: normal;\">该</span>抓住不放吗？快来测测哪种男人最适合你？</p>",
      "createTime": "2020-08-05 11:16:30",
      // "questions": arr_name
    }
    // console.log(arr_name)
    // copy(q_data)
    // writeFile(JSON.stringify(arr_name))
    var fx1 = document.getElementsByClassName('df')[0].childNodes
    for(item in fx1){
      if(item < 8){
            console.log(fx1[item].querySelectorAll('.mb20')[0].innerText)
       }
   }
  });
}).on('error', (e) => {
  console.error('获取数据出错', e);
});

//写出文件
function writeFile(params) {
  fs.writeFileSync('你会因为什么断送爱情.json', params, { encoding: 'utf-8', mode: 438 /*=0666*/, flag: 'w' });
}