using System.ComponentModel.DataAnnotations.Schema;

namespace Clinic.Entities;

public class DoctorSlot
{
	public int Id { get; set; }

	public int DoctorId { get; set; }
	[ForeignKey(nameof(DoctorId))]
	public Doctor Doctor { get; set; }

	public DateTime Date { get; set; }
	public TimeSpan StartTime { get; set; }
	public TimeSpan SessionDuration { get; set; }
	public int MaxPatients { get; set; }
	public bool IsActive { get; set; } = true;
	public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
