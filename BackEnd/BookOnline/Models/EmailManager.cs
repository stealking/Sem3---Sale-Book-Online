using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;


namespace BookOnline.Models
{
    public class EmailManager : IEmailManager
    {
        public bool SendEmail(testEmail email)
        {
            SmtpClient mailClient = new SmtpClient("smtp.gmail.com", 587);
            mailClient.EnableSsl = true;
            mailClient.Credentials = new NetworkCredential("lecongm15@gmail.com", "Minhhan1");

            MailMessage mailMessage = new MailMessage("lecongm15@gmail.com", "sirdat1993@gmail.com");
            mailMessage.Subject = email.ContactSubject;
            mailMessage.Body = "Form Email: "+email.Email+ "<br/>"+
                "Nội dung: " + email.Content;
            try
            {
                mailClient.Send(mailMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;

            }
            return true;


        }
    }
}