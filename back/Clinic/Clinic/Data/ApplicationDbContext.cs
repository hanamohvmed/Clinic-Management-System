using Clinic.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Clinic.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
	public ApplicationDbContext(DbContextOptions options) : base(options)
	{
	}


	protected override void OnModelCreating(ModelBuilder builder)
	{
		base.OnModelCreating(builder);

		builder.Entity<Doctor>()
			.HasOne(d => d.User)
			.WithOne(u => u.Doctor)
			.HasForeignKey<Doctor>(d => d.UserId);

		builder.Entity<Patient>()
			.HasOne(p => p.User)
			.WithOne(u => u.Patient)
			.HasForeignKey<Patient>(p => p.UserId);
	}


	public DbSet<Doctor> Doctors { get; set; }
	public DbSet<Specialization> Specialization { get; set; }
	public DbSet<DoctorSlot> TimeSlots { get; set; }
	public DbSet<Patient> Patients { get; set; }
	public DbSet<Appointment> Appointments { get; set; }
}
