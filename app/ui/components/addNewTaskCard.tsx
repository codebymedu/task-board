import Image from "next/image";

export const AddNewTaskCard = () => {
  // --- RENDER ---

  return (
    <div className={`bg-[#F5E8D5] p-4 flex justify-between rounded-xl`}>
      <div className="flex gap-4 items-center">
        <div className="min-w-12 min-h-12 w-12 h-12 bg-in-progress-icon-bg rounded-lg flex justify-center items-center">
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
