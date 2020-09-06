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
        public ActionResult<IEnumerable<Product>> GetProdutcs()
        {
            var customers = _repository.GetProducts();

            return Ok(customers);
        }
    }
}
