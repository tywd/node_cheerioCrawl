var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.qqtest.com/s/9.html';
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
    html += data;
  });
  res.on('end', () => {
    const $ = cheerio.load(html);
    let arr_name,arr_answer = [];
    let _contents = $('.test_contents');
    for (item in _contents) {
      if (item <= 40) {
        arr_name.push($(_contents[item]).find('.fb').html())
        arr_answer.push($(_contents[item]).find('.i_mid').text())
      }
    }
    console.log(arr_name,arr_answer)
  });
}).on('error', (e) => {
  console.log('获取数据出错');
});

function addObj(data) {
  obj.push(data);
}