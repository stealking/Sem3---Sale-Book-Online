﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookOnline.Models;
using Newtonsoft.Json;
using System.Data.Entity;
using BookOnline.COR;
namespace BookOnline.Controllers
{
    [AllowCrossSiteJson]
    public class BookController : ApiController
    {
        static readonly IBookManager bookManager = new BookManager();
        //Get All Books
        [HttpGet]
        public IEnumerable<Book> GetAllBooks()
        {
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
            book.DateCreate = Convert.ToDateTime(book.DateCreate);
            book.DateUpdate = Convert.ToDateTime(book.DateUpdate);
            book.PublishDate = Convert.ToDateTime(book.PublishDate);
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
