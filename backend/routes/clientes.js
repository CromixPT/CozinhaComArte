var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');

router.get('/', function(req, res) {
    let page = (req.query.page!= undefined && req.query.page!= 0 ) ? req.query.page : 1; // current page number
    const limit = (req.query.limit!= undefined && req.query.limit!= 0 ) ? req.query.limit : 10; //numer of itens per page
  
    let startValue;
    let endValue;

    if(page>0){
        startValue = (page*limit) - limit;
        endValue  = page*limit;
      }else{
        startValue = 0;
        endValue = 10;
      }

    database.table('Clientes as C').slice(startValue,endValue).getAll().then(clientes =>{
        if(clientes.length>0){
          res.status(200).json({
            size : clientes.length,
            clientes : clientes
          })
        }else{
            res.json({message: 'Sem registo de clientes'})
        }
      }).catch(err => console.log(err));
});

router.get('/:user',(req,res)=>{
  let user = req.params.user;
  database.table('Clientes as C').filter({'email':user})
  .get()
  .then(clientes =>{res.status(200).json(clientes)})
  .catch(err => console.log(err));
})

router.post('/novo',(req,res)=>{
    let {nome,morada,email,password} = req.body;

    console.log(nome);

    if(null != nome && null != email && null!= password){
        database.table('Clientes')
        .insert({
            nome:nome,
            morada: morada,
            email: email,
            password: password
        }).then(novoidCliente =>{
            if(novoidCliente>0){
                res.status(200).json({ 
                    message: `New client created`,
                    orderId: novoidCliente
                })
            }
            else{
                res.json({message:"Falha na criação de novo cliente"})
            }
          })
    }else{
        res.json({message:"Falha na criação de novo cliente"})
    }

  });
module.exports = router;
