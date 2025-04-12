using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.Models;
using EComm.Data;
using Microsoft.AspNetCore.SignalR;
using EComm.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using EComm.Models.Exceptions;

namespace EComm.Services
{
    public class NotificationService : INotificationService
    {

        private readonly ILogger<NotificationService> _logger;
        private readonly ApplicationDbContext _dbContext;
        private readonly IHubContext<NotificationHub, INotificationClient> _hubContext;

        public NotificationService(ApplicationDbContext dbContext,
                                   ILogger<NotificationService> logger,
                                   IHubContext<NotificationHub, INotificationClient> hubContext
                                   )
        {
            _logger = logger;
            _dbContext = dbContext;
            _hubContext = hubContext;
        }

        public async Task NotifyUserAsync(string userId, string message, string status = "")
        {
            var notification = new Notification
            {
                UserId = userId,
                Message = message
            };
            await _dbContext.Notifications.AddAsync(notification);
            await _dbContext.SaveChangesAsync();
            await _hubContext.Clients.User(userId).PaymentNotification(status , message);
        }

        public async Task<IEnumerable<NotificationDto>> getUsersNotificationAsync(string userId)
        {
            var notifications = await _dbContext.Notifications.Where(n => n.UserId.Equals(userId)).AsNoTracking().ToListAsync();
            var notificationDtos = notifications.Select(n => new NotificationDto
            {
                Id = n.Id,
                UserId = n.UserId,
                Message = n.Message,
                CreatedAt = n.CreatedAt
            }
            );
            return notificationDtos;
        }

        public async Task UpdateNotificationAsync(string userId, Guid notificationId, UpdateNotificationDto notificationDto)
        {
            Expression<Func<Notification, bool>> condition = n => n.UserId.Equals(userId) && n.Id.Equals(notificationId);
            var notification = await _dbContext.Notifications.Where(condition).SingleOrDefaultAsync();
            if (notification is null)
            {
                _logger.LogError($"The notification with id : {notificationId} for the user with id : {userId} does not Exist ");
                throw new NotificationNotFoundException("The Notification Does Not Exist");
            }
            notification.IsRead = notificationDto.IsRead;
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteNotification(string userId, Guid notificationId)
        {
            Expression<Func<Notification, bool>> condition = n => n.UserId.Equals(userId) && n.Id.Equals(notificationId);
            var notification = await _dbContext.Notifications.Where(condition).SingleOrDefaultAsync();
            if (notification is null)
            {
                _logger.LogError($"The notification with id : {notificationId} for the user with id : {userId} does not Exist ");
                throw new NotificationNotFoundException("The Notification Does Not Exist");
            }
            _dbContext.Notifications.Remove(notification);
            await _dbContext.SaveChangesAsync();
        }
    }
}