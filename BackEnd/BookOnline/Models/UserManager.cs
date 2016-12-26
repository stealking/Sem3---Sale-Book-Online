using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace BookOnline.Models
{
    public class UserManager : IUserManager
    {
        BookOnlineEntities db;
        IList<User> users;
        public IEnumerable<User> GetAll()
        {
            using (db = new BookOnlineEntities())
            {
                users = new List<User>();
                var query = db.Users.Select(s => s).Where(b => b.Flag == true).ToList();
                foreach (var item in query)
                {
                    users.Add(new User
                    {
                        UserID = item.UserID,
                        Email = item.Email,
                        Password = item.Password,
                        Name = item.Name,
                        Address = item.Address,
                        DateOfBirth = item.DateOfBirth,
                        VisaCode = item.VisaCode,
                        Phone = item.Phone,
                        RoleID = item.RoleID,
                        Flag = item.Flag
                    });
                }
                return users;
            }
        }

        public User Get(int id)
        {
            using (db = new BookOnlineEntities())
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
                        DateOfBirth = query.DateOfBirth,
                        VisaCode = query.VisaCode,
                        Phone = query.Phone,
                        RoleID = query.RoleID,
                        Flag = query.Flag
                    };
                }
                return user;
            }
        }

        public User Add(User user)
        {
            using (db = new BookOnlineEntities())
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
        }

        public dynamic Login(string email, string password)
        {
           
                using (db = new BookOnlineEntities())
                {
                    User user = null;
                    var query = db.Users.FirstOrDefault(u => u.Email == email && u.Password == password);
                    if (query != null)
                    {
                        user = new User
                        {
                            UserID = query.UserID,
                            Email = query.Email,
                            Password = query.Password,
                            RoleID = query.RoleID
                        };
                    }
                    return user;
                }         
        }

        public void Remove(int id)
        {
            using (db = new BookOnlineEntities())
            {
                var query = db.Users.Where(b => b.UserID == id).Select(s => s);
                foreach (var item in query)
                {
                    item.Flag = false;
                }
                db.SaveChanges();
            }
        }

        public bool Update(User user)
        {
            using (db = new BookOnlineEntities())
            {
                var result = db.Users.SingleOrDefault(u => u.UserID.Equals(user.UserID));
                if (result != null)
                {
                    result.Email = user.Email;
                    result.Password = user.Password;
                    result.Name = user.Name;
                    result.Address = user.Address;
                    result.DateOfBirth = user.DateOfBirth;
                    result.VisaCode = user.VisaCode;
                    result.Phone = user.Phone;
                    result.RoleID = user.RoleID;
                    db.SaveChanges();
                }
            }

            return true;
        }

        public bool ChangePassword(int id, string newPass)
        {
            using (db = new BookOnlineEntities())
            {
                var result = db.Users.SingleOrDefault(u => u.UserID == id);
                if (result != null)
                {
                    result.Password = newPass;
                    db.SaveChanges();
                }
            }
            return true;
        }
    }
}