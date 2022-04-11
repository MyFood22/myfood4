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
        /*public HomeController()
        {
            View().ViewData["temp1"] = "11";
        }*/
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

            //this.OnActionExectioning

            //View().ViewData["temp1"] = "11";
            _logger = logger;
        }
        public IActionResult recipe_search()
        {
            /*string user_name1 = Request.Cookies["user_name_login2"];
            View().ViewData["user_name_login1"] = user_name1;*/

            View().ViewData["base_path"] = "https://localhost:7090/";
            return View();
        }

        public IActionResult user_Account()
        {
            /*string user_name1 = Request.Cookies["user_name_login2"];
            View().ViewData["user_name_login1"] = user_name1;*/

            View().ViewData["base_path"] = "https://localhost:7090/";
            return View();
        }

      /*  public IActionResult index_users()
        {
            View().ViewData["base_path"] = "https://localhost:7090/";
            //string cookieValueFromContext = httpContextAccessor.HttpContext.Request.Cookies["key"];


            //var cook1 =new HttpCookie("user_name_login")

            /*string user_name1 = Request.Cookies["user_name_login2"];
            View().ViewData["user_name_login1"] = user_name1;*/
            //Response.Cookies.("user_name_login", userName1, cookie_options1);

            
         //   return View();
   // }
    
        public IActionResult search_results1()
        {
            return View();
        }
        public IActionResult Index()
        {
            //Home/Index_users

            View().ViewData["base_path"] = "https://localhost:7090/";

            /*if (View().ViewData["user_name_login1"]!=null)
            {
                Response.Redirect("Home/Index_users");

            }*/

            return View();
        }
        /*
              @Html.ActionLink("Home", "header_view3", "Home")
      @{
        Html.RenderAction("header_view3", "Home"); 
    }

         * 
         */

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
            /*string user_name1 = Request.Cookies["user_name_login2"];
            View().ViewData["user_name_login1"] = user_name1;*/
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
       /* public IActionResult Gallery2()
        {
            View().ViewData["base_path"] = "https://localhost:7090/";
            return View();
        }*/


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

    }
}