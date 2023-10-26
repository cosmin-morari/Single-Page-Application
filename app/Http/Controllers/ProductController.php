<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller;
use App\Http\Requests\ValidateAddProduct;
use App\Http\Requests\ValidateQuantity;
use App\Http\Requests\ValidateEditProduct;

class ProductController extends Controller
{
    use AuthorizesRequests, ValidatesRequests;
    public function index(Request $request)
    {
        $cartSession = session()->get('cart');
        $products = ($cartSession) ? Product::whereNotIn('id', $cartSession)->get() : Product::all();

        return $request->ajax() ? response()->json($products) : view('index', ['allProducts' => $products]);
    }

    public function cart(Request $request)
    {

        $cartSession = session()->get('cart');
        $cartQuantity = session()->get('cartQuantity');
        if ($cartSession) {
            $products = Product::whereIn('id', $cartSession)->get();

            foreach ($products as $product) {
                $product->quantity = [...$cartQuantity];
            }
            


            if ($products) {
                return $request->ajax() ? response()->json($products) : view('cart', ['products' =>  $products, 'mail' => false, 'cartQuantity' => $cartQuantity]);
            }
        } else {
            return view('cart', ['mail' => false, 'empty' =>  trans('messages.emptyCart')]);
        }
    }
    public function store(Request $request, $id)
    {
        $id = $request->ajax() ? $request->input('id') : $id;
        $product = Product::findOrFail($id);

        if ($product) {
            if (!in_array($product->id, session('cart') ?? [])) {
                session()->push('cart', $product->id);
                $initialValue = 1;
                session()->push('cartQuantity', [$product->id => $initialValue]);
            }
        }

        return $request->ajax() ? response()->json(session('cartQuantity')) : redirect()->back();
    }
    public function cartCheckout(Request $request, $id)
    {
        $quantity = $request->input('quantity');
        $cartQuantity = session('cartQuantity');
        $id = $request->ajax() ? $request->input('id') : $id;

        if ($request->input('setQuantity') || $request->ajax()) {
            foreach ($cartQuantity as $key => $value) {
                if (isset($value[$id])) {
                    $cartQuantity[$key][$id] = $quantity;
                }
            }
            session()->put('cartQuantity', $cartQuantity);
        }

        if ($request->input('delete') || $request->ajax()) {
            $cartSession = session()->get('cart');
            $index = array_search($id, $cartSession);
            session()->forget("cart.$index");
            session()->forget("cartQuantity.$index");
        }

        return $request->ajax() ? response()->json(session('cartQuantity')) : redirect()->back();
    }

    public function deleteProductFromDB($id)
    {
        Product::firstOrFail('id')->destroy($id);
        return redirect()->back();
    }

    public function update(ValidateEditProduct $request)
    {
        $id = $request->id;
        $title = $request->title;
        $description = $request->description;
        $price = $request->price;
        $newImageName = time() . '-' . $request->title . '.' . $request->image->extension();
        $request->image->move(public_path('storage/photos'), $newImageName);
        $data = [
            'title' => $title,
            'description' => $description,
            'price' => $price,
            'imageSource' => $newImageName
        ];
        $product = Product::findOrFail($id);
        $product->fill($data);
        $product->save();

        return redirect()->route('products');
    }

    public function storeProduct(ValidateAddProduct $request)
    {
        $newImageName = time() . '-' . $request->title . '.' . $request->image->extension();
        $request->image->move(public_path('storage/photos'), $newImageName);
        $product = new Product;
        $data = [
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'imageSource' => $newImageName
        ];
        $product->fill($data);
        $product->save();

        return redirect()->back();
    }

    public function editProductView($id)
    {
        $product = Product::findOrFail($id);
        return view('product', ['product' => $product, 'destination' => 'editProduct']);
    }

    public function addProductView()
    {
        return view('product', ['destination' => 'addProduct']);
    }
}
