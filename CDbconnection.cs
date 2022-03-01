namespace myfood4
{
    public class CDbconnection
    {
        MySqlConnector.MySqlConnection conn_obj1 = null;
        Dictionary<string, MySqlConnector.MySqlTransaction> transactions_dict_obj1 = new Dictionary<string, MySqlConnector.MySqlTransaction>();


        public CDbconnection()
        {
            conn_obj1 = new MySqlConnector.MySqlConnection();
            conn_obj1.ConnectionString = "server=127.0.0.1;CHARSET=utf8;uid=root;database=my_work";
        }
        public MySqlConnector.MySqlTransaction begin_transaction(string name_of_transaction)
        {
            transactions_dict_obj1[name_of_transaction] = conn_obj1.BeginTransaction();
            return transactions_dict_obj1[name_of_transaction];
        }

        public int commit_transaction(string name_of_transaction)
        {
            try
            {
                transactions_dict_obj1[name_of_transaction].Commit();
            }
            catch(Exception ex1)
            {
                return -1;
            }
            return 1;
        }
        public int rollback_transaction(string name_of_transaction)
        {
            try
            {
                transactions_dict_obj1[name_of_transaction].Rollback();
            }
            catch (Exception ex1)
            {
                return -1;
            }
            return 1;
        }


        public int open_connection()
        {
            try
            {
                conn_obj1.Open();
                return 1;

            }
            catch (Exception ex)
            {

            }

            return 0;

        }


        public int close_connection()
        {
            try
            {
                conn_obj1.Close();
                return 1;

            }
            catch (Exception ex)
            {

            }

            return 0;

        }
        public int add_prms_to_command(MySqlConnector.MySqlCommand cmd,Dictionary<string, object> prms)
        {
            string[] keys1 = new string[prms.Keys.Count];
            prms.Keys.CopyTo(keys1, 0);

            int i1;

            for (i1 = 0; i1 < keys1.Length; i1++)
            {
                MySqlConnector.MySqlParameter prm1 = new MySqlConnector.MySqlParameter();
                prm1.ParameterName = keys1[i1];
                prm1.Value = prms[keys1[i1]];

                cmd.Parameters.Add(prm1);
            }

            return 1;
        }
        public int execute_qry(string qry, Dictionary<string, object> prms,string name_of_transaction=null)
        {
            MySqlConnector.MySqlCommand cmd = new MySqlConnector.MySqlCommand();
            cmd.CommandText = qry;

            add_prms_to_command(cmd, prms);
            cmd.Connection = conn_obj1;
            if (name_of_transaction != null)
            {
                cmd.Transaction = transactions_dict_obj1[name_of_transaction];
            }
            cmd.ExecuteNonQuery();
            return 1;
        }

        public int load_table_by_qry(string qry,Dictionary<string,object> prms, System.Data.DataSet ds1,string name_of_table,string name_of_transaction= null)
        {
            MySqlConnector.MySqlCommand cmd = new MySqlConnector.MySqlCommand();
            cmd.CommandText = qry;
            //prms.Keys.ToArray().ForEach(key =>


            add_prms_to_command(cmd, prms);

            cmd.Connection = conn_obj1;
            if (name_of_transaction != null)
            {
                cmd.Transaction = transactions_dict_obj1[name_of_transaction];
            }

            MySqlConnector.MySqlDataAdapter data_adapter = new MySqlConnector.MySqlDataAdapter();
            data_adapter.SelectCommand = cmd;

            data_adapter.Fill(ds1, name_of_table);

            

            return 1;
        }
    }
}
