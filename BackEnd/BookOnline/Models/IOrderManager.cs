using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookOnline.Models
{
    public interface IOrderManager
    {
        IEnumerable<Order> GetAll();
        Order Get(int id);
        Order Add(Order order);
        void Remove(int id);
        bool Update(Order order);
    }
}
