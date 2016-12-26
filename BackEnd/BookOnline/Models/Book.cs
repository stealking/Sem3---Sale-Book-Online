//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BookOnline.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Book
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Book()
        {
            this.Types = new HashSet<Type>();
        }
    
        public int BookID { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public Nullable<double> Rate { get; set; }
        public string Description { get; set; }
        public Nullable<int> Quantity { get; set; }
        public Nullable<decimal> Price { get; set; }
        public string ImageUrl { get; set; }
        public Nullable<System.DateTime> PublishDate { get; set; }
        public Nullable<int> SaleOff { get; set; }
        public Nullable<System.DateTime> DateCreate { get; set; }
        public Nullable<int> UserIDCreate { get; set; }
        public Nullable<System.DateTime> DateUpdate { get; set; }
        public Nullable<int> UserIDUpdate { get; set; }
        public Nullable<bool> Flag { get; set; }
        public string Status { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Type> Types { get; set; }
    }
}
