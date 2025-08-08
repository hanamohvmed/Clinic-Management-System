namespace Clinic.DTOs;

public class DoctorSlotDto
{
	public DateTime Date { get; set; }
	public TimeSpan Time { get; set; }
	public int SessionMinutes { get; set; }
	public int MaxPatients { get; set; }
	public bool IsActive { get; set; }
}
