import { Variant } from "./../entities/variant";
import { Vendor } from "./../entities/vendor";
import { Media } from "../entities/media";
import { VariantResponse } from "./type.variant";

export type OptionProductResponse = {
  id?: number;
  title?: string;
  position?: number;
  values?: string[];
};

export type ProductResponse = {
  id?: number;
  title?: string;
  description?: string;
  status?: string;
  vendorId?: number;
  price?: number;
  comparePrice?: number;
  featureImageId?: number;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
  featureImage?: Media;
  variants?: VariantResponse[];
  options?: OptionProductResponse[];
  vendor?: Vendor;
  media?: Media[];
  // productCollections?: ProductCollection[];
};
