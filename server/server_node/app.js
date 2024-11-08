// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/connectDB');
// const dotenv = require('dotenv');
// const email = require('./models/email')
// const app = express();
// dotenv.config();

// let corsOptions = {
//     origin: ['http://127.0.0.1:5173','http://localhost:5173'], 
//     credentials: true, 
// };

// app.use(cors(corsOptions));
// app.use(express.json());

// const endpoints = ()=>{
//     app.options('*', cors(corsOptions));

// app.get('/', (req, res) => {
//     return res.status(200).json({ hello: 123 });
// });

// app.get('/set-cookie', cors(corsOptions), (req, res) => {
    
//     res.setHeader('Set-Cookie', 'cook=helloworld; HttpOnly; Max-Age=3600; Path=/'); 
//     res.status(200).json({ message: 'Cookie has been set', hello: 123 });
// });

// app.get('/del-cookie', (req, res) => {

//     res.setHeader('Set-Cookie', 'myCookie=; HttpOnly; Max-Age=0; Path=/');
//     res.send('Cookie value deleted');
// });
// app.post('/test', async (req, res) => {
//     const { url, status } = req.body;
//     if (!url || !status) {
//         return res.status(400).send('Missing required fields: url or status');
//     }
//     try {
//         const exists= await email.findOne({url});
//         if(exists) return res.status(403).send('Already exists')
//         else{
//             const email1 = new email({ url, status });
//             await email1.save();
//             res.status(200).send('Data Stored Successfully');
//     }
     
//     } catch (error) {
//         res.status(500).send('Internal Server Error');
//     }
// });
// }
// const start = async ()=>{
//     try{
//         await connectDB();
//         endpoints();
//         app.listen(process.env.PORT || 3000, () => {
//             console.log(`Server is running on  http://localhost:${process.env.PORT}`);
//         });
//     }
//     catch(err){
//         console.error(err);
//     }
   

// }
// start();


const express = require('express');
const uploadRoutes = require('./routes/uploadRoutes');
const connectDB = require('./config/db.config');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

app.use('/api', uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

