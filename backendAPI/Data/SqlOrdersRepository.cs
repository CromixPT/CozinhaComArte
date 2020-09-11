
using backendAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Data
{
    public class SqlOrdersRepository : IOrdersRepository
    {
        private readonly ApplicationDbContext _context;

        public SqlOrdersRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void DeleteOrder(Order order)
        {
            throw new NotImplementedException();
        }

        public Order GetOrder(int orderId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Order> GetOrders()
        {
            return _context.Orders.ToList();
        }
        public void NewOrder(Order newOrder)
        {
            throw new NotImplementedException();
        }

        public bool SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void UpdateOrder(Order order)
        {
            throw new NotImplementedException();
        }
    }
}
