import ProductDetail from "@/section/product-details";
import { ProductItem } from "@/types/product";
import { getStoredJSONValuesFromLocalStorage } from "@/util/helper";

import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params: { id } }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const storedProducts = await getStoredJSONValuesFromLocalStorage("products");

  const product = storedProducts?.find(
    (products: ProductItem) => products.id === id
  );

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.name || "",
    openGraph: {
      images: [product?.imageUrl || "", ...previousImages],
    },
  };
}

export default async function ProductDetailPage({ params: { id } }: Props) {
  return <ProductDetail id={id} />;
}
