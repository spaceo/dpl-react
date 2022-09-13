import ExpandMoreIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import React, { FC, ReactNode } from "react";

export interface DisclosureProps {
  mainIconPath: string;
  title: string;
  children?: ReactNode;
  disclosureIconExpandAltText?: string;
}

const Disclosure: FC<DisclosureProps> = ({ title, children, mainIconPath }) => {
  return (
    <details className="disclosure text-body-large">
      <summary className="disclosure__headline text-body-large">
          <div className="disclosure__icon bg-identity-tint-120">
        {title}
        <img
          className="disclosure__expand noselect"
          src={ExpandMoreIcon}
          alt=""
        />
      </summary>
      {children}
    </details>
  );
};

export default Disclosure;
