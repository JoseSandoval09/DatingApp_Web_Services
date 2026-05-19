using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;

namespace API.Data;

public class MessagesRepository(AppDbContext context) : IMessagesRepository
{
    public void Add(Message message) => context.Messages.Add(message);
    
    public void Delete(Message message) => context.Messages.Remove(message);

    public async Task<Message?> Get(string messageId) => await context.Messages.FindAsync(messageId);

    public async Task<PaginationResult<MessageResponse>> GetForMember()
    {
        
    }

    public async Task<IReadOnlyList<MessageResponse>> GetThread(string currentMemberId, string recipientId)
    {
        var messages = await context.Messages
            .Where(m => (m.RecipientId == currentMemberId && m.SenderId == recipientId && !m.RecipientDeleted) ||
                        (m.RecipientId == recipientId && m.SenderId == currentMemberId && !m.SenderDeleted))
            .OrderBy(m => m.MessageSent)
            .Select(m => new MessageResponse
            {
                Id = m.Id,
                Content = m.Content,
                SenderId = m.SenderId,
                SenderDisplayName = m.Sender.DisplayName,
                SenderImageUrl = m.Sender.Photos.FirstOrDefault(p => p.IsMain).Url,
                RecipientId = m.RecipientId,
                RecipientDisplayName = m.Recipient.DisplayName,
                RecipientImageUrl = m.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url,
                DateRead = m.DateRead,
                MessageSent = m.MessageSent
            })
            .ToListAsync();

        return messages;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }


}