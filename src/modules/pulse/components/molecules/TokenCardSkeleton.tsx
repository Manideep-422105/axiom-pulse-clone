import React from "react";

export default function TokenCardSkeleton() {
  return (
    <div className="flex flex-row w-full h-[122px] gap-[12px] px-[12px] pt-[12px] pb-[12px] border-b border-primaryStroke bg-background animate-pulse">
      
      {/* --- Left Column (Image) --- */}
      <div className="flex flex-col items-center gap-[4px] flex-shrink-0">
        {/* Image Placeholder */}
        <div className="w-[74px] h-[74px] flex justify-center items-center">
          <div className="w-[68px] h-[68px] bg-secondaryStroke/40 rounded-[4px]"></div>
        </div>
        {/* Address Pill Placeholder */}
        <div className="w-[50px] h-[14px] bg-secondaryStroke/40 rounded-[2px]"></div>
      </div>

      {/* --- Right Column (Content) --- */}
      <div className="flex flex-col flex-1 min-w-0 gap-[8px]">
        
        {/* Header Row */}
        <div className="flex flex-row justify-between items-end h-[18px]">
          <div className="flex gap-2 w-full">
            <div className="w-[80px] h-[16px] bg-secondaryStroke/40 rounded-[2px]"></div>
            <div className="w-[60px] h-[14px] bg-secondaryStroke/30 rounded-[2px]"></div>
          </div>
          <div className="flex gap-2">
             <div className="w-[50px] h-[14px] bg-secondaryStroke/30 rounded-[2px]"></div>
             <div className="w-[50px] h-[14px] bg-secondaryStroke/30 rounded-[2px]"></div>
          </div>
        </div>

        {/* Middle Row (Stats) */}
        <div className="flex flex-row w-full h-[18px] items-center gap-[12px]">
           <div className="w-[30px] h-[14px] bg-secondaryStroke/40 rounded-[2px]"></div>
           <div className="w-[80px] h-[14px] bg-secondaryStroke/30 rounded-[2px]"></div>
           
           <div className="hidden xl:flex gap-2 ml-auto">
              <div className="w-[40px] h-[14px] bg-secondaryStroke/30 rounded-[2px]"></div>
              <div className="w-[40px] h-[14px] bg-secondaryStroke/30 rounded-[2px]"></div>
           </div>
        </div>

        {/* Bottom Row (Badges) */}
        <div className="flex flex-row gap-[4px] mt-auto">
           <div className="w-[60px] h-[24px] bg-secondaryStroke/40 rounded-full border border-secondaryStroke/50"></div>
           <div className="w-[70px] h-[24px] bg-secondaryStroke/40 rounded-full border border-secondaryStroke/50"></div>
           <div className="w-[50px] h-[24px] bg-secondaryStroke/40 rounded-full border border-secondaryStroke/50"></div>
        </div>

      </div>
    </div>
  );
}