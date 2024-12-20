import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import TestimonialCard from '@/components/TestimonialCard';

// Images
import avatarCaro from '../assets/testimonials/Caro.jpg';
import avatarClaudia from '../assets/testimonials/Claudia.jpg';
import avatarJaky from '../assets/testimonials/Jaky.jpg';
import avatarMariana from '../assets/testimonials/Mariana.jpg';

interface Testimonial {
  TESTIMONIAL_NAME: string;
  TESTIMONIAL_TEXT: string;
}

// Define the props type for the component
interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const avatars = [avatarCaro, avatarClaudia, avatarJaky, avatarMariana];

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  return (
    <Carousel
      opts={{
        slidesToScroll: 1,
        breakpoints: {
          '(min-width: 768px)': { slidesToScroll: 2 }
        }
      }}>
      <CarouselContent className="cursor-grab active:cursor-grabbing">
        {testimonials.map((testimonial, idx) => (
          <CarouselItem className="basis-full lg:basis-1/2 sm:px-8" key={idx}>
            <TestimonialCard
              // src={avatars[idx].src}
              // alt={`${testimonial.TESTIMONIAL_NAME} avatar`}
              testimonialName={testimonial.TESTIMONIAL_NAME}
              testimonialText={testimonial.TESTIMONIAL_TEXT}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden lg:flex" />
      <CarouselNext className="hidden lg:flex" />
    </Carousel>
  );
};

export default TestimonialCarousel;
