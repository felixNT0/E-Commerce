using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EComm.App.Contracts;

namespace EComm.App.Services
{
    public class QueuedHostedService : BackgroundService
    {
        private readonly IBackgroundTaskQueue _queue;
        private readonly ILogger<QueuedHostedService> _logger;
        private readonly IServiceProvider _serviceProvider;

        public QueuedHostedService(
            IBackgroundTaskQueue backgroundTaskQueue,
            ILogger<QueuedHostedService> logger,
            IServiceProvider serviceProvider
        )
        {
            _queue = backgroundTaskQueue;
            _logger = logger;
            _serviceProvider = serviceProvider;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (await _queue.WaitForNextRead(stoppingToken))
            {
                var workItem = await _queue.DequeueAsync(stoppingToken);

                try
                {
                    using var scope = _serviceProvider.CreateScope();
                    // 👇 Execute the work item
                    await workItem(scope.ServiceProvider);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred executing: {WorkItem}.", nameof(workItem));
                    throw;
                }
            }
        }
    }
}
