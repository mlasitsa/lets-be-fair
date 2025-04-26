import React from "react";
import List from "./ui/list";
import UnorderedList from "./ui/unorderedList";


type ExamplesInfo = {
    num: number,
    input: string,
    output: string,
}

type CardInfo = {
    CardTitle: string,
    CardDescription: string,
    CardExamples: ExamplesInfo[],
    CardConstraints: string[]
}

const CodeCard = ({
    CardTitle,
    CardDescription,
    CardExamples,
    CardConstraints

}: CardInfo) => {
  return (
    <>
      {/*  */}
      <div className="w-80 max-w-full mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <div className="flex flex-col p-8 text-left gap-5 sm:p-9 md:p-7 xl:p-9">
          <h3 className="mb-4 block text-xl font-semibold text-dark dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
              {CardTitle}
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {CardDescription}
          </p>
            <ul className="flex flex-col gap-2">
            <p className="font-bold">Examples:</p>
            {CardExamples?.map((card) => {
                
                return (
                
                <li key={card.num}>
                    <p>
                      <span className="font-bold">Input:</span> {card.input}
                    </p>
                    <p>
                      <span className="font-bold">Output:</span> {card.output}
                    </p>
                </li>
                )
            })}
            </ul>

            <UnorderedList 
                description="Constraints"
                constraints={CardConstraints}
            />

        </div>
      </div>
      {/*  */}
    </>
  );
}; 

export default CodeCard
