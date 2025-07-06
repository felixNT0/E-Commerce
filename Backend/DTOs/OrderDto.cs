namespace EComm.DTOs;

public record OrderDto
{
    public Guid Id { get; set; }

    public List<OrderItemDto> OrderItemDtos { get; set; }

    public DateTime CreatedAt { get; set; }

    public decimal TotalPrice { get; set; }
}
