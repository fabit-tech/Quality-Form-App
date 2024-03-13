﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Oracle.ManagedDataAccess.Client;
using OracleInternal.SqlAndPlsqlParser.LocalParsing;
using QuailtyForm.Data;
using QuailtyForm.Models;
using QuailtyForm.ViewModels;
using System.Data;
using System.DirectoryServices.ActiveDirectory;
using System.Drawing;

namespace QuailtyForm.Controllers
{
    public class FormController : Controller
    {
        private readonly IConfiguration _configuration;

        public FormController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IActionResult Index()
        {
            var connectionString = _configuration.GetConnectionString("OracleDbConnection");
            OracleDataAccess da = new OracleDataAccess(connectionString);

            var project1List = da.GetCompany();
            int selectedprojectBlockDef = project1List.FirstOrDefault()?.ProjectBlockDefId ?? 0;


            var categories1List = da.GetCategory1();
            int selectedParentId = categories1List.FirstOrDefault()?.Id ?? 0;

            var categories2List = da.GetCategory2(selectedParentId);
            int selectedParentId2 = categories2List.FirstOrDefault()?.Id ?? 0;

            var categories3List = da.GetCategory3(selectedParentId);
            int selectedParentId3 = categories3List.FirstOrDefault()?.Id ?? 0;

            var viewModel = new ComplexFormViewModel
            {
                Companies = da.GetCompany(),
                Projects = da.GetProject(selectedprojectBlockDef),
                Categories1 = da.GetCategory1(),
                Categories2 = da.GetCategory2(selectedParentId),
                Categories3 = da.GetCategory3(selectedParentId2),
                Categories4 = da.GetCategory4()
            };

            return View(viewModel);
        }

        public IActionResult SomeAction()
        {
            var connectionString = _configuration.GetConnectionString("OracleDbConnection");
            OracleDataAccess da = new OracleDataAccess(connectionString);

            var project1List = da.GetCompany();
            int selectedprojectBlockDef = project1List.FirstOrDefault()?.Id ?? 0;

            var category1List = da.GetCategory1();
            int selectedParentId = category1List.FirstOrDefault()?.Id ?? 0;
            var category2List = da.GetCategory2(selectedParentId);
            int selectedParentId2 = category2List.FirstOrDefault()?.Id ?? 0;
            var category3List = da.GetCategory3(selectedParentId2);
            //int selectedParentId3 = category3List.FirstOrDefault()?.Id ?? 0;
            //var category4List = da.GetCategory4(selectedParentId3);

            var viewModel = new ComplexFormViewModel
            {

                Categories1 = category1List,
                Categories2 = category2List,
                Categories3 = category3List
                //Categories4 = category4List
            };

            return View(viewModel); // ViewModel'i View'a gönder
        }

        [HttpGet]
        public IActionResult GetCategory2Data(int parentId)
        {
            var connectionString = _configuration.GetConnectionString("OracleDbConnection");
            OracleDataAccess da = new OracleDataAccess(connectionString);

            var category2Data = da.GetCategory2(parentId);

            return Json(category2Data);
        }

        [HttpGet]
        public IActionResult GetCategory3Data(int parentId)
        {
            var connectionString = _configuration.GetConnectionString("OracleDbConnection");
            OracleDataAccess da = new OracleDataAccess(connectionString);

            var category3Data = da.GetCategory3(parentId);
            return Json(category3Data);
        }

        [HttpGet]
        public IActionResult GetQuestionData(int category1Id, int category2Id, int category3Id)
        {
            var connectionString = _configuration.GetConnectionString("OracleDbConnection");
            OracleDataAccess da = new OracleDataAccess(connectionString);

            var questions3Data = da.GetQuestion(category1Id, category2Id, category3Id);
            return Json(questions3Data); 
        }

        [HttpGet]
        public IActionResult GetProjectData(int projectBlockDef)
        {
            var connectionString = _configuration.GetConnectionString("OracleDbConnection");
            OracleDataAccess da = new OracleDataAccess(connectionString);

            var project1Data = da.GetProject(projectBlockDef);
            return Json(project1Data);
        }
    }
}
