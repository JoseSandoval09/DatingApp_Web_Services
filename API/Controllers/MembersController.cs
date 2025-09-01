
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")] //localhost:5000/api/members
    [ApiController]
    public class MembersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public ActionResult<IReadOnlyList<AppUser>> GetMembers() // se puede usar list, IEnumerable o IReadOnly 
        {
            var members = context.Users.ToList(); //hace select de usuarios 
            return members;
        }

        [HttpGet("{id}")] // se pone un parametro en la ruta api/members/bob-id
        public ActionResult<AppUser> GetMember(string id)
        {
            var member = context.Users.Find(id); //hace select de usuario

            if (member == null) return NotFound();

            return member;
        }

    }
}