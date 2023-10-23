<?php

use App\Http\Controllers\Controller;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\SpaController;
use App\Http\Controllers\OrdersController;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [ProductController::class, 'index'])->name('index');
Route::get('/cart', [ProductController::class, 'cart'])->name('cart');
Route::get('login',  [AuthController::class, 'viewLogin'])->name('login');

Route::post('addToCart/{id}', [ProductController::class, 'store'])->name('addToCart');
Route::post('cartCheckout/{id}', [ProductController::class, 'cartCheckout'])->name('cartCheckout');
Route::post('checkout', [OrdersController::class, 'checkout'])->name('checkout');
Route::post('login', [AuthController::class, 'validateLogin'])->name('validateLogin');

Route::group(['middleware' => ['customAuth']], function () {
    Route::get('orders', [OrdersController::class, 'viewOrders'])->name('orders');
    Route::get('products', [OrdersController::class, 'productsView'])->name('products');
    Route::get('addProduct', [ProductController::class, 'addProductView'])->name('addProduct');
    Route::get('editProductView/{id}', [ProductController::class, 'editProductView'])->name('editProductView');
    Route::get('order/{id}', [OrdersController::class, 'viewOrder'])->name('order');
    Route::post('logoutAdmin', [AuthController::class, 'logoutAdmin'])->name('logoutAdmin');
    Route::post('deleteProduct/{id}', [ProductController::class, 'deleteProductFromDB'])->name('deleteProduct');
    Route::post('addProduct', [ProductController::class, 'storeProduct'])->name('addProduct');
    Route::post('viewOrder', [OrdersController::class, 'viewOrder'])->name('viewOrder');

    Route::patch('editProduct/{id}', [ProductController::class, 'update'])->name('update');
});

// SPA
Route::get('/singlePageApp', [SpaController::class, 'getProducts'])->name('singlePageApp');