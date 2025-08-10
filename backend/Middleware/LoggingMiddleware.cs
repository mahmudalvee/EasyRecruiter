using Serilog;
using System.Diagnostics;
using UglyToad.PdfPig.Logging;

namespace backend.Middleware
{
    public class LoggingMiddleware
    {
        private readonly RequestDelegate _next;

        public LoggingMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var stopwatch = Stopwatch.StartNew();
            var request = context.Request;

            Log.Information("Incoming Request: {Method} {Path}", request.Method, request.Path);

            try
            {
                await _next(context); // next middleware
            }
            finally
            {
                stopwatch.Stop();
                Log.Information("Outgoing Response: {StatusCode} for {Method} {Path} in {Elapsed} ms",
                    context.Response.StatusCode,
                    request.Method,
                    request.Path,
                    stopwatch.ElapsedMilliseconds);
            }
        }
    }

}
