$("body").on("submit", ".addEditProduct", function (e) {
    e.preventDefault();
    let url = $(this).attr("action");
    let data = new FormData();
    data.append("title", $(".title").val());
    data.append("description", $(".description").val());
    data.append("price", $(".price").val());
    
    jQuery.each(jQuery("#file")[0].files, function (i, file) {
        data.append("file", file);
    });

    data.append("category", $(".category").val());

    $.ajax({
        url: url,
        data: data,
        type: "POST",
        contentType: false,
        processData: false,
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            accepts: "application/json",
        },
        success: function (response) {
            if (response.error) {
                $.each(response.error, function (prefix, val) {
                    $(".error").show();
                    $("." + prefix).text(val[0]);
                });
            }
            if (response.message) {
                $(".error").hide();
                $("input").val("");
            }
        },
    });
});
