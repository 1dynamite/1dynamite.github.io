
let http = require('http');
let fs = require('fs');
let path = require('path');
let gapfill = require('./server_scripts/gapfill.js');
let userClass = require('./server_scripts/userobj.js');
let comments = require("./server_scripts/comments.js");
var MongoClient = require('mongodb').MongoClient;
const { send } = require('process');
var url = "mongodb://localhost:27017/";

let userobj = null;
let somefunc = (ob, res, value, dbo) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.write(JSON.stringify({status: true, message: "You must be logged in to post comments"}));
    res.end();
}
let skip = 0;

MongoClient.connect(url, {useUnifiedTopology: true }, function(err, db) {
    if (err) throw err;
    var dbo = db.db("demo_db");
    let newComments = new comments();
    //newComments.get(dbo);

http.createServer(async function(req, res){
    let url = req.url;
    url = url.replace(/%20/g, " ");
    //let q = new URL("https://" + req.headers.host + req.url);

    if(url == "/fetch_comments.js"){
        let val = await newComments.get(dbo, 10, skip);
        skip += 10;
        let sendObj = JSON.stringify(val);
        //console.log(sendObj);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(sendObj);
        res.end();
    }
    else if(url == "/post_comment.js"){
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            somefunc(userobj, res, data, dbo);

        });
    }
    else if(url == "/hey.html"){

        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            //let q = new URL("https://" + req.headers.host + req.url + "?" + data);
            let d = JSON.parse(data);
            let username = d.username;
            let password = d.password;
            let title = d.title;

            dbo.collection("users").findOne({username: username }, function(err, result) {
                if (err) throw err;
                let resObj = {status: 1, message: "", username: null};
                if(result != null && (password != result.password || title != result.title)){
                    resObj.status = 0;
                    resObj.message = "Password/Title is wrong (username already exists)";
                }
                else {
                    let userdbo = result;
                    if(result == null)
                    {
                        let ob = {username: username, password: password, title: title, comments: [] };
                        dbo.collection("users").insertOne(ob, function(err, result) {
                            if (err) throw err;
                        });
                        userdbo = ob;
                    }
                    userobj = new userClass(userdbo);
                    resObj.username = userobj.username;
                    somefunc = async (ob, r, value, dbo) => {
                        if(ob == null)
                        {
                            r.writeHead(200, {'Content-Type': 'application/json'});
                            r.write(JSON.stringify({status: true, 
                                                    message: "You must be logged in to post comments", 
                                                    value: null}));
                            return r.end();
                        }
                        let temp = {date: new Date(), value: value, username: ob.username};
                        await ob.post(temp, dbo);
                        skip++;
                        //console.log("so far so good...");
                        let val = await newComments.get(dbo, 1);
                        let sendObj = JSON.stringify({status: false, message: "", value: val});
                        //console.log(sendObj);
                        /* let array = newComments.get(dbo);
                        console.log(array[0].date); */
                        r.writeHead(200, {'Content-Type': 'application/json'});
                        r.write(sendObj);
                        return r.end();
                    }
                }
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(resObj));
                return res.end();

            });
    });
    }
    else if(url == "/username.js"){
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(userobj.username);
        return res.end();
    }
    else if(url == "/logged_in.js"){
        res.writeHead(200, {'Content-Type': 'application/json'});

        let obj = {loggedin: false, username: null};
        if(userobj != null){
            obj.loggedin = true;
            obj.username = userobj.username;
        }
        res.write(JSON.stringify(obj));
        res.end();
    }
    else if(url == "/logout.js"){
        userobj = null;
    }
    else if(url == "/server_scripts/gapfill.js") {
        let myMap = new Map();
        
        
        let userInput = new Map();
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            let inputObj = JSON.parse(data);
            dbo.collection("gapfill").findOne({id: inputObj.id}, function(err, result) {
                if (err) throw err;
                for(let i of result.value)
                    myMap.set(i.key, i.value);

                let inputArr = inputObj.value;
                for(let i of inputArr)
                    userInput.set(i.key, i.value);

                let gapList = new gapfill(myMap);
                let newMap = gapList.compare(userInput);
            
                let arr = [];
                for(let [key, value] of newMap) {
                    arr.push({key: key, value: value});
                }

                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(arr));
                res.end();
                
              });

        });

        
        
    }
    else if(url == "/")
        {
            skip = 0;
            fs.readFile("./index.html", function(err, data){
                if(err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        }
    else {
        if(url == "/index.html")
            skip = 0;
        fs.readFile("." + url, function(err, data){
            if(err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                //console.log(url);
                return res.end("404 Not Found");
            }
            if(path.extname(url) == '.css')
                res.writeHead(200, {'Content-Type': 'text/css'});
            else if(path.extname(url) == '.html'){
                res.writeHead(200, {'Content-Type': 'text/html'});
            }
            else if(path.extname(url) == '.js')
                res.writeHead(200, {'Content-Type': 'application/javascript'});
            res.write(data);
            return res.end();
        });
    } 
        
    
}).listen(80);
  });
