import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface EyeTrackingOverlayProps {
  isActive: boolean;
  onDismiss: () => void;
}

export function EyeTrackingOverlay({ isActive, onDismiss }: EyeTrackingOverlayProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-50"
    >
      {/* Corner Markers */}
      <div className="absolute top-4 left-4 w-16 h-16">
        <svg className="w-full h-full text-[#308279]" viewBox="0 0 64 64">
          <motion.path
            d="M 0 16 L 0 0 L 16 0"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
          />
        </svg>
      </div>
      
      <div className="absolute top-4 right-4 w-16 h-16">
        <svg className="w-full h-full text-[#308279]" viewBox="0 0 64 64">
          <motion.path
            d="M 48 0 L 64 0 L 64 16"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
          />
        </svg>
      </div>

      <div className="absolute bottom-4 left-4 w-16 h-16">
        <svg className="w-full h-full text-[#308279]" viewBox="0 0 64 64">
          <motion.path
            d="M 0 48 L 0 64 L 16 64"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
          />
        </svg>
      </div>

      <div className="absolute bottom-4 right-4 w-16 h-16">
        <svg className="w-full h-full text-[#308279]" viewBox="0 0 64 64">
          <motion.path
            d="M 48 64 L 64 64 L 64 48"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
          />
        </svg>
      </div>

      {/* Center Scanning Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="w-48 h-48 rounded-full border-2 border-[#308279]/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 w-48 h-48 rounded-full border-2 border-[#308279]/50"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>

      {/* Grid Lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#308279" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Scanning Line */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#308279] to-transparent"
        animate={{
          top: ["0%", "100%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
}

interface FocusAlertModalProps {
  isOpen: boolean;
  onResume: () => void;
}

export function FocusAlertModal({ isOpen, onResume }: FocusAlertModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onResume}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-4 border-[#308279]">
              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full bg-[#308279]/10 flex items-center justify-center mx-auto mb-6"
              >
                <EyeOff className="w-10 h-10 text-[#308279]" />
              </motion.div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-[#0A1B45] text-center mb-3">
                Kamu Terdeteksi Tidak Fokus!
              </h3>

              {/* Description */}
              <p className="text-[#476074] text-center mb-6">
                Sistem AI kami mendeteksi bahwa kamu tidak sedang melihat layar. Tetap fokus untuk hasil belajar yang maksimal!
              </p>

              {/* Stats */}
              <div className="flex justify-center gap-4 mb-6 p-4 bg-[#F3F8FA] rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0A1B45]">3x</div>
                  <div className="text-xs text-[#476074]">Unfocused</div>
                </div>
                <div className="text-center border-x px-4">
                  <div className="text-2xl font-bold text-[#308279]">85%</div>
                  <div className="text-xs text-[#476074]">Focus Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#0A1B45]">24m</div>
                  <div className="text-xs text-[#476074]">Watch Time</div>
                </div>
              </div>

              {/* Button */}
              <Button
                onClick={onResume}
                className="w-full bg-[#308279] hover:bg-[#308279]/90 text-white h-12 text-lg"
              >
                <Eye className="mr-2 w-5 h-5" />
                Saya Kembali Fokus
              </Button>

              {/* Tip */}
              <div className="mt-4 flex items-start gap-2 p-3 bg-[#308279]/5 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-[#308279] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#476074]">
                  <strong>Tips:</strong> Pastikan wajah kamu terlihat jelas di webcam dan hindari gangguan di sekitar kamu.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface WebcamPreviewProps {
  isActive: boolean;
}

export function WebcamPreview({ isActive }: WebcamPreviewProps) {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed bottom-6 right-6 z-40 pointer-events-none"
    >
      <div className="relative">
        {/* Webcam Preview Circle */}
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#308279] bg-[#0A1B45] relative shadow-lg">
          {/* Simulated webcam feed */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#308279]/20 to-[#0A1B45]/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Eye className="w-12 h-12 text-[#308279]/50" />
          </div>
          
          {/* Scanning animation */}
          <motion.div
            className="absolute inset-0"
            animate={{
              background: [
                "radial-gradient(circle at 50% 50%, rgba(48, 130, 121, 0.3) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 50%, rgba(48, 130, 121, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Status Badge */}
        <Badge className="absolute -top-2 -right-2 bg-[#308279] text-white border-2 border-white shadow-lg">
          <motion.div
            className="w-2 h-2 rounded-full bg-white mr-1.5"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Tracking
        </Badge>

        {/* Focus Score */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-lg border-2 border-[#308279]">
          <div className="text-xs font-bold text-[#308279]">92% Fokus</div>
        </div>
      </div>
    </motion.div>
  );
}
