var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');

/* GET users listing. */
router.get('/', function(req, res, next) {
  database.table('Encomendas as E')
  .join([
    {
      table:'DetalhesEncomenda as D',
      on: 'E.idEncomenda = D.idEncomenda'
    },
    {
      table:'Cliente as C',
      on: 'E.idCliente = C.idCliente'
    },
    {
      table: 'Vouchers as V',
      on: 'E.idVoucher = V.idVoucher'
    },
    {
      table: 'Artigos as A',
      on: 'D.idArtigo = A.idArtigo'
    },
    {
      table: 'TipoArtigos as TA',
      on: 'A.TipoArtigo = TA.idTipo'
    }
  ])
  .getAll().then(ec =>{
    if(ec.length>0){
      res.status(200).json({
        size : ec.length,
        artigos : ec
      })
    }else{
        res.json({message: 'Sem artigos'})
    }
  }).catch(err => console.log(err));
});

module.exports = router;
