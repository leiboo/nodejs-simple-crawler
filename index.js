var express = require('express');
var cheerio = require('cheerio');
var superagent = require('superagent');

var app = express();

app.get('/', function (req, res, next) {
  superagent.get('http://www.swjtu.edu.cn/html/tzgg/1.html')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items = [];
      $('.list_main_content ul li a').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $element.text(),
          href:$element.attr('href')
        });
      });

      res.send(items);
    });
});


app.listen(3000, function () {
  console.log('app is listening at port 3000');
});