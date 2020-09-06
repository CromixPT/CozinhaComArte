using backendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Data
{
    public interface IProductRepository
    {
        bool SaveChanges();
        IEnumerable<Product> GetProducts();
        Product GetProduct(int orderId);
        void NewProduct(Product newOrder);
        void UpdateProduct(Product order);
        void DeleteProduct(Product order);
    }
}
