
using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;
[Authorize]
public class MembersController(IMembersRepository membersRepository) : BaseApiController
{
    
    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<Member>>> GetMembers() // se puede usar list, IEnumerable o IReadOnly 
    {
        return Ok(await membersRepository.GetMembersAsync());
    }

   
    [HttpGet("{id}")] // se pone un parametro en la ruta api/members/bob-id
    public async Task<ActionResult<Member>> GetMember(string id)
    {
        var member = await membersRepository.GetMemberAsync(id) ; //hace select de usuario

        if (member == null) return NotFound();

        return member;
    }

    [HttpGet("{id}/photos")]
    public async Task<ActionResult<IReadOnlyList<Photo>>> GetPhotos(string id)
    {
        return Ok(await membersRepository.GetPhotosAsync(id));
    }

    [HttpPut]
    public async Task<ActionResult> UpdateMember(MemberUpdateRequest request)
    {
        var memberId= User.GetMemberId(); // obtiene el id del usuario logueado a traves de los claims
        var member = await membersRepository.GetMemberForUpdateAsync(memberId); // hace select del usuario logueado

        if (member == null) return BadRequest("Failed to get member");

        member.DisplayName = request.DisplayName ?? member.User.DisplayName;
        member.Description = request.Description ?? member.Description;
        member.City = request.City ?? member.City;
        member.Country = request.Country ?? member.Country;

        membersRepository.Update(member);

        if (await membersRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update member");
    }


}
