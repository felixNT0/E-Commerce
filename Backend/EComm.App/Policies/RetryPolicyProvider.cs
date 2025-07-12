using System;
using System.Net.Http;
using Polly;
using Polly.Extensions.Http;

namespace EComm.App.Policies
{
    public static class RetryPolicyProvider
    {
        public static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
        {
            return Policy<HttpResponseMessage>
                .Handle<HttpRequestException>()
                .Or<TaskCanceledException>()
                .WaitAndRetryAsync(
                    2,
                    retryAttempt =>
                        TimeSpan.FromSeconds(Math.Pow(2, retryAttempt))
                        + TimeSpan.FromMilliseconds(new Random().Next(0, 1000)),
                    onRetry: (exception, timeSpan, context) =>
                    {
                        Console.WriteLine(
                            $"Retrying due to: {exception}. Waiting {timeSpan.TotalSeconds} seconds."
                        );
                    }
                );
        }
    }
}
