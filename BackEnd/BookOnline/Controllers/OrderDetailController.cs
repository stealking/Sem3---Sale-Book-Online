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
    public class OrderDetailController : ApiController
    {
        static readonly IOrderDetailManager orderManager = new OrderDetailManager();

        //Get All Orders
        [HttpGet]
        public IEnumerable<OrderDetail> GetAllOrders()
        {
            return orderManager.GetAll();
        }
        //Get all oderdt form orderid
        [HttpGet]
        public dynamic GetAllOrdersdt(int id)
        {
            var order = orderManager.Getdetail(id);
            if (order == null)
            {
                throw new HttpResponseException(HttpStatusCode.OK);
            }
            return order;
        }
        [HttpGet]
        public dynamic GetAllOrdersdtistory(int id)
        {
            var order = orderManager.Getdetailhistory(id);
            if (order == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            return order;
        }
        //Get Order by id
        [HttpGet]
        public OrderDetail GetOrderById(int id)
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
        public OrderDetail AddOrder(OrderDetail orderdetail)
        {
            orderdetail = orderManager.Add(orderdetail);
            return orderdetail;
        }
        //Update Order
        [HttpPut]
        public void UpdateOrder(OrderDetail orderdetail)
        {
            if (!orderManager.Update(orderdetail))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        //Delete Order
        [HttpDelete]
        public void DeleteOrder(int id)
        {
            OrderDetail orderdetail = orderManager.Get(id);
            if (orderdetail == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            orderManager.Remove(id);
        }
    }
}
