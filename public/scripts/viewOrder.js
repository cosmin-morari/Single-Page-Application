$("body").on("click", ".order", function () {
    let id = $(this).attr("id");
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
            $(".order .list").html(rederOrder(response.products));
        },
    });
});
