
$(document).ready(function () {
    $('#listeleButton').click(function () {
        var category1Id = $('#category1Select').val();
        var category2Id = $('#category2Select').val();
        var category3Id = $('#category3Select').val();

        $.ajax({
            url: '@Url.Action("GetQuestionData", "Form")',
            type: 'GET',
            data: {
                category1Id: category1Id,
                category2Id: category2Id,
                category3Id: category3Id
            },
            success: function (questions) {
                console.log(questions); // Gelen veriyi konsolda inceleyin

                var list = $('#questionList ul');
                list.empty(); // Mevcut listeyi temizle

                $.each(questions, function (index, question) {
                    var li = $('<li>');
                    li.append(document.createTextNode(question.question_Text));
                    li.append($('<br>'));
                    // Radyo butonlarý ekle
                    var radioAccept = $('<input>', { type: 'radio', name: question.id, value: 'accept', required: true });
                    var radioReject = $('<input>', { type: 'radio', name: question.id, value: 'reject', css: { marginLeft: '10px' } });


                    li.append(radioAccept);

                    li.append($('<label>').text('Kabul').css('color', 'green'));

                    li.append(radioReject);
                    li.append($('<label>').text('Red').css('color', 'red'));

                    list.append(li);
                });

                $('#questionList').show(); // Soru listesini göster
            },
            error: function (xhr, status, error) {
                console.error("Hata:", error);
            }
        });
    });
});



$(document).ready(function () {
    // Category1 deðiþikliðinde Category2'yi güncelle
    $('#category1Select').change(function () {
        var selectedCategoryId = $(this).val();

        $.ajax({
            url: '@Url.Action("GetCategory2Data", "Form")',
            type: 'GET',
            data: { parentId: selectedCategoryId },
            success: function (data) {
                var category2Select = $('#category2Select');
                category2Select.empty();
                category2Select.append($('<option>', { value: '', text: 'Kategori 2 seçin...' }));

                $.each(data, function (index, item) {
                    category2Select.append($('<option>', {
                        value: item.id,
                        text: item.description
                    }));
                });
            }
        });
    });

    // Category2 deðiþikliðinde Category3'ü güncelle
    $('#category2Select').change(function () {
        var selectedCategoryId = $(this).val();

        $.ajax({
            url: '@Url.Action("GetCategory3Data", "Form")',
            type: 'GET',
            data: { parentId: selectedCategoryId },
            success: function (data) {
                var category3Select = $('#category3Select');
                category3Select.empty();
                category3Select.append($('<option>', { value: '', text: 'Kategori 3 seçin...' }));

                $.each(data, function (index, item) {
                    category3Select.append($('<option>', {
                        value: item.id,
                        text: item.description
                    }));
                });
            }
        });
    });

    // Kalite Kontrol Forma göre Kat Blok Seçme
    $('#company1Select').change(function () {
        var selectedProjectId = $(this).val();

        $.ajax({
            url: '@Url.Action("GetProjectData", "Form")',
            type: 'GET',
            data: { projectBlockDef: selectedProjectId },
            success: function (data) {
                var project1Select = $('#project1Select');
                project1Select.empty();
                project1Select.append($('<option>', { value: '', text: 'Kalite Kontrol seçin...' }));

                $.each(data, function (index, item) {
                    project1Select.append($('<option>', {
                        value: item.id,
                        text: item.displayText
                    }));
                });
            }
        });
    });

});





function submitForm() {
    // get survey id
    var companies = @Html.Raw(Json.Serialize(Model.Companies));
    var name = $('#company1Select option:selected').text();
    var selectedCompany = companies.filter(c => c.controlName == name);
    console.log(selectedCompany);
    var surveyId = selectedCompany[0] ? selectedCompany[0].surveyId : null;
    console.log(surveyId);
    //get floor id
    var projects = @Html.Raw(Json.Serialize(Model.Projects));
    var displayText = $('#project1Select option:selected').text();
    var selectedProject = projects.filter(c => c.displayText == displayText);
    console.log(selectedProject);
    var floorId = selectedProject[0] ? selectedProject[0].blockDefDId : null;
    console.log(floorId);
    var formData = {
        surveyId: surveyId,
        floorId: floorId,

        questions: []  // Array to hold questions and their answers
    };

    $('#questionItems li').each(function () {

        debugger;
        var selectedRadio = $(this).find('input[type="radio"]:checked');
        if (selectedRadio.length > 0) {
            var questionId1 = selectedRadio.attr('name');
            var questionId = Number(questionId1);
            var answer = selectedRadio.val();

            formData.questions.push({
                questionId: questionId,
                answer: answer
            });
        }
    });
    console.log(JSON.stringify(formData));
    // AJAX POST request
    $.ajax({
        url: '@Url.Action("SubmitSurvey", "Form")',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function (response) {
            // Modal pencereyi göster
            $('#successModal').modal('show');
            // Form gönderme butonunu devre dýþý býrak
            $('#save-button').prop('disabled', true);
            // Kýsa bir gecikme sonrasýnda sayfayý yenile
            setTimeout(function () {
                window.location.reload();
            }, 2000); // 3000 milisaniye = 3 saniye
        },
        error: function (error) {
            // Error handling here
            alert('Bir hata oluþtu. Anket kaydedilemedi.');
        }
    });
}


