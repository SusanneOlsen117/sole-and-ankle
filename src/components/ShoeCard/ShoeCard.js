import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const VARIANTS = {
  "new-release": {
    backgroundColor: "hsla(240, 60%, 63%, 1)",
    content: "Just released!",
    padding: "7px 9px 9px 11px",
    display: "none",
    color: "hsla(220, 3%, 20%, 1)",
  },
  "on-sale": {
    backgroundColor: "hsla(340, 65%, 47%, 1)",
    content: "Sale",
    padding: "7px 9px 9px 10px",
    textDecoration: "line-through",
    color: "hsla(210, 5%, 40%, 1)",
  },
  default: {
    display: "none",
    color: "hsla(220, 3%, 20%, 1)",
  },
};
const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const variantStyles = VARIANTS[variant];

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          <VariantFlag
            style={{
              "--background-color": variantStyles.backgroundColor,
              "--padding": variantStyles.padding,
            }}
          >
            {variantStyles.content}
          </VariantFlag>
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price
            style={{
              "--text-decoration": variantStyles.textDecoration,
              "--color": variantStyles.color,
            }}
          >
            {formatPrice(price)}
          </Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          <SalePrice style={{ "--display": variantStyles.display }}>
            {formatPrice(salePrice)}
          </SalePrice>
        </Row>
      </Wrapper>
    </Link>
  );
};

const VariantFlag = styled.span`
  position: absolute;
  top: 12px;
  right: 0;
  margin-right: -4px;
  background-color: var(--background-color);
  color: white;
  padding: var(--padding);
  border-radius: 2px;
  font-size: (14 / 16) rem;
  font-weight: 600;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  flex: 1 1 350px;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;

  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  text-decoration: var(--text-decoration);
  color: var(--color);
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
  display: var(--display);
`;

export default ShoeCard;
