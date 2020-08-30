var express = require('express');
var router = express.Router();
const {database} = require('../config/helpers');

/* GET home page. */
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
  
    database.table('Artigos as A')
    .join([{
        table: 'TipoArtigos as TA',
        on: 'A.TipoArtigo = TA.idTipo'
    }])
    .withFields([
        'A.idArtigo','A.Nome', 'A.Descricao as DescPrato','A.Preco','A.Imagem','TA.Descricao'
    ]).slice(startValue,endValue).sort({idArtigo:.1})
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


router.get('/:id',(req,res) =>{

  let idArtigo = req.params.id;

  console.log(idArtigo);

  database.table('Artigos as A')
    .join([{
        table: 'TipoArtigos as TA',
        on: 'A.TipoArtigo = TA.idTipo'
    }])
    .withFields([
        'A.Nome', 'A.Descricao as DescPrato','A.Preco','TA.Descricao'
    ])
    .filter({'A.idArtigo':idArtigo})
    .get().then(artigo =>{
      if(artigo){
        res.status(200).json(artigo)
      }else{
          res.json({message: `Sem artigos com o id ${idArtigo}`})
      }
    }).catch(err => console.log(err));
});


router.get('/categoria/:catName',(req,res ) => {
  let catName = req.params.catName;

  console.log(catName);

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

  database.table('Artigos as A')
  .join([{
      table: 'TipoArtigos as TA',
      on: 'A.TipoArtigo = TA.idTipo'
  }])
  .withFields([
      'A.Nome', 'A.Descricao as DescPrato','A.Preco','TA.Descricao'
  ]).slice(startValue,endValue).sort({idArtigo:.1}).filter({'TA.Descricao':catName})
  .getAll().then(art =>{
    if(art.length>0){
      res.status(200).json({
        artigos : art
      })
    }else{
        res.json({message: 'Sem artigos'})
    }
  }).catch(err => console.log(err));

});

module.exports = router;