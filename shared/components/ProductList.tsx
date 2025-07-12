import {ComponentProps} from "react";

import {cn} from "../utils/cn";
import {ProductThumbnail} from "./ProductThumbnail";
import {Text} from "./Text";

export function ProductList({products}: {products: ProductProps[]}) {
  return (
    <section aria-label="Product list">
      <ul className={cn("space-y-base")} role="list">
        {products.map((product) => (
          <li key={product.title}>
            <Product {...product} />
          </li>
        ))}
      </ul>
    </section>
  );
}

interface ProductProps extends ComponentProps<typeof ProductThumbnail> {
  title: string;
  description: string;
  price: string;
}

export function Product({
  title,
  description,
  price,
  ...productThumbnailProps
}: ProductProps) {
  return (
    <article className={cn("flex items-center justify-between")}>
      <div className={cn("gap-base flex")}>
        <ProductThumbnail {...productThumbnailProps} />
        <div className={cn("flex flex-col justify-center")}>
          <Text>{title}</Text>
          <Text appearance="subdued">{description}</Text>
        </div>
      </div>
      <Text aria-label={`Price: ${price}`}>{price}</Text>
    </article>
  );
}
