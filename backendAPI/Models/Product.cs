using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [StringLength(250)]
        public string Name { get; set; }

        [Required]
        [StringLength(25000)]
        public string Description { get; set; }

        [Required]
        public Double Price { get; set; }

        [Required]
        public string MainImage { get; set; }

        [Required]
        public Category Category { get; set; }
        [Required]
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }
    }
}
