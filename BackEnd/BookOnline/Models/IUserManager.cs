using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookOnline.Models
{
        public interface IUserManager
    {
        IEnumerable<User> GetAll();
        User Get(int id);
        User Add(User user);
        dynamic Login(string email, string password);
        void Remove(int id);
        bool Update(User user);
        bool ChangePassword(int id, string newPass);
    }
}
