<?php

namespace App\Http\Controllers;

use App\Models\House;
use App\Models\Comment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HouseController extends Controller
{    public function index(Request $request)
    {
        $query = House::query();
        if ($request->filled('search')) {
            $query->where('address', 'like', '%' . $request->search . '%')
                  ->orWhere('city', 'like', '%' . $request->search . '%');
        }
        return Inertia::render('Houses/Index', [
            'houses' => $query->latest()->get(),
            'filters' => $request->only(['search']),
        ]);
    }
    public function show(House $house)
    {
        return Inertia::render('Houses/Show', [
            'house' => $house,
            'comments' => $house->comments()->with('user')->latest()->get(),
        ]);
    }
    public function storeComment(Request $request, House $house)
{
    if (!auth()->check()) {
        abort(403, 'Unauthorized action.');
    }

    $validated = $request->validate([
        'body' => 'required|string|max:2000',
    ]);

    $house->comments()->create([
        'body' => $validated['body'],
        'user_id' => auth()->id(),
    ]);

    return back();
}
}