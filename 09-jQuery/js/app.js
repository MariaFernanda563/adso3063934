$(function(){

    //Ckeck localStorage
    if(localStorage.getItem('todolist') != null){
        $('.list').html(localStorage.getItem('todolist'))
        countTasks()
        countRemains()

    } else {
        //count Tasks and Remains
        countTasks()
        countRemains()
    }

    //add tasks
    $('footer').on('click', '#add', function(){
        if($('#input-task').val().length > 0){
            
            $task = '<article> \
                        <input type="checkbox">\
                        <p>'+$('#input-task').val()+'</p>\
                        <button>&times;</button>\
                    </article>'
            $('section.list').append($task)
            $('#input-task').val('')
            countTasks()
            countRemains()
        } else {
            alert('Please! Enter a Task');
        }
    })
    //Toggle Task (Remain or Done)
    $('body').on('click', 'input[type="checkbox"]', function(){
        //if checked
        if ($(this).prop('checked')){
            $(this).attr('checked', true)
            $(this).parent().addClass('checked')
        }else{
            $(this).attr('checked', false)
            $(this).parent().removeClass('checked')
        }
        countRemains()
    })
    //Remove Task
    $('body').on('click', 'article button', function() {
        $(this).closest('article').remove()
        countTasks()
        countRemains()
    })
    $('body').on('click', '#reset', function(){
        localStorage.setItem('todolist', $('.list').html(''))
        countTasks()
        countRemains()
    })
})
// Count Tasks
function countTasks(){
    $('.num-tasks').text($('article').length)
    $('.title-tasks').text($('article').length > 1 ? 'Tasks' : 'Task')
}
//count Remains
function countRemains(){
    $remain = Math.abs($('.checked').length - $('article').length)
    $('.num-remains').text($remain)
    $('.title-remains').text($remain >1 ? 'Remains' : 'Remain')
    // set localStorage
    localStorage.setItem('todolist', $('.list').html())
}