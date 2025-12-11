"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

// Complete caffeine list with fl oz, calories, caffeine (mg), and mg/fl oz
const caffeineProducts = [
  // Edibles - Gum, Mints, Chews, Strips, Bars
  { name: "Neuro Gum (Mint)", flOz: 0, calories: 5, caffeine: 40, category: "Edibles" },
  { name: "Viter Energy Caffeinated Mints", flOz: 0, calories: 0, caffeine: 40, category: "Edibles" },
  { name: "Revvies Energy Strips", flOz: 0, calories: 0, caffeine: 40, category: "Edibles" },
  { name: "Nuun Sport + Caffeine Electrolyte Tablets", flOz: 0, calories: 10, caffeine: 40, category: "Edibles" },
  { name: "Curly's Energy Electrolyte Sticks", flOz: 0, calories: 15, caffeine: 40, category: "Edibles" },
  { name: "Run Gum Energy Gum", flOz: 0, calories: 5, caffeine: 50, category: "Edibles" },
  { name: "CLIF BLOKS Energy Chews (Cherry)", flOz: 0, calories: 200, caffeine: 50, category: "Edibles" },
  { name: "ALP Supply Co. Caffeinated Mints (Wintergreen)", flOz: 0, calories: 0, caffeine: 50, category: "Edibles" },
  { name: "NZE Nootropic Caffeine Pouches", flOz: 0, calories: 0, caffeine: 50, category: "Edibles" },
  { name: "Rally Energy Mints", flOz: 0, calories: 0, caffeine: 60, category: "Edibles" },
  { name: "CLIF Builders Protein Bar (Chocolate Peanut Butter)", flOz: 0, calories: 290, caffeine: 65, category: "Edibles" },
  { name: "CLIF Energy Bar (Chocolate + Caffeine)", flOz: 0, calories: 250, caffeine: 65, category: "Edibles" },
  { name: "Instant Energy Caffeine Strips", flOz: 0, calories: 0, caffeine: 80, category: "Edibles" },
  { name: "Military Energy Gum", flOz: 0, calories: 5, caffeine: 100, category: "Edibles" },
  { name: "CLIF BLOKS Energy Chews (Low Dose)", flOz: 0, calories: 200, caffeine: 25, category: "Edibles" },
  { name: "Huma Energy Gel (Chocolate)", flOz: 0, calories: 100, caffeine: 25, category: "Edibles" },
  // Caffeine Pills/Supplements
  { name: "VitaMonk Low-Dose Caffeine + L-Theanine (25mg)", flOz: 0, calories: 0, caffeine: 25, category: "Supplement" },
  { name: "VALI Caffeine & L-Theanine (50mg)", flOz: 0, calories: 0, caffeine: 50, category: "Supplement" },
  { name: "Genius Caffeine Extended Release (100mg)", flOz: 0, calories: 0, caffeine: 100, category: "Supplement" },
  { name: "ProLab Caffeine Tablets (200mg)", flOz: 0, calories: 0, caffeine: 200, category: "Supplement" },
  // Drinks
  { name: "28 Black Energy Drink", flOz: 8.46, calories: 125, caffeine: 80, category: "Energy Drink" },
  { name: "3 Water", flOz: 16.9, calories: 0, caffeine: 50, category: "Beverage" },
  { name: "3D Energy Drink", flOz: 16, calories: 15, caffeine: 200, category: "Energy Drink" },
  { name: "4 Purpose Energy Drink", flOz: 8.46, calories: 70, caffeine: 70, category: "Energy Drink" },
  { name: "4C Energy Drink Mix", flOz: 16.9, calories: 15, caffeine: 170, category: "Energy Drink" },
  { name: "5 Hour Energy", flOz: 1.93, calories: 4, caffeine: 200, category: "Energy Shot" },
  { name: "5 Hour Energy Extra Strength", flOz: 1.93, calories: 0, caffeine: 230, category: "Energy Shot" },
  { name: "7 Eleven Brewed Coffee", flOz: 16, calories: 5, caffeine: 280, category: "Coffee" },
  { name: "7-Eleven Energy Shot", flOz: 2, calories: 0, caffeine: 260, category: "Energy Shot" },
  { name: "7-Up", flOz: 12, calories: 140, caffeine: 0, category: "Soda" },
  { name: "A Shoc", flOz: 16, calories: 10, caffeine: 250, category: "Energy Drink" },
  { name: "A&W Cream Soda", flOz: 12, calories: 170, caffeine: 0, category: "Soda" },
  { name: "A&W Root Beer", flOz: 12, calories: 170, caffeine: 0, category: "Soda" },
  { name: "A&W Zero Sugar Cream Soda", flOz: 12, calories: 0, caffeine: 0, category: "Soda" },
  { name: "ABB Turbo Tea Zero", flOz: 18, calories: 0, caffeine: 120, category: "Tea" },
  { name: "Accelerator", flOz: 12, calories: 10, caffeine: 150, category: "Energy Drink" },
  { name: "Advocare Slam Energy Shot", flOz: 2, calories: 10, caffeine: 120, category: "Energy Shot" },
  { name: "Advocare Slim", flOz: 8, calories: 0, caffeine: 120, category: "Energy Drink" },
  { name: "Afri Cola", flOz: 11.16, calories: 139, caffeine: 83, category: "Soda" },
  { name: "AHA Sparkling Water", flOz: 12, calories: 0, caffeine: 30, category: "Beverage" },
  { name: "Alani Nu Energy Drink", flOz: 12, calories: 10, caffeine: 200, category: "Energy Drink" },
  { name: "Ale 8 1", flOz: 12, calories: 120, caffeine: 37, category: "Soda" },
  { name: "ALL IN Energy Drink", flOz: 12, calories: 25, caffeine: 75, category: "Energy Drink" },
  { name: "Alpine Start Instant Coffee", flOz: 8, calories: 0, caffeine: 120, category: "Coffee" },
  { name: "Alsa Energy Drink Mix", flOz: 16, calories: 30, caffeine: 100, category: "Energy Drink" },
  { name: "Americano Coffee", flOz: 12, calories: 5, caffeine: 154, category: "Coffee" },
  { name: "AMIN.O. Energy Drink", flOz: 12, calories: 5, caffeine: 100, category: "Energy Drink" },
  { name: "Amino Force Energy Drink", flOz: 22, calories: 0, caffeine: 200, category: "Energy Drink" },
  { name: "Arbonne Energy Fizz Stck", flOz: 8, calories: 15, caffeine: 55, category: "Energy Drink" },
  { name: "Arby's Jamocha Shake", flOz: 16, calories: 830, caffeine: 12, category: "Beverage" },
  { name: "Arizona Arnold Palmer Half and Half", flOz: 16.9, calories: 180, caffeine: 15, category: "Tea" },
  { name: "Arizona Energy Drink Rx", flOz: 11.5, calories: 130, caffeine: 127, category: "Energy Drink" },
  { name: "Arizona Iced Tea", flOz: 16, calories: 190, caffeine: 30, category: "Tea" },
  { name: "Arti Sparkling Water", flOz: 12, calories: 0, caffeine: 120, category: "Beverage" },
  { name: "AXIO Energy Drink Mix", flOz: 12, calories: 0, caffeine: 100, category: "Energy Drink" },
  { name: "Bai Antioxidant Infusion", flOz: 18, calories: 10, caffeine: 55, category: "Beverage" },
  { name: "Bai Boost", flOz: 11.47, calories: 10, caffeine: 110, category: "Beverage" },
  { name: "Balance Active Shot", flOz: 2, calories: 80, caffeine: 100, category: "Energy Shot" },
  { name: "Balance Energy Shot", flOz: 2, calories: 77, caffeine: 150, category: "Energy Shot" },
  { name: "Bang Energy", flOz: 16, calories: 0, caffeine: 300, category: "Energy Drink" },
  { name: "Bang Keto Coffee", flOz: 16, calories: 130, caffeine: 300, category: "Coffee" },
  { name: "Bang Natural", flOz: 16, calories: 0, caffeine: 250, category: "Energy Drink" },
  { name: "Bang Shot", flOz: 3, calories: 0, caffeine: 300, category: "Energy Shot" },
  { name: "Bang Sweet Tea", flOz: 16, calories: 0, caffeine: 300, category: "Tea" },
  { name: "Barista Bros Iced Coffee", flOz: 16.91, calories: 204, caffeine: 140, category: "Coffee" },
  { name: "Barqs Red Creme Soda", flOz: 12, calories: 170, caffeine: 0, category: "Soda" },
  { name: "Barqs Root Beer", flOz: 12, calories: 160, caffeine: 22, category: "Soda" },
  { name: "Baskin Robbins Cappuccino Blast", flOz: 24, calories: 470, caffeine: 234, category: "Coffee" },
  { name: "Bawls", flOz: 16, calories: 190, caffeine: 102, category: "Energy Drink" },
  { name: "BE Beyond Energy Drink", flOz: 12, calories: 15, caffeine: 160, category: "Energy Drink" },
  { name: "Beaver Buzz Energy Drink", flOz: 16, calories: 240, caffeine: 178, category: "Energy Drink" },
  { name: "BEEBAD Energy Drink", flOz: 8.46, calories: 110, caffeine: 80, category: "Energy Drink" },
  { name: "Berocca", flOz: 8, calories: 5, caffeine: 90, category: "Supplement" },
  { name: "Berzerk Energy Drink Mix", flOz: 16, calories: 5, caffeine: 200, category: "Energy Drink" },
  { name: "Best Choice Strawberry Energy Drink Mix", flOz: 8, calories: 5, caffeine: 120, category: "Energy Drink" },
  { name: "Big Red Soda", flOz: 12, calories: 150, caffeine: 34, category: "Soda" },
  { name: "Big Train Java Chip Ice Coffee", flOz: 12, calories: 410, caffeine: 49, category: "Coffee" },
  { name: "Big Train Spiced Chai", flOz: 8, calories: 210, caffeine: 65, category: "Tea" },
  { name: "Bigelow Tea", flOz: 8, calories: 0, caffeine: 45, category: "Tea" },
  { name: "Biggby Brewed Coffee", flOz: 16, calories: 0, caffeine: 200, category: "Coffee" },
  { name: "Biggby Creamy Lattes", flOz: 16, calories: 387, caffeine: 100, category: "Coffee" },
  { name: "Biggby Espresso", flOz: 2, calories: 0, caffeine: 100, category: "Coffee" },
  { name: "Biggby Iced Coffee", flOz: 16, calories: 0, caffeine: 155, category: "Coffee" },
  { name: "Biggby Iced Tea", flOz: 16, calories: 0, caffeine: 38, category: "Tea" },
  { name: "Bing Energy Drink", flOz: 12, calories: 30, caffeine: 120, category: "Energy Drink" },
  { name: "Bizzy Cold Brew", flOz: 2.67, calories: 0, caffeine: 125, category: "Coffee" },
  { name: "Black Bruin Energy Drink", flOz: 8.46, calories: 122, caffeine: 38, category: "Energy Drink" },
  { name: "Black Ink Coffee", flOz: 12, calories: 0, caffeine: 144, category: "Coffee" },
  { name: "Black Insomnia Coffee", flOz: 12, calories: 0, caffeine: 1105, category: "Coffee" },
  { name: "Black Label Brewed Coffee", flOz: 12, calories: 0, caffeine: 1555, category: "Coffee" },
  { name: "Bloom Energy", flOz: 12, calories: 10, caffeine: 180, category: "Energy Drink" },
  { name: "Blu Frog Energy Drink", flOz: 8.46, calories: 90, caffeine: 80, category: "Energy Drink" },
  { name: "Blue Bolt (UK)", flOz: 8.46, calories: 112, caffeine: 80, category: "Energy Drink" },
  { name: "Blue Charge (UK)", flOz: 8.46, calories: 49, caffeine: 80, category: "Energy Drink" },
  { name: "Blue Spark (UK)", flOz: 8.46, calories: 56, caffeine: 75, category: "Energy Drink" },
  { name: "Bodyarmour Edge", flOz: 20, calories: 180, caffeine: 100, category: "Energy Drink" },
  { name: "Bomb Energy Drink", flOz: 8.46, calories: 0, caffeine: 80, category: "Energy Drink" },
  { name: "Bomba (EU)", flOz: 8.4, calories: 123, caffeine: 80, category: "Energy Drink" },
  { name: "Boost Energy (UK)", flOz: 8.46, calories: 58, caffeine: 80, category: "Energy Drink" },
  { name: "Boost Nutritional Drink", flOz: 8, calories: 240, caffeine: 5, category: "Beverage" },
  { name: "Bottled Iced Coffee Dunkin Donuts", flOz: 13.7, calories: 260, caffeine: 197, category: "Coffee" },
  { name: "BPM Energy Drink", flOz: 16.91, calories: 290, caffeine: 70, category: "Energy Drink" },
  { name: "BreinFuel", flOz: 12, calories: 60, caffeine: 360, category: "Energy Drink" },
  { name: "Brew Dr Kombucha Uplift", flOz: 14, calories: 80, caffeine: 130, category: "Tea" },
  { name: "Brisk Iced Tea", flOz: 12, calories: 70, caffeine: 11, category: "Tea" },
  { name: "Brown Rice Tea", flOz: 8, calories: 0, caffeine: 4, category: "Tea" },
  { name: "Bubbl'r Sparkling Water", flOz: 12, calories: 5, caffeine: 69, category: "Beverage" },
  { name: "Bubly Bounce Sparkling Water", flOz: 12, calories: 0, caffeine: 35, category: "Beverage" },
  { name: "Bubly Sparkling Water", flOz: 12, calories: 0, caffeine: 0, category: "Beverage" },
  { name: "Bucked Up", flOz: 16, calories: 0, caffeine: 300, category: "Energy Drink" },
  { name: "Bulletproof Coffee", flOz: 8, calories: 0, caffeine: 145, category: "Coffee" },
  { name: "Burn Energy Drink", flOz: 12, calories: 163, caffeine: 112, category: "Energy Drink" },
  { name: "C4 On The Go", flOz: 12, calories: 0, caffeine: 200, category: "Energy Drink" },
  { name: "C4 Performance Energy", flOz: 16, calories: 0, caffeine: 200, category: "Energy Drink" },
  { name: "C4 Smart Energy Drink", flOz: 16, calories: 0, caffeine: 200, category: "Energy Drink" },
  { name: "C4 Ultimate Energy Drink", flOz: 16, calories: 0, caffeine: 300, category: "Energy Drink" },
  { name: "Cafe Bustelo", flOz: 12, calories: 0, caffeine: 150, category: "Coffee" },
  { name: "Cafe Con Leche", flOz: 6, calories: 56, caffeine: 154, category: "Coffee" },
  { name: "Caffe Mocha", flOz: 12, calories: 239, caffeine: 152, category: "Coffee" },
  { name: "Caffe Nero Coffee", flOz: 12, calories: 5, caffeine: 160, category: "Coffee" },
  { name: "Califia Farms Cold Brew Coffee", flOz: 8, calories: 10, caffeine: 180, category: "Coffee" },
  { name: "Canada Dry Green Tea Ginger Ale", flOz: 12, calories: 140, caffeine: 9, category: "Soda" },
  { name: "Cannonball Coffee Maximum Charge (UK)", flOz: 12, calories: 0, caffeine: 1101, category: "Coffee" },
  { name: "Cappuccino", flOz: 12, calories: 97, caffeine: 154, category: "Coffee" },
  { name: "Carabao Energy Drink (UK)", flOz: 11.16, calories: 63, caffeine: 106, category: "Energy Drink" },
  { name: "Caribou BOUsted Sparkling Water", flOz: 11.5, calories: 0, caffeine: 75, category: "Beverage" },
  { name: "Caribou Brewed Coffee", flOz: 16, calories: 5, caffeine: 305, category: "Coffee" },
  { name: "Caribou Canned Cold Brew", flOz: 11.5, calories: 10, caffeine: 177, category: "Coffee" },
  { name: "Cascara", flOz: 8, calories: 0, caffeine: 36, category: "Tea" },
  { name: "CBD Coffee", flOz: 8, calories: 0, caffeine: 100, category: "Coffee" },
  { name: "Celsius Energy Drink", flOz: 12, calories: 10, caffeine: 200, category: "Energy Drink" },
  { name: "Celsius Stevia", flOz: 12, calories: 15, caffeine: 200, category: "Energy Drink" },
  { name: "Chai Tea", flOz: 8, calories: 0, caffeine: 50, category: "Tea" },
  { name: "Chameleon Cold Brew Coffee", flOz: 8, calories: 15, caffeine: 210, category: "Coffee" },
  { name: "Chameleon Cold Brew RTD", flOz: 10, calories: 10, caffeine: 230, category: "Coffee" },
  { name: "Chameleon Cold Brew With Milk", flOz: 11, calories: 100, caffeine: 100, category: "Coffee" },
  { name: "Cheerwine", flOz: 12, calories: 150, caffeine: 47, category: "Soda" },
  { name: "Chick-fil-A Brewed Coffee", flOz: 10, calories: 0, caffeine: 136, category: "Coffee" },
  { name: "Chick-fil-A Frosted Coffee", flOz: 14, calories: 240, caffeine: 130, category: "Coffee" },
  { name: "Chick-fil-A Iced Coffee", flOz: 14, calories: 190, caffeine: 80, category: "Coffee" },
  { name: "Chick-fil-A Iced Tea", flOz: 16, calories: 120, caffeine: 62, category: "Tea" },
  { name: "Choffy (roasted cacao)", flOz: 6, calories: 0, caffeine: 23, category: "Beverage" },
  { name: "Cintron Energy Drink", flOz: 8.4, calories: 60, caffeine: 85, category: "Energy Drink" },
  { name: "Clif Shot Energy Gel", flOz: 1.2, calories: 100, caffeine: 100, category: "Supplement" },
  { name: "Club Mate (EU)", flOz: 16.91, calories: 160, caffeine: 100, category: "Beverage" },
  { name: "Coca Cola Plus", flOz: 470, calories: 0, caffeine: 45, category: "Soda" },
  { name: "Coca-Cola Caffeine Free", flOz: 12, calories: 140, caffeine: 0, category: "Soda" },
  { name: "Coca-Cola Cherry", flOz: 12, calories: 150, caffeine: 34, category: "Soda" },
  { name: "Coca-Cola Cherry Vanilla", flOz: 12, calories: 140, caffeine: 34, category: "Soda" },
  { name: "Coca-Cola Cherry Zero Sugar", flOz: 12, calories: 0, caffeine: 34, category: "Soda" },
  { name: "Coca-Cola Classic", flOz: 12, calories: 140, caffeine: 34, category: "Soda" },
  { name: "Coca-Cola Energy", flOz: 12, calories: 140, caffeine: 114, category: "Energy Drink" },
  { name: "Coca-Cola Orange Vanilla", flOz: 12, calories: 140, caffeine: 34, category: "Soda" },
  { name: "Coca-Cola Vanilla", flOz: 12, calories: 150, caffeine: 34, category: "Soda" },
  { name: "Coca-Cola Vanilla Zero Sugar", flOz: 12, calories: 0, caffeine: 34, category: "Soda" },
  { name: "Coca-Cola With Coffee", flOz: 12, calories: 70, caffeine: 69, category: "Soda" },
  { name: "Coca-Cola Zero Sugar", flOz: 12, calories: 0, caffeine: 34, category: "Soda" },
  { name: "Cocaine Energy Drink", flOz: 12, calories: 90, caffeine: 280, category: "Energy Drink" },
  { name: "Coffee", flOz: 8, calories: 0, caffeine: 163, category: "Coffee" },
  { name: "Coffee (Decaf, Instant)", flOz: 8, calories: 6, caffeine: 2, category: "Coffee" },
  { name: "Coffee (Instant)", flOz: 8, calories: 0, caffeine: 57, category: "Coffee" },
  { name: "Coffee (Moka Pot)", flOz: 2, calories: 0, caffeine: 93, category: "Coffee" },
  { name: "Coffee Bean & Tea leaf Coffee", flOz: 16, calories: 5, caffeine: 333, category: "Coffee" },
  { name: "Coffee Friend Brewed Coffee", flOz: 8.46, calories: 0, caffeine: 145, category: "Coffee" },
  { name: "Coffee Leaf Tea", flOz: 8, calories: 0, caffeine: 20, category: "Tea" },
  { name: "COGO Caffeinated Hot Chocolate", flOz: 6, calories: 110, caffeine: 98, category: "Beverage" },
  { name: "Cold Brew Tea", flOz: 8, calories: 0, caffeine: 70, category: "Tea" },
  { name: "CoolBrew Coffee", flOz: 10, calories: 0, caffeine: 60, category: "Coffee" },
  { name: "Costa Coffee", flOz: 10.14, calories: 222, caffeine: 241, category: "Coffee" },
  { name: "Cran Energy Juice", flOz: 10, calories: 40, caffeine: 70, category: "Beverage" },
  { name: "Crave Energy Drink (UK)", flOz: 8.43, calories: 10, caffeine: 80, category: "Energy Drink" },
  { name: "Crio Bru Brewed Cacao", flOz: 8, calories: 20, caffeine: 10, category: "Beverage" },
  { name: "Crunk Energy Drink", flOz: 16, calories: 200, caffeine: 192, category: "Energy Drink" },
  { name: "Crystal Light Energy Mix", flOz: 16, calories: 10, caffeine: 60, category: "Beverage" },
  { name: "Crystal Light Iced Tea", flOz: 8, calories: 5, caffeine: 10, category: "Tea" },
  { name: "Dare Iced Coffee", flOz: 16.91, calories: 429, caffeine: 160, category: "Coffee" },
  { name: "Dark Dog Organic Energy", flOz: 12, calories: 110, caffeine: 114, category: "Energy Drink" },
  { name: "Death Wish Canned Cold Brew", flOz: 8, calories: 15, caffeine: 300, category: "Coffee" },
  { name: "Death Wish Coffee", flOz: 12, calories: 0, caffeine: 728, category: "Coffee" },
  { name: "Death Wish Latte", flOz: 8, calories: 170, caffeine: 300, category: "Coffee" },
  { name: "Decaf Coffee", flOz: 8, calories: 2, caffeine: 6, category: "Coffee" },
  { name: "Demon Energy Drink", flOz: 16.91, calories: 253, caffeine: 160, category: "Energy Drink" },
  { name: "Diet Barqs Root Beer", flOz: 12, calories: 0, caffeine: 0, category: "Soda" },
  { name: "Diet Cheerwine", flOz: 12, calories: 0, caffeine: 47, category: "Soda" },
  { name: "Diet Coke", flOz: 12, calories: 0, caffeine: 46, category: "Soda" },
  { name: "Diet Coke with Splenda", flOz: 12, calories: 0, caffeine: 46, category: "Soda" },
  { name: "Diet Dr Pepper", flOz: 12, calories: 0, caffeine: 41, category: "Soda" },
  { name: "Diet Mountain Dew", flOz: 12, calories: 0, caffeine: 54, category: "Soda" },
  { name: "Diet Pepsi", flOz: 12, calories: 0, caffeine: 35, category: "Soda" },
  { name: "Diet RC Cola", flOz: 12, calories: 0, caffeine: 48, category: "Soda" },
  { name: "Diet Wild Cherry Pepsi", flOz: 12, calories: 0, caffeine: 38, category: "Soda" },
  { name: "doc Soda", flOz: 12, calories: 150, caffeine: 60, category: "Soda" },
  { name: "Double Cola", flOz: 12, calories: 160, caffeine: 36, category: "Soda" },
  { name: "Dr Pepper", flOz: 12, calories: 150, caffeine: 42, category: "Soda" },
  { name: "Dr Pepper 10", flOz: 12, calories: 10, caffeine: 51, category: "Soda" },
  { name: "Dr Pepper Zero Sugar", flOz: 12, calories: 0, caffeine: 41, category: "Soda" },
  { name: "Dr Shasta Soda", flOz: 12, calories: 0, caffeine: 29, category: "Soda" },
  { name: "Driftaway Coffee", flOz: 8, calories: 0, caffeine: 160, category: "Coffee" },
  { name: "Dripdash Kyoto Coffee", flOz: 6, calories: 0, caffeine: 225, category: "Coffee" },
  { name: "Duff Energy Drink", flOz: 12, calories: 170, caffeine: 120, category: "Energy Drink" },
  { name: "Dunkin Donuts Shot In The Dark", flOz: 8.1, calories: 80, caffeine: 134, category: "Coffee" },
  { name: "Dunkin Sparkd Energy", flOz: 32, calories: 170, caffeine: 192, category: "Energy Drink" },
  { name: "Dunkin' Cold Brew", flOz: 24, calories: 5, caffeine: 260, category: "Coffee" },
  { name: "Dunkin' Donuts Brewed Coffee", flOz: 14, calories: 5, caffeine: 210, category: "Coffee" },
  { name: "Dunkin' Donuts Dunkaccino", flOz: 14, calories: 350, caffeine: 83, category: "Coffee" },
  { name: "Dunkin' Donuts Extra Charged Coffee", flOz: 14, calories: 10, caffeine: 252, category: "Coffee" },
  { name: "Dunkin' Donuts Iced Coffee", flOz: 24, calories: 5, caffeine: 294, category: "Coffee" },
  { name: "Dunkin' Donuts Iced Latte", flOz: 24, calories: 100, caffeine: 166, category: "Coffee" },
  { name: "Dunkin' Donuts Iced Tea", flOz: 24, calories: 230, caffeine: 63, category: "Tea" },
  { name: "Dunkin' Donuts Latte", flOz: 14, calories: 100, caffeine: 166, category: "Coffee" },
  { name: "Dutch Bros Blue Rebel Energy Drink", flOz: 8.4, calories: 160, caffeine: 80, category: "Energy Drink" },
  { name: "Dutch Bros Coffee (Classic)", flOz: 20, calories: 10, caffeine: 187, category: "Coffee" },
  { name: "DynaPep", flOz: 0.14, calories: 0, caffeine: 100, category: "Energy Shot" },
  { name: "E6 Energy Shot", flOz: 1.93, calories: 0, caffeine: 235, category: "Energy Shot" },
  { name: "EBOOST Energy Drink Mix", flOz: 8, calories: 5, caffeine: 110, category: "Energy Drink" },
  { name: "EBOOST Super Fuel", flOz: 12, calories: 20, caffeine: 110, category: "Energy Drink" },
  { name: "EBOOST Workout Crusher Mix", flOz: 8, calories: 40, caffeine: 175, category: "Supplement" },
  { name: "Eight O'Clock Coffee", flOz: 8, calories: 0, caffeine: 112, category: "Coffee" },
  { name: "Einstein Bros Coffee", flOz: 16, calories: 0, caffeine: 206, category: "Coffee" },
  { name: "Electric Monkey Wild Energy Drink", flOz: 16, calories: 220, caffeine: 160, category: "Energy Drink" },
  { name: "EnerBee Energy Drink", flOz: 12, calories: 80, caffeine: 100, category: "Energy Drink" },
  { name: "Equip Pure Energy Shot", flOz: 1.8, calories: 35, caffeine: 100, category: "Energy Shot" },
  { name: "Espresso Monster", flOz: 8.4, calories: 170, caffeine: 160, category: "Coffee" },
  { name: "Espresso Shot", flOz: 1.5, calories: 0, caffeine: 77, category: "Coffee" },
  { name: "Eternal Energy Extra Strength", flOz: 1.93, calories: 0, caffeine: 280, category: "Energy Shot" },
  { name: "Eternal Energy Shot", flOz: 1.93, calories: 0, caffeine: 230, category: "Energy Shot" },
  { name: "Euro Shopper Energy Drink (EU)", flOz: 8.46, calories: 115, caffeine: 80, category: "Energy Drink" },
  { name: "F3 Energy", flOz: 12, calories: 0, caffeine: 120, category: "Energy Drink" },
  { name: "Fakeer Energy Drink (EU)", flOz: 12.52, calories: 148, caffeine: 118, category: "Energy Drink" },
  { name: "Fanta", flOz: 12, calories: 160, caffeine: 0, category: "Soda" },
  { name: "Fast Lane Black Tea", flOz: 8, calories: 0, caffeine: 110, category: "Tea" },
  { name: "Faxe Kondi", flOz: 11.16, calories: 135, caffeine: 26, category: "Soda" },
  { name: "Faygo Cola", flOz: 12, calories: 165, caffeine: 43, category: "Soda" },
  { name: "Faygo Moon Mist", flOz: 12, calories: 150, caffeine: 20, category: "Soda" },
  { name: "Flat White", flOz: 12, calories: 170, caffeine: 130, category: "Coffee" },
  { name: "Folgers Coffee", flOz: 8, calories: 0, caffeine: 112, category: "Coffee" },
  { name: "Forto Organic Coffee Shot", flOz: 2, calories: 35, caffeine: 225, category: "Coffee" },
  { name: "Freeway Cola", flOz: 11.16, calories: 135, caffeine: 32, category: "Soda" },
  { name: "Fresca", flOz: 12, calories: 0, caffeine: 0, category: "Soda" },
  { name: "Fritz Kola (EU)", flOz: 11.16, calories: 135, caffeine: 83, category: "Soda" },
  { name: "Full Throttle Energy Drink", flOz: 16, calories: 220, caffeine: 160, category: "Energy Drink" },
  { name: "Fuze Iced Tea", flOz: 24, calories: 160, caffeine: 24, category: "Tea" },
  { name: "Gamer Supps GG Energy Mix", flOz: 8, calories: 0, caffeine: 100, category: "Energy Drink" },
  { name: "Gatorade Bolt 24 Energize", flOz: 16.9, calories: 40, caffeine: 75, category: "Energy Drink" },
  { name: "Gatorade Fast Twitch", flOz: 12, calories: 5, caffeine: 200, category: "Energy Drink" },
  { name: "GFuel Cans", flOz: 16, calories: 0, caffeine: 300, category: "Energy Drink" },
  { name: "GFuel Energy Drink Mix", flOz: 16, calories: 15, caffeine: 140, category: "Energy Drink" },
  { name: "Ghost Energy Drink", flOz: 16, calories: 5, caffeine: 200, category: "Energy Drink" },
  { name: "Ginger Ale", flOz: 12, calories: 140, caffeine: 0, category: "Soda" },
  { name: "Gloria Jean's Coffee", flOz: 2.028, calories: 0, caffeine: 67, category: "Coffee" },
  { name: "Go Fast Energy Drink", flOz: 16, calories: 200, caffeine: 160, category: "Energy Drink" },
  { name: "Go Fast High Octane Energy Drink", flOz: 16, calories: 0, caffeine: 300, category: "Energy Drink" },
  { name: "Go Girl Energy Drink", flOz: 12, calories: 25, caffeine: 100, category: "Energy Drink" },
  { name: "Goat Fuel", flOz: 12, calories: 15, caffeine: 200, category: "Energy Drink" },
  { name: "Gold Peak Coffee", flOz: 8, calories: 5, caffeine: 126, category: "Coffee" },
  { name: "Gold Peak Tea", flOz: 18.5, calories: 0, caffeine: 48, category: "Tea" },
  { name: "Gothrider Gasoline Coffee", flOz: 8, calories: 0, caffeine: 200, category: "Coffee" },
  { name: "Gourmesso Coffee Pods", flOz: 1.35, calories: 0, caffeine: 65, category: "Coffee" },
  { name: "Great Value Energy Drink Enhancers", flOz: 8, calories: 0, caffeine: 50, category: "Energy Drink" },
  { name: "Great Value Energy Drink Mix", flOz: 16, calories: 10, caffeine: 120, category: "Energy Drink" },
  { name: "Greek Coffee (Metrios)", flOz: 2, calories: 25, caffeine: 50, category: "Coffee" },
  { name: "Green Cola", flOz: 12, calories: 0, caffeine: 37, category: "Soda" },
  { name: "Gridlock Energy Drink", flOz: 16, calories: 200, caffeine: 140, category: "Energy Drink" },
  { name: "Guayaki Canned Yerba Mate", flOz: 15.5, calories: 120, caffeine: 150, category: "Tea" },
  { name: "Guayaki Yerba Mate Bottled Tea", flOz: 16, calories: 80, caffeine: 140, category: "Tea" },
  { name: "Guayusa Tea", flOz: 8, calories: 0, caffeine: 41, category: "Tea" },
  { name: "GURU Energy Drink", flOz: 12, calories: 115, caffeine: 140, category: "Energy Drink" },
  { name: "GURU Sparkling Energy Water", flOz: 12, calories: 0, caffeine: 100, category: "Beverage" },
  { name: "GymBrew Coffee", flOz: 12, calories: 4, caffeine: 333, category: "Coffee" },
  { name: "Half Caff Folgers", flOz: 6, calories: 0, caffeine: 58, category: "Coffee" },
  { name: "Hell Energy Coffee", flOz: 8.46, calories: 150, caffeine: 100, category: "Coffee" },
  { name: "Hell Energy Drink (EU)", flOz: 8.46, calories: 115, caffeine: 80, category: "Energy Drink" },
  { name: "Heroec Energy Water", flOz: 16.9, calories: 0, caffeine: 60, category: "Beverage" },
  { name: "Hi Ball Energy Drink", flOz: 16, calories: 0, caffeine: 160, category: "Energy Drink" },
  { name: "HICAF Tea", flOz: 8, calories: 0, caffeine: 110, category: "Tea" },
  { name: "High Brew Coffee", flOz: 8, calories: 50, caffeine: 140, category: "Coffee" },
  { name: "High Voltage Coffee (AU)", flOz: 12, calories: 0, caffeine: 1150, category: "Coffee" },
  { name: "Hint Caffeine Kick Water", flOz: 16, calories: 0, caffeine: 60, category: "Beverage" },
  { name: "Honest Iced Tea", flOz: 16.9, calories: 70, caffeine: 63, category: "Tea" },
  { name: "Hot6 the King Energy", flOz: 12, calories: 15, caffeine: 100, category: "Energy Drink" },
  { name: "Hyde Xtreme", flOz: 12, calories: 0, caffeine: 400, category: "Energy Drink" },
  { name: "Hype Energy Drink (EU)", flOz: 8.46, calories: 108, caffeine: 80, category: "Energy Drink" },
  { name: "IBC Root Beer", flOz: 12, calories: 160, caffeine: 0, category: "Soda" },
  { name: "Illy Issimo Cafe", flOz: 6.8, calories: 45, caffeine: 155, category: "Coffee" },
  { name: "Inca Kola", flOz: 12, calories: 140, caffeine: 38, category: "Soda" },
  { name: "Indulgio Cappuccino", flOz: 8, calories: 79, caffeine: 20, category: "Coffee" },
  { name: "Inko's White Tea Energy", flOz: 15.5, calories: 100, caffeine: 165, category: "Tea" },
  { name: "International Delight Iced Coffee", flOz: 12, calories: 180, caffeine: 88, category: "Coffee" },
  { name: "Irn Bru (UK)", flOz: 11.16, calories: 65, caffeine: 30, category: "Soda" },
  { name: "Java Kick Coffee Cola", flOz: 12, calories: 130, caffeine: 100, category: "Soda" },
  { name: "Java Monster", flOz: 15, calories: 220, caffeine: 200, category: "Coffee" },
  { name: "Java Monster 300", flOz: 15, calories: 200, caffeine: 300, category: "Coffee" },
  { name: "Javvy Coffee Concentrate", flOz: 6, calories: 5, caffeine: 80, category: "Coffee" },
  { name: "Joker Mad Energy", flOz: 16, calories: 260, caffeine: 160, category: "Energy Drink" },
  { name: "Jolt Cola", flOz: 16, calories: 10, caffeine: 200, category: "Energy Drink" },
  { name: "Juice Monster", flOz: 16, calories: 160, caffeine: 160, category: "Energy Drink" },
  { name: "Juvee", flOz: 12, calories: 5, caffeine: 128, category: "Energy Drink" },
  { name: "K Cup Decaf", flOz: 8, calories: 0, caffeine: 4, category: "Coffee" },
  { name: "K Cup Tea", flOz: 8, calories: 0, caffeine: 41, category: "Tea" },
  { name: "K-Cup Coffee", flOz: 8, calories: 0, caffeine: 100, category: "Coffee" },
  { name: "Kaffn8 Liquified Caffeine", flOz: 0.25, calories: 0, caffeine: 75, category: "Supplement" },
  { name: "Kickapoo Soda: Joy Juice & Fruit Shine", flOz: 12, calories: 190, caffeine: 40, category: "Soda" },
  { name: "Kill Cliff Energy X Recover", flOz: 12, calories: 20, caffeine: 25, category: "Energy Drink" },
  { name: "Kill Cliff Ignite", flOz: 12, calories: 25, caffeine: 150, category: "Energy Drink" },
  { name: "Killer Coffee (AU)", flOz: 8.46, calories: 0, caffeine: 430, category: "Coffee" },
  { name: "Kin Spritz", flOz: 8, calories: 25, caffeine: 50, category: "Beverage" },
  { name: "Kirkland Energy Shot", flOz: 2, calories: 5, caffeine: 180, category: "Energy Shot" },
  { name: "KOE Kombucha", flOz: 12, calories: 35, caffeine: 15, category: "Tea" },
  { name: "Kombucha Tea", flOz: 8, calories: 30, caffeine: 24, category: "Tea" },
  { name: "Kona Gold Energy Drink", flOz: 12, calories: 150, caffeine: 115, category: "Energy Drink" },
  { name: "La Colombe Cold Brew", flOz: 9, calories: 5, caffeine: 180, category: "Coffee" },
  { name: "La Colombe Draft Latte", flOz: 9, calories: 90, caffeine: 120, category: "Coffee" },
  { name: "La Croix Sparkling Water", flOz: 12, calories: 0, caffeine: 0, category: "Beverage" },
  { name: "Latte", flOz: 16, calories: 160, caffeine: 154, category: "Coffee" },
  { name: "LevlUp Gaming Booster", flOz: 16.91, calories: 8, caffeine: 250, category: "Energy Drink" },
  { name: "Limitless Sparkling Water", flOz: 12, calories: 0, caffeine: 35, category: "Beverage" },
  { name: "Lipton Iced Tea", flOz: 20, calories: 110, caffeine: 25, category: "Tea" },
  { name: "Lipton Natural Energy Tea", flOz: 8, calories: 0, caffeine: 75, category: "Tea" },
  { name: "Lipton Tea", flOz: 8, calories: 0, caffeine: 55, category: "Tea" },
  { name: "Liquid Death Iced Tea", flOz: 19.2, calories: 30, caffeine: 30, category: "Tea" },
  { name: "Liquid Help Energy Drink", flOz: 16, calories: 0, caffeine: 300, category: "Energy Drink" },
  { name: "Liquid Ice Energy Drink", flOz: 8.3, calories: 120, caffeine: 80, category: "Energy Drink" },
  { name: "Liquid IV Energy", flOz: 16, calories: 45, caffeine: 100, category: "Beverage" },
  { name: "Live+ Energy Drink", flOz: 16.9, calories: 227, caffeine: 150, category: "Energy Drink" },
  { name: "Long Black", flOz: 6, calories: 2, caffeine: 154, category: "Coffee" },
  { name: "Lucozade", flOz: 12.85, calories: 133, caffeine: 46, category: "Energy Drink" },
  { name: "LYFT Energy Mix", flOz: 8, calories: 4, caffeine: 125, category: "Energy Drink" },
  { name: "M-150 Energy Drink", flOz: 8.46, calories: 155, caffeine: 80, category: "Energy Drink" },
  { name: "Mamma Chia Energy", flOz: 10, calories: 110, caffeine: 90, category: "Beverage" },
  { name: "Mana Energy Potion", flOz: 1.69, calories: 25, caffeine: 75, category: "Energy Shot" },
  { name: "Marquis Energy Drink", flOz: 12, calories: 0, caffeine: 100, category: "Energy Drink" },
  { name: "Master Brew Kombucha", flOz: 15.2, calories: 60, caffeine: 76, category: "Tea" },
  { name: "Matcha Tea", flOz: 8, calories: 0, caffeine: 64, category: "Tea" },
  { name: "MATI Energy Drink", flOz: 12, calories: 90, caffeine: 110, category: "Energy Drink" },
  { name: "Maxwell House Coffee", flOz: 8, calories: 0, caffeine: 112, category: "Coffee" },
  { name: "Maxwell House Max Boost Coffee", flOz: 8, calories: 0, caffeine: 196, category: "Coffee" },
  { name: "McDonalds (McCafe) Latte", flOz: 16, calories: 190, caffeine: 142, category: "Coffee" },
  { name: "McDonalds (McCafe) Mocha", flOz: 16, calories: 380, caffeine: 167, category: "Coffee" },
  { name: "McDonalds Coffee", flOz: 16, calories: 0, caffeine: 145, category: "Coffee" },
  { name: "McDonalds Iced Coffee", flOz: 11.5, calories: 190, caffeine: 133, category: "Coffee" },
  { name: "McDonalds Sweet Tea", flOz: 32, calories: 160, caffeine: 100, category: "Tea" },
  { name: "Mega Monster Energy Drink", flOz: 24, calories: 320, caffeine: 240, category: "Energy Drink" },
  { name: "Mello Yello", flOz: 12, calories: 170, caffeine: 51, category: "Soda" },
  { name: "Meltdown Ketone Drink", flOz: 12, calories: 18, caffeine: 225, category: "Supplement" },
  { name: "MiO Energy Water Enhancer", flOz: 8, calories: 0, caffeine: 60, category: "Beverage" },
  { name: "Monster Assault", flOz: 16, calories: 210, caffeine: 160, category: "Energy Drink" },
  { name: "Monster Dragon Tea", flOz: 23, calories: 100, caffeine: 60, category: "Tea" },
  { name: "Monster Energy", flOz: 16, calories: 210, caffeine: 160, category: "Energy Drink" },
  { name: "Monster Hydro", flOz: 25.4, calories: 150, caffeine: 188, category: "Energy Drink" },
  { name: "Monster Import", flOz: 18.6, calories: 190, caffeine: 179, category: "Energy Drink" },
  { name: "Monster Killer Brew", flOz: 15, calories: 220, caffeine: 300, category: "Coffee" },
  { name: "Monster Lo-Carb", flOz: 16, calories: 30, caffeine: 140, category: "Energy Drink" },
  { name: "Monster Mango Loco", flOz: 16, calories: 240, caffeine: 152, category: "Energy Drink" },
  { name: "Monster Mule", flOz: 16, calories: 210, caffeine: 160, category: "Energy Drink" },
  { name: "Monster Nitro", flOz: 16, calories: 220, caffeine: 160, category: "Energy Drink" },
  { name: "Monster Pipeline Punch", flOz: 16, calories: 190, caffeine: 160, category: "Energy Drink" },
  { name: "Monster Rehab", flOz: 15.5, calories: 25, caffeine: 160, category: "Energy Drink" },
  { name: "Monster Reserve", flOz: 16, calories: 120, caffeine: 160, category: "Energy Drink" },
  { name: "Monster Ripper Energy Juice (UK)", flOz: 16.91, calories: 185, caffeine: 160, category: "Energy Drink" },
  { name: "Monster The Doctor VR46 (UK)", flOz: 16.91, calories: 219, caffeine: 160, category: "Energy Drink" },
  { name: "Monster Tour Water", flOz: 16, calories: 0, caffeine: 0, category: "Beverage" },
  { name: "Monster Ultra", flOz: 16, calories: 10, caffeine: 150, category: "Energy Drink" },
  { name: "Monster Zero Sugar", flOz: 16, calories: 10, caffeine: 160, category: "Energy Drink" },
  { name: "Moose Juice Energy Drink", flOz: 16.94, calories: 0, caffeine: 200, category: "Energy Drink" },
  { name: "Morning Thunder Tea", flOz: 8, calories: 0, caffeine: 45, category: "Tea" },
  { name: "Mother Energy Drink", flOz: 16.91, calories: 228, caffeine: 160, category: "Energy Drink" },
  { name: "Mount Hagen Instant Coffee", flOz: 8, calories: 0, caffeine: 70, category: "Coffee" },
  { name: "Mountain Dew", flOz: 12, calories: 170, caffeine: 54, category: "Soda" },
  { name: "Mountain Dew Amp", flOz: 16, calories: 220, caffeine: 142, category: "Energy Drink" },
  { name: "Mountain Dew Baja Blast", flOz: 12, calories: 170, caffeine: 54, category: "Soda" },
  { name: "Mountain Dew Code Red", flOz: 12, calories: 170, caffeine: 54, category: "Soda" },
  { name: "Mountain Dew Energy", flOz: 16, calories: 25, caffeine: 180, category: "Energy Drink" },
  { name: "Mountain Dew Game Fuel", flOz: 16, calories: 90, caffeine: 90, category: "Energy Drink" },
  { name: "Mountain Dew Kickstart", flOz: 16, calories: 80, caffeine: 90, category: "Energy Drink" },
  { name: "Mountain Dew Live Wire", flOz: 12, calories: 180, caffeine: 54, category: "Soda" },
  { name: "Mountain Dew Major Melon", flOz: 12, calories: 160, caffeine: 55, category: "Soda" },
  { name: "Mountain Dew Spark", flOz: 12, calories: 170, caffeine: 46, category: "Soda" },
  { name: "Mountain Dew Voltage", flOz: 12, calories: 170, caffeine: 55, category: "Soda" },
  { name: "Mountain Dew Zero Sugar", flOz: 12, calories: 0, caffeine: 68, category: "Soda" },
  { name: "Moxie Soda", flOz: 12, calories: 140, caffeine: 24, category: "Soda" },
  { name: "Mucho Mango Energy Drink", flOz: 8, calories: 100, caffeine: 0, category: "Beverage" },
  { name: "Mug Root Beer", flOz: 12, calories: 160, caffeine: 0, category: "Soda" },
  { name: "Muscle Milk Coffee House", flOz: 11, calories: 130, caffeine: 120, category: "Coffee" },
  { name: "Muscle Monster", flOz: 15, calories: 180, caffeine: 157, category: "Energy Drink" },
  { name: "Mushroom Coffee", flOz: 8, calories: 10, caffeine: 50, category: "Coffee" },
  { name: "Nerd Focus", flOz: 12, calories: 170, caffeine: 128, category: "Energy Drink" },
  { name: "Nescafe 3 in 1 Instant Coffee", flOz: 6, calories: 74, caffeine: 50, category: "Coffee" },
  { name: "Nescafe Dolce Gusto", flOz: 8, calories: 0, caffeine: 106, category: "Coffee" },
  { name: "Nescafe Gold", flOz: 8.46, calories: 0, caffeine: 66, category: "Coffee" },
  { name: "Nescafe Ice Java", flOz: 8, calories: 50, caffeine: 100, category: "Coffee" },
  { name: "Nescafe Ricoffy", flOz: 8, calories: 10, caffeine: 6, category: "Coffee" },
  { name: "Nespresso Coffee Capsules", flOz: 1.35, calories: 0, caffeine: 60, category: "Coffee" },
  { name: "Nestea Iced Tea", flOz: 16.9, calories: 160, caffeine: 23, category: "Tea" },
  { name: "Nestle Milo", flOz: 8, calories: 80, caffeine: 4, category: "Beverage" },
  { name: "Neu Nootropic Shot", flOz: 2, calories: 0, caffeine: 350, category: "Energy Shot" },
  { name: "Neuro Sonic", flOz: 14.5, calories: 35, caffeine: 100, category: "Beverage" },
  { name: "NOCCO Energy Drink (EU)", flOz: 11.17, calories: 0, caffeine: 180, category: "Energy Drink" },
  { name: "Noocaf Smart Coffee", flOz: 8, calories: 0, caffeine: 160, category: "Coffee" },
  { name: "NOS Energy Drink", flOz: 16, calories: 200, caffeine: 160, category: "Energy Drink" },
  { name: "Nutramint Smart Serum", flOz: 2, calories: 45, caffeine: 200, category: "Supplement" },
  { name: "Nuun Sport", flOz: 16, calories: 15, caffeine: 40, category: "Beverage" },
  { name: "OCA Energy Drink", flOz: 12, calories: 60, caffeine: 120, category: "Energy Drink" },
  { name: "Ocean Spray Brew", flOz: 8, calories: 30, caffeine: 40, category: "Beverage" },
  { name: "Octane Energy Drink Mix", flOz: 12, calories: 25, caffeine: 225, category: "Energy Drink" },
  { name: "Oi Ocha Green Tea", flOz: 16.9, calories: 5, caffeine: 60, category: "Tea" },
  { name: "Oikos Pro Fuel", flOz: 10, calories: 130, caffeine: 100, category: "Beverage" },
  { name: "OK Energy Drink", flOz: 8.45, calories: 113, caffeine: 80, category: "Energy Drink" },
  { name: "OLIPOP Vintage Cola", flOz: 12, calories: 35, caffeine: 50, category: "Soda" },
  { name: "Orange Crush", flOz: 12, calories: 160, caffeine: 0, category: "Soda" },
  { name: "Oregon Chai Tea", flOz: 6, calories: 130, caffeine: 45, category: "Tea" },
  { name: "Pacific Chai", flOz: 6, calories: 90, caffeine: 29, category: "Tea" },
  { name: "Panera Bread Coffee", flOz: 16, calories: 15, caffeine: 189, category: "Coffee" },
  { name: "PC Cola", flOz: 12, calories: 150, caffeine: 12, category: "Soda" },
  { name: "PC Cola Diet", flOz: 12, calories: 0, caffeine: 13, category: "Soda" },
  { name: "Peace Tea", flOz: 23, calories: 150, caffeine: 23, category: "Tea" },
  { name: "Peet's Brewed Coffee", flOz: 16, calories: 5, caffeine: 267, category: "Coffee" },
  { name: "Peet's Caffe Americano", flOz: 16, calories: 10, caffeine: 140, category: "Coffee" },
  { name: "Peet's Caffe Latte", flOz: 16, calories: 190, caffeine: 140, category: "Coffee" },
  { name: "Peet's Caffe Mocha", flOz: 16, calories: 390, caffeine: 165, category: "Coffee" },
  { name: "Peet's Cappuccino", flOz: 16, calories: 140, caffeine: 140, category: "Coffee" },
  { name: "Peet's Coffee Espresso", flOz: 1.5, calories: 0, caffeine: 70, category: "Coffee" },
  { name: "Peet's Decaf Espresso", flOz: 1.5, calories: 0, caffeine: 10, category: "Coffee" },
  { name: "Peet's Iced Coffee", flOz: 16, calories: 0, caffeine: 150, category: "Coffee" },
  { name: "Peet's Iced Latte", flOz: 16, calories: 120, caffeine: 140, category: "Coffee" },
  { name: "Peet's Iced Mocha", flOz: 16, calories: 310, caffeine: 165, category: "Coffee" },
  { name: "Pep Talk Sparkling Water", flOz: 12, calories: 0, caffeine: 55, category: "Beverage" },
  { name: "Pepsi", flOz: 12, calories: 150, caffeine: 38, category: "Soda" },
  { name: "Pepsi Caffeine Free", flOz: 12, calories: 150, caffeine: 0, category: "Soda" },
  { name: "Pepsi Made With Sugar", flOz: 12, calories: 150, caffeine: 38, category: "Soda" },
  { name: "Pepsi Max (UK)", flOz: 11.16, calories: 0, caffeine: 43, category: "Soda" },
  { name: "Pepsi Zero Sugar", flOz: 12, calories: 0, caffeine: 38, category: "Soda" },
  { name: "Performance Caffeine", flOz: 2, calories: 0, caffeine: 180, category: "Supplement" },
  { name: "PerformElite Pre-Workout", flOz: 8, calories: 0, caffeine: 225, category: "Supplement" },
  { name: "Perk Energy Beverage", flOz: 8, calories: 90, caffeine: 100, category: "Beverage" },
  { name: "Perrier Energize", flOz: 8.46, calories: 35, caffeine: 99, category: "Beverage" },
  { name: "Perrier Sparkling Water", flOz: 11.15, calories: 0, caffeine: 0, category: "Beverage" },
  { name: "PG Tips Black Tea", flOz: 6.78, calories: 0, caffeine: 50, category: "Tea" },
  { name: "Phocus Sparkling Water", flOz: 11.5, calories: 0, caffeine: 75, category: "Beverage" },
  { name: "Phoenix Energy Shot", flOz: 2, calories: 0, caffeine: 280, category: "Energy Shot" },
  { name: "Pibb Xtra", flOz: 12, calories: 140, caffeine: 40, category: "Soda" },
  { name: "Poland Spring Sparkling Energy Water", flOz: 11.5, calories: 35, caffeine: 75, category: "Beverage" },
  { name: "Polar Frost Plus Energy", flOz: 17, calories: 10, caffeine: 67, category: "Energy Drink" },
  { name: "Polar Seltzer Water", flOz: 12, calories: 0, caffeine: 0, category: "Beverage" },
  { name: "Poppi Soda Classic Cola", flOz: 12, calories: 25, caffeine: 32, category: "Soda" },
  { name: "Power Horse Energy Drink (EU)", flOz: 8.45, calories: 125, caffeine: 80, category: "Energy Drink" },
  { name: "Premier Protein Cafe Latte", flOz: 11.5, calories: 160, caffeine: 120, category: "Beverage" },
  { name: "Premium Cola (EU)", flOz: 11.16, calories: 132, caffeine: 83, category: "Soda" },
  { name: "Prime Energy Drink", flOz: 12, calories: 10, caffeine: 200, category: "Energy Drink" },
  { name: "Private Selection Canned Espresso", flOz: 15, calories: 230, caffeine: 145, category: "Coffee" },
  { name: "Propel Zero Powder", flOz: 16, calories: 0, caffeine: 0, category: "Beverage" },
  { name: "Proper Wild Energy Shot", flOz: 2.5, calories: 25, caffeine: 180, category: "Energy Shot" },
  { name: "Protein2O + Energy", flOz: 16.91, calories: 70, caffeine: 125, category: "Beverage" },
  { name: "Pure Boost Energy Drink Mix", flOz: 16, calories: 25, caffeine: 100, category: "Energy Drink" },
  { name: "Pure Cofain 699 (EU)", flOz: 8.46, calories: 148, caffeine: 175, category: "Energy Drink" },
  { name: "Pure Kick Energy Drink Mix", flOz: 16.9, calories: 10, caffeine: 80, category: "Energy Drink" },
  { name: "Pure Leaf Iced Tea", flOz: 18.5, calories: 160, caffeine: 69, category: "Tea" },
  { name: "Purity Coffee", flOz: 8, calories: 0, caffeine: 163, category: "Coffee" },
  { name: "Quake Energy Berry Blast Slurpee", flOz: 16, calories: 5, caffeine: 92, category: "Beverage" },
  { name: "Quake Energy Drink", flOz: 16, calories: 0, caffeine: 250, category: "Energy Drink" },
  { name: "Rambler Energy Drink", flOz: 16, calories: 60, caffeine: 120, category: "Energy Drink" },
  { name: "Raze Energy Drink", flOz: 16, calories: 0, caffeine: 300, category: "Energy Drink" },
  { name: "RC (Royal Crown) Cola", flOz: 12, calories: 160, caffeine: 43, category: "Soda" },
  { name: "Red Bull", flOz: 8.46, calories: 117, caffeine: 80, category: "Energy Drink" },
  { name: "Red Bull Editions", flOz: 8.46, calories: 113, caffeine: 80, category: "Energy Drink" },
  { name: "Red Bull Simply Cola", flOz: 8.46, calories: 0, caffeine: 32, category: "Soda" },
  { name: "Red Bull Sugarfree", flOz: 8.46, calories: 10, caffeine: 80, category: "Energy Drink" },
  { name: "Red Bull Zero", flOz: 8.46, calories: 0, caffeine: 80, category: "Energy Drink" },
  { name: "Red Devil Energy Drink", flOz: 16, calories: 0, caffeine: 160, category: "Energy Drink" },
  { name: "Red Eye Energy Drink", flOz: 11.1, calories: 149, caffeine: 106, category: "Energy Drink" },
  { name: "Red Power Elixir", flOz: 12, calories: 160, caffeine: 160, category: "Energy Drink" },
  { name: "Red Thunder Energy Drink", flOz: 12, calories: 156, caffeine: 120, category: "Energy Drink" },
  { name: "Red Thunder Energy Shot", flOz: 2, calories: 0, caffeine: 138, category: "Energy Shot" },
  { name: "Red Thunder Extra Strength", flOz: 2, calories: 0, caffeine: 230, category: "Energy Shot" },
  { name: "Redline Max 300", flOz: 2.5, calories: 0, caffeine: 300, category: "Energy Shot" },
  { name: "Redline Princess", flOz: 8, calories: 0, caffeine: 300, category: "Energy Drink" },
  { name: "Redline Xtreme Energy Drink", flOz: 8, calories: 0, caffeine: 316, category: "Energy Drink" },
  { name: "Redline Xtreme Shot", flOz: 3, calories: 5, caffeine: 300, category: "Energy Shot" },
  { name: "Reed's Ginger Energize Shot", flOz: 2, calories: 24, caffeine: 100, category: "Energy Shot" },
  { name: "Reign Storm", flOz: 12, calories: 10, caffeine: 200, category: "Energy Drink" },
  { name: "Reign Total Body Fuel", flOz: 16, calories: 10, caffeine: 300, category: "Energy Drink" },
  { name: "Revv Coffee Pods", flOz: 8, calories: 0, caffeine: 127, category: "Coffee" },
  { name: "Riot Energy", flOz: 16, calories: 80, caffeine: 160, category: "Energy Drink" },
  { name: "Rip It Energy Drink", flOz: 16, calories: 260, caffeine: 160, category: "Energy Drink" },
  { name: "Rip It Energy Shot", flOz: 2, calories: 0, caffeine: 120, category: "Energy Shot" },
  { name: "Rise Nitro Cold Brew Coffee", flOz: 10, calories: 10, caffeine: 250, category: "Coffee" },
  { name: "Ritz Cola", flOz: 12, calories: 144, caffeine: 10, category: "Soda" },
  { name: "Roaring Lion Energy Drink", flOz: 8, calories: 100, caffeine: 77, category: "Energy Drink" },
  { name: "Robusta Coffee", flOz: 8, calories: 0, caffeine: 265, category: "Coffee" },
  { name: "Rockstar Boom", flOz: 16, calories: 280, caffeine: 160, category: "Energy Drink" },
  { name: "Rockstar Energy Drink (Original)", flOz: 16, calories: 250, caffeine: 160, category: "Energy Drink" },
  { name: "Rockstar Halo Infinite", flOz: 16, calories: 250, caffeine: 240, category: "Energy Drink" },
  { name: "Rockstar Juiced", flOz: 16, calories: 30, caffeine: 170, category: "Energy Drink" },
  { name: "Rockstar Organic Energy Drink", flOz: 15, calories: 180, caffeine: 160, category: "Energy Drink" },
  { name: "Rockstar Punched", flOz: 16, calories: 260, caffeine: 240, category: "Energy Drink" },
  { name: "Rockstar Pure Zero", flOz: 16, calories: 20, caffeine: 240, category: "Energy Drink" },
  { name: "Rockstar Recovery", flOz: 16, calories: 25, caffeine: 160, category: "Energy Drink" },
  { name: "Rockstar Sugar Free", flOz: 16, calories: 25, caffeine: 160, category: "Energy Drink" },
  { name: "Rockstar Thermo", flOz: 16, calories: 0, caffeine: 300, category: "Energy Drink" },
  { name: "Rockstar Unplugged", flOz: 8, calories: 0, caffeine: 80, category: "Energy Drink" },
  { name: "Rockstar XDurance", flOz: 16, calories: 10, caffeine: 300, category: "Energy Drink" },
  { name: "Rockstar Zero Carb", flOz: 16, calories: 25, caffeine: 240, category: "Energy Drink" },
  { name: "Rogue Energy Drink", flOz: 16, calories: 5, caffeine: 200, category: "Energy Drink" },
  { name: "Rogue Energy Drink Mix", flOz: 16, calories: 5, caffeine: 175, category: "Energy Drink" },
  { name: "RootJack Caffeinated Pirate Root Beer", flOz: 12, calories: 200, caffeine: 120, category: "Soda" },
  { name: "Rowdy Energy Drink", flOz: 16, calories: 5, caffeine: 160, category: "Energy Drink" },
  { name: "Ruby Red Squirt", flOz: 12, calories: 170, caffeine: 39, category: "Soda" },
  { name: "Runa", flOz: 12, calories: 0, caffeine: 150, category: "Energy Drink" },
  { name: "Rush! Energy Drink", flOz: 8.3, calories: 120, caffeine: 80, category: "Energy Drink" },
  { name: "Ryse Fuel", flOz: 16, calories: 0, caffeine: 200, category: "Energy Drink" },
  { name: "Sambazon Amazon Energy Drink", flOz: 12, calories: 120, caffeine: 120, category: "Energy Drink" },
  { name: "Sarsaparilla", flOz: 12, calories: 170, caffeine: 0, category: "Soda" },
  { name: "Scheckters Energy Drink", flOz: 8.46, calories: 78, caffeine: 80, category: "Energy Drink" },
  { name: "Score Energy Drink Gorilla", flOz: 16.91, calories: 240, caffeine: 150, category: "Energy Drink" },
  { name: "Screamin Energy Max Hit", flOz: 0.61, calories: 40, caffeine: 185, category: "Energy Shot" },
  { name: "Seattle's Best Brewed Coffee", flOz: 12, calories: 10, caffeine: 260, category: "Coffee" },
  { name: "Sencha Green Tea Shot", flOz: 6.4, calories: 0, caffeine: 40, category: "Tea" },
  { name: "Shasta Cola", flOz: 12, calories: 170, caffeine: 43, category: "Soda" },
  { name: "Shasta Diet Cola", flOz: 12, calories: 0, caffeine: 47, category: "Soda" },
  { name: "Shasta Mountain Rush", flOz: 12, calories: 150, caffeine: 54, category: "Soda" },
  { name: "Ski Soda", flOz: 12, calories: 180, caffeine: 69, category: "Soda" },
  { name: "Slammers Energy Drink (EU)", flOz: 8.46, calories: 122, caffeine: 80, category: "Energy Drink" },
  { name: "SlimFast Shake - Cappuccino", flOz: 11, calories: 180, caffeine: 100, category: "Beverage" },
  { name: "Slurpee", flOz: 12, calories: 90, caffeine: 30, category: "Beverage" },
  { name: "Snapple Tea", flOz: 16, calories: 150, caffeine: 37, category: "Tea" },
  { name: "Sneak Energy Drink Mix", flOz: 16, calories: 12, caffeine: 150, category: "Energy Drink" },
  { name: "SoBe Energy Citrus", flOz: 20, calories: 250, caffeine: 81, category: "Energy Drink" },
  { name: "SoBe Green Tea", flOz: 20, calories: 200, caffeine: 7, category: "Tea" },
  { name: "Soda Stream", flOz: 8, calories: 40, caffeine: 31, category: "Soda" },
  { name: "Solimo Energy Drink", flOz: 16, calories: 10, caffeine: 152, category: "Energy Drink" },
  { name: "Source 1899 (UK)", flOz: 8.46, calories: 58, caffeine: 80, category: "Energy Drink" },
  { name: "Southern Sweet Tea", flOz: 16, calories: 128, caffeine: 41, category: "Tea" },
  { name: "Soylent Stacked", flOz: 11.16, calories: 180, caffeine: 100, category: "Beverage" },
  { name: "Spark Energy Drink Mix", flOz: 8, calories: 15, caffeine: 120, category: "Energy Drink" },
  { name: "Sparkling Ice Caffeine", flOz: 16, calories: 5, caffeine: 70, category: "Beverage" },
  { name: "Sparkling Ice Energy", flOz: 12, calories: 15, caffeine: 160, category: "Energy Drink" },
  { name: "Speed Energy Fuel", flOz: 16, calories: 240, caffeine: 186, category: "Energy Drink" },
  { name: "Spider Energy Drink", flOz: 16, calories: 120, caffeine: 240, category: "Energy Drink" },
  { name: "Spike Energy Double Shot", flOz: 4.26, calories: 0, caffeine: 350, category: "Energy Shot" },
  { name: "Spike Hardcore Energy", flOz: 16, calories: 0, caffeine: 350, category: "Energy Drink" },
  { name: "Spike Shooter", flOz: 12, calories: 10, caffeine: 300, category: "Energy Drink" },
  { name: "Sprecher Cherry Cola", flOz: 16, calories: 240, caffeine: 0, category: "Soda" },
  { name: "Sprite", flOz: 12, calories: 140, caffeine: 0, category: "Soda" },
  { name: "Squirt Soda", flOz: 12, calories: 140, caffeine: 0, category: "Soda" },
  { name: "Stacker Extreme Energy Shot", flOz: 2, calories: 0, caffeine: 205, category: "Energy Shot" },
  { name: "Starbucks 2X Coffee Pods", flOz: 8, calories: 0, caffeine: 260, category: "Coffee" },
  { name: "Starbucks Bottled Iced Coffee", flOz: 48, calories: 240, caffeine: 640, category: "Coffee" },
  { name: "Starbucks Canned Nitro Cold Brew", flOz: 11, calories: 0, caffeine: 235, category: "Coffee" },
  { name: "Starbucks Caramel Macchiato", flOz: 16, calories: 250, caffeine: 150, category: "Coffee" },
  { name: "Starbucks Cold & Crafted", flOz: 11, calories: 50, caffeine: 135, category: "Coffee" },
  { name: "Starbucks Cold Brew Bottled", flOz: 11, calories: 50, caffeine: 180, category: "Coffee" },
  { name: "Starbucks Cold Brew Canned", flOz: 11, calories: 120, caffeine: 165, category: "Coffee" },
  { name: "Starbucks Cold Brew Coffee", flOz: 16, calories: 5, caffeine: 205, category: "Coffee" },
  { name: "Starbucks Cordusio Mocha", flOz: 8, calories: 130, caffeine: 155, category: "Coffee" },
  { name: "Starbucks Decaf Coffee", flOz: 16, calories: 0, caffeine: 25, category: "Coffee" },
  { name: "Starbucks Doubleshot Energy", flOz: 15, calories: 220, caffeine: 135, category: "Energy Drink" },
  { name: "Starbucks Doubleshot Espresso", flOz: 6.5, calories: 140, caffeine: 120, category: "Coffee" },
  { name: "Starbucks Frappuccino (Bottled)", flOz: 13.7, calories: 300, caffeine: 110, category: "Coffee" },
  { name: "Starbucks Grande Caffe Americano", flOz: 16, calories: 15, caffeine: 225, category: "Coffee" },
  { name: "Starbucks Grande Caffe Latte", flOz: 16, calories: 190, caffeine: 150, category: "Coffee" },
  { name: "Starbucks Grande Caffe Mocha", flOz: 16, calories: 370, caffeine: 175, category: "Coffee" },
  { name: "Starbucks Grande Cappuccino", flOz: 16, calories: 140, caffeine: 150, category: "Coffee" },
  { name: "Starbucks Grande Coffee", flOz: 16, calories: 5, caffeine: 310, category: "Coffee" },
  { name: "Starbucks Iced Americano", flOz: 16, calories: 15, caffeine: 225, category: "Coffee" },
  { name: "Starbucks Iced Espresso Classics", flOz: 12, calories: 190, caffeine: 125, category: "Coffee" },
  { name: "Starbucks Nitro Cold Brew Coffee", flOz: 16, calories: 5, caffeine: 280, category: "Coffee" },
  { name: "Starbucks Pink Drink", flOz: 16, calories: 140, caffeine: 45, category: "Beverage" },
  { name: "Starbucks Pumpkin Cream Cold Brew", flOz: 16, calories: 250, caffeine: 185, category: "Coffee" },
  { name: "Starbucks Refreshers", flOz: 16, calories: 70, caffeine: 45, category: "Beverage" },
  { name: "Starbucks Refreshers Canned", flOz: 12, calories: 90, caffeine: 50, category: "Beverage" },
  { name: "Starbucks Triple Shot Energy", flOz: 15, calories: 210, caffeine: 225, category: "Energy Drink" },
  { name: "Starbucks Verismo Coffee Pods", flOz: 8, calories: 0, caffeine: 60, category: "Coffee" },
  { name: "Starbucks Via Ready Brew", flOz: 8, calories: 0, caffeine: 135, category: "Coffee" },
  { name: "Steaz Energy", flOz: 12, calories: 140, caffeine: 100, category: "Energy Drink" },
  { name: "Steep 18 Cold Brew", flOz: 8, calories: 0, caffeine: 90, category: "Coffee" },
  { name: "Sting Energy Drink", flOz: 8.455, calories: 70, caffeine: 72, category: "Energy Drink" },
  { name: "Stipe Miocic Extra Strength Coffee", flOz: 12, calories: 0, caffeine: 500, category: "Coffee" },
  { name: "Stok Coffee Shots", flOz: 0.43, calories: 10, caffeine: 40, category: "Coffee" },
  { name: "Stok Cold Brew", flOz: 13.7, calories: 0, caffeine: 145, category: "Coffee" },
  { name: "Strike Force Energy Drink Mix", flOz: 16.91, calories: 0, caffeine: 160, category: "Energy Drink" },
  { name: "Stumptown Cold Brew Coffee", flOz: 10.5, calories: 3, caffeine: 279, category: "Coffee" },
  { name: "Stumptown Nitro Cold Brew", flOz: 11, calories: 3, caffeine: 330, category: "Coffee" },
  { name: "Sudden Instant Coffee", flOz: 12, calories: 0, caffeine: 95, category: "Coffee" },
  { name: "Sun Drop Soda", flOz: 12, calories: 170, caffeine: 64, category: "Soda" },
  { name: "Sunkist Orange Soda", flOz: 12, calories: 160, caffeine: 19, category: "Soda" },
  { name: "Sunup Pure Green Coffee", flOz: 11, calories: 5, caffeine: 200, category: "Coffee" },
  { name: "T-Virus Antidote", flOz: 12, calories: 160, caffeine: 100, category: "Energy Drink" },
  { name: "Taft Coffee (EU)", flOz: 12, calories: 0, caffeine: 1182, category: "Coffee" },
  { name: "Taiwanese Milk Tea", flOz: 16, calories: 299, caffeine: 151, category: "Tea" },
  { name: "Taster's Choice Instant Coffee", flOz: 8, calories: 0, caffeine: 49, category: "Coffee" },
  { name: "Taurus Energy Drink", flOz: 8.46, calories: 180, caffeine: 50, category: "Energy Drink" },
  { name: "Tazo Chai", flOz: 8, calories: 0, caffeine: 47, category: "Tea" },
  { name: "Tea (Black)", flOz: 8, calories: 0, caffeine: 42, category: "Tea" },
  { name: "Tea (Decaf)", flOz: 8, calories: 0, caffeine: 4, category: "Tea" },
  { name: "Tea (Green)", flOz: 8, calories: 0, caffeine: 18, category: "Tea" },
  { name: "Tea (Herbal)", flOz: 8, calories: 0, caffeine: 0, category: "Tea" },
  { name: "Tea (Iced)", flOz: 8, calories: 0, caffeine: 47, category: "Tea" },
  { name: "Tea (Instant)", flOz: 8, calories: 0, caffeine: 40, category: "Tea" },
  { name: "Tea (Jasmine)", flOz: 8, calories: 0, caffeine: 25, category: "Tea" },
  { name: "Tea (Oolong)", flOz: 8, calories: 0, caffeine: 37, category: "Tea" },
  { name: "Tea (White)", flOz: 8, calories: 0, caffeine: 28, category: "Tea" },
  { name: "Teas' Tea Oolong", flOz: 16.9, calories: 0, caffeine: 70, category: "Tea" },
  { name: "Teavana Tea", flOz: 8, calories: 0, caffeine: 41, category: "Tea" },
  { name: "Tejava Iced Tea", flOz: 12, calories: 0, caffeine: 50, category: "Tea" },
  { name: "TENZING Natural Energy", flOz: 8.46, calories: 50, caffeine: 80, category: "Energy Drink" },
  { name: "Tiger Energy Drink", flOz: 8.46, calories: 0, caffeine: 80, category: "Energy Drink" },
  { name: "Tim Hortons Large Brewed Coffee", flOz: 20, calories: 5, caffeine: 270, category: "Coffee" },
  { name: "Tim Hortons Small French Vanilla Coffee", flOz: 10, calories: 0, caffeine: 60, category: "Coffee" },
  { name: "Tonic Water", flOz: 10, calories: 110, caffeine: 0, category: "Beverage" },
  { name: "Triton Energy Drink", flOz: 16, calories: 15, caffeine: 200, category: "Energy Drink" },
  { name: "Tropicana Twister Soda", flOz: 20, calories: 320, caffeine: 0, category: "Soda" },
  { name: "Tru Energy Wakeup", flOz: 12, calories: 10, caffeine: 100, category: "Energy Drink" },
  { name: "TruBrain Extra", flOz: 1, calories: 25, caffeine: 100, category: "Supplement" },
  { name: "True Lemon Energy Mix", flOz: 16, calories: 0, caffeine: 120, category: "Energy Drink" },
  { name: "TrueStart Performance Coffee", flOz: 5.1, calories: 0, caffeine: 95, category: "Coffee" },
  { name: "Turkey Hill Iced Tea", flOz: 12, calories: 120, caffeine: 64, category: "Tea" },
  { name: "Turkish Coffee", flOz: 2, calories: 20, caffeine: 50, category: "Coffee" },
  { name: "Tweaker Energy Drink", flOz: 8.46, calories: 110, caffeine: 80, category: "Energy Drink" },
  { name: "Tweaker Shot", flOz: 2, calories: 0, caffeine: 275, category: "Energy Shot" },
  { name: "Twig Tea (Kukicha)", flOz: 8, calories: 0, caffeine: 25, category: "Tea" },
  { name: "Ugly Energy Water", flOz: 16, calories: 0, caffeine: 160, category: "Energy Drink" },
  { name: "UPTIME Energy Drink", flOz: 12, calories: 150, caffeine: 142, category: "Energy Drink" },
  { name: "USANA Rev3 Energy Drink", flOz: 12, calories: 105, caffeine: 120, category: "Energy Drink" },
  { name: "V Iced Coffee", flOz: 16.91, calories: 345, caffeine: 155, category: "Coffee" },
  { name: "V Energy Drink", flOz: 8.45, calories: 116, caffeine: 78, category: "Energy Drink" },
  { name: "V8 +Energy Drink", flOz: 8, calories: 140, caffeine: 80, category: "Energy Drink" },
  { name: "Venom Death Adder", flOz: 16, calories: 160, caffeine: 160, category: "Energy Drink" },
  { name: "Vernors Ginger Ale", flOz: 12, calories: 140, caffeine: 0, category: "Soda" },
  { name: "Very Strong Coffee", flOz: 12, calories: 0, caffeine: 1350, category: "Coffee" },
  { name: "Virtue Clean Energy Beverage", flOz: 8.46, calories: 8, caffeine: 80, category: "Energy Drink" },
  { name: "Viso Energy Drink", flOz: 17, calories: 140, caffeine: 300, category: "Energy Drink" },
  { name: "Vital 4U Liquid Energy", flOz: 0.5, calories: 34, caffeine: 155, category: "Energy Shot" },
  { name: "VitaminWater Energy", flOz: 20, calories: 100, caffeine: 50, category: "Beverage" },
  { name: "VitaRain Zero Enhanced Water", flOz: 20, calories: 0, caffeine: 42, category: "Beverage" },
  { name: "Voila Instant Coffee", flOz: 8, calories: 0, caffeine: 100, category: "Coffee" },
  { name: "Vuum", flOz: 12, calories: 50, caffeine: 135, category: "Energy Drink" },
  { name: "Waka Decaf Instant Coffee", flOz: 8, calories: 0, caffeine: 4, category: "Coffee" },
  { name: "Waka Indian Instant Coffee", flOz: 8, calories: 0, caffeine: 70, category: "Coffee" },
  { name: "Waka Instant Coffee", flOz: 8, calories: 0, caffeine: 70, category: "Coffee" },
  { name: "Waka Instant Tea", flOz: 8, calories: 0, caffeine: 30, category: "Tea" },
  { name: "Water Joe", flOz: 20, calories: 0, caffeine: 70, category: "Beverage" },
  { name: "Wave Soda", flOz: 12, calories: 25, caffeine: 42, category: "Soda" },
  { name: "Wawa Coffee", flOz: 16, calories: 4, caffeine: 290, category: "Coffee" },
  { name: "Wendy's Iced Tea", flOz: 16, calories: 5, caffeine: 32, category: "Tea" },
  { name: "Whipped (Dalgona) Coffee", flOz: 8, calories: 48, caffeine: 105, category: "Coffee" },
  { name: "Wide Awake Coffee Cold Brew", flOz: 11, calories: 5, caffeine: 120, category: "Coffee" },
  { name: "Wide Awake Energy Coffee", flOz: 15, calories: 190, caffeine: 180, category: "Coffee" },
  { name: "Wide Awake Iced Coffee Drinks", flOz: 13.7, calories: 290, caffeine: 30, category: "Coffee" },
  { name: "Wild Cherry Pepsi", flOz: 12, calories: 160, caffeine: 38, category: "Soda" },
  { name: "Wild Tiger Energy Drink", flOz: 8.36, calories: 125, caffeine: 75, category: "Energy Drink" },
  { name: "Wildcat Energy Drink (UK)", flOz: 8.46, calories: 115, caffeine: 80, category: "Energy Drink" },
  { name: "Wired X 3000 Energy Drink", flOz: 16, calories: 220, caffeine: 185, category: "Energy Drink" },
  { name: "Wired X Berry Rush", flOz: 16, calories: 220, caffeine: 95, category: "Energy Drink" },
  { name: "Wired X344 Energy Drink", flOz: 16, calories: 220, caffeine: 344, category: "Energy Drink" },
  { name: "Woke Up Energy Shot", flOz: 1.93, calories: 0, caffeine: 225, category: "Energy Shot" },
  { name: "X Ray Energy Drink", flOz: 8.46, calories: 125, caffeine: 79, category: "Energy Drink" },
  { name: "X-Mode Energy Shot", flOz: 1, calories: 0, caffeine: 150, category: "Energy Shot" },
  { name: "Xing Craft Brew", flOz: 16, calories: 5, caffeine: 120, category: "Tea" },
  { name: "Xingtea Iced Green Tea", flOz: 23.5, calories: 50, caffeine: 110, category: "Tea" },
  { name: "XL Energy Drink (EU)", flOz: 8.45, calories: 118, caffeine: 80, category: "Energy Drink" },
  { name: "XS Energy Drink", flOz: 8.4, calories: 10, caffeine: 80, category: "Energy Drink" },
  { name: "Xyience Energy Drink", flOz: 16, calories: 15, caffeine: 160, category: "Energy Drink" },
  { name: "Yellow Tea", flOz: 8, calories: 0, caffeine: 63, category: "Tea" },
  { name: "Yerba Mate Tea", flOz: 8, calories: 0, caffeine: 40, category: "Tea" },
  { name: "Yerbae Sparkling Water", flOz: 12, calories: 0, caffeine: 100, category: "Beverage" },
  { name: "YMateina Yerba Mate", flOz: 8, calories: 0, caffeine: 80, category: "Tea" },
  { name: "Zest Highly Caffeinated Tea", flOz: 8, calories: 0, caffeine: 150, category: "Tea" },
  { name: "Zest Sparkling Tea", flOz: 12, calories: 60, caffeine: 135, category: "Tea" },
  { name: "Zevia Cola", flOz: 12, calories: 0, caffeine: 45, category: "Soda" },
  { name: "Zevia Energy Drink", flOz: 12, calories: 0, caffeine: 120, category: "Energy Drink" },
  { name: "ZipFizz Energy Drink Mix", flOz: 16, calories: 20, caffeine: 100, category: "Energy Drink" },
  { name: "Zoa Energy Drink", flOz: 16, calories: 100, caffeine: 160, category: "Energy Drink" },
  { name: "Zola Coconut Water Espresso", flOz: 17.5, calories: 0, caffeine: 125, category: "Beverage" },
  { name: "Zombie Blood Energy Potion", flOz: 3.4, calories: 25, caffeine: 80, category: "Energy Drink" },
];

// Get unique categories for filter
const categories = Array.from(new Set(caffeineProducts.map(p => p.category))).sort();

// Sort options
type SortOption = "caffeine-asc" | "caffeine-desc" | "name-asc" | "name-desc" | "calories-asc" | "calories-desc";

const sortProducts = (products: typeof caffeineProducts, sortBy: SortOption) => {
  return [...products].sort((a, b) => {
    switch (sortBy) {
      case "caffeine-asc":
        return a.caffeine - b.caffeine;
      case "caffeine-desc":
        return b.caffeine - a.caffeine;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "calories-asc":
        return a.calories - b.calories;
      case "calories-desc":
        return b.calories - a.calories;
      default:
        return a.caffeine - b.caffeine;
    }
  });
};

// Get color based on caffeine level
const getCaffeineColor = (mg: number) => {
  if (mg >= 200) return "bg-red-100 text-red-800 border-red-200";
  if (mg >= 100) return "bg-orange-100 text-orange-800 border-orange-200";
  if (mg >= 50) return "bg-yellow-100 text-yellow-800 border-yellow-200";
  if (mg >= 20) return "bg-green-100 text-green-800 border-green-200";
  return "bg-gray-100 text-gray-800 border-gray-200";
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Coffee": return "☕";
    case "Energy Drink": return "⚡";
    case "Energy Shot": return "🔋";
    case "Tea": return "🍵";
    case "Soda": return "🥤";
    case "Food": return "🍫";
    case "Edibles": return "🍬";
    case "Supplement": return "💊";
    default: return "🥛";
  }
};

export default function CaffeineListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("caffeine-asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Handler for search input with debounced tracking
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);

    // Debounce the tracking to avoid excessive events
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }
    searchDebounceRef.current = setTimeout(() => {
      if (value.trim()) {
        posthog.capture("caffeine_list_searched", {
          search_query: value,
          results_count: caffeineProducts.filter(
            (p) =>
              p.name.toLowerCase().includes(value.toLowerCase()) ||
              p.category.toLowerCase().includes(value.toLowerCase())
          ).length,
        });
      }
    }, 500);
  };

  // Handler for category filter with tracking
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    posthog.capture("caffeine_list_filtered", {
      category: category,
      previous_category: selectedCategory,
    });
  };

  const filteredProducts = caffeineProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedAndFilteredProducts = sortProducts(filteredProducts, sortBy);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/jit icon.png"
                alt="Jitterliss Icon"
                width={32}
                height={32}
                priority
                className="object-contain w-8 h-8 sm:w-10 sm:h-10 brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              />
              <Image
                src="/JITTERLISS.png"
                alt="Jitterliss Logo"
                width={120}
                height={32}
                priority
                className="object-contain w-[100px] h-auto sm:w-[120px] md:w-[150px] brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#37352F] mb-4">
            Ultimate Caffeine List
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Every caffeinated product in one place. Search, filter, and sort to find exactly what you&apos;re looking for.
          </p>

          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search drinks, brands, or categories..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900 placeholder-gray-500"
            />
          </div>

          {/* Sort and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {/* Sort By */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900 bg-white"
              >
                <option value="caffeine-asc">Caffeine: Low to High</option>
                <option value="caffeine-desc">Caffeine: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
                <option value="calories-asc">Calories: Low to High</option>
                <option value="calories-desc">Calories: High to Low</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900 bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-gray-500 mb-4">
            Showing {sortedAndFilteredProducts.length} of {caffeineProducts.length} products
          </p>

          {/* Legend */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">200+ mg (High)</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">100-199 mg (Medium-High)</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">50-99 mg (Medium)</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">20-49 mg (Low)</span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">0-19 mg (Very Low)</span>
          </div>

          {/* List */}
          <div className="space-y-2">
            {sortedAndFilteredProducts.map((product) => (
              <div
                key={product.name}
                className={`flex items-center justify-between p-4 rounded-lg border ${getCaffeineColor(product.caffeine)}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(product.category)}</span>
                  <div>
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-xs opacity-70">
                      {product.category}
                      {product.flOz > 0 && ` • ${product.flOz} fl oz`}
                      {product.calories > 0 && ` • ${product.calories} cal`}
                      {product.flOz === 0 && product.calories === 0 && " • per serving"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">{product.caffeine}</span>
                  <span className="text-sm ml-1">mg</span>
                </div>
              </div>
            ))}
          </div>

          {sortedAndFilteredProducts.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No products found{searchQuery && ` matching "${searchQuery}"`}{selectedCategory !== "all" && ` in ${selectedCategory}`}
            </div>
          )}

          {/* Back link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-[#37352F] text-white font-medium rounded-lg hover:bg-[#2a2925] transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
