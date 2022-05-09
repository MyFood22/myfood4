using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using myfood4.Models;
using System.Diagnostics;
using System.Web;

namespace myfood4.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        int view_init1 = 0;
        
        public override ViewResult View()
        {
            if (view_init1 == 0)
            {
                view_init1 = 1;
                int d1 = 1;
                if (Request != null)
                {
                    string user_name1 = Request.Cookies["user_name_login2"];
                    View().ViewData["user_name_login1"] = user_name1;
                }

            }

            return base.View();
        }

        public void OnActionExectioning(ActionExecutingContext filterContext)
        {
            //this.vi
            if (Request != null)
            {
                string user_name1 = Request.Cookies["user_name_login2"];
                View().ViewData["user_name_login1"] = user_name1;
            }
        }

        public void OnResultExecuted(ResultExecutedContext filterContext)
        {
            if (Request != null)
            {
                string user_name1 = Request.Cookies["user_name_login2"];
                View().ViewData["user_name_login1"] = user_name1;
            }
        }

        public HomeController(ILogger<HomeController> logger)
        {

            
            _logger = logger;
        }

        public IActionResult angular1()
        {
            return View();
        }
        public IActionResult recipe_search()
        {
           

            View().ViewData["base_path"] = "https://localhost:7090/";
            return View();
        }

        public IActionResult user_Account()
        {

            View().ViewData["base_path"] = "https://localhost:7090/";
            return View();
        }

      
    
        public IActionResult search_results1()
        {
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
        public IActionResult header_view3()
        {
            return View();
        }
        public IActionResult header_view1()
        {
            return View();
        }
        public IActionResult header_view2()
        {
           
            return View();
        }
       

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Gallery()
        {
            View().ViewData["base_path"] = "https://localhost:7090/";
            return View();
        }
      


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}