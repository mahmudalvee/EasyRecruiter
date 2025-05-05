using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eRecruitment.Models
{
    [Table("user")]
    public class User
    {
        [Key]
        public string UserNo { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
