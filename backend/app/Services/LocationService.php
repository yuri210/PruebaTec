<?php

namespace App\Services;

use App\Models\Location;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class LocationService
{
    public function getPaginatedLocations(
        int $page = 1,
        int $perPage = 15,
        ?string $nameFilter = null,
        ?string $codeFilter = null
    ): LengthAwarePaginator {
        $query = Location::query();

        if ($nameFilter) {
            $query->filterByName($nameFilter);
        }

        if ($codeFilter) {
            $query->filterByCode($codeFilter);
        }

        return $query->paginate($perPage, ['*'], 'page', $page);
    }

    public function createLocation(array $data): Location
    {
        return Location::create($data);
    }

    public function findLocation(int $id): ?Location
    {
        return Location::find($id);
    }

    public function updateLocation(Location $location, array $data): Location
    {
        $location->update($data);
        return $location->fresh();
    }

    public function deleteLocation(Location $location): bool
    {
        return $location->delete();
    }
}