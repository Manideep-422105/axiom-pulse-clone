import React, { memo } from "react";
import { RiCloseLine, RiNotificationOffLine } from "react-icons/ri";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationsModal = memo<NotificationsModalProps>(
  ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <>
        {/* 1. FIXED BACKDROP: Blurs the rest of the screen */}
        <div
          className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={onClose}
        />

        {/* 2. MODAL CONTENT: Positioned relatively to parent */}
        <div className="absolute top-[40px] right-[-80px] sm:right-0 z-[9999]">
          <div className="flex flex-col w-[300px] h-[396px] bg-[#121316] border-[1px] border-secondaryStroke rounded-[4px] shadow-xl origin-top-right animate-in fade-in zoom-in-95 duration-100">
            {/* --- Header --- */}
            <div className="border-b-secondaryStroke border-b-[1px] flex flex-row justify-start items-center pl-[16px] pr-[12px] w-full h-[44px]">
              <span className="flex-1 text-textPrimary text-[14px] leading-[20px] tracking-[-0.02em] font-medium">
                Notifications
              </span>

              {/* Clear All Button */}
              <button className="group flex flex-row p-[6px] h-[24px] mr-2 justify-center items-center hover:bg-primaryStroke/60 duration-150 ease-in-out cursor-pointer rounded-[4px]">
                <span className="text-textTertiary group-hover:text-textPrimary transition-colors duration-150 ease-in-out text-[12px] font-medium">
                  Clear All
                </span>
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="group flex flex-row p-[4px] w-[22px] h-[22px] justify-center items-center hover:bg-primaryStroke/60 duration-150 ease-in-out cursor-pointer rounded-[4px]"
              >
                <RiCloseLine className="text-[18px] text-textTertiary group-hover:text-textPrimary" />
              </button>
            </div>

            {/* --- Content --- */}
            <div className="flex flex-col flex-1 w-full h-[352px] overflow-y-auto items-center justify-center">
              {/* Empty State */}
              <div className="flex flex-col items-center gap-2 text-textTertiary opacity-60">
                <RiNotificationOffLine className="text-[32px]" />
                <span className="text-[12px] font-medium">
                  No new notifications
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);

NotificationsModal.displayName = "NotificationsModal";

export default NotificationsModal;
