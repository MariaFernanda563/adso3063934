$(function () {
    //count tasks & remains
    countTasks()
    countRemains()
    //add tasks & remains
    $('footer').on('click', '#add', function () {
        if ($('#input-task').val().length > 0) {

            $task = '<article> \
                    <input type="checkbox"> \
                    <p>'+ $('#input-task').val() + '</p> \
                    <button>&times;</button> \
                </article>'

            $('section.list').append($task)
            $('#input-task').val('')
            countTasks()
            countRemains()

        } else {
            alert('Please! enter a task')
        }
    })
    // toggle task (remain/done)
    $('body').on('click', 'input[type=checkbox]', function () {
        //if checked
        if ($(this).prop('checked')) {
            $(this).parent().addClass('checked')
        } else {
            $(this).parent().removeClass('checked')
        }
        countRemains()
    })
    //remove taks
    $('body').on('click', 'article button', function () {
        $(this).closest('article').remove()
        countTasks()
        countRemains()
    })
})

function countTasks() {
    $('.num-tasks').text($('article').length)
    $('.title-tasks').text($('article').length > 1 ? 'tasks' : 'task')
}

//count remains

function countRemains() {
    $remain = Math.abs($('.checked').length - $('article').length)
    $('.num-remains').text($remain)
    $('.title-remains').text($remain > 1 ? 'remains' : 'remain')
}