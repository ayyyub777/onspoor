<?php

use App\Http\Controllers\IssueController;
use App\Http\Controllers\ResolverController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/issues', [IssueController::class, 'index']);
    Route::get('/issues/{id}', [IssueController::class, 'view']);
    Route::post('/issues', [IssueController::class, 'store']);
    Route::put('/issues/{id}', [IssueController::class, 'update']);
    Route::delete('/issues/{id}', [IssueController::class, 'destroy']);
});
Route::get('/issues-by-date', [IssueController::class, 'getIssuesByDate']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/resolvers', [ResolverController::class, 'index']);
    Route::get('/resolvers/{id}', [ResolverController::class, 'view']);
    Route::post('/resolvers', [ResolverController::class, 'store']);
    Route::put('/resolvers/{id}', [ResolverController::class, 'update']);
    Route::delete('/resolvers/{id}', [ResolverController::class, 'destroy']);
});
