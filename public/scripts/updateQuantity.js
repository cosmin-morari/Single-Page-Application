$(document).ready(function () {
    $("body").on("submit", ".updateQuantity", function (e) {
        e.preventDefault();

        let id = $(this)
            .attr("action")
            .substring($(this).attr("action").lastIndexOf("/") + 1);
        let updateValue = $(this).find("input").val();
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
                updateValue: updateValue,
                action: "setQuantity",
            },
            success: function (response) {},
        });
    });
});
