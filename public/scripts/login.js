
    $('body').on('submit', '.login', function(e) {
        e.preventDefault();
        e.stopPropagation();
        let url = $(this).attr('action');
        let data = $(this).serialize();
        // let inputMail = 
        // if(){
        //     console.log('err');
        //     $('.login');
        // }
        console.log(adminMail)
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                accepts: "application/json",
            },
            data: data,
            success: function (response) {
                // Render the products in the index list
                console.log(response)
            }
        });
    })
