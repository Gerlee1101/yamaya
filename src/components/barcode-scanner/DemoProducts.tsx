"use client";

import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DemoProduct } from "./types";

const DEMO_PRODUCTS: DemoProduct[] = [
  {
    code: "4901588130652",
    name: "Шоколадтай эрдэнэ шишийн амттан",
  },
  {
    code: "4901588617382",
    name: "Шоколадтай гүнжидийн үртэй жигнэмэг",
  },
  {
    code: "4901588131161",
    name: "Ногоотой амьтадын хэлбэртэй жигнэмэг",
  },
  {
    code: "4984352530056",
    name: "Үдийн хоолны мах",
  },
  {
    code: "4902818718503",
    name: "Натто (исгэсэн шар буурцаг)",
  },
  {
    code: "4901188000000",
    name: "Жишээ бүтээгдэхүүн",
  },
];

export default function DemoProducts() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Жишээ баркодууд турших</CardTitle>
        <CardDescription>
          Доорх баркодуудын аль нэг дээр дарж бүтээгдэхүүний мэдээллийг үзнэ үү
        </CardDescription>
      </CardHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-6">
        {DEMO_PRODUCTS.map((product) => (
          <Button
            key={product.code}
            onClick={() => router.push(`/product/${product.code}`)}
            variant="outline"
            className="h-auto p-4 flex flex-col items-start text-left"
          >
            <div className="font-mono text-sm text-muted-foreground mb-1">
              {product.code}
            </div>
            <div className="font-medium">{product.name}</div>
          </Button>
        ))}
      </div>
    </Card>
  );
}
