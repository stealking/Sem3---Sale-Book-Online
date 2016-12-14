using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace BookOnline.Models
{
    public interface IBookManager
    {
        IEnumerable<Book> GetAll();
        Book Get(int id);
        Book Add(Book book);
        void Remove(int id);
        bool Update(Book book);
        dynamic SearchBooksByName(string name);
        bool UpdateBookImg(int id, string url);
        dynamic SearchMultiQuery(string name, int? Rate, int?[] typeId, decimal? minPrice, decimal? maxPrice);
    }
}
