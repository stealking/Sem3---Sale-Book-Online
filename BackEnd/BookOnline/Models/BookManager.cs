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
                        id = item.id,
                        name = item.name,
                        author = item.author,
                        rate = item.rate,
                        description = item.description,
                        quantity = item.quantity,
                        price = item.price,
                        imageUrl = item.imageUrl,
                        saleOff = item.saleOff,
                        publishDate = item.publishDate,
                        dateCreate = item.dateCreate,
                        userIdCreate = item.userIdCreate,
                        userIdUpdate = item.userIdUpdate,
                        dateUpdate = item.dateCreate,
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
                var query = db.Books.SingleOrDefault(b => b.id == id);
                if (query != null)
                {
                    book = new Book
                    {
                        id = query.id,
                        name = query.name,
                        author = query.author,
                        rate = query.rate,
                        description = query.description,
                        quantity = query.quantity,
                        price = query.price,
                        imageUrl = query.imageUrl,
                        saleOff = query.saleOff,
                        publishDate = query.publishDate,
                        dateCreate = query.dateCreate,
                        userIdCreate = query.userIdCreate,
                        userIdUpdate = query.userIdUpdate,
                        dateUpdate = query.dateCreate,
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
                book.id = db.Books.Max(s => s.id) + 1;
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
                var query = db.Books.Where(b => b.id == id).Select(s => s);
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
                var query = db.Books.Where(b => b.id == book.id);
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
                
                var query = db.Books.Where(b => b.name.Contains(name)).Select(s => new
                {
                    s.id,
                    s.name,
                    s.author,
                    s.rate,
                    s.quantity,
                    s.price,
                    s.imageUrl,
                    s.publishDate,
                    s.saleOff,
                    s.userIdCreate,
                    s.dateCreate,
                    s.dateUpdate,
                    s.userIdUpdate,
                    s.description,
                    s.flag
                }).ToList();
                return query;

            }
        }

    }
}