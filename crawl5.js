/*
 * @Description: 
 * @Author: shichuyu
 * @Date: 2020-11-02 19:36:39
 * @LastEditTime: 2020-11-04 11:32:03
 * @LastEditors: shichuyu
 */
// 奇趣测试网
var http = require('http');
var cheerio = require('cheerio');
var fs = require("fs");//引入文件读写的模块
const iconv = require('iconv-lite');
const { copy } = require('superagent');
var url = 'https://m.ydl.com/ceshi/testing/2731?fromPath=eyJzdGFydF91cmwiOiIvY2VzaGkvc3RhcnQvMjczMSIsInRlc3RpbmdfdXJsIjoiIiwicmVwb3J0X3VybCI6IiJ9';
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
    var arrQuestion = [],  // 存放所有问题加答案选项
      arrAnswer = [],  // 存放最终答案数组
      arrContent = []; // 存放所有答案的父级元素
    for (item in fx1) {
      if (item < 9) {
        var question_name = fx1[item].querySelectorAll('.mb25')[0].innerText.split('.')[1].replace(/(^\s*)|(\s*$)/g, "");
        // 先获得所有问题
        arrQuestion.push({
          "seqId": 44,
          "content": question_name,
          "questionNo": 1,
          "createTime": "2020-08-05 11:16:30",
          "testAnswerDtos": []
        });
        var answer_content = fx1[item].querySelectorAll('ul')[0];
        arrContent.push(answer_content) // 获得所有答案选项的父级
      }
    }

    // 遍历所有答案选项的父级
    for (item in arrContent) {
      // 去除单个父级的子级li
      let arr2 = arrContent[item].querySelectorAll('li')
      var answer_item = [] // 存放单个答案选项
      // 遍历单个子级li下的所有选项
      for (item2 in arr2) {
        if (item2 <= 2) {
          let answer_str = arr2[item2].innerText
          // 获得所有答案
          answer_item.push({
            "seqId": 175,
            "questionId": 44,
            "answerNo": JSON.stringify(parseInt(item2) + 1),
            "content": answer_str,
            "contentDesc": ""
          })
        }
      }
      arrAnswer.push(answer_item) // 获得所有答案选项数组
      arrQuestion[item].testAnswerDtos = arrAnswer[item] // 将所有答案选项数组一一对应到问题arrQuestion
    }
    console.log(arrQuestion)
    var q_data = {
      "seqId": 0,
      "name": "夫妻性格相容性测试",
      "tipsTitle": "",
      "price": "0",
      "originalPrice": "0",
      "visitNum": 0,
      "elapsedTime": 0,
      "questionNumber": 0,
      "commentNum": 0,
      "desc": "<p>我们的生命中来来往往的人那么多，究竟谁才是过客，而谁又是命中注定令自己沦陷的那一个Mr.Right？你是否也因为匆匆的行者而迷乱了渴望的双眼？还是一如既往站在原地等待TA的出现？想知道哪种爱人你遇到就<span style=\"white-space: normal;\">该</span>抓住不放吗？快来测测哪种男人最适合你？</p>",
      "createTime": "2020-08-05 11:16:30",
      "questions": arrQuestion
    }
    copy(q_data);
  });
}).on('error', (e) => {
  console.error('获取数据出错', e);
});

//写出文件
function writeFile(params) {
  fs.writeFileSync('你会因为什么断送爱情.json', params, { encoding: 'utf-8', mode: 438 /*=0666*/, flag: 'w' });
}
