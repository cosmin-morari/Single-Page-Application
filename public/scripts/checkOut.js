$(document).ready(function () {
    $("body").on("submit", ".checkOut", function (e) {
        e.preventDefault();

        let data = $(this).serialize();
        $.ajax({
            url: "checkout",
            type: "POST",
            dataType: "json",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                accepts: "application/json",
            },
            data: data,
            success: function (response) {
                if (response.succes) {
                    $(".tableProducts, .toMail").hide();
                    window.location.hash = "#";
                }
            },
        });
    });
});
