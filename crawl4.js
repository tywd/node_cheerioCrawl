/*
 * @Description: 
 * @Author: shichuyu
 * @Date: 2020-11-02 19:36:39
 * @LastEditTime: 2020-11-04 15:50:48
 * @LastEditors: shichuyu
 */
// 奇趣测试网
var http = require('http');
var cheerio = require('cheerio');
var fs = require("fs");//引入文件读写的模块
const iconv = require('iconv-lite')
var url = 'http://www.geilixinli.com/xlcs/question/12';
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
    function getCaption(obj) {
      var index = obj.indexOf("，");
      obj = obj.substring(index + 1, obj.length);
      // console.log(obj);
      return obj;
    }
    let arr_name = [], arr_answer = []; var answer_item = [];
    let _contents = $('.q_info');
    for (item in _contents) {
      if (item < _contents.length) {
        let qustion_content = getCaption($(_contents[item]).find('.q_info_t').html())
        arr_name.push({
          "id": 23261,
          "content": qustion_content,
          "questionNo": "1",
          "thirdPartyQuestionId": 0,
          "image": "",
          "audio": "",
          "testAnswerDtos": []
        })
        var answer = $(_contents[item]).find('ul').find('li');

        answer_item.push(answer)
      }
    }
    let answer2 = [], answer3 = []
    for (item2 in answer_item) {
      answer3 = []
      for (item3 in answer_item[item2]) {
        if (item3 < answer_item[item2].length) {
          let answer_str = answer_item[item2][item3].innerText
          answer3.push({
            "id": 78942,
            "questionId": 23261,
            "answerNo": JSON.stringify(parseInt(item3) + 1),
            "content": answer_str,
            "contentDesc": "",
            "image": "",
            "score": 1,
            "maxScore": null,
            "thirdPartyAnswerId": 0,
            "jumpAnsId": "2"
          })
        }
      }
      answer2.push(answer3)
      arr_name[item2].testAnswerDtos = answer2[item2]
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
      "questions": arr_name,
      "testResultId": 26403930,
      "hasUnused": true,
      "createTime": "Dec 26, 2018 2:33:21 PM",
      "webQuestionUrl": "",
      "maxCoupon": null,
      "inCode": "",
      "isSupportUnscramble": 0
    }
    // console.log(arr_name)
    copy(q_data)
    writeFile(JSON.stringify(arr_name))
  });
}).on('error', (e) => {
  console.error('获取数据出错', e);
});

//写出文件
function writeFile(params) {
  fs.writeFileSync('你会因为什么断送爱情.json', params, { encoding: 'utf-8', mode: 438 /*=0666*/, flag: 'w' });
}