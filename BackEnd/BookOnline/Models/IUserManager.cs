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
        void Remove(int id);
        bool Update(User user);
    }
}
