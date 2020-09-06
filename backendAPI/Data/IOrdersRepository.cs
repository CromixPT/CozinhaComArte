using backendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Data
{
    public interface IOrdersRepository
    {
        bool SaveChanges();
        IEnumerable<Order> GetOrders();
        Order GetOrder(int orderId);
        void NewOrder(Order newOrder);
        void UpdateOrder(Order order);
        void DeleteOrder(Order order);
    }
}
