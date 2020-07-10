const { app, pool, Result } = require('./connect');
const login = require("./api/login");

app.all('*', (req,res,next) =>{
    //全网拦截
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

app.all('/', (req,res) =>{
    pool.getConnection((err,conn) =>{
        res.json({a:'aaa'});
        conn.release();
    });
});

app.use('/login',login);

const port = 3000;
app.listen(port ,() =>{
    const hostname = 'localhost';
    console.log(`Server running at http://${hostname}:${port}/`);
})