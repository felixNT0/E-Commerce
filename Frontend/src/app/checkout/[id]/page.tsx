import Checkout from "@/section/checkout";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
export async function generateMetadata(
  { params: { id } }: Props,

  parent: ResolvingMetadata
): Promise<Metadata> {
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: "",
    openGraph: {
      images: ["", ...previousImages],
    },
  };
}

export default async function CheckoutPage({ params: { id } }: Props) {
  return <Checkout id={id} />;
}
