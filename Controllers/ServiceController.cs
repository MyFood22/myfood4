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


       

        public IActionResult user_show1()
        {
            string user_name1 = Request.Cookies["user_name_login2"];
            return View();
        }

        public IActionResult user_logout()
        {

            CookieOptions opt1 = new CookieOptions();
            
            opt1.Expires = DateTime.Now.AddDays(-1);
            Response.Cookies.Append("user_name_login2", "", opt1);


           


            View().ViewData["result1"] = "logout_ok";
            return View();
        }

        public IActionResult user_register2()
        {
            return Content("2342342");
            
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
                



            string op_code1 = Request.Form["op_code1"].ToString();

            this.View().ViewData["data1"] = "1212121";
            return View();
        }


        public IActionResult search_results1()
        {
            CDbconnection conn1 = new CDbconnection();
            conn1.open_connection();
            
            string autocomp_val=Request.Form["autocomp_val"].ToString();
            Dictionary<string, object> prms1 = new Dictionary<string, object>();
            prms1["@autocomp_val"] = "%"+autocomp_val+"%";

            string qry = "select * from all_recipes where title like @autocomp_val";

            System.Data.DataSet ds1 = new System.Data.DataSet();

            conn1.load_table_by_qry(qry, prms1, ds1, "recipes");
            int c1 = ds1.Tables["recipes"].Rows.Count;
            string json_str = "";
            int ind1;
            for (ind1=0;ind1<c1;ind1++)
            {
                if (json_str!="")
                {
                    json_str += ",";
                }
                json_str+=build_json_node(ds1.Tables["recipes"].Rows[ind1]["id"].ToString(), ds1.Tables["recipes"].Rows[ind1]["title"].ToString(), "", "");
            }
            json_str="{\"results_arr\": [" + json_str + "]}";

                          conn1.close_connection();
            return Content(json_str);
            return View();
        }

        public string build_json_node(string id,string name,string desc,string img)
        {
            string json_node_str1 = "{\"id\": " + id + ",";
            json_node_str1 += "\"name\": \"" + name + "\",";
            json_node_str1 += "\"description\": \"" + desc + "\",";
            json_node_str1 += "\"img\": \"" + img + "\"}";
            return json_node_str1;
    
        }


        public IActionResult user_register()
        {
            string userName1 = Request.Form["userName"].ToString();
            string emailBox1 = Request.Form["emailBox"].ToString();
            string password1 = Request.Form["password"].ToString();

            

            CDbconnection conn1 = new CDbconnection();
            conn1.open_connection();

           
            object last_err = "";
           


            Dictionary<string, object> prms1 = new Dictionary<string, object>();
            prms1["@username1"] = userName1;
            prms1["@emailBox1"] = emailBox1;
            prms1["@password1"] = password1;


            


            conn1.execute_qry("INSERT INTO users(username,email,password) VALUES (@username1, @emailBox1, @password1)", prms1,out last_err);


            
            conn1.close_connection();
           
            if (last_err.ToString().Contains("Duplicate entry") && last_err.ToString().Contains("for key 'username_UNIQUE'"))
            {
                return Content("{error:'username_exist')");
            }
                return Content("register_success");
            
        }
        


    }


}
