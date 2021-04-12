const express = require('express'); //1
const app = express();
// const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const sequelize = require('./db');

//modules that require .db need the obscured environment postgres password variable
const userController = require('./controllers/userController');
const dreamController = require('./controllers/dreamController');
const commentController = require('./controllers/commentController');




app.use(express.json());
app.use(require('./middleware/headers'));
// app.use(cors());
//exposed routes
app.use('/api/users', userController);

//authentication gate
app.use(require('./middleware/validate-session'));
//protected routes
app.use('/api/dreams', dreamController);
app.use('/api/comments', commentController);

console.log("Trying to authenticate...")
sequelize.authenticate()
    .then(()=> {
        console.log("Connected to postgres database")
        sequelize.sync()
            .then(()=>{
                app.listen(process.env.PORT, () => {
                console.log("Server listening on port " + process.env.PORT)
                })
            })
    }).catch(e=>{
        console.log("Error: Server crashed.");
        console.log(e);
    })