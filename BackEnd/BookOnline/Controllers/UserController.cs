﻿using System;
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
            user.RoleID = 2;
            user = userManager.Add(user);
            return user;
        }

        [HttpGet]
        public dynamic Login(string email, string password)
        {
            return userManager.Login(email, password);
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

        [HttpPut]
        public void ChangePassword(int id, string newPass)
        {
            if (!userManager.ChangePassword(id, newPass))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }

    }
}
