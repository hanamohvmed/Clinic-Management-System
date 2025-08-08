using Microsoft.AspNetCore.Identity;

namespace Clinic.Entities;

public class ApplicationUser : IdentityUser
{
	public string FullName { get; set; }
	public string? ProfilePictureUrl { get; set; }
	public Doctor Doctor { get; set; }
	public Patient Patient { get; set; }

}
