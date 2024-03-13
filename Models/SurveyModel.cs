namespace QuailtyForm.Models
{
    public class SurveyModel
    {
        public string CompanySelect { get; set; }
        public string ProjectSelect { get; set; }
        public string Category1Select { get; set; }
        public string Category2Select { get; set; }
        public string Category3Select { get; set; }
        public string CategorySelect { get; set; }
        public List<QuestionAnswer> Questions { get; set; }

    }
    public class QuestionAnswer
    {
        public string Question { get; set; }
        public string Answer { get; set; }
    }
}
