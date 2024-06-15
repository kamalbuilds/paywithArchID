"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Component() {
  const [amount, setAmount] = useState(50)
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Send Payment Request</CardTitle>
          <CardDescription>Fill out the form to send a payment request to your recipient.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Recipient Name</Label>
            <Input id="name" placeholder="Enter recipient's name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reciepient">Recipient ArchID</Label>
            <Input id="string" type="string" placeholder="Enter recipients archid" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Payment Amount</Label>
            <div className="flex items-center gap-4">
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
              <Slider
                defaultValue={[50]}
                max={1000}
                step={1}
                value={[amount]}
                onValueChange={(value) => setAmount(value[0])}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message (optional)</Label>
            <Textarea id="message" placeholder="Add an optional message" />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto">
            Send Request
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
