namespace FruitMarket.Entities
{
    public class Fruit
    {
        public Fruit(string description, int valueA, int valueB, int result)
        {
            Description = description;
            ValueA = valueA;
            ValueB = valueB;
            Result = result;
            CreatedAt = DateTime.Now;
        }

        public int Id { get; private set; }
        public string Description { get; private set; }
        public int ValueA { get; private set; }
        public int ValueB { get; private set; }
        public int Result { get; private set; }
        public DateTime CreatedAt { get; private set; }

        public int Multiply(string description, int valueA, int valueB)
        {
            Description = description;
            ValueA = valueA;
            ValueB = valueB;
            Result = valueA * valueB;             

            return Result;
        }

        public int Divide(string description, int valueA, int valueB)
        {
            Description = description;
            ValueA = valueA;
            ValueB = valueB;

            Result = valueA > valueB ? valueA / valueB : valueB / valueA;

            return Result;
        }

    }
}
