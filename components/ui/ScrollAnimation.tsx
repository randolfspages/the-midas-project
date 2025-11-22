'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IntroSection from './IntroSection';
import SpotlightSection from './SpotlightSection';
import OutroSection from './OutroSection';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import type { FeaturePosition, FeatureDimension } from '../../lib/types';

const ScrollAnimation: React.FC = () => {
  useSmoothScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger>();
  const searchBarFinalWidthRef = useRef<number>(25);

  const getSearchBarFinalWidth = useCallback((): number => {
    return window.innerWidth < 1000 ? 20 : 25;
  }, []);

  const handleResize = useCallback(() => {
    searchBarFinalWidthRef.current = getSearchBarFinalWidth();
    ScrollTrigger.refresh();
  }, [getSearchBarFinalWidth]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const features = gsap.utils.toArray('.feature') as HTMLElement[];
      const featureBgs = gsap.utils.toArray('.feature-bg') as HTMLElement[];

      const featureStartPositions: FeaturePosition[] = [
        { top: 25, left: 15 },
        { top: 12.5, left: 50 },
        { top: 22.5, left: 75 },
        { top: 30, left: 82.5 },
        { top: 50, left: 20 },
        { top: 80, left: 20 },
        { top: 75, left: 75 },
      ];

      // Set initial positions
      features.forEach((feature, index) => {
        const featurePos = featureStartPositions[index];
        gsap.set(feature, {
          top: `${featurePos.top}%`,
          left: `${featurePos.left}%`,
        });
      });

      const featureStartDimensions: FeatureDimension[] = [];
      featureBgs.forEach((bg) => {
        const rect = bg.getBoundingClientRect();
        featureStartDimensions.push({
          width: rect.width,
          height: rect.height,
        });
      });

      const remInPixels = parseFloat(
        getComputedStyle(document.documentElement).fontSize
      );
      const targetWidth = 3 * remInPixels;
      const targetHeight = 3 * remInPixels;

      // Initialize search bar width
      searchBarFinalWidthRef.current = getSearchBarFinalWidth();

      window.addEventListener('resize', handleResize);

      // Create the main animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.spotlight',
          start: 'top top',
          end: `+=${window.innerHeight * 3}`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            // Spotlight content animation
            if (progress <= 0.3333) {
              const spotlightHeaderProgress = progress / 0.3333;
              gsap.set('.spotlight-content', {
                y: `${-100 * spotlightHeaderProgress}%`,
              });
            } else {
              gsap.set('.spotlight-content', {
                y: '-100%',
              });
            }

            // Features animation
            if (progress >= 0 && progress <= 0.5) {
              const featureProgress = progress / 0.5;

              features.forEach((feature, index) => {
                const original = featureStartPositions[index];
                const currentTop =
                  original.top + (50 - original.top) * featureProgress;
                const currentLeft =
                  original.left + (50 - original.left) * featureProgress;

                gsap.set(feature, {
                  top: `${currentTop}%`,
                  left: `${currentLeft}%`,
                });
              });

              featureBgs.forEach((bg, index) => {
                const featureDim = featureStartDimensions[index];
                const currentWidth =
                  featureDim.width +
                  (targetWidth - featureDim.width) * featureProgress;
                const currentHeight =
                  featureDim.height +
                  (targetHeight - featureDim.height) * featureProgress;
                const currentBorderRadius = 0.5 + (25 - 0.5) * featureProgress;
                const currentBorderWidth = 0.125 + (0.35 - 0.125) * featureProgress;

                gsap.set(bg, {
                  width: `${currentWidth}px`,
                  height: `${currentHeight}px`,
                  borderRadius: `${currentBorderRadius}rem`,
                  borderWidth: `${currentBorderWidth}rem`,
                });
              });

              // Feature text opacity
              if (progress >= 0 && progress <= 0.1) {
                const featureTextProgress = progress / 0.1;
                gsap.set('.feature-content', {
                  opacity: 1 - featureTextProgress,
                });
              } else if (progress > 0.1) {
                gsap.set('.feature-content', {
                  opacity: 0,
                });
              }
            }

            // Features container opacity
            gsap.set('.features', {
              opacity: progress >= 0.5 ? 0 : 1,
            });

            // Search bar animation
            gsap.set('.search-bar', {
              opacity: progress >= 0.5 ? 1 : 0,
            });

            if (progress >= 0.5 && progress <= 0.75) {
              const searchBarProgress = (progress - 0.5) / 0.25;

              const width = 3 + (searchBarFinalWidthRef.current - 3) * searchBarProgress;
              const height = 3 + (5 - 3) * searchBarProgress;
              const translateY = -50 + (200 - -50) * searchBarProgress;

              gsap.set('.search-bar', {
                width: `${width}rem`,
                height: `${height}rem`,
                transform: `translate(-50%, ${translateY}%)`,
              });

              gsap.set('.search-bar p', {
                opacity: 0,
              });
            } else if (progress > 0.75) {
              gsap.set('.search-bar', {
                width: `${searchBarFinalWidthRef.current}rem`,
                height: '5rem',
                transform: 'translate(-50%, 200%)',
              });
            }

            // Final header animation
            if (progress >= 0.75) {
              const finalHeaderProgress = (progress - 0.75) / 0.25;

              gsap.set('.search-bar p', {
                opacity: finalHeaderProgress,
              });

              gsap.set('.header-content', {
                y: -50 + 50 * finalHeaderProgress,
                opacity: finalHeaderProgress,
              });
            } else {
              gsap.set('.search-bar p', {
                opacity: 0,
              });
              gsap.set('.header-content', {
                y: -50,
                opacity: 0,
              });
            }
          },
        },
      });

      scrollTriggerRef.current = tl.scrollTrigger;
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert(); // This properly cleans up all GSAP animations
    };
  }, [handleResize, getSearchBarFinalWidth]);

  return (
    <div ref={containerRef}>
      <IntroSection />
      <SpotlightSection />
      <OutroSection />
    </div>
  );
};

export default ScrollAnimation;