using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Models
{
    public class Order
    {
        public int Id { get; set; }
        [Required]
        public Customer Customer { get; set; }
        [Required]
        public string DeliveryAddress { get; set; }
        [Required]
        public DateTime OrderDate { get; set; }
        public Voucher Voucher { get; set; }
        [Required]
        public ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
        [Required]
        public DateTime DeliveryDate { get; set; }
        public bool IsDelivered { get; set; }
        [Required]
        public PaymentType PaymentType { get; set; }
        public string PaymentReference { get; set; }
        public bool IsPayed { get; set; }
    }
}
