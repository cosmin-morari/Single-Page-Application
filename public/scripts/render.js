function renderList(products) {
    html = [
        `<tr>,
        <th class="image"></th>
        <th>${translations.title}</th>
        <th>${translations.description}</th>
        <th>${translations.price}</th>
        ${(()=>{
                if(window.location.hash == '#cart'){
                    return `<th>${translations.yourQuantity}</th>`
                }
        })()}
        <th>${translations.action}</th>
        </tr>  `
    ].join('');

    $.each(products, function(key, product) {

        
        let formAddDeleteToCartRoute = window.location.hash == '#cart' ? `cartCheckout/${product.id}` : `addToCart/${product.id}`;
        html += [
            `<tr>
            <td><img src="./storage/photos/${product.imageSource}"></td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            ${(()=>{
                if(window.location.hash == '#cart'){
                    return `<td>
                                <form action="cartCheckout/${product.id}" method="POST" class="updateQuantity">
                                    <input type="number" name="setQuantity" class="quantity" id="${product.id}" value="${product.quantity[key][product.id]}">
                                    <button type="submit" name="setQuantity">${translations.update}</button>
                                </form>
                            </td>`
                }
        })()}
            <td>
                <form action ="${formAddDeleteToCartRoute}" method="POST" class="formAddDeleteToCart">
                    ${(()=>{
                        if(window.location.hash == '#cart'){
                            return `<button name="delete" type="submit" class="addToCartBtn">${translations.delete}</button>`
                        }else{
                            return `<button type="submit" class="addToCartBtn">${translations.add}</button>`
                        }
                    })()}
                </form>
            </td>`
        ].join('');
    });

    return html;
}

$.ajax({
    url: "/api/translation",
    type: "GET",
    dataType: "json",
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        accepts: "application/json",
    },
    success: function (response) {
       //
    }
});
