using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eRecruitment.Models
{
    [Table("recruitment")] // Ensures it maps to the correct MySQL table
    public class Requisition
    {
        [Key]
        public int RequisitionID { get; set; }

        [Required]
        public string RequisitionName { get; set; }

        [Required]
        public string Designation { get; set; }

        [Required]
        public string Department { get; set; }

        [Required]
        public string Grade { get; set; }

        [Required]
        public decimal Salary { get; set; }

        [Required]
        public string Vacancy { get; set; }

        public string? DescriptionSkill { get; set; }
    }
}
