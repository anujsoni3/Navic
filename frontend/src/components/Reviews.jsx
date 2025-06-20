import React from "react";
import "./Reviews.css"; // for keyframes

const reviews = [
  "Amazing product!",
  "Totally worth the price.",
  "Best purchase I've made.",
  "Highly recommend!",
  "Five stars!",
  "Would buy again.",
  "Super smooth experience.",
  "Love it!",
];

const Reviews =()=>{
return(
    <>
  <div className="overflow-hidden py-10 space-y-8">
      {/* Top Row - Left to Right */}
      <div className="relative w-full">
        <div className="flex animate-marquee gap-6 w-max">
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={`top-${index}`}
              className="min-w-[250px] bg-white rounded-xl p-4 shadow"
            >
              {review}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Row - Right to Left */}
      <div className="relative w-full">
        <div className="flex animate-marquee-reverse gap-6 w-max">
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={`top-${index}`}
              className="min-w-[250px] bg-white rounded-xl p-4 shadow"
            >
              {review}
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
)
}

export default Reviews;