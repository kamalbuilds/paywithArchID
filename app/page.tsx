"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const [archId, setArchId] = useState("")
  const router = useRouter()

  const handleSubmit = (event: any) => {
    event.preventDefault()
    if (archId) {
      router.push(`/u/${archId}`)
    }
  }
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <img
                src="/paywitharchid.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Seamless Payments with ArchID
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    Discover the power of decentralized payments with ArchID, the Archway network&apos;s user-friendly
                    payment solution.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <form className="flex gap-2" onSubmit={handleSubmit}>
                    <Input
                      type="text"
                      placeholder="Enter an archid"
                      className="max-w-lg flex-1"
                      value={archId}
                      onChange={(e) => setArchId(e.target.value)}
                    />
                    <Button type="submit" className="inline-flex h-10 items-center justify-center rounded-md bg-[#6c5ce7] px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#5b4ed6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-[#6c5ce7] dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300">Get Started</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#6c5ce7] px-3 py-1 text-sm text-gray-50">Key Features</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Revolutionize Your Payments</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  ArchID empowers you to send, receive, and manage payments with ease on the Archway network.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">ArchID Naming Service</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Use your ArchID name to send and receive payments on the Archway network. No more complex wallet
                    addresses to remember.
                  </p>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#6c5ce7] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#5b4ed6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-[#6c5ce7] dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
              <img
                src="/archid.png"
                width="550"
                height="310"
                alt="ArchID Naming Service"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Direct Payments"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Direct Payments</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Send money directly to other ArchID users with just their name. No more complex wallet addresses or
                    lengthy transactions.
                  </p>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#6c5ce7] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#5b4ed6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-[#6c5ce7] dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Payment Requests</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Share payment request URLs with others to easily request payments. No more manual invoicing or
                    complicated payment flows.
                  </p>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#6c5ce7] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#5b4ed6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-[#6c5ce7] dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Payment Requests"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <img
                src="/placeholder.svg"
                width="550"
                height="310"
                alt="Recurring Payments"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Recurring Payments</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Set up recurring payments to other ArchID users for subscriptions, bills, or any other regular
                    transactions. Never miss a payment again.
                  </p>
                </div>
                <Link
                  href="#"
                  className="inline-flex h-9 items-center justify-center rounded-md bg-[#6c5ce7] px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-[#5b4ed6] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6c5ce7] disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-[#6c5ce7] dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  prefetch={false}
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#6c5ce7] px-3 py-1 text-sm text-gray-50">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Affordable Pricing for Everyone</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  ArchID offers flexible pricing options to fit your needs, whether you&apos;re an individual or a business.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-md">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="text-gray-500 dark:text-gray-400">Perfect for individuals and small businesses.</p>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-gray-500 dark:text-gray-400">/ month</span>
                  </div>
                </div>
                <ul className="mt-6 space-y-2 text-gray-500 dark:text-gray-400">
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    ArchID Naming Service
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    Direct Payments
                  </li>
                  <li className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-green-500" />
                    Payment Requests
                  </li>
                  <li className="flex items-center">
                    <XIcon className="mr-2 h-4 w-4 text-red-500" />
                    Recurring Payments
                  </li>
                </ul>
                <Button className="mt-6 w-full">Get Started</Button>
              </div>
              <div className="flex flex-col justify-between rounded-lg border border-[#6c5ce7] bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-md">
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="text-gray-500 dark:text-gray-400">Ideal for businesses and power users.</p>
                  <div className="flex items-baseline justify-center space-x-2">
                    <span className="text-4xl font-bold">$9</span>
                    <span className="text-gray-500 dark:text-gray-400">/ month</span>
                  </div>
                </div>
                <ul className="mt-6 space-y" />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 border-t" id="contact">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Get in Touch</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Have questions or need help? Our team is here to assist you.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Contact Us</Button>
              </form>
              <p className="text-xs text-gray-500 dark:text-gray-400">We&apos;ll get back to you as soon as possible.</p>
            </div>
          </div>
        </section>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; 2024 PaywithArchID. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </footer>
      </main>
    </div>
  )
}


function CheckIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}


function XIcon(props : any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
