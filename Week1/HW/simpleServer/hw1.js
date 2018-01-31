const http = require('http'); //look at the documentation of module
const fs = require('fs');//look into this documentation

const hostname = '127.0.0.1'; //loop what address?
const port = 3000; //which others could I euclideanDistance

fs.readFile('index.html', (err,html)=>{
  if (err){
    throw err;
  }
    const server = http.createServer((req,res)=>{
      res.statusCode = 200;
      res.setHeader('Content-type', 'text/html');
      res.write(html);
      res.end();
    });

    server.listen(port, hostname, ()=>{
      console.log('Server started on port'+port);
    });
});
