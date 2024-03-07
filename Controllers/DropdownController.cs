using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QuailtyForm.Data;
using QuailtyForm.Models;
using QuailtyForm.Data;

namespace QuailtyForm.Controllers
{
    public class DropdownController : Controller
    {
        private readonly IConfiguration _configuration;

        public DropdownController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            var connectionString = _configuration.GetConnectionString("OracleDbConnection");
            OracleDataAccess da = new OracleDataAccess(connectionString);
            var urunler = da.GetUrunler();

            return View(urunler);
        }
    }
}
