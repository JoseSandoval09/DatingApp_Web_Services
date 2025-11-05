using API.Data;
using Microsoft.AspNetCore.StaticAssets;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;

namespace API.UnitTest;

[SetUpFixture]

public class GlobalTestSetup
{
    public static AppDbContext AppDbContext { get; private set; }


    [OneTimeSetUp]

    public async Task Setup()
    {
        DbContextOptions<AppDbContext> options = new DbContextOptionsBuilder<AppDbContext>()
            .UseSqlite("Data Source=dating.db")
            .Options;

        AppDbContext = new AppDbContext(options);
        await AppDbContext.Database.MigrateAsync();
    }

    [OneTimeTearDown]
    
    public async Task TearDown()
    {
        await AppDbContext.DisposeAsync();
    }
    
    
}
