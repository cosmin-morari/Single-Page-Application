function renderList(products) {
    html = [
        `<tr>,
        <th>${products.translate.image}</th>
        <th>${products.translate.title}</th>
        <th>${products.translate.description}</th>
        <th>${products.translate.price}</th>
        ${(()=>{
                if(window.location.hash == '#cart'){
                    return `<th>${products.translate.yourQuantity}</th>`
                }
        })()}
        <th>${products.translate.action}</th>
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
                                    <button type="submit" name="setQuantity">${products.translate.update}</button>
                                </form>
                            </td>`
                }
        })()}
            <td>
                <form action ="${formAddDeleteToCartRoute}" method="POST" class="formAddDeleteToCart">
                    ${(()=>{
                        if(window.location.hash == '#cart'){
                            return `<button name="delete" type="submit" class="addToCartBtn">${products.translate.delete}</button>`
                        }else{
                            return `<button type="submit" class="addToCartBtn">${products.translate.add}</button>`
                        }
                    })()}
                </form>
            </td>`
        ].join('');
    });

    let mailTemplate = 
    `
    <form action="checkout" class="checkOut" method="POST">
        <input type="text" name="name" placeholder="${products.translate.name}"  >
        <input type="text" name="contactDetails" placeholder="${products.translate.contactDetails}" >
        <textarea name="comments" placeholder="${products.translate.comments}" cols="20" rows="4"> </textarea>
        <button type="submit" class="RemoveBtn">${products.translate.checkout}</button>
    </form>
    `
    $('.toMail').html(mailTemplate)

    return html;
}


