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

app.get('/list', (req, res) =>{
    res.render('list', {
        list:data,
    });
});

app.get('/write', (req, res) =>{
    res.render('write');
});

app.post('/write', (req, res) =>{
    let item = {...req.body};
    data.push(item);
    res.redirect('/list');
});

app.get('view', (req, res) =>{
    const index = req.query.index;
    const view = data[index-1];
    res.render('view', {
        data:view,
        index:index,
    });
});

app.post('/delete', (req, res) =>{
    const index = req.body.index-1;
    data.splice(index,1);
    res.redirect('/list');
});

app.get('/update', (req, res) =>{
    const index = req.query.index;
    const view = data[index-1];
    res.render('update', {
        data:view,
        index:index,
    });
});

app.post('update', (req, res) =>{
    const index = req.body.index;
    const item = {
        title:req.body.title,
        username:req.body.username,
        date:req.body.date,
        main:req.body.main
    };
    data[index-1] = item;
    res.redirect(`/view?index=${index}`);
});

app.listen(3000, () =>{
    console.log('server start')
});