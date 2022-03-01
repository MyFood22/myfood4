using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace myfood4.Controllers
{
    public class ServiceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }


        //string user_name1 = Request.Cookies["user_name_login2"];

        public IActionResult user_show1()
        {
            string user_name1 = Request.Cookies["user_name_login2"];
            return View();
        }

        public IActionResult user_logout()
        {

            CookieOptions opt1 = new CookieOptions();
            //Microsoft.AspNetCore.Http.CookieBuilder cook_bld1 = new Microsoft.AspNetCore.Http.CookieBuilder();
            opt1.Expires = DateTime.Now.AddDays(-1);
            Response.Cookies.Append("user_name_login2", "", opt1);


            /*Response.Cookies.Delete("user_name_login", new CookieOptions()
            {
                Expires = DateTime.Now.AddDays(3),
                Path = "/",
                Domain="localhost",
                MaxAge=new TimeSpan(0)
            }); */


            //Response.Cookies.Delete("user_name_login");
            //View().ViewData.


            View().ViewData["result1"] = "logout_ok";
            return View();
        }

        public IActionResult user_register2()
        {
            return Content("2342342");
            //return  Json(new { foo = "bar", baz = "Blech" });
        }

        public IActionResult user_login()
        {
            string userName1 = Request.Form["userName"].ToString();
            string password1 = Request.Form["password"].ToString();



            CDbconnection conn1 = new CDbconnection();
            conn1.open_connection();
            Dictionary<string, object> prms1 = new Dictionary<string, object>();
            prms1["@username1"] = userName1;
            prms1["@password1"] = password1;
            string login_qry = "select * from users where username=@username1 and password=@password1";

            System.Data.DataSet ds1 = new System.Data.DataSet();

            conn1.load_table_by_qry(login_qry, prms1, ds1, "users");

            int c1=ds1.Tables["users"].Rows.Count;

            if (c1 > 0)
            {
                View().ViewData["login_result"] = userName1;

                
                CookieOptions cookie_options1 = new CookieOptions();
                //cookie_options1.Path = "/";
                cookie_options1.Expires= DateTime.Now.AddDays(3);
                //Response


                Response.Cookies.Append("user_name_login2",  userName1, cookie_options1);
                


               // Response.Cookies. = DateTime.Now.AddDays(3);

                //login_qry ok
            }
            else
            {
                View().ViewData["login_result"] = "login_not_currect";
            }

            return View();
        }
        public IActionResult GetData()
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            //MySqlConnection conn1 = new MySqlConnection();

            CDbconnection conn1=new CDbconnection();
            conn1.open_connection();
            Dictionary<string, object> prms1 = new Dictionary<string, object>();
            prms1["email"] = "as";
            prms1["password"] = "as";


            System.Data.DataSet ds1=new System.Data.DataSet();

            conn1.load_table_by_qry("s", prms1, ds1, "users");
                /*MySqlConnector.MySqlConnection conn2= new MySqlConnector.MySqlConnection();
            conn2.ConnectionString = "server=127.0.0.1;CHARSET=utf8;uid=root;database=my_work";
            //conn1.ConnectionString = "server=127.0.0.1;uid=root;useUnicode=true;database=my_work";


            conn2.Open();
            MySqlConnector.MySqlDataAdapter data_adapter = new MySqlConnector.MySqlDataAdapter();
            data_adapter.SelectCommand = command
            data_adapter.SelectCommand.Connection = conn
            data_adapter.Fill(ds1, name_of_table)

            conn2.Close();*/




            string op_code1 = Request.Form["op_code1"].ToString();

            this.View().ViewData["data1"] = "1212121";
            return View();
        }
        /*  private void batReg(object sender, EventArgs e)
          {
              ServiceController db = new ServiceController();
              MySqlCommand command = new MySqlCommand("INSERT INTO `users` ( `login`,`email`,`password`) VALUES (@login, @email, @password)", db.getConnection());
              command.Parameters.Add("@login", MySqlDbType.VarChar).Value = userName.Text;
              command.Parameters.Add("@email", MySqlDbType.VarChar).Value = emailBox.Text;
              command.Parameters.Add("@password", MySqlDbType.VarChar).Value = password.Text;
          }*/


    }
}
