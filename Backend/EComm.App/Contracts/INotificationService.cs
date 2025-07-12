using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.DTOs;

namespace EComm.App.Contracts
{
    public interface INotificationService
    {
        Task NotifyUserAsync(string userId, string status, string message);

        Task<IEnumerable<NotificationDto>> getUsersNotificationAsync(string userId);
        Task UpdateNotificationAsync(
            string userId,
            Guid notificationId,
            UpdateNotificationDto notificationDto
        );
        Task DeleteNotification(string userId, Guid notificationId);
    }
}
