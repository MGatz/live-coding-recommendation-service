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
