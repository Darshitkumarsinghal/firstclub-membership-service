const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {sequelize, User, Subscription} = require('./models');
const routes = require('./routes');


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', routes);


const PORT = process.env.PORT || 3000;


async function init() {
await sequelize.sync({ force: true });
// seed users
await User.create({ name: 'Alice' });
await User.create({ name: 'Bob' });


app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}


init();