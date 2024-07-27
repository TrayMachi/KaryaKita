"use client";
import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

export const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

const imgs: string[] = [
  "/iklan1.png",
  "/iklan2.png",
  "/iklan3.png",
  "/iklan4.png",
  "/iklan5.png",
];

interface CarouselIklanProps {}

const CarouselIklan: React.FC<CarouselIklanProps> = () => {
  const [imgIndex, setImgIndex] = useState(1);
  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, [dragX]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  const handleButtonClick = (direction: "next" | "prev") => {
    if (direction === "next" && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (direction === "prev" && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden py-5 -translate-y-5">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab lg:w-[70%] xl:w-[50%] mx-auto items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      <GradientEdges />

      <Button onClick={() => handleButtonClick("prev")} direction="prev" />
      <Button onClick={() => handleButtonClick("next")} direction="next" />
    </div>
  );
};

interface ImagesProps {
  imgIndex: number;
}

const Images: React.FC<ImagesProps> = ({ imgIndex }) => {
  return (
    <>
      {imgs.map((imgSrc, idx) => (
        <motion.div
          key={idx}
          style={{
            backgroundImage: `url(${imgSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          animate={{
            scale: imgIndex === idx ? 0.95 : 0.85,
          }}
          transition={SPRING_OPTIONS}
          className="aspect-video min-w-full shrink-0 rounded-xl bg-neutral-800"
        />
      ))}
    </>
  );
};

interface DotsProps {
  imgIndex: number;
  setImgIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Dots: React.FC<DotsProps> = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {imgs.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setImgIndex(idx)}
          className={`h-3 w-3 rounded-full transition-colors ${
            idx === imgIndex ? "bg-secondary" : "bg-primary"
          }`}
        />
      ))}
    </div>
  );
};

const GradientEdges: React.FC = () => {
  return (
    <>
      <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-[10vw] max-w-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[10vw] max-w-[100px]" />
    </>
  );
};

interface ButtonProps {
  onClick: () => void;
  direction: "next" | "prev";
}

const Button: React.FC<ButtonProps> = ({ onClick, direction }) => {
  const buttonText = direction === "next" ? ">" : "<";
  const buttonStyles =
    direction === "next"
      ? "absolute bottom-1/2 right-0 bg-primary"
      : "absolute bottom-1/2 left-0 bg-primary";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-white rounded-md ${buttonStyles} focus:outline-none focus:ring focus:border-blue-300 transition-all hover:opacity-80`}
    >
      {buttonText}
    </button>
  );
};

export default CarouselIklan;
