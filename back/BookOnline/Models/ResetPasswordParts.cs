using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BookOnline.Models
{
    public class ResetPasswordParts
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime Expires { get; set; }
        public bool IsValid { get; set; }
    }
}