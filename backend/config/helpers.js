const MySQLi = require('mysqli');

let conn = new MySQLi({
    host : '94.46.15.180' , //  IP/domain name  
    post : 3306 , // Port, default 3306  
    user : 'CCA' , // Username  
    passwd : 'CCA2020!' , // password  
    charset : 'utf8' , //  Database encoding, default utf8 [optional]  
    db : 'CozinhaComArte' //You  can specify the database or not [optional]  
});

let db = conn.emit(false,'');

module.exports = {
    database : db
};
