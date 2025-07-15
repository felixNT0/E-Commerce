using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Channels;
using System.Threading.Tasks;
using EComm.App.Contracts;

namespace EComm.App.Services
{
    public class BackgroundTaskQueue : IBackgroundTaskQueue
    {
        private readonly Channel<Func<IServiceProvider, Task>> _queue;
        private readonly ILogger<BackgroundTaskQueue> _logger;

        public BackgroundTaskQueue(ILogger<BackgroundTaskQueue> logger)
        {
            _logger = logger;
            _queue = Channel.CreateUnbounded<Func<IServiceProvider, Task>>();
        }

        public void Enqueue(Func<IServiceProvider, Task> item)
        {
            if (item is null)
            {
                _logger.LogError("You are trying to queue an Empty task");
                throw new ArgumentNullException(nameof(item));
            }
            _queue.Writer.TryWrite(item);
        }

        public async ValueTask<Func<IServiceProvider, Task>> DequeueAsync(
            CancellationToken cancellationToken
        )
        {
            return await _queue.Reader.ReadAsync();
        }

        public async ValueTask<bool> WaitForNextRead(CancellationToken token = default)
        {
            return await _queue.Reader.WaitToReadAsync(token);
        }
    }
}
