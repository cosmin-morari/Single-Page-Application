$("body").on("submit", ".login", function (e) {
    e.preventDefault();
    e.stopPropagation();
    let url = $(this).attr("action");
    let data = $(this).serialize();
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            accepts: "application/json",
        },
        data: data,
        beforeSend: function () {
            $(document).find(".error").text("");
        },
        success: function (response) {
            console.log(response)
            if (response.status == 0) {
                $.each(response.error, function (prefix, val) {
                    $("." + prefix).text(val[0]);
                });
            } else {
                $('input').val('');
                window.location.hash = 'products';
            }
        },
    });
});
