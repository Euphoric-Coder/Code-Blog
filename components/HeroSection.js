import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

const Typewriter = dynamic(() => import("typewriter-effect"), { ssr: false });

export default function HeroSection() {
  const { theme } = useTheme();

  const buttonGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 hover:from-purple-700 hover:via-pink-600 hover:to-red-600"
      : "bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 hover:from-blue-500 hover:via-teal-500 hover:to-green-500";

  return (
    <section className="flex relative overflow-hidden justify-around items-center font-mono px-10 py-10 h-fit gap-15">
      <div className="relative z-12 w-full md:w-1/2 space-y-6 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          Elevate Your{" "}
          <span className="text-blue-600 dark:text-blue-400">Expertise</span>
        </h1>
        <div className="text-2xl md:text-4xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 dark:from-purple-400 dark:to-pink-400">
          <Typewriter
            options={{
              strings: [
                "Full Stack Development",
                "Machine Learning",
                "Tech Innovation",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
          I'm a passionate developer specializing in crafting efficient and
          scalable solutions, focused on the MERN stack with a deep interest in
          AI/ML and cloud computing.
        </p>
        <div className="mt-6">
          <Link href="/blog" passHref>
            <Button
              variant="default"
              className={`px-6 py-3 md:px-10 md:py-4 text-lg font-bold text-white rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-transform duration-300 ${buttonGradient}`}
            >
              Explore Blogs
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative z-12 w-full md:w-1/2 justify-center md:block hidden">
        <Image
          src="/coder.webp" // Replace with your image path
          alt="Developer Profile"
          width={650}
          height={650}
          className="rounded-full drop-shadow-2xl transition-transform transform hover:scale-110 duration-500"
        />
      </div>
    </section>
  );
}
