// this is created in node, and is similar to sinatra.
// run this file via node server.js for example2.html

var server = require('http').createServer();

var createApplication = function(){
    var app = require('./app.js');
    server.on('request',app);
}

var startServer = function(){
    const PORT = process.env.PORT || 1234;

    server.listen(PORT,function(){
        console.log('Server started on port',PORT);
    });
};

createApplication();
startServer();