"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const AddNewTaskCard = () => {
  // --- STATE ---

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // --- CALLBACKS ---

  const handleOpenSlidingPane = () => {
    const params = new URLSearchParams(searchParams);
    params.set("pane", "newTask");
    router.replace(`${pathname}?${params.toString()}`);
  };

  // --- RENDER ---

  return (
    <div
      className={`bg-[#F5E8D5] p-4 flex justify-between rounded-xl cursor-pointer hover:scale-105 ease-in-out duration-100`}
      onClick={handleOpenSlidingPane}
    >
      <div className="flex gap-4 items-center">
        <div className="min-w-12 min-h-12 w-12 h-12 bg-in-progress-icon rounded-lg flex justify-center items-center">
          <Image
            alt=""
            src="/icons/Add_round_duotone.svg"
            width={20}
            height={20}
          />
        </div>

        <h2 className="text-xl font-semibold">Add new task</h2>
      </div>
    </div>
  );
};
