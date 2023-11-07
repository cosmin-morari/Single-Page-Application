$(document).ready(function () {
    $("body").on("click", ".detailsProduct", function (e) {
        let id = $(this).attr("id");

        $.ajax({
            url: `detailsProduct/${id}`,
            data: id,
            type: "GET",
            contentType: false,
            processData: false,
            headers: {
                accepts: "application/json",
            },
            success: function (response) {
                $(".detailsProduct .content").html(renderProduct(response.product));
                $(".detailsProduct .sameCategoryproducts .list").html(renderRecommendedProducts(response.sameCategoryproducts))
            },
        });
    });
});
