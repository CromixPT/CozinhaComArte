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
        public void DeleteProduct(Product order)
        {
            throw new NotImplementedException();
        }

        public Product GetProduct(int orderId)
        {
            throw new NotImplementedException();
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
