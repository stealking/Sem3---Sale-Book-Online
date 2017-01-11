using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookOnline.Models;
using System.Web.Http.Cors;

namespace BookOnline.Controllers
{
    [EnableCors(origins: "http://localhost:4200",
     headers: "*", methods: "*")]
    public class OrderController : ApiController
    {
        static readonly IOrderManager orderManager = new OrderManager();

        [HttpGet]
        public IEnumerable<Order> GetAllOrderHistory(int id)
        {
            return orderManager.GetOrderHistory(id);
        }

            //Get All Orders with True Flags!
        [HttpGet]
        public IEnumerable<Order> GetAllOrders()
        {
            return orderManager.GetAll();
        }
        [HttpGet]
        public dynamic SearchByUserID(int id)
        {
            return orderManager.SearchByUserID(id);
        }
        //Get Order by id
        [HttpGet]
        public Order GetOrderById(int id)
        {
            var order = orderManager.Get(id);
            if (order == null)
            {
                throw new HttpResponseException(HttpStatusCode.OK);
            }
            return order;
        }
        //Add Order
        [HttpPost]
        public Order AddOrder(Order order)
        {
            order = orderManager.Add(order);
            return order;
        }
        //Update Order
        [HttpPut]
        public void UpdateOrder(Order order)
        {
            if (!orderManager.Update(order))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        //Delete Order
        [HttpDelete]
        public void DeleteOrder(int id)
        {
            Order order = orderManager.Get(id);
            if (order == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            orderManager.Remove(id);
        }
    }
}
