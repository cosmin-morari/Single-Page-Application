function renderList(products) {
    html = [
        `<tr>,
            <th>${window.translation.image}</th>
            <th>${window.translation.title}</th>
            <th>${window.translation.description}</th>
            <th>${window.translation.price}</th>
            ${(() => {
                if (window.location.hash == "#cart") {
                    return `<th>${window.translation.yourQuantity}</th><th>${window.translation.action}</th>`;
                } else {
                    return `<th>${window.translation.action}</th>`;
                }
            })()}
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
                    ${(() => {
                        if (window.location.hash == "#cart") {
                            return `<form action ="cartCheckout/${product.id}" method="POST" class="formAddDeleteToCart"><button name="delete" type="submit" class="addToCartBtn">${window.translation.delete}</button></form>`;
                        } else if (window.location.hash == "") {
                            return `<form action ="addToCart/${product.id}" method="POST" class="formAddDeleteToCart"><button type="submit" class="addToCartBtn">${window.translation.add}</button></form>`;
                        } else if (window.location.hash == "#products") {
                            return `<form action ="deleteProduct/${product.id}" method="POST" class="deleteProductDb"><a href="editProductView/${product.id}">${window.translation.edit}</a><button type="submit" class="addToCartBtn">${window.translation.delete}</button></form>`;
                        }
                    })()}
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

    let adminActionTemplate = `
        <a href="#product">${window.translation.addProduct}</a>
        <form action= "logoutAdmin" method="POST" class="logoutAdmin">
            <input type="submit" class="logout" name="logout" value="${window.translation.logout}">
        </form>
        <br>
        <br>
        <a href="orders">${window.translation.ordersPage}</a>
    `;

    if (!$(".buttons").children().length) {
        $(".buttons").append(adminActionTemplate);
    }

    return html;
}

function addEditProductTemplate(productId, destination) {
    html = `
    <div class="container">
        <h3>${window.translation.productPage}</h3>
        <form action="${destination}" method="POST" enctype="multipart/form-data" class="addEditProduct">
            <input type="text" name="title" class="title" placeholder="${window.translation.title}">
            <br>
            <br>
            <input type="text" name="description" class="description" placeholder="${window.translation.description}">
            <br>
            <br>
            <input type="text" name="price" class="price" placeholder="${window.translation.price}">
            <br>
            <br>
            <input type="file" name="image" id="file" class="inputFile">
            <br>
            <br>
            <a href="#products">${window.translation.productsPage}</a>
            <input type="submit" name="save" value="${window.translation.save}">
        </form>
    </div>
    `;
    return html;
}
