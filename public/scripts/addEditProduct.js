$("body").on("submit", ".addEditProduct", function (e) {
    e.preventDefault();
    let url = $(this).attr("action");

    let data = $(this).serialize();
    let image = $("#file")[0].files[0];
    let formData = new FormData(this);
    formData.append('image', image);
    console.log(formData);
    $.ajax({
        url: url,
        image: formData,
        enctype: "multipart/form-data",
        processData: false,
        type: "POST",
        dataType: "json",
        headers: {
            "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
            accepts: "application/json",
        },
        success: function (response) {
            console.log(response);
        },
    });
});
