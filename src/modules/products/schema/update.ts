import { z, TypeOf } from "zod";
import {
    ProductDefaultAttributeSchema,
    ProductDescriptionSchema,
    ProductFeaturedSchema,
    ProductNameSchema,
    ProductPriceSchema,
    ProductStatusSchema,
} from "./main";

const restFieldsAsOptionalSchema = z
    .object({})
    .merge(ProductNameSchema)
    .merge(ProductStatusSchema)
    .merge(ProductDescriptionSchema)
    .merge(ProductFeaturedSchema)
    .merge(ProductPriceSchema)
    .merge(ProductDefaultAttributeSchema)
    .partial();

export const UpdateProductSchema = z
    .object({ id: z.string() })
    .merge(restFieldsAsOptionalSchema);

export type TUpdateProductSchema = TypeOf<typeof UpdateProductSchema>;
