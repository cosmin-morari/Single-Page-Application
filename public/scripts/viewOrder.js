$("body").on("click", ".order", function (e) {
    e.preventDefault();
    let id = $(this).attr("href").split('/')[1];
    $.ajax({
        url: `order/${id}`,
        type: "GET",
        contentType: false,
        processData: false,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            accepts: "application/json",
        },
        success: function (response) {
            console.log(response)
        },
    });
});
