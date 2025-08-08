using Clinic.Data;
using Clinic.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Clinic.Controllers;
[Route("api/[controller]")]
[ApiController]
public class DoctorsController : ControllerBase
{
	private readonly ApplicationDbContext _context;

	public DoctorsController(ApplicationDbContext context)
	{
		_context = context;
	}

	[HttpGet("search")]
	[Authorize(Roles = "Patient")]
	public async Task<IActionResult> SearchDoctors([FromQuery] DoctorSearchQuery query)
	{
		var doctors = _context.Doctors
			.Include(d => d.User)
			.Include(d => d.Specialization)
			.AsQueryable();

		if (!string.IsNullOrWhiteSpace(query.DoctorName))
		{
			doctors = doctors.Where(d => d.User.FullName.Contains(query.DoctorName));
		}

		if (query.SpecialtyId.HasValue)
		{
			doctors = doctors.Where(d => d.SpecializationId == query.SpecialtyId.Value);
		}

		// Get total count before pagination
		var totalCount = await doctors.CountAsync();

		// Apply Pagination
		var pagedDoctors = await doctors
			.Skip((query.PageNumber - 1) * query.PageSize)
			.Take(query.PageSize)
			.ToListAsync();

		var result = new List<DoctorSearchResultDto>();

		foreach (var d in pagedDoctors)
		{
			var nextSlot = await GetNextAvailableSlot(d.Id);

			result.Add(new DoctorSearchResultDto
			{
				Id = d.Id,
				FullName = d.User.FullName,
				ClinicAddress = d.ClinicAddress,
				Specialization = d.Specialization.Name,
				ProfilePictureUrl = d.User.ProfilePictureUrl,
				Bio = d.Bio,
				NextAvailableTime = nextSlot
			});
		}

		return Ok(new
		{
			TotalCount = totalCount,
			PageNumber = query.PageNumber,
			PageSize = query.PageSize,
			Doctors = result
		});
	}




	private async Task<object> GetNextAvailableSlot(int doctorId)
	{
		var today = DateTime.Today;

		var slots = await _context.TimeSlots
			.Where(s => s.DoctorId == doctorId && s.Date >= today)
			.OrderBy(s => s.Date)
			.ThenBy(s => s.StartTime)
			.ToListAsync();
		var availableSlots = new List<object>();

		foreach (var slot in slots)
		{
			var appointmentCount = await _context.Appointments
				.CountAsync(a => a.DoctorSlotId == slot.Id);

			if (appointmentCount < slot.MaxPatients)
			{
				var bookedSlots = await _context.Appointments
					.Where(a => a.DoctorSlotId == slot.Id)
					.Select(a => a.AssignedTime)
					.ToListAsync();

				var current = slot.StartTime;
				var end = slot.StartTime + (slot.SessionDuration * slot.MaxPatients);

				while (current < end)
				{
					if (!bookedSlots.Contains(current))
					{
						return new
						{
							slotId = slot.Id,
							date = slot.Date.ToShortDateString(),
							availableTime = current.ToString(@"hh\:mm"),
							remainingPlaces = slot.MaxPatients - appointmentCount
						};
					}
					current += slot.SessionDuration;
				}
			}
		}

		return null;

	}


	[HttpGet("profile")]
	[Authorize(Roles = "Patient")]
	public async Task<IActionResult> GetDoctorPofile(int doctorId)
	{

		var doctor = await _context.Doctors
			.Include(d => d.Specialization)
			.Include(d => d.User)
			.FirstOrDefaultAsync(d => d.Id == doctorId);

		if (doctor is null)
			return NotFound($"Doctor with ID {doctorId} not found.");

		return Ok(new
		{
			Name = doctor.User.FullName,
			ProfilePictureUrl = doctor.User.ProfilePictureUrl,
			Specialization = doctor.Specialization.Name,
			Bio = doctor.Bio,
			ClinicAddress = doctor.ClinicAddress,
		});

	}

	[HttpGet("Bookings")]
	public async Task<IActionResult> GetDoctorBooking()
	{
		var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
		var doctor = await _context.Doctors
			.FirstOrDefaultAsync(d => d.UserId == userId);

		if (doctor is null)
			return NotFound($"Doctor with ID {userId} not found.");

		var bookings = await _context.Appointments
			.Include(a => a.DoctorSlot)
			.Include(a => a.Patient)
			.ThenInclude(a => a.User)
			.Where(d => d.DoctorSlot.DoctorId == doctor.Id)
			.Select(b => new
			{
				Id = b.Id,
				Date = b.BookingDate,
				Time = b.DoctorSlot.StartTime.ToString(@"hh\:mm"),
				Patients = new
				{
					Name = b.Patient.User.FullName,
					BookingTime = b.AssignedTime.ToString(@"hh\:mm"),
					Reaon = b.Reason,
					PhoneNumber = b.PhoneNumber
				}
			}).ToListAsync();

		return Ok(bookings);


	}

}
