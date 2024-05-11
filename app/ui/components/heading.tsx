import Image from "next/image";

type HeadingProps = { title: string };

export const Heading = ({ title }: HeadingProps) => {
  // --- RENDER ---

  return (
    <header className="flex gap-3 items-start">
      <Image
        alt="Task Board Logo"
        src="/icons/Logo.svg"
        width={40}
        height={40}
      />

      <div className="flex gap-6 flex-col -mt-2">
        <h1 className="text-4xl">{title}</h1>

        <p>Tasks to keep organised</p>
      </div>

      <Image
        alt="Edit icon"
        src="/icons/Edit_duotone.svg"
        width={24}
        height={24}
      />
    </header>
  );
};
