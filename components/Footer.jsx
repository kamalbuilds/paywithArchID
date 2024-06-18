
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full py-6">
      <div className="container grid max-w-5xl items-center gap-4 px-4 text-center md:gap-8 md:px-6 lg:grid-cols-2 lg:text-left xl:max-w-6xl xl:gap-10">
        <div className="flex flex-col items-center space-y-2 lg:items-start lg:space-y-1">
          <Link href="#" className="font-semibold" prefetch={false}>
            ArchPay
          </Link>
          <p className="text-xs tracking-wider text-gray-500 dark:text-gray-400">
            &copy; 2024 ArchPay. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center space-x-4 lg:justify-end lg:space-x-10">
          <Link href="https://github.com/kamalbuilds/paywithArchID" className="text-sm font-medium" prefetch={false}>
            Github
          </Link>
          <Link href="#" className="text-sm font-medium" prefetch={false}>
            Twitter
          </Link>
          <Link href="#" className="text-sm font-medium" prefetch={false}>
            Linkedin
          </Link>
        </div>
      </div>
    </footer>
  )
}