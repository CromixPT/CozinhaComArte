using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Models
{
    public class OrderDetail
    {
        [Required]
        public int OrderId { get; set; }
        [Required]
        public Order Order { get; set; }

        [Required]
        public int ProductId { get; set; }
        [Required]
        public Product Product { get; set; }

        [Required]
        public int Quantity { get; set; }
        [Required]
        public Double UnitPrice { get; set; }
        [Required]
        public double TotalValue { get; set; }
    }
}
