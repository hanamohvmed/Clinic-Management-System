namespace Clinic.DTOs;

public class RegisterDoctorDto
{
	public string FullName { get; set; }
	public string Email { get; set; }
	public string Password { get; set; }
	public string? ProfilePictureUrl { get; set; }
	public string? Bio { get; set; }
	public int SpecializationId { get; set; }
	public string ClinicAddress { get; set; }
}
