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
    var fx1 = document.getElementsByClassName('df')[0].childNodes;
var arrAnswer = []
var arrContent = []
var arrContent2 = []
for(item in fx1){
    var answer_item = []
    if(item < 9){
       var answer_content  = fx1[item].querySelectorAll('ul')[0];
        arrContent.push(answer_content)
    }
}

//         console.log(arrContent)
var answer3 = [],answer4 = []
// console.log(arrContent[0])
for(item2 in arrContent){
    let arr2 = arrContent[item2].querySelectorAll('li')
    console.log(arr2)
    answer4 = [] 
    for (item3 in arr2) {
        if (item3 <= 4) {
//           let answer_str = arr2[item3].innerText.split('.')[1]
          let answer_str = arr2[item3].innerText
//             console.log(answer_str)
          answer4.push({
            "seqId": 175,
            "questionId": 44,
            "answerNo": JSON.stringify(parseInt(item3) + 1),
            "content": answer_str,
            "contentDesc": ""
          })
        }
      }
    answer3.push(answer4)
}
// console.log(answer3)
        
        
  });
}).on('error', (e) => {
  console.error('获取数据出错', e);
});

//写出文件
function writeFile(params) {
  fs.writeFileSync('你会因为什么断送爱情.json', params, { encoding: 'utf-8', mode: 438 /*=0666*/, flag: 'w' });
}
