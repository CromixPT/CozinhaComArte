using backendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Data
{
    public interface ICustomerRepository
    {
        bool SaveChanges();
        IEnumerable<Customer> GetCustomers();
        Customer GetCustomer(int customerId);
        void NewCustomer(Customer customer);
        void UpdateCustomer(Customer customer);
        void DeleteCustomer(Customer customer);
    }
}
