using FruitMarket.Entities;
using FruitMarket.Models;
using FruitMarket.Persistence;
using Microsoft.AspNetCore.Mvc;

namespace FruitMarket.Controllers
{
    [ApiController]
    [Route("api/fruit-market")]
    public class FruitsController : ControllerBase
    {
        private readonly FruitMarketDbContext _context;

        public FruitsController(FruitMarketDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var fruits = _context.Fruits
                .ToList();

            return Ok(fruits);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var fruit = _context.Fruits
                .SingleOrDefault( f => f.Id == id );

            if(fruit == null )
                return NotFound();

            return Ok(fruit);
        }

        [HttpPost]
        public IActionResult Post(FruitInputModel model)
        {
            var fruit = new Fruit( model.Description, model.ValueA, model.ValueB, model.Result );

            _context.Fruits.Add(fruit);
            _context.SaveChanges();

            return CreatedAtAction("Get", new { id = fruit.Id }, model);
        }

        [HttpPut("{id}/multiply")]
        public IActionResult MultiplyFruit(int id, FruitInputModel model)
        {
            var fruit = _context.Fruits.SingleOrDefault( f => f.Id == id );

            if(fruit == null) 
                return BadRequest();

            fruit.Multiply(model.Description, model.ValueA, model.ValueB);

            _context.SaveChanges();
            return Ok($"Fruit with id={id} multiplied with success!");
        }

        [HttpPut("{id}/divide")]
        public IActionResult DivideFruit(int id, FruitInputModel model)
        {
            var fruit = _context.Fruits.SingleOrDefault(f => f.Id == id);

            if (fruit == null)
                return BadRequest();

            fruit.Divide(model.Description, model.ValueA, model.ValueB);

            _context.SaveChanges();
            return Ok($"Fruit with id={id} divided with success!");
        }

    }
}
