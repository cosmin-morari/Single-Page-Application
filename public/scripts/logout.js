$("body").on("submit", ".logoutAdmin", function (e) {
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
            console.log(response)
            if(response.admin == false){
                window.location.hash="#login";
            }
        },
    });
});
