import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getAllProducts, getProductBySlug } from "@/data/products";
import ProductDetailClient from "@/components/ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllProducts();
  const baseSlugs = products.map((product) => ({
    slug: product.slug,
  }));
  return [
    ...baseSlugs,
    { slug: "lithium-ion-batteries-for-two-wheelers" },
    { slug: "lithium-ion-batteries-for-three-wheelers-l3" },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | LievLyfe Energy",
    };
  }

  return {
    title: `${product.title} | LievLyfe Energy`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.title} | LievLyfe Energy`,
      description: product.shortDescription,
      images: [product.image],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

