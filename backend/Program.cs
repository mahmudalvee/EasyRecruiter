using Microsoft.OpenApi.Models; 
using Microsoft.EntityFrameworkCore;
using eRecruitment.Data;
using eRecruitment.Service;

var builder = WebApplication.CreateBuilder(args);

// Enable CORS for frontend communication
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddDbContextPool<ApplicationDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddHttpClient();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options => 
{
    options.SwaggerDoc("v1", new OpenApiInfo { Title = "eRecruitment API", Version = "v1" });
});

var app = builder.Build();

app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();     
    app.UseSwaggerUI();   
}

app.UseAuthorization();
app.MapControllers();

app.Run();