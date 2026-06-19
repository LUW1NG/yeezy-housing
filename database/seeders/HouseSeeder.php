<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\House;

class HouseSeeder extends Seeder
{
    public function run(): void
    {
        $houses = [
            ['address' => '7600 WYOMING', 'city' => 'CODY', 'country' => 'USA', 'zip_code' => '82414'],
            ['address' => '2105 NORTH CALABASAS', 'city' => 'CALABASAS', 'country' => 'USA', 'zip_code' => '91302'],
            ['address' => '402 BERLIN STRASSE', 'city' => 'BERLIN', 'country' => 'GERMANY', 'zip_code' => '10115'],
            ['address' => '99 KANYE WEST BLVD', 'city' => 'ATLANTA', 'country' => 'USA', 'zip_code' => '30301'],
            ['address' => '15 INDUSTRIAL WAY', 'city' => 'CHICAGO', 'country' => 'USA', 'zip_code' => '60601'],
            ['address' => '888 TOKYO GINZA', 'city' => 'TOKYO', 'country' => 'JAPAN', 'zip_code' => '100-0001'],
            ['address' => '55 PARIS AV', 'city' => 'PARIS', 'country' => 'FRANCE', 'zip_code' => '75001'],
            ['address' => '12 MIRROR LAKE', 'city' => 'JACKSON', 'country' => 'USA', 'zip_code' => '83001'],
            ['address' => '33 DESERT ROAD', 'city' => 'DUBAI', 'country' => 'UAE', 'zip_code' => '00000'],
            ['address' => '77 BRUTALIST SQ', 'city' => 'LONDON', 'country' => 'UK', 'zip_code' => 'EC1A'],
            ['address' => '101 OCEAN DRIVE', 'city' => 'MIAMI', 'country' => 'USA', 'zip_code' => '33139'],
            ['address' => '44 CONCRETE AVE', 'city' => 'DETROIT', 'country' => 'USA', 'zip_code' => '48201'],
        ];

        foreach ($houses as $house) {
            House::create($house);
        }
    }
}