using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Clinic.Entities;


public class Appointment
{
	public int Id { get; set; }

	public int DoctorSlotId { get; set; }
	[ForeignKey(nameof(DoctorSlotId))]
	public DoctorSlot DoctorSlot { get; set; }

	public int PatientId { get; set; }
	[ForeignKey(nameof(PatientId))]
	public Patient Patient { get; set; }

	[MaxLength(100)]
	public string PhoneNumber { get; set; }
	public string? Reason { get; set; }
	public DateTime BookingDate { get; set; } = DateTime.UtcNow;

	public TimeSpan AssignedTime { get; set; }
}

