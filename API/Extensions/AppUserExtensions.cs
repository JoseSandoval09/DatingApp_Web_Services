using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class AppUserExtensions
{
    public static UserResponse ToDto(this AppUser user, ITokenService tokenService)
    {
        return new UserResponse
        {
            Id = user.Id,
            Email = user.Email,
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user)
        };
    }

    
}