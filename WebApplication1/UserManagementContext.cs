using Microsoft.EntityFrameworkCore;
using WebApplication1;

public class UserManagementContext : DbContext
{
    public UserManagementContext(DbContextOptions<UserManagementContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<Todo> Todos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().Property(u => u.FirstName).IsRequired().HasMaxLength(10);
        modelBuilder.Entity<User>().Property(u => u.LastName).IsRequired().HasMaxLength(10);
        modelBuilder.Entity<User>().Property(u => u.PhoneNumber).IsRequired();
        modelBuilder.Entity<User>().Property(u => u.Email).IsRequired();
        modelBuilder.Entity<Todo>().Property(t => t.Title).IsRequired().HasMaxLength(15);

    }
}
