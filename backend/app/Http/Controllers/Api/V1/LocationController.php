<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\LocationFilterRequest;
use App\Http\Requests\StoreLocationRequest;
use App\Http\Resources\LocationResource;
use App\Models\Location;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class LocationController extends Controller
{
    public function index(LocationFilterRequest $request): JsonResponse
    {
        try {
            $query = Location::query();

            // Filtros
            if ($request->has('name')) {
                $query->filterByName($request->name);
            }

            if ($request->has('code')) {
                $query->filterByCode($request->code);
            }

            // Paginación
            $perPage = min($request->get('per_page', 15), 100);
            $locations = $query->paginate($perPage);

            return response()->json([
                'data' => LocationResource::collection($locations->items()),
                'meta' => [
                    'current_page' => $locations->currentPage(),
                    'per_page' => $locations->perPage(),
                    'total' => $locations->total(),
                    'last_page' => $locations->lastPage(),
                    'from' => $locations->firstItem(),
                    'to' => $locations->lastItem(),
                ],
                'links' => [
                    'first' => $locations->url(1),
                    'last' => $locations->url($locations->lastPage()),
                    'prev' => $locations->previousPageUrl(),
                    'next' => $locations->nextPageUrl(),
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => [
                    'message' => 'Failed to retrieve locations',
                    'code' => 'E_RETRIEVE_FAILED'
                ]
            ], 500);
        }
    }

    public function store(StoreLocationRequest $request): JsonResponse
    {
        try {
            $location = Location::create($request->validated());

            return response()->json([
                'data' => new LocationResource($location),
                'message' => 'Location created successfully'
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => [
                    'message' => 'Failed to create location',
                    'code' => 'E_CREATE_FAILED'
                ]
            ], 500);
        }
    }
}