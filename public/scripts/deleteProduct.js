$("body").on("submit", ".deleteProductDb", function (e) {
    e.preventDefault();
    let url = $(this).attr("action");
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            accepts: "application/json",
        },
        success: function (response) {
            window.onhashchange();
        },
    });
});
