using Clinic.Data;
using Clinic.DTOs;
using Clinic.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
	private readonly UserManager<ApplicationUser> _userManager;
	private readonly IConfiguration _config;
	private readonly RoleManager<IdentityRole> _roleManager;
	private readonly ApplicationDbContext _context;

	public AuthController(
		UserManager<ApplicationUser> userManager,
		RoleManager<IdentityRole> roleManager,
		IConfiguration config,
		ApplicationDbContext context)
	{
		_userManager = userManager;
		_roleManager = roleManager;
		_config = config;
		_context = context;
	}

	[HttpPost("register-doctor")]
	public async Task<IActionResult> RegisterDoctor([FromBody] RegisterDoctorDto model)
	{
		var user = new ApplicationUser
		{
			UserName = model.Email,
			Email = model.Email,
			FullName = model.FullName,
			ProfilePictureUrl = model.ProfilePictureUrl,
		};

		var specialization = await _context.Specialization.FirstOrDefaultAsync(s => s.Id == model.SpecializationId);
		if (specialization is null)
			return BadRequest("specialization not found");

		var result = await _userManager.CreateAsync(user, model.Password);
		if (!result.Succeeded)
			return BadRequest(result.Errors);

		// Add to role
		if (!await _roleManager.RoleExistsAsync("Doctor"))
			await _roleManager.CreateAsync(new IdentityRole("Doctor"));
		await _userManager.AddToRoleAsync(user, "Doctor");

		// Create Doctor entity
		var doctor = new Doctor
		{
			UserId = user.Id,
			SpecializationId = model.SpecializationId,
			ClinicAddress = model.ClinicAddress,
			Bio = model.Bio,
		};

		_context.Doctors.Add(doctor);
		await _context.SaveChangesAsync();

		return Ok(new { message = "Doctor registered successfully" });
	}


	[HttpPost("register-patient")]
	public async Task<IActionResult> RegisterPatient([FromBody] RegisterPatientDto model)
	{
		var user = new ApplicationUser
		{
			UserName = model.Email,
			Email = model.Email,
			FullName = model.FullName
		};

		var result = await _userManager.CreateAsync(user, model.Password);
		if (!result.Succeeded)
			return BadRequest(result.Errors);

		// Add to role
		if (!await _roleManager.RoleExistsAsync("Patient"))
			await _roleManager.CreateAsync(new IdentityRole("Patient"));
		await _userManager.AddToRoleAsync(user, "Patient");

		// Create Patient entity
		var patient = new Patient
		{
			UserId = user.Id,
			BirthDate = model.BirthDate,
			Gender = model.Gender
		};

		_context.Patients.Add(patient);
		await _context.SaveChangesAsync();

		return Ok(new { message = "Patient registered successfully" });
	}


	[HttpPost("login")]
	public async Task<IActionResult> Login([FromBody] LoginDto model)
	{
		var user = await _userManager.FindByEmailAsync(model.Email);
		if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
			return Unauthorized("Invalid credentials");

		var token = await GenerateJwtToken(user);
		var role = await _userManager.GetRolesAsync(user);
		return Ok(new { message = "User logged in successfully", email = user.Email, token, role = role.FirstOrDefault() });
	}

	private async Task<string> GenerateJwtToken(ApplicationUser user)
	{
		var roles = await _userManager.GetRolesAsync(user);

		var claims = new List<Claim>
		{
			new Claim(JwtRegisteredClaimNames.Sub, user.Id),
			new Claim(JwtRegisteredClaimNames.Email, user.Email),
			new Claim(ClaimTypes.Name, user.UserName)
		};

		foreach (var role in roles)
		{
			claims.Add(new Claim(ClaimTypes.Role, role));
		}

		var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtSettings:SecretKey"]));
		var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

		var token = new JwtSecurityToken(
			issuer: _config["JwtSettings:Issuer"],
			audience: _config["JwtSettings:Audience"],
			claims: claims,
			expires: DateTime.Now.AddMinutes(Convert.ToDouble(_config["JwtSettings:ExpiryMinutes"])),
			signingCredentials: creds
		);

		return new JwtSecurityTokenHandler().WriteToken(token);
	}
}
