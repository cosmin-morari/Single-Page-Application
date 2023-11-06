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
        window.location.hash == "#cart"
            ? `cartCheckout/${product.id}`
            : `addToCart/${product.id}`;
        html += [
            `<tr class="${product.title}">
                <td><img src="./storage/photos/${
                    product.imageSource
                }"><a href="#detailsProduct" id="${
                product.id
            }" class="detailsProduct">${
                window.translation.actionViewProduct
            }</a></td>
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
                            return `<form action ="deleteProduct/${product.id}" method="POST" class="deleteProductDb"><a href="productEdit/${product.id}" class="editProductView">${window.translation.edit}</a><button type="submit" class="addToCartBtn">${window.translation.delete}</button></form>`;
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
        <a href="#product" class="products">${window.translation.addProduct}</a>
        <form action= "logoutAdmin" method="POST" class="logoutAdmin">
            <input type="submit" class="logout" name="logout" value="${window.translation.logout}">
        </form>
        <br>
        <br>
        <a href="#orders">${window.translation.ordersPage}</a>
    `;

    if (!$(".buttons").children().length) {
        $(".buttons").append(adminActionTemplate);
    }

    return html;
}

function addEditProductTemplate(responseProduct, destination) {
    let titleValueInput = responseProduct ? responseProduct.title : "";
    let descriptionValueInput = responseProduct
        ? responseProduct.description
        : "";
    let priceValueInput = responseProduct ? responseProduct.price : "";
    let categoryValueInput = responseProduct ? responseProduct.category : "";

    html = `
    <div class="container">
        <h3>${window.translation.productPage}</h3>
        <form action="${destination}" method="POST" enctype="multipart/form-data" class="addEditProduct">
            <input type="text" name="title" class="title" placeholder="${window.translation.title}" value ="${titleValueInput}">
            <div style="color:red" class="error title"></div>
            <br>
            <br>
            <input type="text" name="description" class="description" placeholder="${window.translation.description}" value ="${descriptionValueInput}">
            <div style="color:red" class="error description"></div>
            <br>
            <br>
            <input type="text" name="price" class="price" placeholder="${window.translation.price}" value ="${priceValueInput}">
            <div style="color:red" class="error price"></div>
            <br>
            <br>
            <input type="text" name="category" class="category" placeholder="${window.translation.category}" value ="${categoryValueInput}">
            <div style="color:red" class="error category"></div>
            <br>
            <br>
            <input type="file" name="image" id="file" class="file">
            <div style="color:red" class="error file"></div>
            <br>
            <br>
            <a href="#products" class="products">${window.translation.productsPage}</a>
            <button type="submit" name="save">${window.translation.save}</button>
        </form>
    </div>
    `;
    return html;
}

function renderOrders(orders) {
    html = [
        `
        <tr>
        <th>${window.translation.id}</th>
            <th>${window.translation.date}</th>
            <th>${window.translation.name}</th>
            <th>${window.translation.contactDetails}</th>
            <th>${window.translation.comments}</th>
            <th>${window.translation.actionViewOrder}</th>
        </tr>
    `,
    ].join("");

    $.each(orders, function (key, order) {
        html += [
            `
            <tr>
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${order.name}</td>
                <td>${order.contactDetails}</td>
                <td>${order.comments}</td>
                <td>
                    <a href="#order" id=${order.id} class="order">${window.translation.seeOrder}</a>
                </td>
            </tr>                        
        `,
        ].join("");
    });

    return html;
}

function rederOrder(order) {
    html = [
        `
        <tr>
            <th>${window.translation.image}</th>
            <th>${window.translation.name}</th>
            <th>${window.translation.yourQuantity}</th>
            <th>${window.translation.totalPrice}</th>
        </tr>
    `,
    ].join("");

    $.each(order, function (key, value) {
        html += [
            `
            <tr>
                <td><img src="./storage/photos/${value.imageSource}"</td>
                <td>${value.title}</td>
                <td>${value.pivot.quantity}</td>
                <td>${value.pivot.checkout_price * value.pivot.quantity}</td>
                </tr>                        
            `,
        ].join("");
    });
    return html;
}

function renderProduct(product) {
    html = `
    <h1>${product.title}</h1>
    <h3>${product.category}</h3>
    <img src="./storage/photos/${product.imageSource}"
    <br>
    <p>${product.description}</p>
    `;
    return html;
}

function renderRecommendedProducts(products) {
    html = [
        `
        <h1>${window.translation.productsRecommended}</h1>
        <tr>
            <th>${window.translation.image}</th>
            <th>${window.translation.title}</th>
            <th>${window.translation.description}</th>
            <th>${window.translation.price}</th>
        </tr>
    `,
    ].join("");

    $.each(products, function (key, product) {
        html += [
            `
            <tr>
                <td><img src="./storage/photos/${product.imageSource}"</td>
                <td>${product.title}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
            </tr>                        
        `,
        ].join("");
    });

    return html;
}
