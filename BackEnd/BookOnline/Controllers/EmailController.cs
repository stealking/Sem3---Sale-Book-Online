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
    public class EmailController : ApiController
    {
        static readonly IEmailManager emailManager = new EmailManager();

        [HttpPost]
        public void SendEmail(testEmail email)
        {
            if (!emailManager.SendEmail(email))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
    }
}
