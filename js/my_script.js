$(document).ready(function(){
    var tasks = [
        {
            "id" : "1",
            "title" : "Год рождения.",
            "name" : "year_born"
        },
        {
            "id" : "2",
            "title" : "Город, в котором вы живёте.",
            "name" : "city"
        },
        {
            "id" : "3",
            "title" : "Вуз, факультет, специальность, кафедра.",
            "name" : "vuz"
        },
        {
            "id" : "4",
            "title" : "Год окончания вуза.",
            "name"  : "year_end"
        },
        {
            "id" : "5",
            "title" : "Уровень владения английским языком:",
            "name"  : "en_level"
        },
        {
            "id" : "6",
            "title" : "Чего вы ожидаете от участия в Школе?",
            "name"  : "want_get_emotions"
        },
        {
            "id" : "7",
            "title" : "Откуда вы о нас узнали?",
            "name"  : "who_get_info"
        },
        {
            "id" : "8",
            "title" : "Сколько времени вы были бы готовы уделять стажировке или работе в Яндексе?",
            "name"  : "time"
        },
        {
            "id" : "9",
            "title" : "Расскажите о вашем опыте разработки. Нам будет интересно всё — как серьезный интерфейс, так и просто домашняя страничка",
            "name"  : "skill"
        },
        {
            "id" : "10",
            "title" : "Если вы где-нибудь работали, расскажите, какие у вас были должностные обязанности и был ли опыт работы в команде.",
            "name"  : "level"
        }
    ];
    var table_content = $(".table-task").empty();
    //Вывод вопросов с помощью шаблона Underscore
    _.each(tasks, function(item){
        table_content.append(_.template($("#taskItemTpl").html(), item));
    });

    //Для проверки полноты формы
    function checkAllFields(){
        var i = 0;
        $(".textarea-block").each(function(){
            if ($(this).val() != ""){
                i++;
            }
        });
        if (i == 10){
            return true;
        }else{
            return false;
        }
    }

    //Аккардион
    $(".btn-toggle-block").on("click", function(){
        if ($(this).attr("id") == "open"){
            $(this).attr("id", "close").parents(".row-head").find(".row-task-right .textarea-block").fadeOut("slow");
        }else{
            $(this).attr("id", "open").parents(".row-head").find(".row-task-right .textarea-block").fadeIn("slow");
        }
    });

    //Для прогресс бара
    $(".textarea-block").on("change", function(){
        var progress = 0;
        $(".textarea-block").each(function(){
            if ($(this).val() != ""){
                progress++;
            }
        });
        $(".progress-background").attr("data-progress", progress*10).css({width: progress*10+"%"});
    });

    //Для очистки формы
    $(".clearForm").on("click", function(){
        $(".textarea-block").val("");
        $(".progress-background").attr("data-progress", 0).css({width: 0});
    });

    //Для отправки формы
    $(".sendForm").on("click", function(){
        if (checkAllFields()){
            var dataSend = $("#vacancy_form").serialize();
            $.post("server/url", dataSend, function(data){
                console.log(data);
            }, "json");
        }else{
            alert("Заполните обязательные поля");
        }
    });
});