"use client"

import Link from "next/link"

export default function Navbar() {

  return (
    <div className="bg-gray-900 border-b border-gray-700">

      <div className="max-w-6xl mx-auto flex items-center justify-between p-4 text-white">

        {/* App Title */}
        <h1 className="text-xl font-bold">
          NeoConnect
        </h1>

        {/* Navigation */}
        <div className="flex gap-6 items-center">

          <Link href="/" className="hover:text-blue-400">
            Dashboard
          </Link>

          <Link href="/submit" className="hover:text-blue-400">
            Submit Complaint
          </Link>

          <Link href="/secretariat" className="hover:text-blue-400">
            Secretariat Inbox
          </Link>

          <Link href="/my-cases" className="hover:text-blue-400">
            My Cases
          </Link>

          <Link href="/polls" className="hover:text-blue-400">
            Polls
          </Link>

          <Link href="/create-poll" className="hover:text-blue-400">
            Create Poll
          </Link>
          <Link href="/public-hub" className="hover:text-blue-400">
           Public Hub
          </Link>
          <Link href="/track" className="hover:text-blue-400">
           Track Complaint
          </Link>

        </div>

      </div>

    </div>
  )
}