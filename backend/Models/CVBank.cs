using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eRecruitment.Models
{
    [Table("CVBank")]
    public class CVBank
    {
        [Key]
        public int CVId { get; set; }
        public int RequisitionID { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }

        public string? Phone { get; set; }
        public string? Education { get; set; }
        public string? Skill { get; set; }
        public string? Experience { get; set; }
        public string? Gender { get; set; }
        public string? MatchDescriptionSkill { get; set; }
        public byte[]? Cv { get; set; }
    }
}
