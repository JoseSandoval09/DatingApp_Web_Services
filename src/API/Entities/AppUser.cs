// si no tiene esta habilidado using global using System;

using Microsoft.AspNetCore.Identity;

namespace API.Entities;

public class AppUser : IdentityUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public required string DisplayName { get; set; } //? = puede ser nulo u opcional 

    public required string Email { get; set; }

    public string? ImageUrl { get; set; }

    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiry { get; set; }

    // Navigation property

    public Member Member { get; set; } = null!;

}