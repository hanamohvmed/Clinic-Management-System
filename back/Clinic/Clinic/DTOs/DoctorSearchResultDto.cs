namespace Clinic.DTOs;

public class DoctorSearchResultDto
{
	public int Id { get; set; }
	public string FullName { get; set; }
	public string ClinicAddress { get; set; }
	public string Specialization { get; set; }
	public string ProfilePictureUrl { get; set; }
	public object NextAvailableTime { get; set; }
	public string Bio { get; set; }

}
