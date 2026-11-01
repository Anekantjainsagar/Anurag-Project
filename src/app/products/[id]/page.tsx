import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/mockData";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function ProductContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#faf8f4] text-gray-500 text-sm">
          Loading product details...
        </div>
      }
    >
      <ProductContent params={params} />
    </Suspense>
  );
}
