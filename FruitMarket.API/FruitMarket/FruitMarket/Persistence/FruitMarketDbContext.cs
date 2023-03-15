using FruitMarket.Entities;
using Microsoft.EntityFrameworkCore;

namespace FruitMarket.Persistence
{
    public class FruitMarketDbContext : DbContext
    {
        public FruitMarketDbContext(DbContextOptions<FruitMarketDbContext> options) : base(options) { }
        
        public DbSet<Fruit> Fruits { get; set; }
       
    }
}
