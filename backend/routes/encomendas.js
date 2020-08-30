var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');

/* GET all orders(encomendas). */
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

/* get single order*/

router.get('/:id', function(req, res, next) {
  let idEncomenda = req.params.id;

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
  ]).filter({'E.idEncomenda':idEncomenda})
  .getAll().then(ec =>{
    if(ec.length>0){
      res.status(200).json({ec})
    }else{
        res.json({message: `No orders with id ${idEncomenda}`})
    }
  }).catch(err => console.log(err));


});

/* placing a new order*/
router.post('/newOrder',(req,res)=>{
  let {idCliente,morada,hora,voucher,artigos} =  req.body;
  if(!isNaN(idCliente) && null != idCliente && idCliente > 0){
    database.table('Encomendas')
    .insert({
      idCliente: idCliente,
      Morada_Entrega:morada,
      HoraEntrega:hora,
      EstadoPagamento:0,
      idVoucher:voucher
    }).then(newidEncomenda =>{
      if(newidEncomenda>0){
        artigos.forEach(async(p)=>{
          //let quantidade = await database.table('artigos').filter({'idArtigo':p.id}).withFields(['quantidade']).get();

            database.table('DetalhesEncomenda')
            .insert({
              idEncomenda:newidEncomenda,
              idArtigo:p.idArtigo,
              Quantidade: p.quantidade
            }).then(sucessNum=>{}).catch(err=>console.log(err));
        });
      }else{
        res.json({message: 'New order failed on adding order details',status: "failed"})
      }

      res.json({
        message: `New order placed with id ${newidEncomenda}`,
        status: "sucess",
        orderId: newidEncomenda,
        artigos: artigos
      })


    }).catch(err=>console.log(err))
  }
  else{
    res.json({message: 'New order failed',status: "failed"})
  }
})


module.exports = router;
