const express = require('express'); //1
const app = express();

const dotenv = require('dotenv');
dotenv.config();

//modules that require .db need the obscured environment postgres password variable
const userController = require('./controllers/userController');
const dreamController = require('./controllers/dreamController');
const commentController = require('./controllers/commentController');
const sequelize = require('./db');

sequelize.sync({force:true});

app.use(express.json());
app.use(require('./middleware/headers'));

//exposed routes
app.use('/api/users', userController);

//authentication gate
app.use(require('./middleware/validate-session'));
//protected routes
app.use('/api/dreams', dreamController);
app.use('/api/comments', commentController);


app.listen(process.env.PORT, () => {
    console.log("Server listening on port " + process.env.PORT)
});