import React, { useState } from "react";
import Various from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import { useQueryClient } from "react-query";
import {
  convertPostIdsToFaustIds,
  getAllPids,
  getManifestationType,
  materialIsFiction
} from "../../core/utils/helpers/general";
import { useText } from "../../core/utils/text";
import { Button } from "../Buttons/Button";
import { Cover } from "../cover/cover";
import ReservationFormListItem from "./ReservationFormListItem";
import {
  AgencyBranch,
  AuthenticatedPatronV6,
  HoldingsForBibliographicalRecordV3,
  ReservationResponseV2
} from "../../core/fbs/model";
import UserListItems from "./UserListItems";
import ReservationSucces from "./ReservationSucces";
import ReservationError from "./ReservationError";
import {
  getTotalHoldings,
  getTotalReservations,
  reservationModalId
} from "../../apps/material/helper";
import {
  getGetHoldingsV3QueryKey,
  useAddReservationsV2,
  useGetHoldingsV3,
  useGetPatronInformationByPatronIdV2
} from "../../core/fbs/fbs";
import { Manifestation, Work } from "../../core/utils/types/entities";
import {
  getFutureDateString,
  getPreferredBranch,
  constructReservationData,
  getAuthorLine
} from "./helper";
import UseReservableManifestations from "../../core/utils/UseReservableManifestations";
import { PeriodicalEdition } from "../material/periodical/helper";
import { useConfig } from "../../core/utils/config";
import { useStatistics } from "../../core/statistics/useStatistics";
import StockAndReservationInfo from "../material/StockAndReservationInfo";
import MaterialAvailabilityTextParagraph from "../material/MaterialAvailabilityText/generic/MaterialAvailabilityTextParagraph";
import { statistics } from "../../core/statistics/statistics";
import useAlternativeAvailableManifestation from "./useAlternativeAvailableManifestation";
import PromoBar from "../promo-bar/PromoBar";

type ReservationModalProps = {
  selectedManifestations: Manifestation[];
  selectedPeriodical: PeriodicalEdition | null;
  work: Work;
};

export const ReservationModalBody = ({
  selectedManifestations,
  selectedPeriodical,
  work
}: ReservationModalProps) => {
  const t = useText();
  const config = useConfig();
  const branches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const mainManifestationType = getManifestationType(selectedManifestations[0]);
  const { reservableManifestations } = UseReservableManifestations({
    manifestations: selectedManifestations,
    type: mainManifestationType
  });
  const queryClient = useQueryClient();
  const [reservationResponse, setReservationResponse] =
    useState<ReservationResponseV2 | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<number | null>(null);
  const allPids = getAllPids(selectedManifestations);
  const faustIds = convertPostIdsToFaustIds(allPids);
  const { mutate } = useAddReservationsV2();
  const userResponse = useGetPatronInformationByPatronIdV2();
  const holdingsResponse = useGetHoldingsV3({
    recordid: faustIds
  });
  const { track } = useStatistics();
  const { otherManifestationPreferred } = useAlternativeAvailableManifestation(
    work,
    selectedManifestations[0].pid
  );

  // If we don't have all data for displaying the view render nothing.
  if (!userResponse.data || !holdingsResponse.data) {
    return null;
  }

  const { data: userData } = userResponse as { data: AuthenticatedPatronV6 };
  const { data: holdingsData } = holdingsResponse as {
    data: HoldingsForBibliographicalRecordV3[];
  };
  const holdings = getTotalHoldings(holdingsData);
  const reservations = getTotalReservations(holdingsData);
  const { patron } = userData;
  const authorLine = getAuthorLine(selectedManifestations[0], t);
  const expiryDate = selectedInterest
    ? getFutureDateString(selectedInterest)
    : null;

  const saveReservation = () => {
    if (!reservableManifestations) {
      return;
    }

    // Save reservation to FBS.
    mutate(
      {
        data: constructReservationData({
          manifestations: reservableManifestations,
          selectedBranch,
          expiryDate,
          periodical: selectedPeriodical
        })
      },
      {
        onSuccess: (res) => {
          // Track only if the reservation has been successfully saved.
          track("click", {
            id: statistics.reservation.id,
            name: statistics.reservation.name,
            trackedData: work.workId
          });
          // This state is used to show the success or error modal.
          setReservationResponse(res);
          // Because after a successful reservation the holdings (reservations) are updated.
          queryClient.invalidateQueries(getGetHoldingsV3QueryKey());
        }
      }
    );
  };

  const reservationSuccess = reservationResponse?.success || false;
  const reservationResult = reservationResponse?.reservationResults[0]?.result;
  const reservationDetails =
    reservationResponse?.reservationResults[0]?.reservationDetails;

  return (
    <>
      {!reservationResult && (
        <section className="reservation-modal">
          <header className="reservation-modal-header">
            <Cover id={allPids[0]} size="medium" animate />
            <div className="reservation-modal-description">
              <div className="reservation-modal-tag">
                {selectedManifestations[0].materialTypes[0].specific}
              </div>
              <h2 className="text-header-h2 mt-22 mb-8">
                {selectedManifestations[0].titles.main}
                {selectedPeriodical && ` ${selectedPeriodical.displayText}`}
              </h2>
              {authorLine && (
                <p className="text-body-medium-regular">{authorLine}</p>
              )}
            </div>
          </header>
          <div>
            <div className="reservation-modal-submit">
              <MaterialAvailabilityTextParagraph>
                <StockAndReservationInfo
                  stockCount={holdings}
                  reservationCount={reservations}
                />
              </MaterialAvailabilityTextParagraph>
              <Button
                dataCy="reservation-modal-submit-button"
                label={t("approveReservationText")}
                buttonType="none"
                variant="filled"
                disabled={false}
                collapsible={false}
                size="small"
                onClick={saveReservation}
              />
            </div>
            <div className="reservation-modal-list">
              <ReservationFormListItem
                icon={Various}
                title={t("editionText")}
                text={
                  selectedPeriodical?.displayText ||
                  selectedManifestations[0].edition?.summary ||
                  ""
                }
              />
              {!materialIsFiction(work) && otherManifestationPreferred && (
                <PromoBar
                  classNames="px-35"
                  sticky
                  type="info"
                  text={t("materialIsAvailableInAnotherEditionText", {
                    count: otherManifestationPreferred.reservations,
                    placeholders: {
                      "@title": otherManifestationPreferred.titles.main[0],
                      "@authorAndYear":
                        getAuthorLine(otherManifestationPreferred, t) ?? "",
                      "@reservations": otherManifestationPreferred.reservations
                    }
                  })}
                />
              )}
              {patron && (
                <UserListItems
                  patron={patron}
                  branches={branches}
                  selectedBranch={selectedBranch}
                  selectBranchHandler={setSelectedBranch}
                  selectedInterest={selectedInterest}
                  setSelectedInterest={setSelectedInterest}
                />
              )}
            </div>
          </div>
        </section>
      )}
      {reservationSuccess && reservationDetails && (
        <ReservationSucces
          modalId={reservationModalId(faustIds)}
          title={selectedManifestations[0].titles.main[0]}
          preferredPickupBranch={getPreferredBranch(
            reservationDetails.pickupBranch,
            branches
          )}
          numberInQueue={reservationDetails.numberInQueue}
        />
      )}
      {!reservationSuccess && reservationResult && (
        <ReservationError
          reservationResult={reservationResult}
          setReservationResponse={setReservationResponse}
        />
      )}
    </>
  );
};

export default ReservationModalBody;
