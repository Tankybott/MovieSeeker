import React, { useEffect, useRef, useState } from "react";
import HomeCarouselCard from "../utility/MovieCard";
import HomeCarouselButton from "./HomeCarouselButton";
import { useBreakpoint } from "../../custom-hooks/useBreakpoint";
import "./scrollbar.css";

export interface CarouselCardConfig {
  cardImgUrl: string;
  movieTitle: string;
  movieYearOfRelese: number;
  LengthOfMovieInMinutes: number;
}

const HomeCarousel: React.FC<{
  carouselCardsConfig: CarouselCardConfig[];
  numberOfCardsOnSmallScreen: number;
  numberOfCardsOnMediumScreen: number;
  numberOfCardsOnLargeScreen: number;
  numberOfCardsOnExtraLargeScreen: number;
}> = ({
  carouselCardsConfig,
  numberOfCardsOnSmallScreen: small,
  numberOfCardsOnMediumScreen: medium,
  numberOfCardsOnLargeScreen: large,
  numberOfCardsOnExtraLargeScreen: extraLarge,
}) => {
  const cardWrapperRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const scrollIntervalRef = useRef<number | null>(null);
  const scrollTimeoutRef = useRef<number | null>(null);
  const initialOffsetRef = useRef<number | null>(null);
  const cardWidthRef = useRef<number | null>(null);

  const [wasInitiated, setWasInitiated] = useState(false);
  const [imagesToLoad, setImagesToLoad] = useState(
    carouselCardsConfig.length * 3
  );
  const [carouselHovered, setCarouselHovered] = useState(false);
  const [scrollingNow, setScrollingNow] = useState(false);

  const breakpoint = useBreakpoint();

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleInfiniteScroll = () => {
      const leftClone = cardWrapperRefs.current[0];
      const rightClone = cardWrapperRefs.current[2];
      if (!leftClone || !rightClone || cardWidthRef.current === null) return;

      const containerRect = container.getBoundingClientRect();
      const leftCloneRect = leftClone.getBoundingClientRect();
      const rightCloneRect = rightClone.getBoundingClientRect();
      const tolerance = 15;

      if (Math.abs(leftCloneRect.left - containerRect.left) <= tolerance) {
        if (wasInitiated) setScrollingNow(true);
        container.scrollTo({
          left:
            leftClone.scrollWidth +
            (initialOffsetRef.current ?? 0) -
            cardWidthRef.current,
          behavior: "auto",
        });
        setWasInitiated(true);
      }

      if (Math.abs(rightCloneRect.right - containerRect.right) <= tolerance) {
        if (wasInitiated) setScrollingNow(true);
        container.scrollTo({
          left:
            rightClone.scrollWidth +
            (initialOffsetRef.current ?? 0) -
            cardWidthRef.current,
          behavior: "auto",
        });
        setWasInitiated(true);
      }
    };

    container.addEventListener("scroll", handleInfiniteScroll);
    return () => container.removeEventListener("scroll", handleInfiniteScroll);
  }, [wasInitiated]);

  useEffect(() => {
    if (imagesToLoad > 0) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    const currentCardsToShow = (() => {
      if (breakpoint === "sm") return small;
      if (breakpoint === "md") return medium;
      if (breakpoint === "lg") return large;
      return extraLarge;
    })();

    const offset = Math.floor(container.clientWidth / currentCardsToShow);
    initialOffsetRef.current = offset;
    cardWidthRef.current = offset;
    container.scrollBy({
      left: offset,
      behavior: "auto",
    });
  }, [imagesToLoad, breakpoint, extraLarge, small, medium, large]);

  const decreaseImageToLoad = () => setImagesToLoad((prev) => prev - 1);

  const scrollOneCard = (direction: "left" | "right") => {
    if (scrollingNow) return;

    const container = scrollContainerRef.current;
    if (!container || cardWidthRef.current === null) return;

    setScrollingNow(true);

    container.scrollBy({
      left: direction === "left" ? -cardWidthRef.current : cardWidthRef.current,
      behavior: "smooth",
    });

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = window.setTimeout(() => {
      setScrollingNow(false);
    }, 330);
  };

  const startScroll = (direction: "left" | "right") => {
    if (scrollIntervalRef.current) return;

    scrollOneCard(direction);
    scrollIntervalRef.current = window.setInterval(() => {
      scrollOneCard(direction);
    }, 400);
  };

  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const cardsToShow = (() => {
    if (breakpoint === "sm") return small;
    if (breakpoint === "md") return medium;
    if (breakpoint === "lg") return large;
    return extraLarge;
  })();

  return (
    <div
      className="w-full h-max flex justify-between items-center relative"
      onMouseEnter={() => setCarouselHovered(true)}
      onMouseLeave={() => setCarouselHovered(false)}
    >
      {/* Left Button */}
      <div
        className={`w-0 lg:w-[1.5%] transition-opacity duration-300 ${
          carouselHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          height: cardWrapperRefs.current[1]
            ? `${cardWrapperRefs.current[1].clientHeight / 2}px`
            : "0px",
        }}
      >
        <HomeCarouselButton
          icon={<i className="fi fi-sr-angle-left"></i>}
          onHold={() => startScroll("left")}
          onLeaveHold={stopScroll}
        />
      </div>

      {/* Scrollable Cards */}
      <div
        ref={scrollContainerRef}
        className="w-[95%] overflow-x-auto no-user-scroll scrollbar-none"
      >
        <div className="flex w-auto">
          {cardWrapperRefs.current.map((_ref, refIndex) => (
            <div
              key={refIndex}
              ref={(el) => {
                cardWrapperRefs.current[refIndex] = el;
              }}
              className="flex"
            >
              {carouselCardsConfig.map((c, index) => (
                <div
                  key={`${refIndex}-${index}`}
                  style={{
                    width: scrollContainerRef.current
                      ? `${
                          scrollContainerRef.current.clientWidth / cardsToShow
                        }px`
                      : "0px",
                  }}
                >
                  <HomeCarouselCard
                    cardImgUrl={c.cardImgUrl}
                    movieTitle={c.movieTitle}
                    movieYearOfRelese={c.movieYearOfRelese}
                    lengthOfMovieInMinutes={c.LengthOfMovieInMinutes}
                    setImageLoaded={decreaseImageToLoad}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Right Button */}
      <div
        className={`w-0 lg:w-[1.5%] transition-opacity duration-300 ${
          carouselHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          height: cardWrapperRefs.current[1]
            ? `${cardWrapperRefs.current[1].clientHeight / 2}px`
            : "0px",
        }}
      >
        <HomeCarouselButton
          icon={<i className="fi fi-sr-angle-right"></i>}
          onHold={() => startScroll("right")}
          onLeaveHold={stopScroll}
        />
      </div>
    </div>
  );
};

export default HomeCarousel;
