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
    public class UserController : ApiController
    {
        static readonly IUserManager userManager = new UserManager();
        //Get All Users
        [HttpGet]
        public IEnumerable<User> GetAllUsers()
        {
            return userManager.GetAll();
        }
        //Get User by id
        [HttpGet]
        public User GetUserById(int id)
        {
            var user = userManager.Get(id);
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.OK);
            }
            return user;
        }
        //Add User
        [HttpPost]
        public User AddUser(User user)
        {
            user.DateOfBirth = Convert.ToDateTime(user.DateOfBirth);
            user = userManager.Add(user);
            return user;
        }
        //Update User
        [HttpPut]
        public void UpdateUser(User user)
        {
            if (!userManager.Update(user))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        //Delete User
        [HttpDelete]
        public void DeleteUser(int id)
        {
            User user = userManager.Get(id);
            if (user == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            userManager.Remove(id);
        }
        [HttpGet]
        public bool CheckExistEmail(string email)
        {
            using (var db = new BookOnlineEntities())
            {
                var query = db.Users.SingleOrDefault(u => u.Email == email);
                if (query != null)
                {
                    return true;
                }
                return false;
            }
        }
    }

}
