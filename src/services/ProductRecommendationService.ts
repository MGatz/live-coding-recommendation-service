import { Product } from "../models/Product";
import needle, { NeedleResponse } from "needle";
import { DailyWeather } from "../models/DailyWeather";

export class ProductRecommendationService {

  async getProductRecommendation(lat: number, lon: number, daysAhead: number): Promise<Product[]> {
    const weatherForecast: DailyWeather = await this.getWeatherForecast(lat, lon, daysAhead);

    if (weatherForecast) {
      return await this.getProducts(weatherForecast);
    }

    return [];
  }

  private async getWeatherForecast(lat: number, lon: number, daysAhead: number): Promise<DailyWeather> {
    const requestUrl = `http://localhost:8081/v1/weather?lat=${lat}&lon=${lon}`;

    const apiResponse: NeedleResponse = await needle('get', requestUrl);

    if (apiResponse.statusCode === 200) {
      const weatherForecast: DailyWeather[] = apiResponse.body;
      if (weatherForecast[daysAhead]) {
        return weatherForecast[daysAhead];
      }
    }

    return null;
  }

  private async getProducts(weatherForecast: DailyWeather): Promise<Product[]> {
    const requestUrl = `http://localhost:8080/v1/products?temperature=${weatherForecast.temperature}&weatherCondition=${weatherForecast.weatherCondition}`;

    const apiResponse: NeedleResponse = await needle('get', requestUrl);

    if (apiResponse.statusCode === 200) {
      return apiResponse.body as Product[];
    }

    console.log(`Could not get products for weather ${JSON.stringify(weatherForecast)}: ${apiResponse.statusCode} - ${apiResponse.body}`);
    return [];
  }

  public static of() {
    return new ProductRecommendationService();
  }
}
