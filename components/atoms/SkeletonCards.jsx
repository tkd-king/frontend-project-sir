import React from "react";
import { Card, Skeleton } from "@nextui-org/react";

const cardData = [
  { id: 1, width1: "w-3/5", width2: "w-4/5", width3: "w-2/5" },
  { id: 2, width1: "w-2/5", width2: "w-3/5", width3: "w-4/5" },
  { id: 3, width1: "w-4/5", width2: "w-2/5", width3: "w-3/5" },
  { id: 4, width1: "w-4/5", width2: "w-2/5", width3: "w-3/5" },
  { id: 5, width1: "w-4/5", width2: "w-2/5", width3: "w-3/5" },
  { id: 6, width1: "w-4/5", width2: "w-2/5", width3: "w-3/5" },
  { id: 7, width1: "w-4/5", width2: "w-2/5", width3: "w-3/5" },
  { id: 8, width1: "w-4/5", width2: "w-2/5", width3: "w-3/5" },
  // Aap jitnay chahein, data add kar sakte hain
];

export default function SkeletonCards() {
  return (
    <div className="flex flex-wrap space-x-4 space-y-4 p-4">
      {cardData.map((card) => (
        <Card key={card.id} className="w-[200px] h-[250px] space-y-5 p-4 m-2" radius="lg">
          <Skeleton className="rounded-lg">
            <div className="h-24 rounded-lg bg-default-300"></div>
          </Skeleton>
          <div className="space-y-3">
            <Skeleton className={`${card.width1} rounded-lg`}>
              <div className={`h-3 ${card.width1} rounded-lg bg-default-200`}></div>
            </Skeleton>
            <Skeleton className={`${card.width2} rounded-lg`}>
              <div className={`h-3 ${card.width2} rounded-lg bg-default-200`}></div>
            </Skeleton>
            <Skeleton className={`${card.width3} rounded-lg`}>
              <div className={`h-3 ${card.width3} rounded-lg bg-default-300`}></div>
            </Skeleton>
          </div>
        </Card>
      ))}
    </div>
  );
}
