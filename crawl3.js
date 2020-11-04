// 奇趣测试网
var http = require('http');
var cheerio = require('cheerio');
var fs = require("fs");//引入文件读写的模块
const iconv = require('iconv-lite')
var url = 'http://www.qqtest.com/s/158.html';
var obj = [
  // {
  //   content: '',
  //   answer: [
  //     { content: '' }
  //   ]
  // },
];
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
    let arr_name = [], arr_answer = [];
    let _contents = $('.test_contents');
    for (item in _contents) {
      if (item <= 40) {
        let qustion_content = $(_contents[item]).find('.fb').html().split('. ')[1]
        arr_name.push({
          "id": 23261,
          "content": qustion_content,
          "questionNo": "1",
          "thirdPartyQuestionId": 0,
          "image": "",
          "audio": "",
          "testAnswerDtos": [
            {
              "id": 78942,
              "questionId": 23261,
              "answerNo": "1",
              "content": "完全不符合",
              "contentDesc": "",
              "image": "",
              "score": 1,
              "maxScore": null,
              "thirdPartyAnswerId": 0,
              "jumpAnsId": "2",
            },
            {
              "id": 78942,
              "questionId": 23261,
              "answerNo": "1",
              "content": "有些不符合",
              "contentDesc": "",
              "image": "",
              "score": 1,
              "maxScore": null,
              "thirdPartyAnswerId": 0,
              "jumpAnsId": "2",
            },
            {
              "id": 78942,
              "questionId": 23261,
              "answerNo": "1",
              "content": "不好确定",
              "contentDesc": "",
              "image": "",
              "score": 1,
              "maxScore": null,
              "thirdPartyAnswerId": 0,
              "jumpAnsId": "2",
            },
            {
              "id": 78942,
              "questionId": 23261,
              "answerNo": "1",
              "content": "比较符合",
              "contentDesc": "",
              "image": "",
              "score": 1,
              "maxScore": null,
              "thirdPartyAnswerId": 0,
              "jumpAnsId": "2",
            },
            {
              "id": 78942,
              "questionId": 23261,
              "answerNo": "1",
              "content": "完全符合",
              "contentDesc": "",
              "image": "",
              "score": 1,
              "maxScore": null,
              "thirdPartyAnswerId": 0,
              "jumpAnsId": "2",
            }
          ]
        })
        var answer = $(_contents[item]).find('.i_mid');
        arr_answer.push(answer)
      }
    }
    let arr_answer_new = []
    let arr_answer_new2 = []
    /* for (item in arr_answer) {
      for (item_i in arr_answer[item]) {
        if (item_i <= 2) {
          if (item_i == 1) {
            arr_answer_new.push(arr_answer[item][item_i].innerText.split('、')[1])
          } else {
            arr_answer_new.push(arr_answer[item][item_i].innerText.split('、 ')[1])
          }
        }
      }
      arr_answer_new2.push(arr_answer_new)
      arr_answer_new = [];
      // $(arr_answer[item]).text().split('、')[1];
    } */
    // console.log(arr_name, arr_answer)
    var q_data = {
      "id": 1542,
      "testCatId": 9,
      "name": "专注力测试题",
      "tipsTitle": "测试你的专注力有多强？",
      "shareImage": "https://img.ydlcdn.com/file/2018/12/26/2zttvk14yj0evetb.jpg",
      "price": 0,
      "originalPrice": 19.9,
      "visitNum": 15274,
      "testSource": 1,
      "reportPages": 4,
      "elapsedTime": 5,
      "questionNumber": 15,
      "commentNum": 0,
      "desc": "<p>专注力从<a href=\"https://m.ydl.com/\" target=\"_blank\">心理</a>学的角度来讲就是排出外界干扰以及私心杂念，专注于做某件事情上。</p><p>专注力是提高学习工作效率的根本，性情浮躁，没有良好的专注力，做事情就会缺乏效率，难以有深入的发展。</p><p>同时，一个人如果总是无法集中精力去做某事，也反映了自我控制力差的表现。</p><p>那么，你的专注力有多强呢？通过下面专注力测试题来看看吧！</p>",
      "reportId": 0,
      "questions": arr_name,
      "testResultId": 26403930,
      "hasUnused": true,
      "createTime": "Dec 26, 2018 2:33:21 PM",
      "webQuestionUrl": "",
      "maxCoupon": null,
      "inCode": "",
      "isSupportUnscramble": 0
    }
    writeFile(JSON.stringify(arr_name))
  });
}).on('error', (e) => {
  console.error('获取数据出错', e);
});

//写出文件
function writeFile(params) {
  fs.writeFileSync('爱情类型测试.json', params, { encoding: 'utf-8', mode: 438 /*=0666*/, flag: 'w' });
}