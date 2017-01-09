using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookOnline.Models;
using Type = BookOnline.Models.Type;
using System.Web.Http.Cors;

namespace BookOnline.Controllers
{
    [EnableCors(origins: "http://localhost:4200",
     headers: "*", methods: "*")]
    public class TypeController : ApiController
    {
        static readonly ITypeManager typeManager = new TypeManager();

        //Get All Types
        [HttpGet]
        public IEnumerable<Type> GetAllTypes()
        {
            return typeManager.GetAll();
        }
        //Get Type by id
        [HttpGet]
        public Type GetTypeById(int id)
        {
            var type = typeManager.Get(id);
            if (type == null)
            {
                throw new HttpResponseException(HttpStatusCode.OK);
            }
            return type;
        }
        //Add Type
        [HttpPost]
        public Type AddType(Type type)
        {
            type = typeManager.Add(type);
            return type;
        }
        //Update Type
        [HttpPut]
        public void UpdateType(Type type)
        {
            if (!typeManager.Update(type))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        //Delete Type
        [HttpDelete]
        public void DeleteType(int id)
        {
            Type type = typeManager.Get(id);
            if (type == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            typeManager.Remove(id);
        }
    }
}
