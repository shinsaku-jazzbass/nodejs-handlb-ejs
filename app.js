const express = require("express");
const app = express();
const handlebars = require("handlebars");
const ejs = require("ejs");

//ejs handlebarsをview engin使わず直接compileでtemplateにデータを渡してみました。

//例１handolebars
//https://www.npmjs.com/package/handlebarsサイトより引用
var  source  =  "<p>Handlebarsの例です</p>" + 
                "<p>こんにちは、私の名前は {{name}} です。私は {{hometown}} の出身です。私には "  + 
             "{{kids.length}} 人の子供がいます:</p>"  + 
             "<ul>{{#kids}}<li>{{name}} は {{age}}</li>{{/kids}}</ul>" ; 


var  data  =  {  "name" : "Alan" ,  
                    "hometown" : "TX" , 
                    "kids" : [ { "name" : "Tommy" ,  "age" : "12" } ,
                               { "name" : "Sally" ,  "age" : "4" } ] 
                } ; 

const  template  =  handlebars.compile ( source ) ; 
var  result  =  template ( data ) ; 

//例２ejs
//https://www.npmjs.com/package/ejs からの引用
var source2 = "<p>ejsの例です</p>" + 
                "<p>こんにちは、私の名前は <%= name %> です。私は <%= hometown %> の出身です。私には "  + 
             "<%= kids.length %> 人の子供がいます:</p>"
             + "<ul><% kids.forEach(function (value, key) { %><li><%= value['name'] %>は<%= value['age'] %> </li><% }); %></ul>";

//
ejs.compile ( source2  ) ; 
var result2 = ejs.render(source2, data);

//例３htmlに例２ejsデータをプラスしてコンパイル
//htmlファイルに埋め込んだ例
var source3 = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
    rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
    <title>Top Page</title>
</head>
<body>
<div class="main">
    <div class="container">
    <p>ejsプラスhtmlの例です</p>
    ` + source2 + `
    <div><a href="./next.html">Next Page(静的なpageへ遷移)</a></div>
    </div>
    
</div>
</body>
</html>`;




//
ejs.compile ( source3 );
var result3 = ejs.render(source3,data);


const PORT = 5000;

app.use(express.static("./"));

//デフォルトルートではhandolebarsの例
app.get("/", (req, res) => {
    res.send(result);
});

//ejsではejsの例
app.get("/ejs", (req, res) => {
    res.send(result2);
});

//ejs2ではejsプラスhtmlの例
app.get("/ejs2", (req, res) => {
    res.send(result3);
});


app.listen(PORT, () => console.log("localhose:PORT"+ PORT +" にてサーバ起動"));
