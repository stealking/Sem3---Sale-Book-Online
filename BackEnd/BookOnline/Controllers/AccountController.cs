using System;
using System.Configuration;
using System.Data.Entity.Migrations;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;
using System.Web.Security;
using BookOnline.Models;
using Microsoft.AspNet.Identity;

namespace BookOnline.Controllers
{
    [EnableCors("http://localhost:4200", "*", "*")]
    public class AccountController : ApiController
    {
        

        [System.Web.Http.HttpPost]
        public dynamic RequestResetPasswordLink(string userName)
        {
            SendResetEmail(userName);
            return Ok();
        }

        public static void SendResetEmail(string _email)
        {
            var encrypted = Encryption.Encrypt(string.Format("{0}&{1}",
                _email,
                DateTime.Now.AddMinutes(60).Ticks),
                ConfigurationManager.AppSettings[Constants.DefaultSecurityStampClaimType]);

            var passwordLink = "http://localhost:4200/#/account/ResetPassword/?digest=" +
                               HttpUtility.UrlEncode(encrypted);

            var email = new MailMessage();

            email.From = new MailAddress("lecongm15@gmail.com");
            email.To.Add(_email);

            email.Subject = "Password Reset";
            email.IsBodyHtml = true;

            email.Body +=
                "<p>A request has been recieved to reset your password. If you did not initiate the request, then please ignore this email.</p> ";
            email.Body += "<p>Please click the following link to reset your password: <a href = '" + passwordLink +"' >passwordLink </a ></p> ";


            var smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.EnableSsl = true;
            var NetworkCred = new NetworkCredential("lecongm15@gmail.com", "Minhhan1");

            smtp.UseDefaultCredentials = false;
            smtp.Credentials = NetworkCred;
            smtp.Port = 587;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;

            smtp.Send(email);
        }

        [RequireHttps]
        [System.Web.Http.HttpGet]
        public dynamic ResetPassword(string digest)
        {
            var parts = ValidateResetCode(HttpUtility.UrlDecode(digest));
            if (!parts.IsValid) return NotFound();
            return parts;
        }

        [System.Web.Http.HttpPut]
        public void ChangePassword(ResetPasswordParts parts)
        {
            using (BookOnlineEntities db = new BookOnlineEntities())
            {
                var query = db.Users.SingleOrDefault(u => u.Email == parts.Email);
                if (query != null)
                {
                    query.Password = parts.Password;
                    db.Users.AddOrUpdate(query);
                    db.SaveChanges();
                }
            }
        }

        public static ResetPasswordParts ValidateResetCode(string encryptedParam)
        {
            using (BookOnlineEntities db = new BookOnlineEntities())
            {
                var decrypted = "";
                var results = new ResetPasswordParts();
                try
                {
                    decrypted = Encryption.Decrypt(encryptedParam, ConfigurationManager
                        .AppSettings[Constants.DefaultSecurityStampClaimType]);

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }

                var parts = decrypted.Split('&');

                if (parts.Length != 2) return results;

                var expires = DateTime.Now.AddHours(-1);
                var _email = parts[0];
                var query = db.Users.SingleOrDefault(s => s.Email == _email);
                if (query == null) return results;

                long ticks = 0;
                if (!long.TryParse(parts[1], out ticks)) return results;
                expires = new DateTime(ticks);
                results.Expires = expires;

                if (expires < DateTime.Now) return results;
                results.IsValid = true;
                results.Email = query.Email;
                return results;
            }
        }
    }


    public class Encryption
    {
        private const string _defaultKey = "*3ld+43j";


        public static string Encrypt(string toEncrypt, string key)
        {
            var des = new DESCryptoServiceProvider();
            var ms = new MemoryStream();

            VerifyKey(ref key);

            des.Key = HashKey(key, des.KeySize/8);
            des.IV = HashKey(key, des.KeySize/8);
            var inputBytes = Encoding.UTF8.GetBytes(toEncrypt);

            var cs = new CryptoStream(ms, des.CreateEncryptor(), CryptoStreamMode.Write);
            cs.Write(inputBytes, 0, inputBytes.Length);
            cs.FlushFinalBlock();

            return HttpServerUtility.UrlTokenEncode(ms.ToArray());
        }

        public static string Decrypt(string toDecrypt, string key)
        {
            var des = new DESCryptoServiceProvider();
            var ms = new MemoryStream();

            VerifyKey(ref key);

            des.Key = HashKey(key, des.KeySize/8);
            des.IV = HashKey(key, des.KeySize/8);
            var inputBytes = HttpServerUtility.UrlTokenDecode(toDecrypt);

            var cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write);
            cs.Write(inputBytes, 0, inputBytes.Length);
            cs.FlushFinalBlock();

            var encoding = Encoding.UTF8;
            return encoding.GetString(ms.ToArray());
        }

        /// <summary>
        ///     Make sure key is exactly 8 characters
        /// </summary>
        /// <param name="key"></param>
        private static void VerifyKey(ref string key)
        {
            if (string.IsNullOrEmpty(key))
                key = _defaultKey;

            key = key.Length > 8 ? key.Substring(0, 8) : key;

            if (key.Length < 8)
            {
                for (var i = key.Length; i < 8; i++)
                {
                    key += _defaultKey[i];
                }
            }
        }

        private static byte[] HashKey(string key, int length)
        {
            var sha = new SHA1CryptoServiceProvider();
            var keyBytes = Encoding.UTF8.GetBytes(key);
            var hash = sha.ComputeHash(keyBytes);
            var truncateHash = new byte[length];
            Array.Copy(hash, 0, truncateHash, 0, length);
            return truncateHash;
        }
    }
}