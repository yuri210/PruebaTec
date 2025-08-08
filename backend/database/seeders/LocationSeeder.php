<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        $locations = [
            ['code' => 'NYC001', 'name' => 'New York Office', 'image' => 'https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg'],
            ['code' => 'LAX002', 'name' => 'Los Angeles Branch', 'image' => 'https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg'],
            ['code' => 'CHI003', 'name' => 'Chicago Headquarters', 'image' => 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg'],
            ['code' => 'MIA004', 'name' => 'Miami Division', 'image' => 'https://images.pexels.com/photos/161772/pexels-photo-161772.jpeg'],
            ['code' => 'SEA005', 'name' => 'Seattle Tech Hub', 'image' => 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg'],
            ['code' => 'BOS006', 'name' => 'Boston Innovation Center', 'image' => 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg'],
            ['code' => 'ATL007', 'name' => 'Atlanta Regional Office', 'image' => 'https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg'],
            ['code' => 'DEN008', 'name' => 'Denver Mountain Hub', 'image' => 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg'],
            ['code' => 'PHX009', 'name' => 'Phoenix Desert Center', 'image' => 'https://images.pexels.com/photos/313782/pexels-photo-313782.jpeg'],
            ['code' => 'POR010', 'name' => 'Portland Creative Space', 'image' => 'https://images.pexels.com/photos/161772/pexels-photo-161772.jpeg'],
            ['code' => 'AUS011', 'name' => 'Austin Tech Campus', 'image' => 'https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg'],
            ['code' => 'NAS012', 'name' => 'Nashville Music District', 'image' => 'https://images.pexels.com/photos/374710/pexels-photo-374710.jpeg'],
        ];

        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}