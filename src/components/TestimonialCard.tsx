import React from "react";

interface TestimonialCardProps {
  // src: string;
  // alt: string;
  testimonialName: string;
  testimonialText: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  // src,
  // alt,
  testimonialName,
  testimonialText,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-16 ">
      {/* <div className="relative rounded-full overflow-hidden h-24 w-24 flex-shrink-0 bg-primary-200 p-1">
        <div className="relative rounded-full overflow-hidden">
          <img src={src} alt={alt} className="h-full w-full" />
        </div>
      </div> */}
      <figure className="flex flex-col items-center">
        <blockquote className="text-lg sm:text-xl text-center  text-primary-950 text-balance font-medium">
          <p>{`“${testimonialText}”`}</p>
        </blockquote>
        <figcaption className="flex">
          <p className="text-base text-center text-primary-700 font-semibold mt-4 mx-auto">
            {testimonialName}
          </p>
        </figcaption>
      </figure>
    </div>
  );
};

export default TestimonialCard;
