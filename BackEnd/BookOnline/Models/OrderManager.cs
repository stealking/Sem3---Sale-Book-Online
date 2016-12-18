﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace BookOnline.Models
{
    public class OrderManager : IOrderManager
    {

        BookOnlineEntities db = new BookOnlineEntities();
        IList<Order> orders;
        public IEnumerable<Order> GetAll()
        {
            orders = new List<Order>();
            var query = (from s in db.Orders select s).ToList();
            foreach (var item in query)
            {
                orders.Add(new Order
                {
                    OrderID = item.OrderID,
                    UserID = item.UserID,
                    Date = item.Date,
                    Flag = item.Flag
                });
            }
            return orders;
        }

        public Order Get(int id)
        {
            Order order = null;
            var query = db.Orders.SingleOrDefault(b => b.OrderID == id);
            if (query != null)
            {
                order = new Order
                {
                    OrderID = query.OrderID,
                    UserID = query.UserID,
                    Date = query.Date,
                    Flag = query.Flag
                };
            }
            return order;
        }

        public Order Add(Order order)
        {
            if (order == null)
            {
                throw new ArgumentNullException(nameof(order));
            }
            order.OrderID = db.Orders.Max(s => s.OrderID) + 1;
            order.Flag = true;
            db.Orders.Add(order);
            db.SaveChanges();
            return order;
        }

        public void Remove(int id)
        {
            var query = db.Orders.Where(b => b.OrderID == id).Select(s => s);
            foreach (var item in query)
            {
                item.Flag = false;
            }
            var query1 = db.OrderDetails.Where(b => b.OrderID == id).Select(s => s);
            foreach (var item1 in query1)
            {
                item1.Flag = false;
            }
            db.SaveChanges();
        }

        public bool Update(Order order)
        {
            var query = db.Orders.Where(b => b.OrderID == order.OrderID);
            if (!query.Any())
            {
                return false;
            }
            db.Orders.AddOrUpdate(order);
            db.SaveChanges();
            return true;
        }
    }
}