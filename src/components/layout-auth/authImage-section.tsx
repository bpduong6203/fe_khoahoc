import Image from "next/image";

export default function AuthImageSection () {
  return (
    <div className="w-1/2">
      <div className="w-full h-full relative">
        <Image
          src="https://img.upanh.tv/2025/03/12/1353838.png"
          alt="Floral still life"
          layout="fill"
          objectFit="cover"
          priority
          unoptimized
        />
      </div>
    </div>
  );
};

