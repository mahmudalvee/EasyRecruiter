using Microsoft.OpenApi.Models; 
using Microsoft.EntityFrameworkCore;
using eRecruitment.Data;
using eRecruitment.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddDbContextPool<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IRequisitionService, RequisitionService>();
builder.Services.AddTransient<ICVBankService, CVBankService>();
builder.Services.AddScoped<IOfferService, OfferService>();
builder.Services.AddScoped<IAssessmentService, AssessmentService>();

builder.Services.AddHttpClient();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => 
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "eRecruitment API", Version = "v1" });
});

var key = builder.Configuration["Jwt:Key"];
var issuer = builder.Configuration["Jwt:Issuer"];

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.Events = new JwtBearerEvents
    {
        OnChallenge = context =>
        {
            context.HandleResponse();
            context.Response.StatusCode = StatusCodes.Status401Unauthorized;
            context.Response.ContentType = "application/json";
            return context.Response.WriteAsync("{\"error\":\"Invalid or missing token\"}");
        }
    };
});

var app = builder.Build();

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();     
    app.UseSwaggerUI();   
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();