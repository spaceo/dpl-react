import React, { useState, FC, useEffect } from "react";
import { PatronV5 } from "../../../core/fbs/model";
import CheckBox from "../../../components/checkbox/Checkbox";
import BranchesDropdown from "../util/BranchesDropdown";
import { useText } from "../../../core/utils/text";
import DateInputs from "../../../components/date-inputs/date-inputs";

export interface ChangePatronProps {
  (newValue: string | boolean, key: string): void;
}

interface ReservationDetailsSectionProps {
  patron: PatronV5;
  changePatron: ChangePatronProps;
}

const ReservationDetailsSection: FC<ReservationDetailsSectionProps> = ({
  patron,
  changePatron
}) => {
  const t = useText();
  const [reservationPauseSectionVisible, setReservationPauseSectionVisible] =
    useState<boolean>(false);

  useEffect(() => {
    // If onhold has values, the section should be visible
    if (patron.onHold) {
      setReservationPauseSectionVisible(true);
    }
  }, [patron.onHold]);

  return (
    <section data-cy="pickup-reservations-section">
      <h2 className="text-body-small-regular mt-32 mb-16">
        {t("patronPageChangePickupHeaderText")}
      </h2>
      {t("patronPageChangePickupBreadText") && (
        <p className="text-body-small-regular">
          {t("patronPageChangePickupBreadText")}
        </p>
      )}
      <BranchesDropdown
        classNames="dropdow dropdown__desktop"
        selected={patron?.preferredPickupBranch || ""}
        onChange={(newPreferredPickupBranch) =>
          changePatron(newPreferredPickupBranch, "preferredPickupBranch")
        }
      />

      <h3 className="text-body-small-regular mt-32 mb-16">
        {t("patronPagePauseReservationsHeaderText")}
      </h3>
      <p className="text-body-small-regular">
        {t("patronPagePauseReservationsBreadText")}
      </p>
      <CheckBox
        className="mt-32 mb-16"
        id="show-reservation-pause-section"
        onChecked={() =>
          setReservationPauseSectionVisible(!reservationPauseSectionVisible)
        }
        ariaLabel={t("patronPageOpenPauseReservationsSectionAriaText")}
        selected={reservationPauseSectionVisible}
        label={t("patronPageOpenPauseReservationsSectionText")}
      />
      {reservationPauseSectionVisible && (
        <DateInputs
          setStartDate={(newStartDate) =>
            changePatron(newStartDate, "onHold.from")
          }
          setEndDate={(newEndDate) => changePatron(newEndDate, "onHold.to")}
          startDate={patron?.onHold?.from || ""}
          endDate={patron?.onHold?.to || ""}
        />
      )}
    </section>
  );
};

export default ReservationDetailsSection;