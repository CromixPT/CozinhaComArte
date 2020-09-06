using backendAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backendAPI.Data
{
    public class SqlCustomerRepository : ICustomerRepository
    {
        private ApplicationDbContext _context;

        public SqlCustomerRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void DeleteCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }

        public Customer GetCustomer(int customerId)
        {
            throw new NotImplementedException();
        }

        public IEnumerable<Customer> GetCustomers()
        {
            return _context.Customers.ToList();
        }

        public void NewCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }

        public bool SaveChanges()
        {
            throw new NotImplementedException();
        }

        public void UpdateCustomer(Customer customer)
        {
            throw new NotImplementedException();
        }
    }
}
