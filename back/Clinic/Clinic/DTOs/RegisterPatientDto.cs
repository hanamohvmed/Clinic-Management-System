namespace Clinic.DTOs;

public class RegisterPatientDto
{
	public string FullName { get; set; }
	public string Email { get; set; }
	public string Password { get; set; }

	public DateTime BirthDate { get; set; }
	public string Gender { get; set; }
}
