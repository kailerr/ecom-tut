"use client";


import { useEffect, useState } from "react";
import { Stripe } from "stripe";
import { Card, CardContent, CardTitle } from "./ui/card";
import Image from "next/image";

interface Props {
  products: Stripe.Product[];
}

export const Carousel = ({ products }: Props) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[current];
  const price = currentProduct.default_price as Stripe.Price;

  return (
    <Card>
      {currentProduct.images && currentProduct.images[0] && (
            <div>
              <Image
                alt={currentProduct.name}
                src={currentProduct.images[0]}
                layout="fill"
                objectFit="cover"
              />
            </div>
          )
        }
        <CardContent>
            <CardTitle>
                {currentProduct.name}
            </CardTitle>
            {price && price.unit_amount && <p>${(price.unit_amount /100).toFixed(2)}</p>}
        </CardContent>
    </Card>
  );
};
