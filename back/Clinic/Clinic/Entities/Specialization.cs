namespace Clinic.Entities;

public class Specialization
{
	public int Id { get; set; }
	public string Name { get; set; } = null!;

	public ICollection<Doctor> Doctors { get; set; }
}
