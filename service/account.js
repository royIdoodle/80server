let config = require('../config/mongo_config');
const mongoose = require('mongoose');
const {path, account} = config;
mongoose.connect(`${path}${account}`);


function saveShop() {
    const Shop = mongoose.model('Shop', { name: String });

    const shop80s = new Shop({ name: '80s' , createTime: Date.now()});
    shop80s.save()
        .then((a) => console.log(a))
        .catch(e => {
            console.log(e)
        });
}

module.exports = {
    save: saveShop
};