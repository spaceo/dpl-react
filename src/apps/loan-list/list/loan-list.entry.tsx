import React, { FC } from "react";
import LoanList from "./loan-list";
import { withText } from "../../../core/utils/text";

export interface LoanListEntryProps {
  fbsBaseUrl: string;
  loanListTitleText: string;
  loanListPhysicalLoansTitleText: string;
  loanListDigitalLoansTitleText: string;
  loanListRenewMultipleButtonText: string;
  loanListListText: string;
  loanListStackText: string;
  loanListRenewMultipleButtonExplanationText: string;
  loanListLateFeeDesktopText: string;
  loanListLateFeeMobileText: string;
  loanListDaysText: string;
  loanListToBeDeliveredText: string;
  loanListToBeDeliveredDigitalMaterialText: string;
  loanListMaterialsDesktopText: string;
  loanListMaterialsMobileText: string;
  loanListMaterialsModalDesktopText: string;
  loanListMaterialsModalMobileText: string;
  loanListStatusCircleAriaLabelText: string;
  loanListStatusBadgeDangerText: string;
  loanListStatusBadgeWarningText: string;
  loanListDeniedMaxRenewalsReachedText: string;
  loanListDeniedOtherReasonText: string;
  loanListDeniedInterLibraryLoanText: string;
  loanListToBeDeliveredMaterialText: string;
  loanListLabelCheckboxMaterialModalText: string;
  LoanListCloseModalText: string;
  loanListModalDescriptionText: string;
  loanListEmptyPhysicalLoansText: string;
  materialDetailsModalOverdueText: string;
  materialDetailsOverdueText: string;
  loanListMaterialByAuthorText: string;
  loanModalMaterialByAuthorText: string;
  materialDetailsByAuthorText: string;
  loanListMaterialAndAuthorText: string;
  loanModalMaterialAndAuthorText: string;
  materialDetailsAndAuthorText: string;
  dueDateRenewLoanModalHeaderText: string;
  renewLoanModalHeaderText: string;
  renewLoanModalCloseModalText: string;
  dueDateRenewLoanCloseModalText: string;
  materialDetailsCloseModalText: string;
  renewLoanModalDescriptionText: string;
  dueDateRenewLoanModalDescriptionText: string;
  materialDetailsModalDescriptionText: string;
  materialDetailsRenewLoanButtonText: string;
  materialDetailsLinkToPageWithFeesText: string;
  materialDetailsHandInLabelText: string;
  materialDetailsLoanDateLabelText: string;
  materialDetailsMaterialNumberLabelText: string;
  renewLoanModalCheckboxText: string;
  renewLoanModalButtonText: string;
  dueDateRenewLoanModalCheckboxText: string;
  dueDateRenewLoanModalButtonText: string;
  dueDateWarningLoanOverdueText: string;
  dueDateLinkToPageWithFeesText: string;
  bottomRenewLoanModalCheckboxText: string;
  bottomDueDateRenewLoanModalCheckboxText: string;
  bottomRenewLoanModalButtonText: string;
  bottomDueDateRenewLoanModalButtonText: string;
}

const LoanListEntry: FC<LoanListEntryProps> = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <LoanList {...props} />
);

export default withText(LoanListEntry);
