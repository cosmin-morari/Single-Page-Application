<?php

namespace App\Http\Controllers;

use Illuminate\Routing\Controller;
use App\Models\Product;

use Illuminate\Http\Request;

class SpaController extends Controller
{
    public function getProducts(Request $request)
    {
        $cartSession = session()->get('cart');
        $products = ($cartSession) ? Product::whereNotIn('id', $cartSession)->get() : Product::all();

        if ($request->accepts(['text/html', 'application/json'])) {
            return response()->json($products);
        }
        
    }
}
