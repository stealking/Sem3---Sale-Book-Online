using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace BookOnline.Models
{
    public class OrderDetailManager : IOrderDetailManager
    {
        BookOnlineEntities db = new BookOnlineEntities();
        IList<OrderDetail> ordersdetail;
        public IEnumerable<OrderDetail> GetAll()
        {
            ordersdetail = new List<OrderDetail>();
            var query = (from s in db.OrderDetails select s).ToList();
            foreach (var item in query)
            {
                ordersdetail.Add(new OrderDetail
                {
                    ID = item.ID,
                    OrderID = item.OrderID,
                    BookID = item.BookID,
                    Number = item.Number
                });
            }
            return ordersdetail;

        }

        public OrderDetail Get(int id)
        {
            OrderDetail ordersdetail = null;
            var query = db.OrderDetails.SingleOrDefault(b => b.ID == id);
            if (query != null)
            {
                ordersdetail = new OrderDetail
                {
                    ID = query.ID,
                    OrderID = query.OrderID,
                    BookID = query.BookID,
                    Number = query.Number
                };
            }
            return ordersdetail;
        }

        public OrderDetail Add(OrderDetail orderdetail)
        {
            if (orderdetail == null)
            {
                throw new ArgumentNullException(nameof(orderdetail));
            }
            orderdetail.OrderID = db.OrderDetails.Max(s => s.ID) + 1;
            db.OrderDetails.Add(orderdetail);
            db.SaveChanges();
            return orderdetail;
        }

        public void Remove(int id)
        {

            var query = db.OrderDetails.Where(b => b.ID == id).Select(s => s);
            foreach (var item in query)
            {
                item.flag = false;
            }
            db.SaveChanges();
        }

        public bool Update(OrderDetail orderdetail)
        {
            var query = db.OrderDetails.Where(b => b.ID == orderdetail.ID);
            if (!query.Any())
            {
                return false;
            }
            db.OrderDetails.AddOrUpdate(orderdetail);
            db.SaveChanges();
            return true;
        }

    }
}