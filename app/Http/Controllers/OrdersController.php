<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Routing\Controller;
use App\Http\Requests\ValidateCheckoutRequest;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Mail;
use App\Mail\CheckoutMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class OrdersController extends Controller
{
    public function viewOrders(Request $request)
    {
        $data = Order::with('products')->get();
        return $request->ajax() ? response()->json($data) : view('orders', ['data' => $data]);
    }

    public function viewOrder($id)
    {
        $order = Order::with('products')->findOrFail($id);

        return view('order', ['order' => $order]);
    }

    public function checkout(Request $request)
    {
        $idProductsInCart = session()->get('cart');
        $cartQuantity = session()->get('cartQuantity');
        $products = Product::whereIn('id', $idProductsInCart)->get();

        if ($products->isEmpty()) {
            throw ValidationException::withMessages([
                'cartError' => [trans('messages.error')],
            ])->status(422);
        }
        try {

            $toMail = $request->input('contactDetails');
            Mail::to(config('credentialsAdmin.adminEmail'))->send(new CheckoutMail($products, $toMail));

            // insert order table
            $order = new Order;
            $order->date = now();
            $order->name = $request->input('name');
            $order->contactDetails = $request->input('contactDetails');
            $order->comments = $request->input('comments');
            $order->save();

            // insert pivot table

            $cartQuantityMaped = array_map('current', $cartQuantity);
            foreach ($cartQuantityMaped as $items => $quantity) {
                $value = $quantity;
                $priceProduct= Product::findOrFail($idProductsInCart[$items]);
                $order->products()->attach([$idProductsInCart[$items] => ['quantity' => $value, 'checkout_price' => $priceProduct->price]]);
            }
        } catch (\Exception $err) {
            Log::error($err);
            throw ValidationException::withMessages([
                'cart' => [trans('messages.error')]
            ])->status(422);
        }
        session()->forget('cartQuantity');
        session()->forget('cart');
        return $request->ajax() ? response()->json(['succes' => true]) : redirect()->route('index');
    }

    public function productsView()
    {
        $products = Product::all();
        return view('products', ['allProducts' => $products]);
    }
}
