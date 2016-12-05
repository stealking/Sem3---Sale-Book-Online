using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace BookOnline.Models
{
    public class UserManager : IUserManager
    {
        BookOnlineEntities db = new BookOnlineEntities();
        IList<User> users;
        public IEnumerable<User> GetAll()
        {
            users = new List<User>();
            var query = db.Users.Select(s => s).ToList();
            foreach (var item in query)
            {
                users.Add(new User
                {
                    UserID = item.UserID,
                    Email = item.Email,
                    Password = item.Password,
                    Name = item.Name,
                    Address = item.Address,
                    VisaCode = item.VisaCode,
                    Phone = item.Phone,
                    RoleID = item.UserID,
                    Flag = item.Flag
                });
            }
            return users;
        }

        public User Get(int id)
        {
            User user = null;
            var query = db.Users.SingleOrDefault(s => s.UserID == id);
            if (query != null)
            {
                user = new User
                {
                    UserID = query.UserID,
                    Email = query.Email,
                    Password = query.Password,
                    Name = query.Name,
                    Address = query.Address,
                    VisaCode = query.VisaCode,
                    Phone = query.Phone,
                    RoleID = query.UserID,
                    Flag = query.Flag
                };
            }
            return user;
        }

        public User Add(User user)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            user.UserID = db.Users.Max(s => s.UserID) + 1;
            user.Flag = true;
            db.Users.Add(user);
            db.SaveChanges();
            return user;
        }

        public void Remove(int id)
        {
            var query = db.Users.Where(b => b.UserID == id).Select(s => s);
            foreach (var item in query)
            {
                item.Flag = false;
            }
            db.SaveChanges();
        }

        public bool Update(User user)
        {

            var query = db.Users.Where(b => b.UserID == user.UserID);
            if (!query.Any())
            {
                return false;
            }
            db.Users.AddOrUpdate(user);
            db.SaveChanges();
            return true;
        }
    }
}