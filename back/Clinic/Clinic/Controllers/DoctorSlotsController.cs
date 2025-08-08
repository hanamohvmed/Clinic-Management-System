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
public class DoctorSlotsController(ApplicationDbContext _context) : ControllerBase
{


	[HttpGet("{id}")]
	[Authorize(Roles = "Doctor")]

	public IActionResult GetSlotById(int id)
	{

		var slot = _context.TimeSlots
			.FirstOrDefault(s => s.Id == id);

		if (slot == null)
			return NotFound("Slot not found.");


		return Ok(new
		{
			Id = slot.Id,
			Date = slot.Date,
			StartTime = slot.StartTime,
			SessionDuration = slot.SessionDuration,
			MaxPatients = slot.MaxPatients,
			IsActive = slot.IsActive
		});
	}

	[HttpGet("get-doctor-slots")]
	[Authorize(Roles = "Patient")]
	public async Task<IActionResult> GetDoctorDeatilsWithSlotsForPatients(int doctorId)
	{
		var slots = _context.TimeSlots
			.Where(s => s.DoctorId == doctorId && s.IsActive)
			.Select(s => new
			{
				s.Id,
				s.Date,
				s.StartTime,
				s.SessionDuration,
				s.MaxPatients,
				s.IsActive,
				NumOfPatientsBooked = s.Appointments.Count
			})
			.ToList();

		var doctor = await _context.Doctors
			.Select(d => new
			{
				Id = d.Id,
				Name = d.User.FullName,
				SpecializationName = d.Specialization.Name,
				Bio = d.Bio,
				ProfilePictureUrl = d.User.ProfilePictureUrl
			}).FirstOrDefaultAsync(d => d.Id == doctorId);

		return Ok(new
		{
			doctor,
			slots
		});
	}

	[HttpGet]
	[Authorize(Roles = "Doctor")]
	public async Task<IActionResult> GetAllSlots()
	{
		var doctorId = await GetDoctorIdAsync();
		var slots = _context.TimeSlots
			.Where(s => s.DoctorId == doctorId)
			.Select(s => new
			{
				s.Id,
				s.Date,
				s.StartTime,
				s.SessionDuration,
				s.MaxPatients,
				s.IsActive,
				NumOfPatientsBooked = s.Appointments.Count
			})
			.ToList();

		return Ok(slots);
	}

	[HttpPost("add-slot")]
	[Authorize(Roles = "Doctor")]

	public async Task<IActionResult> AddSlotToDoctor([FromBody] DoctorSlotDto dto)
	{

		var userId = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;
		var user = await _context.Users
			.Include(u => u.Doctor)
			.FirstOrDefaultAsync(d => d.Id == userId);
		if (user is null)
			return NotFound($"Doctor with ID {user.Doctor.Id} not found.");

		var slot = new DoctorSlot
		{
			DoctorId = user.Doctor.Id,
			Date = dto.Date.Date,
			StartTime = dto.Time,
			SessionDuration = TimeSpan.FromMinutes(dto.SessionMinutes),
			MaxPatients = dto.MaxPatients
		};

		_context.TimeSlots.Add(slot);
		await _context.SaveChangesAsync();

		return CreatedAtAction(nameof(GetSlotById), new { id = slot.Id }, null);

	}


	[HttpPut("{id}")]
	[Authorize(Roles = "Doctor")]

	public async Task<IActionResult> UpdateSlot(int id, [FromBody] DoctorSlotDto dto)
	{
		var doctorId = await GetDoctorIdAsync();
		var slot = await _context.TimeSlots
			.Include(s => s.Appointments)
			.FirstOrDefaultAsync(s => s.Id == id && s.DoctorId == doctorId);


		if (slot == null)
			return NotFound("Slot not found.");

		if (slot.Appointments.Count > 0)
			return BadRequest("Cannot update a slot that has existing appointments.");

		slot.Date = dto.Date;
		slot.StartTime = dto.Time;
		slot.SessionDuration = TimeSpan.FromMinutes(dto.SessionMinutes);
		slot.MaxPatients = dto.MaxPatients;

		await _context.SaveChangesAsync();
		return Ok(new
		{
			message = "Slot updated successfully",
		});
	}






	[HttpPut("change-status")]
	[Authorize(Roles = "Doctor")]

	public async Task<IActionResult> ChangeStatus(int slotId)
	{
		var doctorId = await GetDoctorIdAsync();
		var slot = await _context.TimeSlots
			.Include(s => s.Appointments)
			.FirstOrDefaultAsync(s => s.Id == slotId && s.DoctorId == doctorId);

		if (slot == null)
			return NotFound("Slot not found.");

		if (slot.Appointments.Count > 0)
			return BadRequest("Cannot change status of a slot that has existing appointments.");


		slot.IsActive = !slot.IsActive;

		return Ok(new
		{
			IsActive = slot.IsActive,
			message = "Doctor status updated successfully"
		});
	}

	[HttpDelete]
	[Authorize(Roles = "Doctor")]

	public async Task<IActionResult> DeleteSlot(int slotId)
	{
		var doctorId = await GetDoctorIdAsync();
		var slot = await _context.TimeSlots
			.Include(s => s.Appointments)
			.FirstOrDefaultAsync(s => s.Id == slotId && s.DoctorId == doctorId);

		if (slot == null)
			return NotFound("Slot not found.");

		if (slot.Appointments.Count > 0)
			return BadRequest("Cannot delete slot that has existing appointments.");

		_context.Remove(slot);
		await _context.SaveChangesAsync();

		return NoContent();
	}


	private async Task<int?> GetDoctorIdAsync()
	{
		var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
		var doctor = await _context.Users
			.Where(u => u.Id == userId)
			.Select(u => u.Doctor)
			.FirstOrDefaultAsync();

		return doctor?.Id;
	}
}
