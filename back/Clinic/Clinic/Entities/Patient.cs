namespace Clinic.Entities;

public class Patient
{
	public int Id { get; set; }

	public DateTime BirthDate { get; set; }
	public string Gender { get; set; }

	public string UserId { get; set; }
	public ApplicationUser User { get; set; }
}
