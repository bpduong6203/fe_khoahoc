import Image from "next/image";

export default function AppLogoIcon(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <Image {...props} src="/logo.png" alt="App Logo" width={100} height={100} />;
}