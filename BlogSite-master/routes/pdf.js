var express = require('express');
var router = express.Router();

var fs = require('fs');
var NodePDF = require('nodepdf');
var config = require('../config');
var dbHelper = require('../db/dbHelper');


router.get('/:id', function (req, res, next) {
	console.log('进入pdf');
	var id = req.params.id;
	var host = req.protocol + '://' + req.get('host') + '/pdf/blogPdf/' + id;
	var pdffile = config.site.path + '\\news-' + Date.now() + '.pdf';
	
	NodePDF.render(host, pdffile, function(err, filePath){
		if (err) {
			console.log(err);
		}else{
			fs.readFile(pdffile , function (err,data){
				console.log("开始")
				console.log(data);
				res.contentType("application/pdf");
				res.send(data);

			});
		}
	});
})

router.get('/blogPdf/:id', function(req, res, next) {
	
	var id = req.params.id;
	console.log("开始查找 ");
	dbHelper.findNewsOne(req, id, function (success, data) {
		res.render('blogPdf',{
			entries: data,
		});
	})
});

module.exports = router;
