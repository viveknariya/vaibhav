namespace WebApplication1;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[Route("api/[controller]")]
[ApiController]
public class TodosController : ControllerBase
{
    private readonly UserManagementContext _context;

    public TodosController(UserManagementContext context)
    {
        _context = context;
    }

    // GET: api/todos
    [HttpGet]
    public async Task<IActionResult> GetTodos()
    {
        var todos = await _context.Todos.Include(t => t.User).ToListAsync();
        return Ok(todos);
    }

    // GET: api/todos/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetTodo(int id)
    {
        var todo = await _context.Todos.Include(t => t.User).FirstOrDefaultAsync(t => t.Id == id);

        if (todo == null)
        {
            return NotFound();
        }

        return Ok(todo);
    }

    [HttpGet("user/{id}")]
    public async Task<IActionResult> GetTodoByUserId(int id)
    {
        var todos = await _context.Todos
            .Where(t => t.UserId == id)
            .ToListAsync();

        if (!todos.Any())
        {
            return NotFound();
        }

        return Ok(todos);
    }


    // POST: api/todos
    [HttpPost]
    public async Task<IActionResult> CreateTodo(Todo todo)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTodo), new { id = todo.Id }, todo);
    }

    // PUT: api/todos/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodo(int id, Todo todo)
    {
        if (id != todo.Id)
        {
            return BadRequest();
        }

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Entry(todo).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TodoExists(id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }

    // DELETE: api/todos/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(int id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo == null)
        {
            return NotFound();
        }

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool TodoExists(int id)
    {
        return _context.Todos.Any(e => e.Id == id);
    }
}
