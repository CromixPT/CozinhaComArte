using backendAPI.Data;
using backendAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Controllers
{
    [Route("/[controller]")]
    [ApiController]
    public class ProductsController:ControllerBase
    {
        private IProductRepository _repository;

        public ProductsController(IProductRepository repository)
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<ProductsReponse>> GetProdutcs()
        {
            var productsResponse = new ProductsReponse(_repository.GetProducts());

            return Ok(productsResponse);
        }

        //GET api/commands/id
        [HttpGet("{id}", Name = "GetCommandById")]
        public ActionResult<Product> GetCommandById(int id)
        {
            var product = _repository.GetProduct(id);

            if (product != null)
            {
                return Ok(product); ;
            }
            return NotFound();

        }
    }
}
