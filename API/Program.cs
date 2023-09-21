using API.Models.Contexts;
using Microsoft.EntityFrameworkCore;
using API.Services;

WebApplicationBuilder? builder = WebApplication.CreateBuilder(args);

string? AllowedOrigins = "AllowedOrigins";
builder.Services.AddCors(
    options =>
        options.AddPolicy(
            name: AllowedOrigins,
            policy => policy.WithOrigins("http://localhost:5173", "https://localhost:3000")
        )
);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);
builder.Services.AddScoped<FolkService>();

// builder.Services.AddHttpsRedirection(options => options.HttpsPort = 5001);

builder.Logging.ClearProviders();
builder.Logging.AddConsole();

WebApplication? app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();
app.UseCors(AllowedOrigins);
app.UseAuthorization();
app.UseHttpLogging();
app.MapControllers();

app.Run();
