using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookOnline.Models
{
    public interface ITypeManager
    {
        IEnumerable<Type> GetAll();
        Type Get(int id);
        Type Add(Type type);
        void Remove(int id);
        bool Update(Type type);
    }
}
