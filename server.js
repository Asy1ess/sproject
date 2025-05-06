const express = require('express');
const nunjucks = requrie('nunjucks');
const list = requrie('./boardData');
const app = express();
const data = [...list.data];

app.use(express.urlencoded({extend:app,}));

app.set('view engine', 'html');

app.get('/', (req, res) =>{
    res.render('index');
});

app.get('/board/list', (req, res) =>{
    res.render('board_list', {
        list:data,
    });
});

app.get('/board/write', (req, res) =>{
    res.render('board_write');
});

app.post('/board/write', (req, res) =>{
    let item = {...req.body};
    res.render('board_write', {
        list:data,
    });
});