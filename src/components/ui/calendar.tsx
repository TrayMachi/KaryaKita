"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  captionLayout,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const handleCalendarChange = (
    _value: string | number,
    _e: React.ChangeEventHandler<HTMLSelectElement>
  ) => {
    const _event = {
      target: {
        value: String(_value),
      },
    } as React.ChangeEvent<HTMLSelectElement>;
    _e(_event);
  };

  return (
    <div
      className={cn(
        "w-max p-[2px] bg-border-gradient-light dark:bg-border-gradient-dark rounded-[28px]",
        className
      )}
    >
      <DayPicker
        showOutsideDays={showOutsideDays}
        captionLayout={captionLayout}
        className={cn(
          "p-3 w-max bg-[#ECEFF7] dark:bg-[#00090A] rounded-[26px]"
        )}
        classNames={{
          months: "flex",
          month: "space-y-4",
          caption: "flex justify-end pt-1 relative items-center",
          caption_label: "text-lg font-bold font-urbanist dark:text-white",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "ghost" }),
            "flex items-center px-2 rounded-[8px] dark:border-[#FFFFFF33]"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute left-11",
          table: "w-full flex flex-col gap-1 sm:gap-[9px]",
          head_row: "flex sm:gap-2",
          head_cell:
            "text-[#1A2223] rounded-md w-9 font-normal text-xs sm:text-[16px] dark:text-white",
          row: "flex w-full sm:gap-2 sm:pt-2",
          cell: "h-9 w-9 text-center text-xs sm:text-[20px] p-0 relative",
          day: "h-9 w-9 p-0 font-normal rounded-full text-[#1A2223] dark:text-white",
          day_range_end: "day-range-end",
          day_selected:
            "bg-gradien-primary text-neutral-50 hover:bg-neutral-900 hover:text-neutral-50 focus:bg-neutral-900 focus:text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50 dark:hover:text-neutral-900 dark:focus:bg-neutral-50 dark:focus:text-neutral-900",
          day_today:
            "bg-[#1A22231A] text-[#1A2223] dark:bg-neutral-800 dark:text-neutral-50",
          day_outside:
            "day-outside text-[#1A22234D] opacity-50 aria-selected:bg-gradien-primary aria-selected:text-white dark:text-[#FFFFFF4D] dark:aria-selected:text-white aria-selected:opacity-100",
          day_disabled: "text-neutral-500 opacity-50 dark:text-neutral-400",
          day_range_middle:
            "aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50",
          day_hidden: "invisible",
          caption_dropdowns: "flex flex-row-reverse gap-1",
          vhidden:
            captionLayout === "dropdown" || captionLayout === "dropdown-buttons"
              ? "hidden"
              : "",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => (
            <ChevronLeft className="h-4 w-4" {...props} />
          ),
          IconRight: ({ ...props }) => (
            <ChevronRight className="h-4 w-4" {...props} />
          ),
          Dropdown: ({ ...props }) => (
            <Select
              {...props}
              onValueChange={(value) => {
                if (props.onChange) {
                  handleCalendarChange(value, props.onChange);
                }
              }}
              value={props.value as string}
            >
              <SelectTrigger
                className={
                  "[.is-between_&]:hidden [.is-end_&]:hidden [.is-start.is-end_&]:flex px-1 h-8 sm:px-3 sm:h-10"
                }
              >
                <SelectValue placeholder={props?.caption}>
                  <span className="text-xs  pr-1">{props?.caption}</span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="max-h-48 overflow-y-auto scrolling-auto min-w-[var(--radix-popper-anchor-width)]">
                {props.children &&
                  React.Children.map(props.children, (child) => (
                    <SelectItem
                      value={(child as React.ReactElement<any>)?.props?.value}
                      className="min-w-[var(--radix-popper-anchor-width)] "
                    >
                      {(child as React.ReactElement<any>)?.props?.children}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          ),
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
