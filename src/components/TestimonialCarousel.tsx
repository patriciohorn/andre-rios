import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TestimonialCard from "@/components/TestimonialCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
// Images
import avatarCaro from "../assets/testimonials/Caro.jpg";
import avatarClaudia from "../assets/testimonials/Claudia.jpg";
import avatarJaky from "../assets/testimonials/Jaky.jpg";
import avatarMariana from "../assets/testimonials/Mariana.jpg";

interface Testimonial {
  TESTIMONIAL_NAME: string;
  TESTIMONIAL_TEXT: string;
}

import type { CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
// Define the props type for the component
interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  title: string;
}

const avatars = [avatarCaro, avatarClaudia, avatarJaky, avatarMariana];

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  title,
}) => {
  // const [api, setApi] = React.useState<CarouselApi>();
  // const [current, setCurrent] = React.useState(0);
  // const [count, setCount] = React.useState(0);

  // React.useEffect(() => {
  //   if (!api) {
  //     return;
  //   }

  //   setCount(api.scrollSnapList().length);
  //   setCurrent(api.selectedScrollSnap() + 1);

  //   api.on("select", () => {
  //     setCurrent(api.selectedScrollSnap() + 1);
  //   });
  // }, [api]);

  return (
    <>
      <div className="flex items-center justify-center mb-12 sm:mb-20">
        <h2 className="flex-1 text-4xl sm:text-5xl text-center font-bold text-primary-950">
          {title}
        </h2>
        {/* <div className=" flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden sm:flex rounded-full border-primary-600"
            onClick={() => api?.scrollPrev()}
          >
            <ChevronLeft className="h-4 w-4 text-primary-600" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="hidden sm:flex rounded-full border-primary-600"
            onClick={() => api?.scrollNext()}
          >
            <ChevronRight className="h-4 w-4 text-primary-600" />
          </Button>
        </div> */}
      </div>

      <Carousel
        opts={{
          slidesToScroll: 1,
          breakpoints: {
            "(min-width: 768px)": { slidesToScroll: 2 },
          },
        }}
      >
        <CarouselContent className="cursor-grab active:cursor-grabbing ">
          {testimonials.map((testimonial, idx) => (
            <CarouselItem
              className="basis-full lg:basis-1/2 sm:px-8 "
              key={idx}
            >
              <TestimonialCard
                // src={avatars[idx].src}
                // alt={`${testimonial.TESTIMONIAL_NAME} avatar`}
                testimonialName={testimonial.TESTIMONIAL_NAME}
                testimonialText={testimonial.TESTIMONIAL_TEXT}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex top-24" />
        <CarouselNext className="hidden lg:flex top-24" />
      </Carousel>
    </>
  );
};

export default TestimonialCarousel;
