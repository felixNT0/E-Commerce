using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.Contracts;
using EComm.DTOs;
using EComm.Extensions;
using EComm.Models.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EComm.Controllers
{
    [ApiController]
    [Route("api/notification")]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationService _notificationService;
        private readonly ILogger<NotificationController> _logger;

        public NotificationController(
            INotificationService notificationService,
            ILogger<NotificationController> logger
        )
        {
            _notificationService = notificationService;
            _logger = logger;
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> NotifyUser(NotifyUserDto notifyUserDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var userId = User.GetUserId();
            try
            {
                await _notificationService.NotifyUserAsync(
                    userId,
                    notifyUserDto.Message,
                    notifyUserDto.Status
                );
                return Ok(new { Message = "User Notified" });
            }
            catch (Exception e)
            {
                _logger.LogError($"An Error occured while trying to Notify a user: {e.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            var userId = User.GetUserId();
            try
            {
                var notificationDtos = await _notificationService.getUsersNotificationAsync(userId);
                var response = new
                {
                    Count = notificationDtos.Count(),
                    Notifications = notificationDtos,
                };
                return Ok(response);
            }
            catch (Exception e)
            {
                _logger.LogError(
                    $"An Error Occured while Trying to get the Users Notifications : {e.Message}"
                );
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("{notificationId:Guid}")]
        public async Task<IActionResult> UpdateNotification(
            Guid notificationId,
            UpdateNotificationDto notificationDto
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                var userId = User.GetUserId();
                await _notificationService.UpdateNotificationAsync(
                    userId,
                    notificationId,
                    notificationDto
                );
                return NoContent();
            }
            catch (NotificationNotFoundException e)
            {
                return StatusCode(404, "Notification not Found");
            }
            catch (Exception e)
            {
                _logger.LogError(
                    $"An Error Occurred while trying to update the notification : {e.Message} "
                );
                return StatusCode(
                    500,
                    $"An Error Occurred while trying to update the notification : {e.Message} "
                );
            }
        }

        [HttpDelete("{notificationId:Guid}")]
        public async Task<IActionResult> DeleteNotification(Guid notificationId)
        {
            try
            {
                var userId = User.GetUserId();
                await _notificationService.DeleteNotification(userId, notificationId);
                return NoContent();
            }
            catch (NotificationNotFoundException e)
            {
                return StatusCode(404, "Notification Does not Exist");
            }
            catch (Exception e)
            {
                _logger.LogError(
                    $"An Error Occurred while trying to Delete the notification : {e.Message} "
                );
                return StatusCode(
                    500,
                    $"An Error Occurred while trying to Delete the notification : {e.Message} "
                );
            }
        }
    }
}
