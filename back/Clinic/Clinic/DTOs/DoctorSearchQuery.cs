namespace Clinic.DTOs;

public class DoctorSearchQuery
{
	public string? DoctorName { get; set; }
	public int? SpecialtyId { get; set; }
	//public DateTime? Date { get; set; }
	public int PageNumber { get; set; } = 1;
	public int PageSize { get; set; } = 10;
}