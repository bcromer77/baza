"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles } from "lucide-react"

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  influencer: any
  onBookingComplete: () => void
}

export default function BookingModal({ isOpen, onClose, influencer, onBookingComplete }: BookingModalProps) {
  const [offerAmount, setOfferAmount] = useState(0)
  const [offerSent, setOfferSent] = useState(false)

  // Set initial offer amount when influencer changes
  useState(() => {
    if (influencer) {
      setOfferAmount(influencer.cost)
    }
  })

  const handleSendOffer = () => {
    setOfferSent(true)
    setTimeout(() => {
      onBookingComplete()
      setOfferSent(false)
    }, 3000)
  }

  if (!influencer) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle className="text-purple-700 flex items-center">
            Book Influencer
            <Sparkles className="ml-2 h-4 w-4 text-purple-500 animate-pulse" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-4">
            <img
              src={influencer?.profilePicture || "/placeholder.svg"}
              alt={influencer?.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-purple-200"
            />
            <div>
              <h3 className="font-medium text-gray-800">{influencer?.handle}</h3>
              <p className="text-sm text-gray-500">{influencer?.location}</p>
            </div>
          </div>

          <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-sm text-gray-500">Suggested Offer</p>
            <p className="text-xl font-medium text-purple-700">€{influencer?.cost}</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-gray-500">Adjust Offer (€):</label>
            <Input
              type="number"
              value={offerAmount}
              onChange={(e) => setOfferAmount(Number(e.target.value))}
              className="border-gray-300"
            />
          </div>

          {offerSent ? (
            <div className="p-4 bg-green-50 rounded-lg space-y-2 animate-pulse border border-green-100">
              <p className="text-green-700">🎉 Offer sent for €{offerAmount}.</p>
              <p className="text-gray-700">
                📩 Notification sent: "Your brand wants to collaborate on a communication event in Arcachon!"
              </p>
              <p className="text-gray-700">💳 Payment processed via Stripe Connect.</p>
              <p className="text-gray-700">⏳ Awaiting response...</p>
            </div>
          ) : null}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-300 text-gray-700 hover:bg-gray-100">
            Cancel
          </Button>
          <Button
            onClick={handleSendOffer}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            disabled={offerSent}
          >
            {offerSent ? "Processing..." : "Send Offer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
