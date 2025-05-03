"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Check, MessageSquare, ThumbsUp, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ContentApproval() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isApproved, setIsApproved] = useState(false)

  const handleApprove = () => {
    setIsApproved(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setIsApproved(false)
    }, 1500)
  }

  return (
    <Card className="border-pink-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Content Approval</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4">
          <img
            src="/confident-gaze.png"
            alt="Sophie Laurent"
            className="w-12 h-12 rounded-full object-cover border-2 border-pink-200"
          />
          <div className="flex-1">
            <div className="flex items-center">
              <h3 className="font-medium">@communikay</h3>
              <Badge className="ml-2 bg-pink-100 text-pink-800 hover:bg-pink-200">Pending</Badge>
            </div>
            <p className="text-sm text-gray-500 mt-1">Content ready for your review</p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full mt-3 bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white"
            >
              Review Content
            </Button>
          </div>
        </div>
      </CardContent>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-pink-700">Approve Content</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-3">
              <img
                src="/confident-gaze.png"
                alt="Sophie Laurent"
                className="w-10 h-10 rounded-full object-cover border-2 border-pink-200"
              />
              <div>
                <p className="font-medium">@communikay</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-start">
                <MessageSquare className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                <p className="italic text-gray-700">
                  Hosting a communication workshop at Arcachon Hotel this October! Join us for a transformative
                  experience by the sea. #Communication #ArcachonHotel #ad
                </p>
              </div>
              <div className="mt-4 bg-white rounded-lg overflow-hidden border">
                <img src="/eco-conscious-style.png" alt="Content preview" className="w-full h-64 object-cover" />
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-700 mb-2 font-medium">AI Content Analysis:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-green-600">
                  <Check className="h-4 w-4 mr-2" />
                  <span>Hotel name mentioned correctly</span>
                </li>
                <li className="flex items-center text-green-600">
                  <Check className="h-4 w-4 mr-2" />
                  <span>Proper disclosure of sponsored content (#ad)</span>
                </li>
                <li className="flex items-center text-green-600">
                  <Check className="h-4 w-4 mr-2" />
                  <span>Positive sentiment (score: 0.95)</span>
                </li>
                <li className="flex items-center text-green-600">
                  <Check className="h-4 w-4 mr-2" />
                  <span>On-brand messaging</span>
                </li>
              </ul>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              <X className="h-4 w-4 mr-2" />
              Request Changes
            </Button>
            <Button
              onClick={handleApprove}
              className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white"
              disabled={isApproved}
            >
              {isApproved ? (
                <>
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Approved!
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Approve Content
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
