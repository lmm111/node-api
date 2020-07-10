const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const router = express.Router();

const sqlOptions = {
    host:'localhost',
    user:'root',
    passwword:'',
    port:'3306',
    database:'mydata',
    connectTimeout:5000,
    mutipleStatements:false,//是否允许一个query包含多条sql
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))//表单请求
app.use(cors());

let pool;
repool();

function Result({code= 200,msg = '请求成功',data = {}}){
    this.code = code;
    this.msg = msg,
    this.data = data;
}

function repool(){//断线重连
    pool = mysql.createPool({
        ...sqlOptions,
        waitForConnections:true,
        connectionLimit:100,
        queueLimit:0,
    });
    pool.on('error',err => err.code === 'PROTOCOL_CONNECTION_LOST' && setTimeout(repool,2000));
}

module.exports = {
    pool,
    Result,
    router,
    app
}