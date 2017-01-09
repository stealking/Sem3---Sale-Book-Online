using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Data.Entity;
using System.Net.Http;


namespace BookOnline.Models
{
    public class BookManager : IBookManager
    {
        
        BookOnlineEntities db;
        IList<Book> books;
        public IEnumerable<Book> GetAll()
        {
            using (db = new BookOnlineEntities())
            {
                books = new List<Book>();
                var query = (from s in db.Books select s).Where(b => b.Flag == true).ToList();
                foreach (var item in query)
                {
                    books.Add(new Book
                    {
                        BookID = item.BookID,
                        Name = item.Name,
                        Author = item.Author,
                        Rate = item.Rate,
                        Description = item.Description,
                        Quantity = item.Quantity,
                        Price = item.Price,
                        ImageUrl = item.ImageUrl,
                        SaleOff = item.SaleOff,
                        Status = item.Status,
                        PublishDate = item.PublishDate,
                        DateCreate = item.DateCreate,
                        UserIDCreate = item.UserIDCreate,
                        UserIDUpdate = item.UserIDUpdate,
                        DateUpdate = item.DateUpdate,
                        Flag = item.Flag,
                    });
                }
                return books;
            }
            
        }

        public Book Get(int id)
        {
            using (db = new BookOnlineEntities())
            {
                Book book = null;
                var query = db.Books.SingleOrDefault(b => b.BookID == id);
                if (query != null)
                {
                    book = new Book
                    {
                        BookID = query.BookID,
                        Name = query.Name,
                        Author = query.Author,
                        Rate = query.Rate,
                        Description = query.Description,
                        Quantity = query.Quantity,
                        Price = query.Price,
                        ImageUrl = query.ImageUrl,
                        SaleOff = query.SaleOff,
                        PublishDate = query.PublishDate,
                        Status = query.Status,
                        DateCreate = query.DateCreate,
                        UserIDCreate = query.UserIDCreate,
                        UserIDUpdate = query.UserIDUpdate,
                        DateUpdate = query.DateUpdate,
                        Flag = query.Flag,
                    };
                }
                return book;
            }
            
        }

        public Book Add(Book book)
        {
            using (db = new BookOnlineEntities())
            {
                if (book == null)
                {
                    throw new ArgumentNullException(nameof(book));
                }
                book.BookID = db.Books.Max(s => s.BookID) + 1;
                book.DateCreate = DateTime.Now;
                book.Flag = true;
                db.Books.Add(book);
                db.SaveChanges();
                return book;
            }
            
        }

        public void Remove(int id)
        {
            using (db = new BookOnlineEntities())
            {
                var query = db.Books.Where(b => b.BookID == id).Select(s => s);
                foreach (var item in query)
                {
                    item.Flag = false;
                }
                db.SaveChanges();
            }
            
        }

        public bool Update(Book book)
        {
            using (db = new BookOnlineEntities())
            {
                var query = db.Books.Where(b => b.BookID == book.BookID);
                if (!query.Any())
                {
                    return false;
                }
                book.DateUpdate = DateTime.Now;
                db.Books.AddOrUpdate(book);
                db.SaveChanges();
                return true;
            }

        }

        public dynamic SearchBooksByName(string name)
        {
            using (db = new BookOnlineEntities())
            {
                
                var query = db.Books.Where(b => b.Name.Contains(name)).Select(s => new
                {
                    s.BookID,
                    s.Name,
                    s.Author,
                    s.Rate,
                    s.Quantity,
                    s.Price,
                    s.ImageUrl,
                    s.PublishDate,
                    s.SaleOff,
                    s.UserIDCreate,
                    s.DateCreate,
                    s.DateUpdate,
                    s.UserIDUpdate,
                    s.Description,
                    s.Flag
                }).ToList();
                return query;

            }
        }

        public bool UpdateBookImg(int id, string url)
        {
            using (db = new BookOnlineEntities())
            {
                var book = db.Books.SingleOrDefault(b => b.BookID == id);
                book.ImageUrl = url;
                db.Books.AddOrUpdate(book);
                db.SaveChanges();
                return true;
            }
        }

        public dynamic SearchMultiQuery(string name, int? Rate, int[] typeId, decimal? minPrice, decimal? maxPrice, string status)
        {
            using (db = new BookOnlineEntities())
            {
                var query = from s in db.Books
                            select new
                            {
                                s.BookID,
                                s.Name,
                                s.Author,
                                s.Rate,
                                s.Quantity,
                                s.Price,
                                s.ImageUrl,
                                s.PublishDate,
                                s.SaleOff,
                                s.UserIDCreate,
                                s.DateCreate,
                                s.DateUpdate,
                                s.UserIDUpdate,
                                s.Description,
                                s.Flag,
                                s.Status,
                                s.Types
                            };
              
                if (name != null)
                    query = query.Where(b => b.Name.Contains(name));
                if (Rate.HasValue)
                    query = query.Where(b => b.Rate == Rate);
                if (minPrice.HasValue)
                    query = query.Where(b => b.Price * (100 - b.SaleOff) * 100 >= minPrice);
                if (maxPrice.HasValue)
                    query = query.Where(b => b.Price * (100 - b.SaleOff) * 100 <= maxPrice);
                if (!String.IsNullOrEmpty(status))
                    query = query.Where(b => b.Status.Equals(status));
                Console.Write(typeId);
                if (typeId != null && typeId.Length > 0)
                {
                    //                    List<int> TypeId =  typeId.Where(t => t != null).Select(t=>(int)t).ToList();
                    List<int> TypeId = typeId.ToList();
                    query = query.Where(b => b.Types.Select(x => x.TypeID).Any() && b.Types.Select(x => x.TypeID).Intersect(TypeId).Any());
                }
                //query = query.Where(b => b.Types.SingleOrDefault(x => x.TypeID).ToArray().Except(typeId)));
                return query.ToList();
            }
        }

    }
}