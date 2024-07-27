"use client";
import React from "react";
import { items } from "../constant";
import { ItemCardProps } from "../interface";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const CardBarang: React.FC<ItemCardProps> = ({
  title,
  priceRange,
  location,
  rating,
  sold,
  image,
  sponsor = false,
}) => {
  return (
    <Card className="border-2 border-primary text-primary shadow-lg">
      <CardHeader>
        <Image src={image} alt={title} width={300} height={300} />
        {sponsor && <p>Disponsor</p>}
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-primary">{priceRange}</CardDescription>
      </CardHeader>
      <CardContent className="-mt-6 -mb-6">
        <p>{location}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-row gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="25"
            viewBox="0 0 12 13"
            fill="none"
          >
            <rect
              width="12"
              height="12"
              transform="translate(0 0.714294)"
              fill="white"
            />
            <path
              d="M5.99999 9.57788L8.56499 11.1552C8.63154 11.1956 8.70858 11.2154 8.78636 11.212C8.86414 11.2087 8.93917 11.1823 9.00198 11.1363C9.06479 11.0903 9.11255 11.0267 9.13923 10.9536C9.16591 10.8804 9.17031 10.801 9.15187 10.7254L8.45437 7.7821L10.7372 5.81335C10.7954 5.76225 10.8373 5.69521 10.8579 5.62053C10.8784 5.54585 10.8766 5.46678 10.8528 5.3931C10.8289 5.31942 10.784 5.25434 10.7235 5.2059C10.6631 5.15747 10.5898 5.12779 10.5126 5.12054L7.51687 4.87679L6.3628 2.08304C6.33338 2.01096 6.28316 1.94929 6.21854 1.90587C6.15392 1.86245 6.07784 1.83926 5.99999 1.83926C5.92214 1.83926 5.84606 1.86245 5.78144 1.90587C5.71682 1.94929 5.6666 2.01096 5.63718 2.08304L4.48312 4.87679L1.48733 5.12054C1.40969 5.12736 1.33578 5.1569 1.27484 5.20548C1.21389 5.25407 1.16861 5.31953 1.14465 5.3937C1.1207 5.46786 1.11913 5.54744 1.14014 5.6225C1.16116 5.69755 1.20382 5.76475 1.2628 5.8157L3.54562 7.78445L2.84812 10.7254C2.82968 10.801 2.83407 10.8804 2.86075 10.9536C2.88743 11.0267 2.93519 11.0903 2.998 11.1363C3.06081 11.1823 3.13584 11.2087 3.21363 11.212C3.29141 11.2154 3.36844 11.1956 3.43499 11.1552L5.99999 9.57788Z"
              fill="#F99607"
              stroke="#EDA145"
              stroke-width="0.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>
            {" "}
            {rating} | {sold}+ Terjual
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
