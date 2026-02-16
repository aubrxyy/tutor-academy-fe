import { useState } from "react";
import { CheckCircle, CreditCard, Wallet, Building2, Download } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { motion, AnimatePresence } from "motion/react";

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    title: string;
    price: string;
    type: string;
  } | null;
}

export default function PaymentCheckoutModal({ isOpen, onClose, product }: PaymentCheckoutModalProps) {
  const [step, setStep] = useState<"payment" | "success">("payment");
  const [selectedMethod, setSelectedMethod] = useState("gopay");

  const paymentMethods = [
    { id: "gopay", name: "GoPay", icon: Wallet, description: "E-wallet instant payment" },
    { id: "ovo", name: "OVO", icon: Wallet, description: "E-wallet instant payment" },
    { id: "shopee", name: "ShopeePay", icon: Wallet, description: "E-wallet instant payment" },
    { id: "bca", name: "BCA Virtual Account", icon: Building2, description: "Bank transfer" },
    { id: "card", name: "Credit Card", icon: CreditCard, description: "Visa, Mastercard, JCB" },
  ];

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setStep("success");
    }, 1500);
  };

  const handleClose = () => {
    setStep("payment");
    setSelectedMethod("gopay");
    onClose();
  };

  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "payment" ? (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl text-[#0A1B45]">Pilih Metode Pembayaran</DialogTitle>
                <DialogDescription className="text-sm text-[#476074]">
                  Pilih metode pembayaran yang paling sesuai dengan kamu.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 pt-6">
                {/* Order Summary */}
                <div className="p-6 bg-[#F3F8FA] rounded-lg">
                  <h3 className="font-bold text-[#0A1B45] mb-4">Order Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-[#0A1B45]">{product.title}</p>
                        <Badge variant="outline" className="mt-1 text-xs">{product.type}</Badge>
                      </div>
                      <p className="font-bold text-[#308279]">{product.price}</p>
                    </div>
                    <div className="pt-3 border-t flex justify-between items-center">
                      <p className="font-bold text-[#0A1B45]">Total</p>
                      <p className="text-2xl font-bold text-[#308279]">{product.price}</p>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div>
                  <h3 className="font-bold text-[#0A1B45] mb-4">Metode Pembayaran</h3>
                  <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={`relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            selectedMethod === method.id
                              ? "border-[#308279] bg-[#308279]/5"
                              : "border-[#92B7B0]/30 hover:border-[#308279]/50"
                          }`}
                          onClick={() => setSelectedMethod(method.id)}
                        >
                          <RadioGroupItem value={method.id} id={method.id} className="mr-4" />
                          <div className="flex items-center gap-4 flex-1">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                              selectedMethod === method.id
                                ? "bg-[#308279] text-white"
                                : "bg-[#F3F8FA] text-[#476074]"
                            }`}>
                              <method.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <Label htmlFor={method.id} className="font-medium text-[#0A1B45] cursor-pointer">
                                {method.name}
                              </Label>
                              <p className="text-sm text-[#476074]">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-[#92B7B0]/30"
                    onClick={handleClose}
                  >
                    Batal
                  </Button>
                  <Button
                    className="flex-1 bg-[#308279] hover:bg-[#308279]/90 text-white"
                    onClick={handlePayment}
                  >
                    Bayar Sekarang
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-8"
            >
              {/* Success Animation */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 rounded-full bg-[#308279]/10 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-16 h-16 text-[#308279]" />
              </motion.div>

              <h2 className="text-3xl font-bold text-[#0A1B45] mb-3">
                Pembayaran Berhasil!
              </h2>
              <p className="text-[#476074] mb-8 max-w-md mx-auto">
                Terima kasih atas pembelian kamu. Materi sudah bisa kamu akses dan download sekarang.
              </p>

              {/* Product Info */}
              <div className="p-6 bg-[#F3F8FA] rounded-lg mb-6 max-w-md mx-auto">
                <p className="text-sm text-[#476074] mb-2">Kamu telah membeli:</p>
                <p className="font-bold text-[#0A1B45] mb-1">{product.title}</p>
                <Badge variant="outline" className="text-xs">{product.type}</Badge>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Button
                  className="flex-1 bg-[#308279] hover:bg-[#308279]/90 text-white"
                  onClick={handleClose}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Materi
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-[#308279] text-[#308279]"
                  onClick={handleClose}
                >
                  Kembali ke Marketplace
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}