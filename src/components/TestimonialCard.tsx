import React from 'react';

interface TestimonialCardProps {
  src: string;
  alt: string;
  testimonialName: string;
  testimonialText: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  src,
  alt,
  testimonialName,
  testimonialText
}) => {
  return (
    <div className="flex gap-6">
      <div className="relative rounded-full overflow-hidden h-20 w-20 flex-shrink-0">
        <img src={src} alt={alt} className="h-full w-full" />
      </div>
      <figure className="flex flex-col">
        <blockquote className="text-lg leading-6 text-gray-900 max-w-prose">
          <p>{`“${testimonialText}”`}</p>
        </blockquote>
        <figcaption className="flex">
          <p className="text-base text-primary-700 font-medium mt-4 max-w-lg">{testimonialName}</p>
        </figcaption>
      </figure>
    </div>
  );
};

export default TestimonialCard;
