using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using System.Web.Razor.Generator;

namespace BookOnline.Models
{
    public class OrderDetailManager : IOrderDetailManager
    {
        BookOnlineEntities db;
        IList<OrderDetail> ordersdetail;
        IList<OrderDetail> getdt;
        IList<OrderDetail> getdth;

        public IEnumerable<OrderDetail> GetAll()
        {
            using (db = new BookOnlineEntities())
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
        }

        public OrderDetail Get(int id)
        {
            using (db = new BookOnlineEntities())
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
        }

        public IEnumerable<OrderDetail> Getdetail(int id)
        {
            using (db = new BookOnlineEntities())
            {
                getdt = new List<OrderDetail>();
                var query = (db.OrderDetails.Where(oder => oder.OrderID == id && oder.Flag == true)).ToList();
                foreach (var item in query)
                {
                    getdt.Add(new OrderDetail
                    {
                        ID = item.ID,
                        OrderID = item.OrderID,
                        BookID = item.BookID,
                        Number = item.Number
                    });
                }
                return getdt;
            }
        }

        public IEnumerable<OrderDetail> Getdetailhistory(int id)
        {
            using (db = new BookOnlineEntities())
            {
                getdth = new List<OrderDetail>();
                var query = (db.OrderDetails.Where(oder => oder.OrderID == id && oder.Flag == true)).ToList();
                foreach (var item in query)
                {
                    getdth.Add(new OrderDetail
                    {
                        ID = item.ID,
                        OrderID = item.OrderID,
                        BookID = item.BookID,
                        Number = item.Number
                    });
                }
                return getdth;
            }
        }

        public OrderDetail Add(OrderDetail orderdetail)
        {
            using (db = new BookOnlineEntities())
            {
                if (orderdetail == null)
                {
                    throw new ArgumentNullException(nameof(orderdetail));
                }
                orderdetail.ID = db.OrderDetails.Max(s => s.ID) + 1;
                db.OrderDetails.Add(orderdetail);
                db.SaveChanges();
//                db.Dispose();
                return orderdetail;
            }
        }

        public void Remove(int id)
        {
            using (db = new BookOnlineEntities())
            {
                var query = db.OrderDetails.Where(b => b.ID == id).Select(s => s);
                foreach (var item in query)
                {
                    item.Flag = false;
                }
                db.SaveChanges();
//                db.Dispose();
            }
        }

        public bool Update(OrderDetail orderdetail)
        {
            using (db = new BookOnlineEntities())
            {
                var query = db.OrderDetails.Where(b => b.ID == orderdetail.ID);
                if (!query.Any())
                {
                    return false;
                }
                db.OrderDetails.AddOrUpdate(orderdetail);
                db.SaveChanges();
//                db.Dispose();
                return true;

            }
        }
    }
}