using Serilog;
using System.Net;

namespace backend.Middleware
{
    public class ErrorHandlerMiddleware
    {
        private readonly RequestDelegate _next;

        public ErrorHandlerMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);   //next middleware
            }
            catch (Exception ex)
            {
                Log.Error(ex, "Unhandled exception for {Path}", context.Request.Path);

                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                context.Response.ContentType = "application/json";

                var result = new { message = "An unexpected error occurred." };
                await context.Response.WriteAsJsonAsync(result);
            }
        }
    }
}