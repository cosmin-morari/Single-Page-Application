$(document).ready(function(){
        $.ajax({
        url: '/api/translation',
        type: 'GET',
        dataType: 'json',
        headers: {
            'accepts': 'application/json'
        },
        success: function(response) {
        window.translation = response
        }
    });
})