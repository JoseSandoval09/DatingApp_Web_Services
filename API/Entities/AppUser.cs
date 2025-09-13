// si no tiene esta habilidado using global using System;

namespace API.Entities;

public class AppUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public required string DisplayName { get; set; } //? = puede ser nulo u opcional 

    public required string Email { get; set; }

    public required byte[] PasswordHash { get; set; }

    public required byte[] PasswordSalt { get; set; }

}