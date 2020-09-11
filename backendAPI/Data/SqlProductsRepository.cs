using backendAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Data
{
    public class SqlProductsRepository : IProductRepository
    {
        private ApplicationDbContext _context;

        public SqlProductsRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void DeleteProduct(Product product)
        {
            throw new NotImplementedException();
        }

        public Product GetProduct(int productId)
        {
            return _context.Products.Include(p=> p.Category).FirstOrDefault(p => p.Id == productId);
        }

        public IEnumerable<Product> GetProducts()
        {
            return _context.Products.Include(p => p.Category).ToList();
        
        }

        public void NewProduct(Product newOrder)
        {
            throw new NotImplementedException();
        }

        public bool SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void UpdateProduct(Product order)
        {
            throw new NotImplementedException();
        }
    }
}
