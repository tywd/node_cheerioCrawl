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
    const $ = cheerio.load(html,{decodeEntities: false});
    let arr_name = [], arr_answer = [];
    let _contents = $('.test_contents');
    for (item in _contents) {
      if (item <= 40) {
        let qustion_content = $(_contents[item]).find('.fb').html().split('. ')[1]
        arr_name.push({
          "seqId": 44,
          "content": qustion_content,
          "questionNo": 1,
          "testAnswerDtos": [
            {
              "seqId": 175,
              "questionId": 44,
              "answerNo": "A",
              "content": "完全不符合",
              "contentDesc": ""
            },
            {
              "seqId": 176,
              "questionId": 44,
              "answerNo": "B",
              "content": "有些不符合",
              "contentDesc": ""
            },
            {
              "seqId": 177,
              "questionId": 44,
              "answerNo": "C",
              "content": "不好确定",
              "contentDesc": ""
            },
            {
              "seqId": 177,
              "questionId": 44,
              "answerNo": "D",
              "content": "比较符合",
              "contentDesc": ""
            },
            {
              "seqId": 177,
              "questionId": 44,
              "answerNo": "E",
              "content": "完全符合",
              "contentDesc": ""
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
    writeFile(JSON.stringify(arr_name))
  });
}).on('error', (e) => {
  console.error('获取数据出错',e);
});

//写出文件
function writeFile(params) {
  fs.writeFileSync('爱情类型测试.json', params, { encoding: 'utf-8', mode: 438 /*=0666*/, flag: 'w' });
}