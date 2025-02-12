import React, { FC } from "react";
import LoanList from "./loan-list";
import { withText } from "../../../core/utils/text";
import { withUrls } from "../../../core/utils/url";
import { pageSizeGlobal } from "../../../core/utils/helpers/general";
import withIsPatronBlockedHoc from "../../../core/utils/withIsPatronBlockedHoc";
import { BlockedPatronEntryTextProps } from "../../../core/storybook/blockedArgs";
import { withConfig } from "../../../core/utils/config";
import GlobalUrlEntryPropsInterface from "../../../core/utils/types/global-url-props";
import { GroupModalProps } from "../../../core/storybook/groupModalArgs";
import { GroupModalLoansProps } from "../../../core/storybook/loanGroupModalArgs";
import { RenewalArgs } from "../../../core/storybook/renewalArgs";
import { MaterialDetailsModalProps } from "../../../core/storybook/materialDetailsModalArgs";
import { AcceptFeesModalEntryTextProps } from "../../../core/storybook/acceptFeesModalArgs";

export interface LoanListEntryConfigProps {
  expirationWarningDaysBeforeConfig: string;
}
export interface LoanListEntryUrlProps {
  expirationWarningDaysBeforeConfig: string;
}

interface LoanListEntryTextProps {
  groupModalGoToMaterialAriaLabelText: string;
  loanListAriaLabelListButtonText: string;
  loanListAriaLabelStackButtonText: string;
  loanListDigitalLoansEmptyListText: string;
  loanListDigitalLoansTitleText: string;
  loanListDigitalPhysicalLoansEmptyListText: string;
  loanListDueDateModalAriaLabelText: string;
  loanListDueDateModalAriaDescribeMobileText: string;
  loanListLateFeeDesktopText: string;
  loanListLateFeeMobileText: string;
  loanListMaterialDaysText: string;
  loanListAdditionalMaterialsText: string;
  loanListPhysicalLoansEmptyListText: string;
  loanListPhysicalLoansTitleText: string;
  loanListRenewMultipleButtonExplanationText: string;
  loanListRenewMultipleButtonText: string;
  loanListStatusBadgeDangerText: string;
  loanListStatusBadgeWarningText: string;
  loanListTitleText: string;
  loanListToBeDeliveredDigitalMaterialText: string;
  loanListToBeDeliveredText: string;
  etAlText: string;
  materialAndAuthorText: string;
  materialByAuthorText: string;
  publizonAudioBookText: string;
  publizonEbookText: string;
  publizonPodcastText: string;
  resultPagerStatusText: string;
  loanListMaterialLateFeeText: string;
  loanListMaterialDayText: string;
  loanListStatusCircleAriaLabelText: string;
}

export interface LoanListEntryWithPageSizeProps
  extends BlockedPatronEntryTextProps,
    LoanListEntryTextProps,
    LoanListEntryConfigProps,
    GroupModalProps,
    GroupModalLoansProps,
    RenewalArgs,
    LoanListEntryUrlProps,
    MaterialDetailsModalProps,
    AcceptFeesModalEntryTextProps,
    GlobalUrlEntryPropsInterface {}

const LoanListEntry: FC<LoanListEntryWithPageSizeProps> = ({
  pageSizeDesktop,
  pageSizeMobile
}) => {
  const pageSize = pageSizeGlobal(
    {
      desktop: pageSizeDesktop,
      mobile: pageSizeMobile
    },
    "pageSizeLoanList"
  );

  return <LoanList pageSize={pageSize} />;
};
export default withConfig(
  withUrls(withText(withIsPatronBlockedHoc(LoanListEntry)))
);
