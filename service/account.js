let config = require('../config/mongo_config');
const mongoose = require('mongoose');
const {path, dbAccount} = config;
mongoose.connect(`${path}${dbAccount}`);


const Shop = mongoose.model('account', { name: String , createTime: Date});

function saveShop() {

    const shop80s = new Shop({ name: '80s' , createTime: Date.now()});
    shop80s.save()
        .then((a) => console.log(a))
        .catch(e => {
            console.log(e)
        });
}

function findShop(){
    return Shop.find().where({name: '80s'}).exec().then((results) => {
        console.log('===============');
        console.log(results);
        console.log('===============');
        return results;
    })
}

module.exports = {
    save: saveShop,
    find: findShop
};