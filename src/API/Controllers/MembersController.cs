
using API.Data;
using API.Entities;
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

}
