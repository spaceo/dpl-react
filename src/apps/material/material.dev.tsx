import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MaterialEntry, { MaterialEntryProps } from "./material.entry";

export default {
  title: "Apps / Material",
  component: MaterialEntry,
  argTypes: {
    searchUrl: {
      name: "Path to the search result page",
      defaultValue: "/search",
      control: { type: "text" }
    },
    materialUrl: {
      name: "Path to the material page",
      defaultValue: "/work/:workid",
      control: { type: "text" }
    },
    wid: {
      name: "Work ID",
      defaultValue: "work-of:870970-basis:52557240",
      control: { type: "text" }
    },
    materialHeaderAuthorByText: {
      name: "By (author)",
      defaultValue: "Af ",
      control: { type: "text" }
    },
    periodicalSelectYearText: {
      name: "Year",
      defaultValue: "År",
      control: { type: "text" }
    },
    periodicalSelectEditionText: {
      name: "Week",
      defaultValue: "Udgave",
      control: { type: "text" }
    },
    reserveBookText: {
      name: "Reserve",
      defaultValue: "RESERVER BOG",
      control: { type: "text" }
    },
    reserveText: {
      name: "Reserve",
      defaultValue: "reserver",
      control: { type: "text" }
    },
    findOnBookshelfText: {
      name: "Find on bookshelf",
      defaultValue: "FIND PÅ HYLDEN",
      control: { type: "text" }
    },
    descriptionHeadlineText: {
      name: "Description headline",
      defaultValue: "Beskrivelse",
      control: { type: "text" }
    },
    identifierText: {
      name: "Identifier/topic text",
      defaultValue: "Emneord",
      control: { type: "text" }
    },
    inSameSeriesText: {
      name: "In same series as",
      defaultValue: "I samme serie",
      control: { type: "text" }
    },
    numberDescriptionText: {
      name: "Number",
      defaultValue: "Nr",
      control: { type: "text" }
    },
    inSeriesText: {
      name: "In series",
      defaultValue: "i serien",
      control: { type: "text" }
    },
    loginToSeeReviewText: {
      name: "Login to see Review",
      defaultValue: "Log ind for at se anmeldensen.",
      control: { type: "text" }
    },
    cantViewReviewText: {
      name: "Cannot view Review",
      defaultValue: "Kan ikke se anmeldensen.",
      control: { type: "text" }
    },
    ratingIsText: {
      name: "Rating is",
      defaultValue: "Rating of this item is",
      control: { type: "text" }
    },
    outOfText: {
      name: "X 'out of' Y",
      defaultValue: "ud af",
      control: { type: "text" }
    },
    heartsIconText: {
      name: "Hearts icon text",
      defaultValue: "hearts",
      control: { type: "text" }
    },
    detailsOfTheMaterialText: {
      name: "Details of the material",
      defaultValue: "Detaljer om materialet",
      control: { type: "text" }
    },
    editionsText: {
      name: "Editions",
      defaultValue: "Udgaver",
      control: { type: "text" }
    },
    fictionNonfictionText: {
      name: "Fiction Nonfiction",
      defaultValue: "Emnetal",
      control: { type: "text" }
    },
    detailsText: {
      name: "Details",
      defaultValue: "Detaljer",
      control: { type: "text" }
    },
    reviewsText: {
      name: "Reviews",
      defaultValue: "Anmeldelser",
      control: { type: "text" }
    },
    typeText: {
      name: "Type",
      defaultValue: "Type",
      control: { type: "text" }
    },
    languageText: {
      name: "Language",
      defaultValue: "Sprog",
      control: { type: "text" }
    },
    contributorsText: {
      name: "Contributors",
      defaultValue: "Bidragsydere",
      control: { type: "text" }
    },
    originalTitleText: {
      name: "Original title",
      defaultValue: "Originaltitel",
      control: { type: "text" }
    },
    isbnText: {
      name: "ISBN",
      defaultValue: "ISBN",
      control: { type: "text" }
    },
    editionText: {
      name: "Edition",
      defaultValue: "Udgave",
      control: { type: "text" }
    },
    scopeText: {
      name: "Scope",
      defaultValue: "Omfang",
      control: { type: "text" }
    },
    publisherText: {
      name: "Publisher",
      defaultValue: "Forlag",
      control: { type: "text" }
    },
    audienceText: {
      name: "Audience",
      defaultValue: "Målgruppe",
      control: { type: "text" }
    },
    genreAndFormText: {
      name: "Genre and form",
      defaultValue: "Genre",
      control: { type: "text" }
    },
    creatorsAreMissingText: {
      name: "Creators are missing",
      defaultValue: "Creators are missing",
      control: { type: "text" }
    },
    goToEReolenText: {
      name: "Go to e-Reolen",
      defaultValue: "Gå til ereolen",
      control: { type: "text" }
    },
    readArticleText: {
      name: "Read article",
      defaultValue: "Læs artiklen",
      control: { type: "text" }
    },
    loadingText: {
      name: "Loading",
      defaultValue: "Loading",
      control: { type: "text" }
    },
    getOnlineText: {
      name: "Get online",
      defaultValue: "Få online",
      control: { type: "text" }
    },
    seeOnlineText: {
      name: "See online",
      defaultValue: "Se online",
      control: { type: "text" }
    },
    cantReserveText: {
      name: "Can't be reserved",
      defaultValue: "Kan ej reserveres",
      control: { type: "text" }
    },
    goToText: {
      name: "Go to",
      defaultValue: "Gå til",
      control: { type: "text" }
    },
    materialIsLoanedOutText: {
      name: "Material is loaned out",
      defaultValue: "Materialet er udlånt",
      control: { type: "text" }
    },
    findOnShelfExpandButtonExplanationText: {
      name: "Find on shelf expand button explanation text",
      defaultValue: "This button opens a modal",
      control: { type: "text" }
    },
    materialIsIncludedText: {
      name: "Material is included",
      defaultValue: "Materialet tæller ikke med i din lånerkvote",
      control: { type: "text" }
    },
    weHaveShoppedText: {
      name: "We have shopped",
      defaultValue: "Vi har købt",
      control: { type: "text" }
    },
    copiesThereIsText: {
      name: "copies there is",
      defaultValue: "eksemplarer. Der er",
      control: { type: "text" }
    },
    reservationsForThisMaterialText: {
      name: "Reservations for this material",
      defaultValue: "reserveringer til dette materiale",
      control: { type: "text" }
    },
    youHaveBorrowedText: {
      name: "You have borrowed",
      defaultValue: "Du har lånt",
      control: { type: "text" }
    },
    possibleText: {
      name: "Possible",
      defaultValue: "mulige",
      control: { type: "text" }
    },
    thisMonthText: {
      name: "This month",
      defaultValue: "denne måned",
      control: { type: "text" }
    },
    approveReservationText: {
      name: "Approve reservation",
      defaultValue: "Godkend reservation",
      control: { type: "text" }
    },
    shiftText: {
      name: "Shift",
      defaultValue: "Skift",
      control: { type: "text" }
    },
    pickupLocationText: {
      name: "Pick up at",
      defaultValue: "Afhentes på",
      control: { type: "text" }
    },
    receiveSmsWhenMaterialReadyText: {
      name: "Receive SMS when the material is ready",
      defaultValue: "Du får en sms, når materialet er klar",
      control: { type: "text" }
    },
    receiveEmailWhenMaterialReadyText: {
      name: "Receive mail when the material is ready",
      defaultValue: "Du får besked, når materialet er klar",
      control: { type: "text" }
    },
    haveNoInterestAfterText: {
      name: "Have no interest after",
      defaultValue: "Har ingen interesse efter",
      control: { type: "text" }
    },
    oneMonthText: {
      name: "One month",
      defaultValue: "1 måned",
      control: { type: "text" }
    },
    twoMonthsText: {
      name: "Two months",
      defaultValue: "2 måneder",
      control: { type: "text" }
    },
    threeMonthsText: {
      name: "Three months",
      defaultValue: "3 måneder",
      control: { type: "text" }
    },
    sixMonthsText: {
      name: "Six months",
      defaultValue: "6 måneder",
      control: { type: "text" }
    },
    oneYearText: {
      name: "Twelve months",
      defaultValue: "12 måneder",
      control: { type: "text" }
    },
    daysText: {
      name: "Days",
      defaultValue: "Dage",
      control: { type: "text" }
    },
    reservationSuccesTitleText: {
      name: "Reservation Success title",
      defaultValue: "Materialet er hjemme og er nu reserveret til dig!",
      control: { type: "text" }
    },
    reservationSuccesIsReservedForYouText: {
      name: "Reservation Success Title",
      defaultValue: "er reserveret til dig",
      control: { type: "text" }
    },
    reservationSuccesPreferredPickupBranchText: {
      name: "Reservation Preferred pickup branch",
      defaultValue:
        "Materialet er hjemme, og du får beksed så snart der ligger klar til dig - afhentning på",
      control: { type: "text" }
    },
    reservationErrorsTitleText: {
      name: "Reservation Error title",
      defaultValue: "Reservationsfejl",
      control: { type: "text" }
    },
    reservationErrorsDescriptionText: {
      name: "Reservation Error description",
      defaultValue:
        "Der er desværre sket en fejl. Vi beklager ulejligheden. Prøv igen",
      control: { type: "text" }
    },
    tryAginButtonText: {
      name: "Try again button text",
      defaultValue: "Prøv igen",
      control: { type: "text" }
    },
    okButtonText: {
      name: "Ok button text",
      defaultValue: "Ok",
      control: { type: "text" }
    },
    missingDataText: {
      name: "Missing data text",
      defaultValue: "Mangler data",
      control: { type: "text" }
    },
    reservationModalScreenReaderModalDescriptionText: {
      name: "Reservation modal screen reader description",
      defaultValue: "Modal for reservation",
      control: { type: "text" }
    },
    reservationModalCloseModalAriaLabelText: {
      name: "Reservation modal aria label modal two",
      defaultValue: "Luk reservation modal",
      control: { type: "text" }
    },
    librariesHaveTheMaterialText: {
      name: "Libraries have the material",
      defaultValue: "biblioteker har materialet",
      control: { type: "text" }
    },
    findOnShelfModalScreenReaderModalDescriptionText: {
      name: "Reservation modal screen reader description",
      defaultValue: "Modal for reservation",
      control: { type: "text" }
    },
    findOnShelfModalCloseModalAriaLabelText: {
      name: "Reservation modal aria label modal two",
      defaultValue: "Luk reservation modal",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MaterialEntry>;

export const Material: ComponentStory<typeof MaterialEntry> = (
  args: MaterialEntryProps
) => <MaterialEntry {...args} />;
