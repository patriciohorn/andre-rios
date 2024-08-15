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
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="relative rounded-full overflow-hidden h-24 w-24 flex-shrink-0 bg-primary-200 p-1">
        <div className="relative rounded-full overflow-hidden">
          <img src={src} alt={alt} className="h-full w-full" />
        </div>
      </div>
      <figure className="flex flex-col">
        <blockquote className="text-lg leading-6 text-primary-950 max-w-prose">
          <p>{`“${testimonialText}”`}</p>
        </blockquote>
        <figcaption className="flex">
          <p className="text-base text-primary-700 font-medium mt-4 max-w-prose">
            {testimonialName}
          </p>
        </figcaption>
      </figure>
    </div>
  );
};

export default TestimonialCard;
