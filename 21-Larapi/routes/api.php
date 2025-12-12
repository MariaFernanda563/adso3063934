<?php

use Illuminate\Support\Facades\Route;

#Endpoint: http://127.0.0.1:8000/api/pet/list
Route::get('pet/list', [PetController::class, 'index']);

#Endpoint: http://127.0.0.1:8000/api/pet/show/12
Route::get('pet/show/{id}', [PetController::class, 'show']);

#Endpoint: http://127.0.0.1:8000/api/pet/store
Route::get('pet/store', [PetController::class, 'store']);

#Endpoint: http://127.0.0.1:8000/api/pet/edit/12
Route::get('pet/edit/{id}', [PetController::class, 'update']);

#Endpoint: http://127.0.0.1:8000/api/pet/delete/12
Route::get('pet/delete/{id}', [PetController::class, 'destroy']);