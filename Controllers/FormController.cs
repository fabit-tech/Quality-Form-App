using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using QuailtyForm.Data;
using QuailtyForm.Models;
using QuailtyForm.Data;

namespace QuailtyForm.Controllers
{
    public class FormController : Controller
    {
        private readonly IConfiguration _configuration;

        public FormController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IActionResult Company()
        {
            var connectionString = _configuration.GetConnectionString("OracleDbConnection");
            OracleDataAccess da = new OracleDataAccess(connectionString);
            var urunler = da.GetUrunler();

            return View(urunler);
        }
    }
}
