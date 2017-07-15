var delete_item = function () {
    $('a.delete-item').on('click', function (e) {
        e.preventDefault();
        if (confirm('Вы действительно хотите безвозвратно удалить объект?')) {
            location.href = $(this).attr('href');
        }
    });
};

var get_widget_code = function () {
    $('.get-widget-code').on('click', function (e) {
        e.preventDefault();
        alert(
            'Скопируйте код и вставьте его\n' +
            'в любом месте страницы внутри тега `body`:\n\n' +
            '<script src="' + $(this).attr('href') + '"></script>'
        );
    });
};

$( function () {
    delete_item();
    get_widget_code();
});
