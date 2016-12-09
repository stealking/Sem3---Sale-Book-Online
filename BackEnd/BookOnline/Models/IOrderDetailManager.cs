using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookOnline.Models
{
    public interface IOrderDetailManager
    {
        IEnumerable<OrderDetail> GetAll();
        OrderDetail Get(int id);
        OrderDetail Add(OrderDetail orderdetail);
        void Remove(int id);
        bool Update(OrderDetail orderdetail);
    }
}
