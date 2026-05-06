"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Camera, Download, Printer, BookOpen, User, CheckCircle2, XCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { cn } from "@/lib/utils";

type ScanMode = "borrow" | "return" | "verify";

export default function QRScannerPage() {
  const [scanMode, setScanMode] = useState<ScanMode>("borrow");
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [showGenerator, setShowGenerator] = useState(false);
  const [qrValue, setQrValue] = useState("BOOK-001-PERPUSDIGITAL");

  // Simulate a scan
  const simulateScan = () => {
    setScannedResult("BOOK-001-PERPUSDIGITAL");
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[20px] font-bold text-white font-display">QR Scanner</h2>
        <p className="text-[13px] text-[#6B6780] mt-0.5">Scan QR codes to borrow, return, or verify books</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Scanner Panel */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-5 space-y-5">
          {/* Mode Tabs */}
          <div className="flex gap-1 bg-[#0B0A10] rounded-lg p-1 border border-white/[0.06]">
            {(["borrow", "return", "verify"] as ScanMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => { setScanMode(mode); setScannedResult(null); }}
                className={cn(
                  "flex-1 py-2 rounded-md text-[13px] font-medium transition-colors capitalize",
                  scanMode === mode ? "bg-[#7C3AED]/15 text-[#A78BFA]" : "text-[#6B6780] hover:text-white"
                )}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Camera View Placeholder */}
          <div className="aspect-square max-h-[350px] rounded-xl bg-[#0B0A10] border border-white/[0.06] flex flex-col items-center justify-center relative overflow-hidden">
            <div className="absolute inset-4 border-2 border-dashed border-[#7C3AED]/30 rounded-xl" />
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-[#7C3AED] rounded-tl-lg" />
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[#7C3AED] rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[#7C3AED] rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-[#7C3AED] rounded-br-lg" />
            
            <Camera className="w-12 h-12 text-[#6B6780] mb-3" />
            <p className="text-[14px] text-[#9B97A8] mb-1">Camera Access Required</p>
            <p className="text-[12px] text-[#6B6780]">Position QR code within the frame</p>
          </div>

          <div className="flex gap-3">
            <button onClick={simulateScan} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <QrCode className="w-4 h-4" />
              Simulate Scan
            </button>
            <button onClick={() => setShowGenerator(!showGenerator)} className="btn-secondary flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              Generator
            </button>
          </div>
        </motion.div>

        {/* Result / Generator Panel */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-5">
          {/* Scan Result */}
          {scannedResult && (
            <div className="glass-card p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#34D399]/15 text-[#34D399] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-white">QR Code Scanned</h3>
                  <p className="text-[12px] text-[#6B6780]">Code: {scannedResult}</p>
                </div>
              </div>
              
              <div className="p-4 rounded-xl bg-[#0B0A10] border border-white/[0.06] space-y-3">
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-[#A78BFA]" />
                  <div>
                    <p className="text-[14px] font-medium text-white">Laskar Pelangi</p>
                    <p className="text-[12px] text-[#6B6780]">Andrea Hirata · ISBN: 978-979-1227-00-2</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="badge badge-success">3 Available</span>
                  <span className="badge badge-primary">Fiction</span>
                </div>
              </div>

              {scanMode === "borrow" && (
                <div className="p-4 rounded-xl bg-[#0B0A10] border border-white/[0.06] space-y-3">
                  <p className="text-[12px] text-[#6B6780] uppercase tracking-wider font-semibold">Borrow For</p>
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-[#38BDF8]" />
                    <div>
                      <p className="text-[14px] font-medium text-white">Rina Kartika</p>
                      <p className="text-[12px] text-[#6B6780]">XII IPA 1 · Member</p>
                    </div>
                  </div>
                  <button className="btn-primary w-full flex items-center justify-center gap-2 mt-2">
                    <CheckCircle2 className="w-4 h-4" />
                    Confirm Borrow
                  </button>
                </div>
              )}

              {scanMode === "return" && (
                <button className="btn-primary w-full flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Confirm Return
                </button>
              )}
            </div>
          )}

          {/* QR Generator */}
          {showGenerator && (
            <div className="glass-card p-5 space-y-4">
              <h3 className="text-[15px] font-semibold text-white">QR Code Generator</h3>
              <input
                type="text"
                className="input-field"
                value={qrValue}
                onChange={(e) => setQrValue(e.target.value)}
                placeholder="Enter value for QR code"
              />
              <div className="flex justify-center py-4">
                <div className="p-4 bg-white rounded-xl">
                  <QRCodeSVG value={qrValue} size={180} level="H" />
                </div>
              </div>
              <div className="flex gap-3">
                <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download PNG
                </button>
                <button className="btn-secondary flex-1 flex items-center justify-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print
                </button>
              </div>
            </div>
          )}

          {/* Quick Scan History */}
          <div className="glass-card p-5">
            <h3 className="text-[15px] font-semibold text-white mb-4">Recent Scans</h3>
            <div className="space-y-3">
              {[
                { code: "BOOK-001", book: "Laskar Pelangi", action: "Borrow", time: "2 min ago", color: "#34D399" },
                { code: "BOOK-003", book: "Fisika Dasar", action: "Return", time: "1 hour ago", color: "#38BDF8" },
                { code: "MBR-004", book: "Rina Kartika", action: "Verify", time: "3 hours ago", color: "#A78BFA" },
              ].map((scan, i) => (
                <div key={i} className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: scan.color + "15", color: scan.color }}>
                    <QrCode className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-white">{scan.book}</p>
                    <p className="text-[11px] text-[#6B6780]">{scan.code} · {scan.action}</p>
                  </div>
                  <span className="text-[11px] text-[#6B6780]">{scan.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
