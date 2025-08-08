<?php

namespace Database\Factories;

use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    protected $model = Location::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $cities = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga', 'Zaragoza'];
        $types = ['Oficina', 'Centro', 'Sede', 'Sucursal', 'Hub'];
        
        $city = $this->faker->randomElement($cities);
        $type = $this->faker->randomElement($types);
        
        return [
            'code' => strtoupper($this->faker->unique()->lexify('???')) . $this->faker->numberBetween(100, 999),
            'name' => $type . ' ' . $city,
            'image' => $this->faker->imageUrl(640, 480, 'business', true),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
            'updated_at' => now(),
        ];
    }
}