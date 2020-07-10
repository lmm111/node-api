const { pool, router, Result } = require('../connect');


router.get('/', (req,res) =>{
    // pool.query('select * from tasks',(e,r) =>{
    //     res.json(new Result({data:r}));
    // });//1直接使用
    pool.getConnection((err,conn) =>{
        conn.query('select * from tasks',(e,r) =>{
            res.json(new Result({data:r}));
        });
        conn.release();
    });//2从连接池中拿一个连接
})

router.get("/test/:data",(req,res) =>{//router可以嵌套
    res.json({
        query:req.query,
        data:req.params,
        json:req.body
    });
})

module.exports = router;