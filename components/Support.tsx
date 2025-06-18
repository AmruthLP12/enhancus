"use client";

import * as React from "react";
import { Heart, Coffee, CreditCard } from "lucide-react";
import QRCode from "react-qr-code";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Support() {
  const upiLink = "upi://pay?pa=amruthlp@axl&pn=Amruth%20L%20P&cu=INR";

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="default"
            size="icon"
            className="rounded-full h-12 w-12 shadow-lg hover:scale-105 transition-transform bg-primary text-primary-foreground"
            aria-label="Support EnhancUS"
          >
            <Heart className="h-6 w-6 animate-pulse" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Heart className="h-6 w-6 text-red-500" />
              Support EnhancUS
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Namaste! Your support keeps EnhancUS free for developers like you.
              Whether it’s a small contribution or just spreading the word,
              every bit helps us grow! 🙏
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">
                  For our Indian friends
                </p>
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a href={upiLink} target="_blank" rel="noopener noreferrer">
                      <CreditCard className="h-4 w-4" />
                      Support via UPI (Tap)
                    </a>
                  </Button>
                  <div className="flex flex-col items-center">
                    <p className="text-sm text-muted-foreground">
                      Or scan UPI QR
                    </p>
                    <div className="bg-white p-2 rounded-md">
                      <QRCode value={upiLink} size={128} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Global options</p>
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a
                      href="https://ko-fi.com/codewithamruth"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Coffee className="h-4 w-4" />
                      Buy me a coffee on Ko-fi
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2"
                    asChild
                  >
                    <a
                      href="https://paypal.me/amruthlp"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <CreditCard className="h-4 w-4" />
                      Donate via PayPal
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
