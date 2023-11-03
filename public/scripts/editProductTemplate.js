$("body").on("click", ".editProductView", function (e) {
    e.preventDefault();
    let id = $(this).attr('href').substring($(this).attr('href').lastIndexOf('/') + 1);

    $.ajax({
        url: `editProductView/${id}`,
        data: id,
        type: "GET",
        contentType: false,
        processData: false,
        headers: {
            accepts: "application/json",
        },
        success: function (response) {
            $(".productEdit").html(addEditProductTemplate(response, `editProduct/${id}`));
            window.location.hash = "#productEdit";
        },
    });
});
