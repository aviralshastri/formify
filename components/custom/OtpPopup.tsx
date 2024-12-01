import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface OtpPopupProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => void
  onResend: () => void
  type: 'email' | 'phone'
}

export function OtpPopup({ isOpen, onClose, onVerify, onResend, type }: OtpPopupProps) {
  const [otp, setOtp] = useState('')
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleVerify = () => {
    onVerify(otp)
    setOtp('')
  }

  const handleResend = () => {
    onResend()
    setCountdown(30)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>Please enter the OTP sent to your {type}.</p>
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <div className="flex justify-between">
            <Button onClick={handleVerify}>Verify</Button>
            <Button 
              variant="outline" 
              onClick={handleResend} 
              disabled={countdown > 0}
            >
              {countdown > 0 ? `Resend OTP (${countdown}s)` : 'Resend OTP'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

