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
        IList<OrderDetail> getdt;
        IList<OrderDetail> getdth;
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
        public dynamic Getdetail(int id)
        {
            var query = (from a in db.OrderDetails
                         join b in db.Books on a.BookID equals b.BookID
                         select new
                         {
                             a.BookID,
                             a.OrderID,
                             a.Number,
                             a.Flag,
                             b.Name,
                             b.Price,
                             b.ImageUrl,
                             b.Author
                         }).Where(w => w.OrderID == id && w.Flag == true).ToList();

            return query;

        }

        public dynamic Getdetailhistory(int id)
        {
            var query = (from a in db.OrderDetails
                join b in db.Books on a.BookID equals b.BookID
                select new
                {
                    a.BookID,
                    a.OrderID,
                    a.Number,
                    a.Flag,
                    b.Name,
                    b.Price,
                    b.ImageUrl,
                    b.Author
                }).Where(w => w.OrderID == id && w.Flag == false).ToList();

            return query;

        }

        public OrderDetail Add(OrderDetail orderdetail)
        {
            if (orderdetail == null)
            {
                throw new ArgumentNullException(nameof(orderdetail));
            }
            orderdetail.ID = db.OrderDetails.Max(s => s.ID) + 1;
            db.OrderDetails.Add(orderdetail);
            db.SaveChanges();
            return orderdetail;
        }

        public void Remove(int id)
        {

            var query = db.OrderDetails.Where(b => b.ID == id).Select(s => s);
            foreach (var item in query)
            {
                item.Flag = false;
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