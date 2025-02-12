import React, { FC, ReactNode } from "react";
import AuthorYear from "../../../components/author-year/authorYear";
import { Cover } from "../../../components/cover/cover";
import { BasicDetailsType } from "../../../core/utils/types/basic-details-type";
import { Pid } from "../../../core/utils/types/ids";

interface FeeInfoProps {
  material: BasicDetailsType;
  materialItemNumber: string;
  children: ReactNode;
}
const FeeInfo: FC<FeeInfoProps> = ({
  material,
  materialItemNumber,
  children
}) => {
  const {
    authorsShort = "",
    materialType = "",
    year = "",
    title = "",
    description = "",
    pid,
    series = ""
  } = material;

  return (
    <div className="list-reservation__material">
      <div>
        <Cover
          id={pid as Pid}
          idType="pid"
          size="small"
          animate={false}
          description={description || ""}
        />
      </div>
      <div className="list-reservation__information">
        <div>
          <div className="status-label status-label--outline">
            {materialType}
          </div>
        </div>
        <div className="list-reservation__about">
          <h3 className="text-header-h4">{title}</h3>
          <p className="text-small-caption color-secondary-gray">
            <AuthorYear author={authorsShort} year={year || ""} />
          </p>
          <p className="text-small-caption color-secondary-gray">{series}</p>
        </div>
        <div />
        <p className="text-small-caption color-secondary-gray">
          {materialItemNumber}
        </p>
        {children}
      </div>
    </div>
  );
};

export default FeeInfo;
