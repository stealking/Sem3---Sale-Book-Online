using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BookOnline.Models;
using Newtonsoft.Json;
using System.Data.Entity;
using System.Diagnostics;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
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

        [HttpGet]
        public dynamic SearchMultiQuery(string name, int? rate, int[] typeId, decimal? minPrice, decimal? maxPrice, string status)
        {
            return bookManager.SearchMultiQuery(name, rate, typeId, minPrice, maxPrice, status);
        }

        [HttpPost]
        public Task<HttpResponseMessage> PostFormData(int id)
        {
            
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }

            string root = HttpContext.Current.Server.MapPath("~/Content");
            CustomMultipartFormDataStreamProvider provider = new CustomMultipartFormDataStreamProvider(root);

            // Read the form data and return an async task.
            var task = Request.Content.ReadAsMultipartAsync(provider).
                ContinueWith<HttpResponseMessage>(t =>
                {
                    if (t.IsFaulted || t.IsCanceled)
                    {
                        Request.CreateErrorResponse(HttpStatusCode.InternalServerError, t.Exception);
                    }
                    //provider.FileData[0].LocalFileName = provider.FileData[0].Headers.ContentDisposition.FileName);
            // This illustrates how to get the file names.
            foreach (MultipartFileData file in provider.FileData)
                    {
                        Trace.WriteLine(file.Headers.ContentDisposition.FileName);
                        Trace.WriteLine("Server file path: " + file.LocalFileName);
                        string [] split = new string[] {"\\"};
                        var x = file.LocalFileName.Split(split, StringSplitOptions.None);
                        bookManager.UpdateBookImg(id, x[x.Length - 1]);
                    }
                    return Request.CreateResponse(HttpStatusCode.OK);
                });

            return task;
        }

    }

    public class CustomMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public CustomMultipartFormDataStreamProvider(string path) : base(path) { }

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            return headers.ContentDisposition.FileName.Replace("\"", string.Empty);
        }
    }
}
