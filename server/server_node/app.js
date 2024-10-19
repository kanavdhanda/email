const express = require('express');
const cors = require('cors');
const app = express();


let corsOptions = {
    origin: ['http://127.0.0.1:5173','http://localhost:5173'], 
    credentials: true, 
};

app.use(cors(corsOptions));


app.options('*', cors(corsOptions));

app.get('/', (req, res) => {
    console.log("Hello world");
    return res.status(200).json({ hello: 123 });
});

app.get('/set-cookie', cors(corsOptions), (req, res) => {
    
    res.setHeader('Set-Cookie', 'cook=helloworld; HttpOnly; Max-Age=3600; Path=/'); 
    res.status(200).json({ message: 'Cookie has been set', hello: 123 });
});

app.get('/del-cookie', (req, res) => {

    res.setHeader('Set-Cookie', 'myCookie=; HttpOnly; Max-Age=0; Path=/');
    res.send('Cookie value deleted');
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
