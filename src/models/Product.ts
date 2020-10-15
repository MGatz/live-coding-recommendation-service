import { WeatherCondition } from "./WeatherCondition";

export class Product {
  constructor(name: string, bestForWeatherConditions: WeatherCondition[], lowestTemp: number, heighestTemp: number, price: string) {
    this.name = name;
    this.bestForWeatherConditions = bestForWeatherConditions;
    this.lowestTemp = lowestTemp;
    this.heighestTemp = heighestTemp;
    this.price = price;
  }

  readonly name: string;
  readonly bestForWeatherConditions: WeatherCondition[];
  readonly lowestTemp: number;
  readonly heighestTemp: number;
  readonly price: string;

  public static of(name: string, bestForWeatherConditions: WeatherCondition[], lowestTemp: number, heighestTemp: number, price: string): Product {
    return new Product(name, bestForWeatherConditions, lowestTemp, heighestTemp, price);
  }
}
