"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function BetPage() {
  const [betAmount, setBetAmount] = useState("");
  const [friendEmail, setFriendEmail] = useState("");
  const [friendName, setFriendName] = useState("");
  const [deadline, setDeadline] = useState("");
  const [goal, setGoal] = useState("");
  const [betSubmitted, setBetSubmitted] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleSubmitBet = () => {
    // Track the bet form submission attempt
    posthog.capture("bet_form_submitted", {
      bet_amount: Number(betAmount),
      has_friend_email: Boolean(friendEmail),
      has_friend_name: Boolean(friendName),
      goal_length: goal.length,
      deadline: deadline,
    });
    setShowComingSoon(true);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 sm:gap-3">
              <Image
                src="/jit icon.png"
                alt="Jitterliss Icon"
                width={32}
                height={32}
                priority
                className="object-contain w-8 h-8 sm:w-10 sm:h-10 brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              />
              <Image
                src="/JITTERLISS.png"
                alt="Jitterliss Logo"
                width={120}
                height={32}
                priority
                className="object-contain w-[100px] h-auto sm:w-[120px] md:w-[150px] brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
              />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4 sm:px-6 md:px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#37352F] mb-4">
            Make a Bet
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            Put some skin in the game. Pick a friend, set a deadline, and commit to your goal. If you fail, you pay.
          </p>

          {!betSubmitted ? (
            <div className="bg-gray-50 rounded-lg p-6 space-y-6">
              {/* Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What&apos;s your goal? 🎯
                </label>
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  placeholder="e.g., Quit caffeine completely, Reduce to 50mg/day..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Deadline 📅
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  min={getMinDate()}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  When do you want to achieve this by?
                </p>
              </div>

              {/* Bet Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How much do you want to bet? 💰
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={betAmount}
                    onChange={(e) => setBetAmount(e.target.value)}
                    placeholder="50"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  The average person bets $50-$100. Higher stakes = more motivation!
                </p>
              </div>

              {/* Friend's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Friend&apos;s Name (Your Accountability Partner) 👤
                </label>
                <input
                  type="text"
                  value={friendName}
                  onChange={(e) => setFriendName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
                />
              </div>

              {/* Friend's Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Friend&apos;s Email 📧
                </label>
                <input
                  type="email"
                  value={friendEmail}
                  onChange={(e) => setFriendEmail(e.target.value)}
                  placeholder="friend@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F67E62] text-gray-900"
                />
                <p className="text-xs text-gray-500 mt-1">
                  They&apos;ll receive an email on {deadline ? formatDate(deadline) : "your deadline"} to verify if you completed the challenge.
                </p>
              </div>

              {/* How it works */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">How it works:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• You commit to ${betAmount || "X"} for your goal</li>
                  <li>• On {deadline ? formatDate(deadline) : "your deadline"}, {friendName || "your friend"} receives an email</li>
                  <li>• They verify whether you succeeded or not</li>
                  <li>• If you completed it, congratulations! No charge.</li>
                  <li>• If you didn&apos;t, the money goes to {friendName || "them"}</li>
                </ul>
              </div>

              <button
                onClick={handleSubmitBet}
                disabled={!betAmount || !friendEmail || !friendName || !deadline || !goal}
                className="w-full py-4 bg-[#F67E62] text-white font-semibold rounded-lg hover:bg-[#e56d4f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                Lock In My Commitment 🔒
              </button>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckIcon className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-[#37352F] mb-2">You&apos;re Locked In!</h3>
              <p className="text-gray-600 mb-6">
                Your ${betAmount} commitment is set. {friendName} will be notified on {formatDate(deadline)}.
              </p>

              <div className="bg-white rounded-lg border border-gray-200 p-6 text-left mb-6">
                <h4 className="font-semibold text-[#37352F] mb-4">Your Commitment:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>🎯 Goal: <strong>{goal}</strong></li>
                  <li>📅 Deadline: <strong>{formatDate(deadline)}</strong></li>
                  <li>💰 Amount: <strong>${betAmount}</strong></li>
                  <li>👤 Accountability Partner: <strong>{friendName}</strong></li>
                </ul>
              </div>

              <Link
                href="/"
                className="inline-block w-full py-3 bg-[#37352F] text-white font-medium rounded-lg hover:bg-[#2a2925] transition-colors text-center"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      </main>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center p-4"
          onClick={() => setShowComingSoon(false)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-md w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-5xl mb-4">🚧</div>
            <h3 className="text-2xl font-bold text-[#37352F] mb-3">Coming Soon!</h3>
            <p className="text-gray-600 mb-6">
              We&apos;re still building this feature. Check back soon to lock in your caffeine commitment bet!
            </p>
            <button
              onClick={() => setShowComingSoon(false)}
              className="w-full py-3 bg-[#F67E62] text-white font-semibold rounded-lg hover:bg-[#e56d4f] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
