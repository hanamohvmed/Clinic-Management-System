using Clinic.Data;
using Clinic.DTOs;
using Clinic.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Clinic.Controllers;
[Route("api/[controller]")]
[ApiController]
public class SpecializationsController(ApplicationDbContext dbContext) : ControllerBase
{
	[HttpGet]
	public async Task<IActionResult> GetAllSpecializations()
	{
		var specializations = await dbContext.Specialization
			.Include(s => s.Doctors)
			.Select(s => new SpecializationDto
			{
				Id = s.Id,
				Name = s.Name
			})
			.ToListAsync();


		return Ok(specializations);
	}

	[HttpGet("{id}")]
	public IActionResult GetById(int id)
	{
		var specialization = dbContext.Specialization.Find(id);
		if (specialization == null)
		{
			return NotFound(new { Message = "Specialization not found" });
		}

		return Ok(new SpecializationDto
		{
			Id = specialization.Id,
			Name = specialization.Name
		});
	}

	[HttpPost]
	public IActionResult CreateSepecialization(string name)
	{
		var spec = new Specialization
		{
			Name = name
		};
		dbContext.Specialization.Add(spec);

		dbContext.SaveChanges();
		return Ok(new { Message = "Specialization created successfully", Id = spec.Id, name = spec.Name });
	}

	[HttpDelete("{id}")]
	public IActionResult DeleteSpecialization(int id)
	{
		var specialization = dbContext.Specialization
			.Include(s => s.Doctors).FirstOrDefault(s => s.Id == id);
		if (specialization == null)
		{
			return NotFound(new { Message = "Specialization not found" });
		}

		if (specialization.Doctors.Any())
		{
			return BadRequest(new { Message = "Cannot delete specialization with associated doctors" });
		}
		dbContext.Specialization.Remove(specialization);
		dbContext.SaveChanges();
		return Ok(new { Message = "Specialization deleted successfully" });
	}

	[HttpPut("{id}")]
	public IActionResult UpdateSpecialization(int id, string name)
	{
		var specialization = dbContext.Specialization.Find(id);
		if (specialization == null)
		{
			return NotFound(new { Message = "Specialization not found" });
		}
		specialization.Name = name;
		dbContext.SaveChanges();
		return Ok(new { Message = "Specialization updated successfully", Id = specialization.Id, Name = specialization.Name });
	}
}
