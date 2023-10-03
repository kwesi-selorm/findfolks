using API.DTOs;

namespace API.Services
{
    public class DataService
    {
        private static int CitySortCompareFunction(CityDTO city1, CityDTO city2)
        {
            return city1.Value.CompareTo(city2.Value);
        }

        public List<CityDTO> ParseWorldCitiesCSV()
        {
            List<CityDTO> cities = new();
            string? csvPath = Directory.GetCurrentDirectory() + "/Files/worldcities.csv";

            string[] lines = System.IO.File.ReadAllLines(csvPath).Skip(1).ToArray();
            foreach (string line in lines)
            {
                string[] values = line.Split(',');
                int Id = int.TryParse(values[10].Trim('"'), out Id) ? Id : 0;

                CityDTO city =
                    new()
                    {
                        Id = Id,
                        Label = $"{values[1].Trim('"')}, {values[4].Trim('"')}",
                        Value = values[1].Trim('"'),
                    };
                cities.Add(city);
            }
            cities.Sort(CitySortCompareFunction);
            return cities;
        }
    }
}
