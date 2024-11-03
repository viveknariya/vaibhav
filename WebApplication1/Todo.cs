using System.Text.Json.Serialization;

namespace WebApplication1;

public class Todo
{
    public int Id { get; set; }
    public string Title { get; set; }
    public DateTime DueOn { get; set; }
    public bool IsCompleted { get; set; }
    public int UserId { get; set; }
    [JsonIgnore]
    public User? User { get; set; }
}
