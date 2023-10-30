$(document).ready(function () {
    $("body").on("submit", ".formAddDeleteToCart", function (e) {
        e.preventDefault();
        let id = $(this)
            .attr("action")
            .substring($(this).attr("action").lastIndexOf("/") + 1);
        let url = $(this).attr("action");

        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
                accepts: "application/json",
            },
            data: {
                id: id,
                action:
                    window.location.hash == "#cart" ? "delete" : "addToCart",
            },
            success: function (response) {
                if (!response.length) {
                    $(".toMail").hide();
                    $(".tableProducts").hide();
                }
                window.onhashchange();
            },
        });
    });

   
});
