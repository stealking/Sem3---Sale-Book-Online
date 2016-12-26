using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Security;

namespace BookOnline.Controllers
{
    
    [EnableCors(origins: "http://localhost:4200",
     headers: "*", methods: "*")]
    public class AccountController : ApiController
    {
        static int _minExpires = 60;
        [HttpGet]
        public dynamic SendEmail(string emailStr)
        {
            SendResetEmail(emailStr);
            return "OK";
        }

        public static void SendResetEmail(string emailStr)
        {
//            string encrypted = Encryption.Encrypt(String.Format("{0}&{1}",
//                user.UserName,
//                DateTime.Now.AddMinutes(_minExpires).Ticks),
//                ConfigurationManager.AppSettings[Constants.keyEncryptionKey]);

            var passwordLink = "Account/ResetPassword?digest=";
//                  HttpUtility.UrlEncode(encrypted);

            var email = new MailMessage();

            email.From = new MailAddress("admin@domain.com");
            email.To.Add(emailStr);

            email.Subject = "Password Reset";
            email.IsBodyHtml = true;

            email.Body += "<p>A request has been recieved to reset your password. If you did not initiate the request, then please ignore this email.</ p > ";
            email.Body += "<p>Please click the following link to reset your password: < a href = '" + passwordLink + "' > " + passwordLink + " </ a ></ p > ";


            SmtpClient smtpClient = new SmtpClient();

            try
            {
                smtpClient.Send(email);
            }
            catch (Exception ex)
            {
//                ErrorHandler.HandleError(ex, ErrorHandler.Level.Error);
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

                des.Key = HashKey(key, des.KeySize / 8);
                des.IV = HashKey(key, des.KeySize / 8);
                byte[] inputBytes = Encoding.UTF8.GetBytes(toEncrypt);

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

                des.Key = HashKey(key, des.KeySize / 8);
                des.IV = HashKey(key, des.KeySize / 8);
                byte[] inputBytes = HttpServerUtility.UrlTokenDecode(toDecrypt);

                var cs = new CryptoStream(ms, des.CreateDecryptor(), CryptoStreamMode.Write);
                cs.Write(inputBytes, 0, inputBytes.Length);
                cs.FlushFinalBlock();

                var encoding = Encoding.UTF8;
                return encoding.GetString(ms.ToArray());

            }

            /// <summary>
            /// Make sure key is exactly 8 characters
            /// </summary>
            /// <param name="key"></param>
            private static void VerifyKey(ref string key)
            {
                if (string.IsNullOrEmpty(key))
                    key = _defaultKey;

                key = key.Length > 8 ? key.Substring(0, 8) : key;

                if (key.Length < 8)
                {
                    for (int i = key.Length; i < 8; i++)
                    {
                        key += _defaultKey[i];
                    }
                }
            }

            private static byte[] HashKey(string key, int length)
            {
                var sha = new SHA1CryptoServiceProvider();
                byte[] keyBytes = Encoding.UTF8.GetBytes(key);
                byte[] hash = sha.ComputeHash(keyBytes);
                byte[] truncateHash = new byte[length];
                Array.Copy(hash, 0, truncateHash, 0, length);
                return truncateHash;
            }
        }

    }
}


