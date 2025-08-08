using System.ComponentModel.DataAnnotations.Schema;

namespace Clinic.Entities;

public class Doctor
{
	public int Id { get; set; }
	public string? ClinicAddress { get; set; }
	public string? Bio { get; set; }

	public string UserId { get; set; }
	public ApplicationUser User { get; set; }
	public int SpecializationId { get; set; }

	[ForeignKey(nameof(SpecializationId))]
	public Specialization Specialization { get; set; }

}
