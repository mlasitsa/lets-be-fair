import React from "react";


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
      <div className="mb-10 overflow-hidden rounded-lg bg-white shadow-1 duration-300 hover:shadow-3 dark:bg-dark-2 dark:shadow-card dark:hover:shadow-3">
        <div className="p-8 text-center sm:p-9 md:p-7 xl:p-9">
          <h3 className="mb-4 block text-xl font-semibold text-dark dark:text-white sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]">
              {CardTitle}
          </h3>
          <p className="mb-7 text-base leading-relaxed text-body-color dark:text-dark-6">
            {CardDescription}
          </p>
            <ul>
            {CardExamples?.map((card) => {
                
                return (
                
                <li key={card.num}>
                    <p>Input: {card.input}</p>
                    <p>Output: {card.output}</p>
                </li>
                )
            })}
            </ul>

            <ul>
                {CardConstraints?.map((constraint, index) => (
                    <li key={index}>
                        <h3>Contstraints:</h3>
                        <p>
                            {constraint}
                        </p>
                    </li>
                ))}
            </ul>

        </div>
      </div>
      {/*  */}
    </>
  );
}; 

export default CodeCard
