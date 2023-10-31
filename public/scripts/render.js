function renderList(products) {
    html = [
        `<tr>,
            <th>${window.translation.image}</th>
            <th>${window.translation.title}</th>
            <th>${window.translation.description}</th>
            <th>${window.translation.price}</th>
            ${(() => {
                if (window.location.hash == "#cart") {
                    return `<th>${window.translation.yourQuantity}</th>`;
                }
            })()}
            <th>${window.translation.action}</th>
            </tr>  `,
    ].join("");

    $.each(products, function (key, product) {
        let formAddDeleteToCartRoute =
            window.location.hash == "#cart"
                ? `cartCheckout/${product.id}`
                : `addToCart/${product.id}`;
        html += [
            `<tr>
                <td><img src="./storage/photos/${product.imageSource}"></td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                ${(() => {
                    if (window.location.hash == "#cart") {
                        return `<td>
                                    <form action="cartCheckout/${
                                        product.id
                                    }" method="POST" class="updateQuantity">
                                        <input type="number" name="setQuantity" class="quantity" id="${
                                            product.id
                                        }" value="${
                            product.quantity[key][product.id]
                        }">
                                        <button type="submit" name="setQuantity">${
                                            window.translation.update
                                        }</button>
                                    </form>
                                </td>`;
                    }
                })()}
                <td>
                    <form action ="${formAddDeleteToCartRoute}" method="POST" class="formAddDeleteToCart">
                        ${(() => {
                            if (window.location.hash == "#cart") {
                                return `<button name="delete" type="submit" class="addToCartBtn">${window.translation.delete}</button>`;
                            } else {
                                return `<button type="submit" class="addToCartBtn">${window.translation.add}</button>`;
                            }
                        })()}
                    </form>
                </td>`,
        ].join("");
    });

    let mailTemplate = `
        <form action="checkout" class="checkOut" method="POST">
            <input type="text" name="name" placeholder="${window.translation.name}"  >
            <input type="text" name="contactDetails" placeholder="${window.translation.contactDetails}" >
            <textarea name="comments" placeholder="${window.translation.comments}" cols="20" rows="4"> </textarea>
            <button type="submit" class="RemoveBtn">${window.translation.checkout}</button>
        </form>
        `;
    $(".toMail").html(mailTemplate);

    return html;
}

