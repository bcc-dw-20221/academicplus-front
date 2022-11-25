import Image from "next/image";
import Link from "next/link";

interface CardItemProps {
  title: string;
  img: string;
  imgDark?: string;
  alt: string;
  rote: string;
}

export default function CardItem({
  title,
  img,
  alt,
  rote = "/"
}: CardItemProps) {
  return (
    <li className="flex justify-center sm:w-fit w-full sm:mb-6 mb-0 group">
      <Link href={rote}>
        <a
          className="sm:w-[240px] w-[95%] sm:h-[240px] h-[104px]
          flex sm:flex-col p-2 sm:p-0 flex-row-reverse sm:flex-auto sm:gap-6 gap-0 sm:justify-center justify-around items-center 

          bg-zinc-white dark:bg-zinc-700
          border dark:border-zinc-600 shadow-md hover:shadow-xl focus:shadow-xl rounded-lg 
        hover:scale-105 focus:scale-105 outline-none focus:outline-zinc-300 dark:focus:outline-zinc-500 transition-all duration-200 group"
        >
          <div className="sm:group-hover:scale-125 group-hover:scale-110  sm:group-focus:scale-125 group-focus:scale-110 transition-all duration-500 delay-75">
            <Image src={img} alt={alt} width="183px" height="96px" />
          </div>
          <h2 className="text-xl text-center font-semibold px-2 transition-all ">
            {title}
          </h2>
        </a>
      </Link>
    </li>
  );
}
