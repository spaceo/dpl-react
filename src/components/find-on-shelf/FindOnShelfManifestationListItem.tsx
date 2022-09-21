import * as React from "react";
import { FC } from "react";
import { useGetFindOnShelfManifestationQuery } from "../../core/dbc-gateway/generated/graphql";
import { MaterialV3 } from "../../core/fbs/model";

export interface FindOnShelfManifestationListItemProps {
  department: string | undefined;
  location: string | undefined;
  sublocation: string | undefined;
  title: string;
  material: MaterialV3;
  numberAvailable: number;
}

const FindOnShelfManifestationListItem: FC<
  FindOnShelfManifestationListItemProps
> = ({
  department,
  location,
  sublocation,
  title,
  material,
  numberAvailable
}) => {
  return (
    <li className="find-on-shelf__row text-body-medium-regular">
      <span className="find-on-shelf__material-text">
        {title}, {publicationYear || ""}
      </span>
      <span>
        {`${department ? `${department}` : ""}
      ${(department && sublocation) || (department && location) ? " · " : ""}
      ${sublocation ? `${sublocation}` : ""}
      ${(sublocation && location) || (department && location) ? " · " : ""}
      ${location ? `${location}` : ""}`}
      </span>
      <span className="find-on-shelf__item-count-text">
        {numberAvailable}
        <span className="hide-visually--on-desktop"> hjemme</span>
      </span>
    </li>
  );
};

export default FindOnShelfManifestationListItem;
