using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EComm.App.Contracts
{
    public interface IBackgroundTaskQueue
    {
        void Enqueue(Func<IServiceProvider, Task> item);
        ValueTask<Func<IServiceProvider, Task>> DequeueAsync(CancellationToken cancellationToken);

        ValueTask<bool> WaitForNextRead(CancellationToken token);
    }
}
