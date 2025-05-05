using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eRecruitment.Models
{
    [Table("Assessment")]
    public class Assessment
    {
        [Key]
        public int AssessmentId { get; set; }

        [Required]
        public int CVId { get; set; } // Foreign Key to CVBank

        [Required]
        public int RequisitionID { get; set; } // Foreign Key to recruitment

        public double? WrittenMarks { get; set; }
        public double? VivaMarks { get; set; }
        public double? OtherMarks { get; set; }
        public double? TotalMarks { get; set; }

        [MaxLength(255)]
        public string? Comment { get; set; }

        public bool? IsSelected { get; set; }
    }
}
