using Clinic.Data;
using Clinic.DTOs;
using Clinic.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Clinic.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AppointmentsController : ControllerBase
{

	private readonly ApplicationDbContext _context;

	public AppointmentsController(ApplicationDbContext context)
	{
		_context = context;
	}

	[HttpPost("book")]
	[Authorize(Roles = "Patient")]
	public async Task<IActionResult> BookAppointment([FromBody] BookAppointmentDto dto)
	{
		var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

		var user = await _context.Users
			.Include(u => u.Patient)
			.FirstOrDefaultAsync(d => d.Id == userId);

		var slot = await _context.TimeSlots
			.Include(s => s.Appointments)
			.FirstOrDefaultAsync(s => s.Id == dto.DoctorSlotId && s.IsActive);

		if (slot == null)
			return NotFound("Slot not found.");

		var availableTime = GetNextAvailableTime(slot);
		if (availableTime == null)
			return BadRequest("No available time for this slot.");

		var appointment = new Appointment
		{
			DoctorSlotId = slot.Id,
			PatientId = user.Patient.Id,
			PhoneNumber = dto.PhoneNumber,
			Reason = dto.Reason,
			AssignedTime = availableTime.Value,
		};

		_context.Appointments.Add(appointment);
		await _context.SaveChangesAsync();

		return Ok(new
		{
			appointment.Id,
			BookingTime = availableTime.Value.ToString(@"hh\:mm"),
			BookingDate = slot.Date.ToShortDateString(),
		});
	}


	[HttpGet]
	[Authorize(Roles = "Patient")]
	public async Task<IActionResult> GetPatientAppointment()
	{
		var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

		var user = await _context.Users
			.Include(u => u.Patient)
			.FirstOrDefaultAsync(d => d.Id == userId);

		if (user is null)
			return NotFound($"Patient not found.");

		var appointments = await _context.Appointments
			.Where(a => a.PatientId == user.Patient.Id)
			.Include(a => a.DoctorSlot)
			.ThenInclude(ds => ds.Doctor)
				.ThenInclude(d => d.User)
			.Select(a => new
			{
				a.Id,
				Time = a.AssignedTime,
				DoctorName = a.DoctorSlot.Doctor.User.FullName,
				a.Reason,
				a.PhoneNumber,
				SlotDate = a.DoctorSlot.Date.ToShortDateString(),
			})
			.ToListAsync();


		return Ok(appointments);
	}

	private TimeSpan? GetNextAvailableTime(DoctorSlot slot)
	{
		var booked = slot.Appointments.Select(a => a.AssignedTime).ToHashSet();

		var current = slot.StartTime;

		for (int i = 0; i < slot.MaxPatients; i++)
		{
			if (!booked.Contains(current))
				return current;

			current = current.Add(slot.SessionDuration);
		}

		return null;
	}


}
