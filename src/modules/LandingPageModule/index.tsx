
import React from "react";
import { SearchBar } from "./components/SearchBar";
import { CardBarang } from "./components/CardBarang";
import { items } from "./constant";
import CarouselIklan from "./components/CarouselIklan";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const LandingPageModule = () => {

  return (
    <div className="flex flex-col gap-6 justify-center items-center mx-[10vw]">
      <SearchBar />
      <div className="w-[800px]">
        <CarouselIklan />
      </div>
      <h1 className="text-primary font-bold text-[28px] text-start">
        Disponsor
      </h1>
      <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[27px]">
        {items.map((item, index) => {
          if (item.sponsor) {
            return (
              <CardBarang
                id="1"
                key={index}
                title={item.title}
                priceRange={item.priceRange}
                location={item.location}
                rating={item.rating}
                sold={item.sold}
                image={item.image}
                sponsor={item.sponsor}
              />
            );
          }
        })}
      </div>
      <h1 className="text-primary font-bold text-[28px] text-start">
        You Might Also Like
      </h1>
      <div className="grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-[27px]">
        {items.map((item, index) => (
          <CardBarang
            id="1"
            key={index}
            title={item.title}
            priceRange={item.priceRange}
            location={item.location}
            rating={item.rating}
            sold={item.sold}
            image={item.image}
            sponsor={item.sponsor}
          />
        ))}
      </div>
    </div>
  );
};
