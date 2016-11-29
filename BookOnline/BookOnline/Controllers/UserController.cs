using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookOnline.Models;


namespace BookOnline.Controllers
{
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
    }
}
