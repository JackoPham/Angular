using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace AnguarjsHepler.Models
{
    public class DemoModel
    {
        [Required]
        [Display(Name = "Your Name")]
        public int Name { get; set; }

        [Required]
        [Display(Name = "Your Address")]
        public string Address { get; set; }
    }
}