using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookOnline.Models
{
    public interface IEmailManager
    {
        bool SendEmail(testEmail email);
    }
}