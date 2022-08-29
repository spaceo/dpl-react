import React, { useEffect, useState } from "react";
import { useCombobox, UseComboboxStateChange } from "downshift";
import {
  SuggestionsFromQueryStringQuery,
  SuggestionType,
  useSuggestionsFromQueryStringQuery
} from "../../core/dbc-gateway/generated/graphql";
import SearchBar from "../../components/search-bar/search-bar";
import { Autosuggest } from "../../components/autosuggest/autosuggest";
import { Suggestion } from "../../core/utils/types/autosuggest";
import { useUrls } from "../../core/utils/url";
import {
  constructMaterialUrl,
  constructSearchUrl,
  constructSearchUrlWithFilter,
  redirectTo
} from "../../core/utils/helpers/url";
import { WorkId } from "../../core/utils/types/ids";
import { useText } from "../../core/utils/text";

const SearchHeader: React.FC = () => {
  const [q, setQ] = useState<string>("");
  const [qWithoutQuery, setQWithoutQuery] = useState<string>(q);
  const [suggestItems, setSuggestItems] = useState<
    SuggestionsFromQueryStringQuery["suggest"]["result"] | []
  >([]);
  // we need to convert between string and suggestion result object so
  // that the value in the search field on enter click doesn't become [object][object]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentlySelectedItem, setCurrentlySelectedItem] = useState<any>("");
  const [isAutosuggestOpen, setIsAutosuggestOpen] = useState<boolean>(false);
  const {
    data,
    isLoading,
    status
  }: {
    data: SuggestionsFromQueryStringQuery | undefined;
    isLoading: boolean;
    status: string;
  } = useSuggestionsFromQueryStringQuery({ q });
  const { searchUrl, materialUrl } = useUrls();
  const t = useText();
  const autosuggestCategoryList = [
    { render: t("bookCategoryText"), type: "book" },
    { render: t("ebookCategoryText"), type: "ebook" },
    { render: t("filmCategoryText"), type: "movie" },
    { render: t("audioBookCategoryText"), type: "audioBook" },
    { render: t("musicCategoryText"), type: "music" },
    { render: t("gameCategoryText"), type: "game" },
    { render: t("animatedSeriesCategoryText"), type: "animatedSeries" }
  ];
  // Once we register the item select event the original highlighted index is
  // already set to -1 by Downshift.
  const [highlightedIndexAfterClick, setHighlightedIndexAfterClick] = useState<
    number | null
  >(null);

  // Make sure to only assign the data once.
  useEffect(() => {
    if (data) {
      const arayOfResults = data.suggest.result;
      setSuggestItems(arayOfResults);
    }
  }, [data]);
  const originalData = suggestItems;
  const textData: Suggestion[] = [];
  const materialData: Suggestion[] = [];
  const categoryData: Suggestion[] = [];
  let nonWorkSuggestion: Suggestion | undefined;
  let orderedData: SuggestionsFromQueryStringQuery["suggest"]["result"] = [];

  if (originalData) {
    nonWorkSuggestion = originalData.find(
      (item) =>
        item.type !== SuggestionType.Title &&
        item.type !== SuggestionType.Composit
    );
    originalData.forEach((item: Suggestion) => {
      if (
        item.type === SuggestionType.Composit ||
        item.type === SuggestionType.Title
      ) {
        if (materialData.length < 3) {
          materialData.push(item);
          return;
        }
      }
      textData.push(item);
    });
    orderedData = textData.concat(materialData);

    if (nonWorkSuggestion) {
      autosuggestCategoryList.forEach(() => {
        categoryData.push(nonWorkSuggestion as Suggestion);
      });
      orderedData = orderedData.concat(categoryData);
    }
  }

  // Autosuggest opening and closing based on input text length.
  useEffect(() => {
    if (q) {
      const minimalLengthQuery = 3;
      if (q.length >= minimalLengthQuery) {
        setIsAutosuggestOpen(true);
      } else {
        setIsAutosuggestOpen(false);
      }
    } else {
      setIsAutosuggestOpen(false);
    }
  }, [q]);

  function determineSuggestionTerm(suggestion: Suggestion): string {
    if (suggestion.type === SuggestionType.Composit) {
      return suggestion.work?.titles.main[0] || "incomplete data";
    }
    return suggestion.term;
  }

  function isDisplayedAsWorkSuggestion(
    selectedItem: Suggestion["work"],
    currentMaterialData: Suggestion[]
  ) {
    const dataWithWorkId = currentMaterialData.filter(
      (item) => item.work?.workId === selectedItem?.workId
    );
    return Boolean(dataWithWorkId.length);
  }

  function handleSelectedItemChange(
    changes: UseComboboxStateChange<Suggestion>
  ) {
    const { selectedItem } = changes;
    if (!selectedItem) {
      return;
    }
    setCurrentlySelectedItem(determineSuggestionTerm(selectedItem));
  }

  function handleHighlightedIndexChange(
    changes: UseComboboxStateChange<Suggestion>
  ) {
    const { type } = changes;
    let { highlightedIndex } = changes;
    // Don't do aything for mouse hover events.
    if (
      type === useCombobox.stateChangeTypes.ItemMouseMove ||
      type === useCombobox.stateChangeTypes.MenuMouseLeave
    ) {
      return;
    }
    if (
      type !== useCombobox.stateChangeTypes.ItemClick &&
      type !== useCombobox.stateChangeTypes.InputKeyDownEnter
    ) {
      if (highlightedIndex !== undefined && highlightedIndex > -1) {
        setHighlightedIndexAfterClick(highlightedIndex);
      }
    }
    // Close autosuggest if there is no highlighted index.
    if (highlightedIndex && highlightedIndex < 0) {
      setIsAutosuggestOpen(false);
      return;
    }
    if (!highlightedIndex) {
      highlightedIndex = 0;
    }
    const arrayIndex: number = highlightedIndex;
    const currentlyHighlightedObject = orderedData[arrayIndex];
    const currentItemValue = determineSuggestionTerm(
      currentlyHighlightedObject
    );
    if (
      type === useCombobox.stateChangeTypes.InputKeyDownArrowDown ||
      type === useCombobox.stateChangeTypes.InputKeyDownArrowUp
    ) {
      setQWithoutQuery(currentItemValue);
      return;
    }
    setQ(currentItemValue);
  }

  function handleInputValueChange(changes: UseComboboxStateChange<Suggestion>) {
    const { inputValue, selectedItem, type } = changes;
    if (inputValue === undefined) {
      return;
    }
    if (type === useCombobox.stateChangeTypes.InputChange) {
      setQ(inputValue);
      setQWithoutQuery(inputValue);
      return;
    }
    setQWithoutQuery(inputValue);
    // Escape if there is no selected item defined.
    if (!selectedItem) {
      return;
    }
    // Nothing happens if this is not a mouse click or enter click.
    if (
      type !== useCombobox.stateChangeTypes.ItemClick &&
      type !== useCombobox.stateChangeTypes.InputKeyDownEnter
    ) {
      return;
    }
    // If this item is shown as one of work suggestions redirect to material page.
    if (
      selectedItem.work?.workId &&
      isDisplayedAsWorkSuggestion(selectedItem.work, materialData)
    ) {
      redirectTo(
        constructMaterialUrl(materialUrl, selectedItem.work?.workId as WorkId)
      );
      return;
    }
    // If this item is shown as a category suggestion
    if (
      nonWorkSuggestion &&
      changes.selectedItem &&
      nonWorkSuggestion.term === changes.selectedItem.term &&
      highlightedIndexAfterClick &&
      highlightedIndexAfterClick >= textData.concat(materialData).length
    ) {
      const highlightedCategoryIndex =
        highlightedIndexAfterClick - (textData.length + materialData.length);
      redirectTo(
        constructSearchUrlWithFilter(
          searchUrl,
          determineSuggestionTerm(selectedItem),
          {
            materialType: autosuggestCategoryList[highlightedCategoryIndex].type
          }
        )
      );
    }
    // Otherwise redirect to search result page.
    redirectTo(
      constructSearchUrl(searchUrl, determineSuggestionTerm(selectedItem))
    );
  }

  // This is the main Downshift hook.
  const {
    getMenuProps,
    highlightedIndex,
    getItemProps,
    getInputProps,
    getComboboxProps
  } = useCombobox({
    isOpen: isAutosuggestOpen,
    items: orderedData,
    inputValue: qWithoutQuery,
    defaultIsOpen: false,
    onInputValueChange: handleInputValueChange,
    onSelectedItemChange: handleSelectedItemChange,
    selectedItem: currentlySelectedItem,
    onHighlightedIndexChange: handleHighlightedIndexChange
  });

  return (
    <form
      className="header__menu-second"
      action={String(constructSearchUrl(searchUrl, qWithoutQuery))}
    >
      {/* The downshift combobox uses prop spreading by design */}
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <div className="header__menu-search" {...getComboboxProps()}>
        <SearchBar getInputProps={getInputProps} />
        <Autosuggest
          originalData={originalData}
          textData={textData}
          materialData={materialData}
          categoryData={categoryData}
          isLoading={isLoading}
          status={status}
          getMenuProps={getMenuProps}
          highlightedIndex={highlightedIndex}
          getItemProps={getItemProps}
          isOpen={isAutosuggestOpen}
          autosuggestCategoryList={autosuggestCategoryList}
        />
      </div>
    </form>
  );
};

export default SearchHeader;
