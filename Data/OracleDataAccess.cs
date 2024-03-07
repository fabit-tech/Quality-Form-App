using QuailtyForm.Models;
using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Data;

namespace QuailtyForm.Data
{
    public class OracleDataAccess
    {
        private string ConnectionString { get; set; }

        public OracleDataAccess(string connectionString)
        {
            ConnectionString = connectionString;
        }

        public List<Urun> GetUrunler()
        {
            List<Urun> urunler = new List<Urun>();

            using (OracleConnection con = new OracleConnection(ConnectionString))
            {
                con.Open();
                OracleCommand cmd = new OracleCommand("SELECT CO_ID,CO_CODE FROM GNLD_COMPANY", con);
                cmd.CommandType = CommandType.Text;

                OracleDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    urunler.Add(new Urun
                    {
                        Id = Convert.ToInt32(reader["CO_ID"]),
                        CoCode = reader["CO_CODE"].ToString()
                    });
                }
            }

            return urunler;
        }
    }
}
