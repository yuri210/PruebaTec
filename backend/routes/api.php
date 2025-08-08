<?php

use App\Http\Controllers\Api\V1\LocationController;
use App\Http\Middleware\ApiKeyMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware(['throttle:api', ApiKeyMiddleware::class])->prefix('v1')->group(function () {
    Route::controller(LocationController::class)->group(function () {
        Route::get('/locations', 'index');
        Route::post('/locations', 'store');
    });
});