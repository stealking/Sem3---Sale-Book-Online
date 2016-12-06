using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookOnline.Models;
using Newtonsoft.Json;
using System.Data.Entity;
using BookOnline.COR;
using System.Web.Http.Cors;
namespace BookOnline.Controllers
{
    [EnableCors(origins: "http://localhost:4200",
     headers: "*", methods: "*")]
    public class BookController : ApiController
    {
        static readonly IBookManager bookManager = new BookManager();
        //Get All Books
        [Route("book/getAll")]
        [HttpGet]
        public IEnumerable<Book> GetAllBooks()
        {
//            throw new HttpResponseException(HttpStatusCode.Unauthorized);
            return bookManager.GetAll();
        }
        //Get Book by id
        [HttpGet]
        public Book GetBookById(int id)
        {
            var book = bookManager.Get(id);
            if (book == null)
            {
                throw new HttpResponseException(HttpStatusCode.OK);
            }
            return book;
        }
        //Add Book
        
        [HttpPost]
        public Book AddBook(Book book)
        {
            book.dateCreate = Convert.ToDateTime(book.dateCreate);
            book.dateUpdate = Convert.ToDateTime(book.dateUpdate);
            book.publishDate = Convert.ToDateTime(book.publishDate);
            book = bookManager.Add(book);
            return book;
        }
        //Update Book
        [HttpPut]
        public void UpdateBook(Book book)
        {
            if (!bookManager.Update(book))
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
        }
        //Delete Book
        [HttpDelete]
        public void DeleteBook(int id)
        {
            Book book = bookManager.Get(id);
            if (book == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            bookManager.Remove(id);
        }

        //Search book by Name
        [HttpGet]
        public dynamic SearchBooksByName(string name)
        {
            return bookManager.SearchBooksByName(name);
        }
    }
}
