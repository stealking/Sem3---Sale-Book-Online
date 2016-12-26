﻿using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace BookOnline.Models
{
    public class OrderManager : IOrderManager
    {

        BookOnlineEntities db = new BookOnlineEntities();
        IList<Order> orders;
        public IEnumerable<Order> GetAll()
        {
            orders = new List<Order>();
            var query = (from s in db.Orders where s.Flag == true select s).ToList();
            foreach (var item in query)
            {
                orders.Add(new Order
                {
                    OrderID = item.OrderID,
                    UserID = item.UserID,
                    Date = item.Date,
                    ReceiverCity = item.ReceiverCity,
                    ReceiverDistrict = item.ReceiverDistrict,
                    ReceiverAddress = item.ReceiverAddress,
                    ReceiverPhone = item.ReceiverPhone,
                    LogisticsCost = item.LogisticsCost,
                    AddressType = item.AddressType,
                    Status = item.Status,
                    Flag = item.Flag
                });
            }
            return orders;
        }

        public IEnumerable<Order> GetOrderHistory()
        {
            orders = new List<Order>();
            var query = (from s in db.Orders where s.Flag == false select s).ToList();
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

        public dynamic SearchByUserID(int id)
        {
            using (db = new BookOnlineEntities())
            {

                var query = (from b in db.Orders
                    where (b.Flag == true && b.UserID == id && b.Status == "new")
                    select new
                    {
                        b.OrderID,
                        b.Date,
                        b.UserID,
                        b.ReceiverCity,
                        b.ReceiverDistrict,
                        b.ReceiverAddress,
                        b.ReceiverPhone,
                        b.LogisticsCost,
                        b.AddressType,
                        b.Status,
                        b.Flag,
                        b.OrderDetails,
                    });
                return JsonConvert.SerializeObject(query);
                //                return query;

                //                var query = db.Orders.Where(b => b.Flag == true && b.UserID == id).Select(s => new
                //                {
                //                    s.OrderID,
                //                    s.Date,
                //                    s.UserID,
                //                    s.Flag,
                //                    s.OrderDetails
                //                });
                ////                return query;
//                JObject obj = JObject.FromObject(query);
//                return obj.ToString(Formatting.None);
//                return query;
            }

           
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