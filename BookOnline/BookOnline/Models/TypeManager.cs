using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace BookOnline.Models
{
    public class TypeManager : ITypeManager
    {
        
            BookOnlineEntities db = new BookOnlineEntities();
            IList<Type> types;
        public IEnumerable<Type> GetAll()
        {
            types = new List<Type>();
            var query = (from s in db.Types select s).ToList();
            foreach (var item in query)
            {
                types.Add(new Type
                {
                    TypeID = item.TypeID,
                    Name = item.Name,
                    Flag = item.Flag
                });
            }
            return types;
        }

        public Type Get(int id)
        {
            Type type = null;
            var query = db.Types.SingleOrDefault(b => b.TypeID == id);
            if (query != null)
            {
                type = new Type
                {
                    TypeID = query.TypeID,
                    Name = query.Name,
                    Flag = query.Flag
                };
            }
            return type;
        }

        public Type Add(Type type)
        {
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }
            type.TypeID = db.Types.Max(s => s.TypeID) + 1;
            type.Flag = true;
            db.Types.Add(type);
            db.SaveChanges();
            return type;
        }


        public void Remove(int id)
        {
            var query = db.Types.Where(b => b.TypeID == id).Select(s => s);
            foreach (var item in query)
            {
                item.Flag = false;
            }
            db.SaveChanges();
        }

        public bool Update(Type type)
        {
            var query = db.Types.Where(b => b.TypeID == type.TypeID);
            if (!query.Any())
            {
                return false;
            }
            db.Types.AddOrUpdate(type);
            db.SaveChanges();
            return true;
        }
    }
}