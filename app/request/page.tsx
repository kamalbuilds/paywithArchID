"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Buffer } from "buffer"

export default function Component() {
  const [name, setName] = useState("")
  const [recipientArchId, setRecipientArchId] = useState("")
  const [senderArchId, setSenderArchId] = useState("")
  const [amount, setAmount] = useState(50)
  const [message, setMessage] = useState("")
  const [paymentUrl, setPaymentUrl] = useState("")

  const handleSubmit = (e : any) => {
    e.preventDefault()

    const paymentData = {
      name,
      recipientArchId,
      senderArchId,
      amount,
      message,
    }

    const encodedData = Buffer.from(JSON.stringify(paymentData)).toString('base64');
    console.log(paymentData, encodedData, "paymentData");
    const decodedData = JSON.parse(Buffer.from(encodedData, 'base64').toString('utf-8'));
    console.log(decodedData,"decodedData");
    const paymentUrl = `${window.location.origin}/archpay/${encodedData}`
    setPaymentUrl(paymentUrl)

  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Create Payment Request</CardTitle>
            <CardDescription>Fill out the form to send a payment request to your recipient.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Recipient Name</Label>
              <Input id="name" placeholder="Enter recipient's name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="recipientArchId">Recipient ArchID</Label>
              <Input id="recipientArchId" type="string" placeholder="Enter recipient's ArchID" value={recipientArchId} onChange={(e) => setRecipientArchId(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="senderArchId">Sender ArchID</Label>
              <Input id="senderArchId" type="string" placeholder="Enter sender's ArchID" value={senderArchId} onChange={(e) => setSenderArchId(e.target.value)} />
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
              <Textarea id="message" placeholder="Add an optional message" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">Create Request</Button>
          </CardFooter>
        </form>
        {paymentUrl && (
          <CardFooter className="mt-4">
            <p>Share this link: <Link href={paymentUrl} />{paymentUrl}</p>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
