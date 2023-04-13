using FruitMarket.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace FruitMarket
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var connectionString = builder.Configuration.GetConnectionString("FruitMarket");

            builder.Services.AddDbContext<FruitMarketDbContext>(
                o => o.UseSqlServer(connectionString)
            );

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(
            c => {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "FruitMarket.API",
                    Version = "V1",
                    Contact = new OpenApiContact
                    {
                        Name = "Mario Alves",
                        Email = "marioalvesneto@hotmail.com",
                        Url = new Uri("https://marioalvesx.github.io")
                    }
                });

                var xmlFile = "FruitMarket.API.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                c.IncludeXmlComments(xmlPath);

            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(options =>
            {
                options.WithOrigins("http://localhost:5173");
                options.AllowAnyMethod();
                options.AllowAnyHeader();
            });

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}