import React from "react";
import feature1 from "../assets/features/feature-1.png";
import feature2 from "../assets/features/feature-2.PNG";
import feature3 from "../assets/features/feature-3.png";
import feature4 from "../assets/features/feature-4.PNG";

const Features = () => {
  return (
    <div>
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-center text-base/7 font-semibold text-indigo-600">
            Our Features That Make You Safer
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-pretty text-center text-4xl font-medium tracking-tight text-[#FAA845] sm:text-5xl">
            You Are Safe.
          </p>
          <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white lg:rounded-l-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] lg:rounded-l-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                    SOS BUTTON
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    SOS is designed to help you out of a dangerous situation.
                    When activated, it sends out alerts to all your trusted
                    contacts so that they can provide help or call for backup if
                    needed
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm">
                  <div className="absolute inset-x-10 bottom-0 top-8 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl">
                    <img
                      className="size-full object-contain object-center"
                      src={feature1}
                      alt=""
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-l-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-1">
              <div className="absolute inset-px rounded-lg bg-[#FBEABF] max-lg:rounded-t-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-t-[calc(2rem+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Helpline
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    The helpline feature is confidential and non-judgmental
                    support staffed by trained professionals
                  </p>
                </div>
                <div className="flex flex-1 items-center justify-center px-8 max-lg:pb-12 max-lg:pt-10 sm:px-10 lg:pb-2">
                  <img
                    className="w-full max-lg:max-w-xs"
                    src={feature2}
                    alt=""
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-t-[2rem]"></div>
            </div>
            <div className="relative max-lg:row-start-3 lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-px rounded-lg bg-[#FBEABF]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)]">
                <div className="px-8 pt-8 sm:px-10 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Live Location Tracking
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Keeps you connected with your friends and family
                  </p>
                </div>
                <div className="flex flex-1 items-center [container-type:inline-size] max-lg:py-4 lg:pb-2">
                  <img
                    className="h-[min(200px,100cqw)] object-cover object-center ml-16"
                    src={feature3}
                    alt=""
                  />
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5"></div>
            </div>
            <div className="relative lg:row-span-2">
              <div className="absolute inset-px rounded-lg bg-white max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
              <div className="relative flex h-full flex-col overflow-hidden rounded-[calc(theme(borderRadius.lg)+1px)] max-lg:rounded-b-[calc(2rem+1px)] lg:rounded-r-[calc(2rem+1px)]">
                <div className="px-8 pb-3 pt-8 sm:px-10 sm:pb-0 sm:pt-10">
                  <p className="mt-2 text-lg/7 font-medium tracking-tight text-gray-950 max-lg:text-center">
                    Quick Emergency Tips
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    Quick tips provide quick and informative tips for a variety
                    of emergency situations
                  </p>
                  <p className="mt-2 max-w-lg text-sm/6 text-gray-600 max-lg:text-center">
                    It allows the user to stay prepared, informed, and aware
                  </p>
                </div>
                <div className="relative min-h-[30rem] w-full grow [container-type:inline-size] max-lg:mx-auto max-lg:max-w-sm ml-4">
                  {/* <div className="absolute inset-x-10 bottom-0 top-8 overflow-hidden rounded-t-[12cqw] border-x-[3cqw] border-t-[3cqw] border-gray-700 bg-gray-900 shadow-2xl"> */}
                  <img
                    className="size-full object-contain object-center"
                    src={feature4}
                    alt=""
                    style={{
                      height: "100%",
                      width: "90%",
                      objectFit: "contain",
                    }}
                  />
                  {/* </div> */}
                </div>
              </div>
              <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 max-lg:rounded-b-[2rem] lg:rounded-r-[2rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
