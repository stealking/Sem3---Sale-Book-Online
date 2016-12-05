using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using System.Data.Entity;


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
                var query = (from s in db.Books select s).ToList();
                foreach (var item in query)
                {
                    books.Add(new Book
                    {
                        BookID = item.BookID,
                        Name = item.Name,
                        Author = item.Author,
                        rate = item.rate,
                        Description = item.Description,
                        Quantity = item.Quantity,
                        Price = item.Price,
                        ImageUrl = item.ImageUrl,
                        SaleOff = item.SaleOff,
                        PublishDate = item.PublishDate,
                        DateCreate = item.DateCreate,
                        UserIDCreate = item.UserIDCreate,
                        UserIDUpdate = item.UserIDUpdate,
                        DateUpdate = item.DateCreate,
                        flag = item.flag,
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
                        rate = query.rate,
                        Description = query.Description,
                        Quantity = query.Quantity,
                        Price = query.Price,
                        ImageUrl = query.ImageUrl,
                        SaleOff = query.SaleOff,
                        PublishDate = query.PublishDate,
                        DateCreate = query.DateCreate,
                        UserIDCreate = query.UserIDCreate,
                        UserIDUpdate = query.UserIDUpdate,
                        DateUpdate = query.DateCreate,
                        flag = query.flag,
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
                book.flag = true;
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
                    item.flag = false;
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
                    s.rate,
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
                    s.flag
                }).ToList();
                return query;

            }
        }
    }
}