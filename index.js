let http=require('http')
http.createServer((req,res)=>{
    console.log(req.url);
    if(req.url=='/login'){

        res.writeHead(200,{'Content-type':'text/html'})
        res.write('<h2>login page</h2>')
        res.end()
    }
    else if(req.url=='/register'){
        res.writeHead(200,{'Content-type':'text/html'})
        res.write('<h2>register page</h2>')
        res.end()
    }
}).listen(8000) 