import { Operation } from "express-openapi";
import { Response, Request } from "express";
import { ProductRecommendationService } from "../../services/ProductRecommendationService";
import { Product } from "../../models/Product";

const productRecommendationService = ProductRecommendationService.of();

export const GET: Operation = async (req: Request, res: Response) => {
  const { lat, lon, daysAhead } = req.query;

  const latAsNumber = parseFloat(lat as string);
  const lonAsNumber = parseFloat(lon as string);
  const daysAheadAsNumber = parseFloat(daysAhead as string);

  const recommendedProducts: Product[] = await productRecommendationService.getProductRecommendation(latAsNumber, lonAsNumber, daysAheadAsNumber);

  res.json(recommendedProducts);
}

GET.apiDoc = {
  description: 'Get product recommendation for location by geographical coordinates.',
  operationId: 'getRecommendation',
  parameters: [{
    in: 'query',
    name: 'lat',
    required: true,
    type: 'number'
  }, {
    in: 'query',
    name: 'lon',
    required: true,
    type: 'number'
  }, {
    in: 'query',
    name: 'daysAhead',
    required: true,
    type: 'number'
  }],
  responses: {
    200: {
      description: 'List of recommended products.',
      schema: {
        type: 'array',
        items: {
          $ref: '#/definitions/DailyWeather'
        }
      }
    }
  }
}
