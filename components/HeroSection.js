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
    <div className="flex relative overflow-hidden justify-around items-center font-mono px-10 py-10 h-fit gap-15">
      <div className="relative z-12 w-full md:w-1/2 space-y-6 text-center md:text-left px-20">
        {/* Enhanced Heading with Bold Gradient */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 dark:from-purple-400 dark:via-pink-500 dark:to-red-600 leading-tight">
          Stay Ahead in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-green-400 dark:from-pink-400 dark:via-purple-500 dark:to-yellow-400 font-extrabold">
            Tech & Innovation
          </span>
        </h1>

        {/* Typewriter Effect with Bold Gradient */}
        <div className="text-2xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 dark:from-purple-500 dark:via-pink-500 dark:to-orange-400">
          <Typewriter
            options={{
              strings: [
                "Full Stack Development",
                "Machine Learning",
                "Tech Innovations",
                "Cloud Computing",
                "Cybersecurity Trends",
                "Blockchain Technology",
                "DevOps Practices",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>

        {/* Enhanced Paragraph with Bold and Themed Gradients */}
        <p className="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300 opacity-90">
          Explore the latest{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 dark:from-yellow-400 dark:via-orange-500 dark:to-red-500 font-bold">
            blogs
          </span>{" "}
          and{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500 dark:from-green-400 dark:via-teal-500 dark:to-blue-500 font-bold">
            tutorials
          </span>{" "}
          in the world of tech. From{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400 dark:from-indigo-400 dark:via-purple-500 dark:to-pink-500 font-bold">
            Full Stack Development
          </span>{" "}
          to the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-400 dark:from-pink-400 dark:via-purple-500 dark:to-yellow-400 font-bold">
            future of AI
          </span>
          , our expert insights keep you informed and ready for the next big
          thing. Stay updated on the latest in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500 dark:from-blue-400 dark:via-teal-500 dark:to-green-500 font-bold">
            Cloud Computing
          </span>
          ,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500 dark:from-red-400 dark:via-orange-500 dark:to-yellow-500 font-bold">
            Blockchain
          </span>
          , and{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 dark:from-teal-400 dark:via-blue-500 dark:to-green-500 font-bold">
            DevOps Practices
          </span>{" "}
          to elevate your tech journey with us.
        </p>

        {/* Call to Action Button */}
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

      {/* Image Section */}
      <div className="relative z-12 w-full md:w-1/2 justify-center md:block hidden">
        <Image
          src="/coder.png" // Replace with your image path
          alt="Developer Profile"
          width={900}
          height={950}
          className="transition-transform transform hover:scale-110 duration-500"
        />
      </div>
    </div>
  );
}
