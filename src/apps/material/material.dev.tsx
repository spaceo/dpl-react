import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MaterialEntry, { MaterialEntryProps } from "./material.entry";

export default {
  title: "Apps / Material",
  component: MaterialEntry,
  argTypes: {
    pid: {
      name: "pid",
      defaultValue: "870970-basis:52557240",
      control: { type: "text" }
    },
    materialHeaderAuthorByText: {
      name: "By (author)",
      defaultValue: "Af ",
      control: { type: "text" }
    },
    periodikumSelectYearText: {
      name: "Year",
      defaultValue: "År",
      control: { type: "text" }
    },
    periodikumSelectWeekText: {
      name: "Week",
      defaultValue: "Uge",
      control: { type: "text" }
    },
    reserveBookText: {
      name: "Reserve",
      defaultValue: "RESERVER BOG",
      control: { type: "text" }
    },
    findOnBookshelfText: {
      name: "Find on bookshelf",
      defaultValue: "FIND PÅ HYLDEN",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MaterialEntry>;

export const Material: ComponentStory<typeof MaterialEntry> = (
  args: MaterialEntryProps
) => <MaterialEntry {...args} />;
