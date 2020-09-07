
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Models
{
    public class ProductsReponse
    {
        public int size { get; set; }
        public IEnumerable<Product> Products { get; set; }

        public ProductsReponse(IEnumerable<Product> products)
        {
            size = products.Count();
            Products = products;
        }
    }
}
