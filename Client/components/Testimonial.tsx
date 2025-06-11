"use client";
import Background from "@/public/Rectangle.png";
import Image from "next/image";
import { MoveRight, Play } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Testimonial() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  console.log(isVideoLoaded);

  return (
    <>
      <section className="relative w-full min-h-screen py-18 flex justify-center items-center">
        <Image
          src={Background}
          fill
          alt="skew background"
          className="object-cover -skew-y-3 -z-10"
          priority
        />
        <div className="max-w-6xl w-full px-4 z-10">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
              <div className="flex flex-col justify-start">
                <span className="bg-white text-emerald-500 self-start font-medium px-6 py-3 rounded-full text-sm mb-8">
                  How it works
                </span>
                <h1 className="text-3xl lg:text-4xl font-semibold text-neutral-900 text-left">
                  Demo: How to create a Mock API
                </h1>
              </div>
              <Link
                href="/design"
                className="bg-emerald-500 hover:bg-emerald-600 transition-colors inline-flex gap-2 items-center px-6 py-3 rounded-full font-medium text-base lg:text-lg text-white whitespace-nowrap"
              >
                Get Started
                <MoveRight size={18} />
              </Link>
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-xl p-4 max-w-8xl">
            <div className="flex gap-8">
              {/* Video/Image Section */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden w-[300px] h-[550px]">
                  {!showVideo ? (
                    // Video Thumbnail/Placeholder
                    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100">
                      <div className="text-center">
                        <button
                          onClick={() => setShowVideo(true)}
                          className="bg-emerald-500 hover:bg-emerald-600 transition-colors rounded-full p-4 mb-4 shadow-lg"
                        >
                          <Play size={32} className="text-white ml-1" />
                        </button>
                        <p className="text-gray-600 font-medium">
                          Click to watch demo
                        </p>
                      </div>
                      {/* Optional: Add a preview image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    </div>
                  ) : (
                    // Actual Video
                    <video
                      src="https://ik.imagekit.io/dfencrym0/API.mp4"
                      className="w-full h-full object-cover"
                      onLoadedData={() => setIsVideoLoaded(true)}
                      title="Mock API Creation Demo"
                      autoPlay
                    />
                  )}
                </div>
              </div>

              {/* Text Content */}
              <div className="order-1 lg:order-2 space-y-8">
                <h2 className="text-2xl lg:text-4xl text-balance font-semibold text-gray-900">
                  Simulate API Responses in Seconds
                </h2>
                <p className="text-gray-600 leading-relaxed text-base lg:text-lg">
                  Easily test your frontend or backend by generating mock
                  APIs—no setup, no server required. Mocky helps developers
                  simulate any HTTP response with custom status codes, headers,
                  and body content. This short demo walks you through the entire
                  process, from selecting a status code to using the generated
                  URL in your project.
                </p>

                {/* Additional Features List */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">
                      Generate custom HTTP responses instantly
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">
                      Configure status codes and headers
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-600">
                      Perfect for frontend testing and development
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
