import { useGetReservationsV2 } from "../fbs/fbs";
import { useGetV1UserReservations } from "../publizon/publizon";
import { getQueuedReservations } from "./helpers/general";
import {
  mapFBSReservationToReservationType,
  mapPublizonReservationToReservationType
} from "./helpers/list-mapper";
import { getReadyForPickup } from "../../apps/reservation-list/utils/helpers";

const useReservations = () => {
  const { data: reservationsFbs } = useGetReservationsV2();
  const { data: reservationsPublizon } = useGetV1UserReservations();

  // map reservations to same type
  const mappedReservationsFbs = reservationsFbs
    ? mapFBSReservationToReservationType(reservationsFbs)
    : [];
  const mappedReservationsPublizon = reservationsPublizon?.reservations
    ? mapPublizonReservationToReservationType(reservationsPublizon.reservations)
    : [];

  // Combine all reservations from both FBS and Publizon
  const allReservations = [
    ...mappedReservationsFbs,
    ...mappedReservationsPublizon
  ];

  // Combine "ready to loan" reservations from both FBS and Publizon
  const readyToLoanReservationsFBS = getReadyForPickup(mappedReservationsFbs);
  const readyToLoanReservationsPublizon = getReadyForPickup(
    mappedReservationsPublizon
  );
  const allReadyToLoanReservations = [
    ...readyToLoanReservationsFBS,
    ...readyToLoanReservationsPublizon
  ];

  // Combine "still in queue" reservations from both FBS and Publizon
  const queuedFBSReservations = getQueuedReservations(mappedReservationsFbs);
  const queuedPublizonReservations = getQueuedReservations(
    mappedReservationsPublizon
  );
  const allQueuedReservations = [
    ...queuedFBSReservations,
    ...queuedPublizonReservations
  ];

  return {
    allReservations,
    readyToLoanReservationsFBS,
    readyToLoanReservationsPublizon,
    allReadyToLoanReservations,
    allQueuedReservations,
    queuedFBSReservations,
    queuedPublizonReservations
  };
};

export default useReservations;