using Microsoft.AspNetCore.Mvc;
using myfood4.Models;
using System.Diagnostics;
using System.Web;

namespace myfood4.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        public IActionResult recipe_search()
        {
            View().ViewData["base_path"] = "https://localhost:7090/";
            return View();
        }

        public IActionResult index_users()
        {
            View().ViewData["base_path"] = "https://localhost:7090/";
            //string cookieValueFromContext = httpContextAccessor.HttpContext.Request.Cookies["key"];


            //var cook1 =new HttpCookie("user_name_login")

            string user_name1 = Request.Cookies["user_name_login2"];
            View().ViewData["user_name_login1"] = user_name1;
            //Response.Cookies.("user_name_login", userName1, cookie_options1);
            return View();
        }

        public IActionResult Index()
        {
            View().ViewData["base_path"] = "https://localhost:7090/";
            return View();
        }

        public IActionResult service1()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}