
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







