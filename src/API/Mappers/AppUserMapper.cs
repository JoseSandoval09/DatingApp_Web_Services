using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extensions;

public static class AppUserMapper
{
    public static UserResponse ToDto(this AppUser user, ITokenService tokenService)
    {
        return new UserResponse
        {
            Id = user.Id,
            Email = user.Email,
            ImageUrl = user.ImageUrl,
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user)
        };
    }

    
}