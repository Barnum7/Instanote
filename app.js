//this is the express app and basic routing for example2.html

'use strict';

var app = require('express')();
var _ = require('lodash');
var path = require('path');
var chalk = require('chalk');
var util = require('util');
var bodyParser = require('body-parser');

var logMiddleware = function(req,res,next){
    //console.log(req.body);
    util.log(('---NEW REQUEST---'));
    console.log(util.format(chalk.red('%s: %s %s'), 'REQUEST ', req.method, req.path));
    console.log(util.format(chalk.yellow('%s: %s'), 'QUERY   ', util.inspect(req.query)));
    console.log(util.format(chalk.cyan('%s: %s'), 'BODY    ', util.inspect(req.body)));
    next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(logMiddleware);

//app.use(function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//});

var images = [
    'http://ep.yimg.com/ay/candy-crate/bulk-candy-store-2.gif',
    'http://www.dailybunny.com/.a/6a00d8341bfd0953ef0148c793026c970c-pi',
    'http://images.boomsbeat.com/data/images/full/44019/puppy-wink_1-jpg.jpg',
    'http://p-fst1.pixstatic.com/51071384dbd0cb50dc00616b._w.540_h.610_s.fit_.jpg',
    'http://childcarecenter.us/static/images/providers/2/89732/logo-sunshine.png',
    'http://www.allgraphics123.com/ag/01/10683/10683.jpg',
    'http://img.pandawhale.com/post-23576-aflac-dancing-duck-pigeons-vic-RU0j.gif',
    'http://www.eveningnews24.co.uk/polopoly_fs/1.1960527.1362056030!/image/1301571176.jpg_gen/derivatives/landscape_630/1301571176.jpg'
];

//'http://media.giphy.com/media/vCKC987OpQAco/giphy.gif',
//'https://my.vetmatrixbase.com/clients/12679/images/cats-animals-grass-kittens--800x960.jpg',
//'http://www.dailymobile.net/wp-content/uploads/2014/10/lollipops.jpg'

app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/api/image',function(req,res){
    res.status(200).send({data: _.shuffle(images)[_.random(0,images.length)]})
});

app.post('/api/image',function(req,res){
    //console.log(req.body.imageUrl);
    images.push(req.body.imageUrl);
    console.log(images);
    res.status(200).send({message:"Image added!"});
});

module.exports = app;