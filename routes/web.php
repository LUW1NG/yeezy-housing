<?php

use App\Http\Controllers\HouseController;
use Illuminate\Support\Facades\Route;
Route::get('/', [HouseController::class, 'index'])->name('houses.index');
Route::get('/houses/{house}', [HouseController::class, 'show'])->name('houses.show');
Route::post('/houses/{house}/comments', [HouseController::class, 'storeComment'])->name('comments.store');
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});
require __DIR__.'/settings.php';
if (file_exists(__DIR__.'/auth.php')) {
    require __DIR__.'/auth.php';
}