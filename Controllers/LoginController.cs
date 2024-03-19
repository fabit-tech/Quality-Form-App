using Microsoft.AspNetCore.Mvc;

namespace QuailtyForm.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
