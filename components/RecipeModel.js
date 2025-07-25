import { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecipeModel = (props) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={props.isModal} as={Fragment} className="p-2 m-2 ">
      <Dialog
        as="div"
        className="relative z-[999] sm:block"
        initialFocus={cancelButtonRef}
        onClose={() => {
          props.setIsModal(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-20 ">
          <div className="flex items-center justify-center p-2 m-2">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform rounded-lg bg-white w-fit sm:p-6">
                {/* Your code here */}

                <div className="flex justify-end items-end gap-6">
                  <div className="mt-2">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-[12px] p-1.5 ml-auto inline-flex border border-red-500 items-center dark:hover:bg-red-200 dark:hover:text-white"
                      onClick={() => {
                        props.setIsModal(false);
                      }}
                      ref={cancelButtonRef}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="#ff002d"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="w-full px-4 py-6">
                  <h3 className="text-lg font-semibold text-gray-600 mb-4 ">
                    Missing Ingredients
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {props.missing?.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-center text-sm font-medium"
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default RecipeModel;
