import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ShieldCheck, CreditCard, Landmark, CheckCircle2, Download, Receipt, Printer, AlertTriangle } from 'lucide-react';

export default function PurchaseCheckout({ isOpen, onClose, property }) {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1); // 1 = customer details, 2 = payment, 3 = success receipt
  
  // Form states
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [paymentType, setPaymentType] = useState('booking'); // 'booking' (₹50K) or 'outright' (full price)
  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCVC] = useState('');
  const [upiId, setUpiId] = useState('');
  const [payMethod, setPayMethod] = useState('card'); // 'card' or 'upi' or 'netbanking'
  
  // Generated success states
  const [receiptData, setReceiptData] = useState(null);
  const [isPaying, setIsPaying] = useState(false);

  if (!isOpen) return null;

  const getAmountToPay = () => {
    return paymentType === 'booking' ? 50000 : property.price;
  };

  const getAmountToPayStr = () => {
    return paymentType === 'booking' ? '₹50,000' : property.priceStr;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!customerName || !customerPhone || !customerEmail || !panNumber) {
        alert('Please fill out all mandatory customer and legal fields.');
        return;
      }
      setStep(2);
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsPaying(true);

    // Simulate payment transaction
    setTimeout(() => {
      const txId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const bookingNo = 'HEB-' + Math.floor(100000 + Math.random() * 900000);
      const today = new Date();
      
      const newReceipt = {
        bookingNumber: bookingNo,
        transactionId: txId,
        date: today.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }),
        time: today.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }),
        propertyName: property.name,
        propertyId: property.id,
        propertyLocation: property.location,
        propertyType: property.type,
        associatedWith: property.associatedWith,
        priceStr: property.priceStr,
        buyerName: customerName,
        buyerPhone: customerPhone,
        buyerEmail: customerEmail,
        buyerPan: panNumber.toUpperCase(),
        buyerAadhaar: aadhaarNumber || 'Not Provided',
        amountPaid: getAmountToPay(),
        amountPaidStr: getAmountToPayStr(),
        paymentType: paymentType === 'booking' ? 'Secured Reservation Escrow Deposit' : 'Outright Property Purchase Settlement',
        paymentMethod: payMethod.toUpperCase()
      };

      setReceiptData(newReceipt);
      
      // Save purchase into localStorage so it is available globally in Dashboard
      const currentBookings = JSON.parse(localStorage.getItem('hubli_estate_bookings') || '[]');
      currentBookings.push(newReceipt);
      localStorage.setItem('hubli_estate_bookings', JSON.stringify(currentBookings));

      setIsPaying(false);
      setStep(3);
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn text-left">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header toolbar */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <Landmark className="h-5 w-5 text-emerald-600" />
            <h2 className="font-extrabold text-slate-800 text-base">
              {step === 3 ? 'Transaction Completed' : 'Purchase / Book Property'}
            </h2>
          </div>
          <button 
            onClick={() => {
              // reset states and close
              setStep(1);
              setCustomerName('');
              setCustomerPhone('');
              setCustomerEmail('');
              setPanNumber('');
              setAadhaarNumber('');
              setCardHolder('');
              setCardNumber('');
              setCardExpiry('');
              setCardCVC('');
              setUpiId('');
              onClose();
            }}
            className="p-1.5 hover:bg-slate-200 rounded-full text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-grow space-y-6">
          
          {/* Progress Indicators */}
          {step < 3 && (
            <div className="flex items-center justify-center gap-3 border-b border-slate-100 pb-5 text-xs font-bold text-slate-500 shrink-0">
              <span className={`px-3 py-1 rounded-full ${step === 1 ? 'bg-emerald-600 text-white' : 'bg-emerald-50 text-emerald-800'}`}>1. Buyer Info</span>
              <span className="text-slate-300">➔</span>
              <span className={`px-3 py-1 rounded-full ${step === 2 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'}`}>2. Escrow Payment</span>
            </div>
          )}

          {/* Core steps rendering */}
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              
              {/* Property summary banner */}
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex justify-between items-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider bg-white/60 border border-emerald-200/50 px-2 py-0.5 rounded">
                    {property.type}
                  </span>
                  <h4 className="font-extrabold text-slate-800 text-sm mt-1">{property.name}</h4>
                  <p className="text-slate-500 text-xs">{property.location}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block">Quote Price</span>
                  <p className="text-emerald-700 font-extrabold text-sm">{property.priceStr}</p>
                </div>
              </div>

              {/* Purchase type choice */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Purchase Strategy</label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => setPaymentType('booking')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentType === 'booking' 
                        ? 'border-emerald-600 bg-emerald-50/10' 
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentType" 
                      checked={paymentType === 'booking'}
                      onChange={() => setPaymentType('booking')}
                      className="accent-emerald-600 cursor-pointer"
                    />
                    <label className="font-extrabold text-slate-800 text-xs block mt-1.5 cursor-pointer">Escrow Booking Reservation</label>
                    <p className="text-[10px] text-slate-500 mt-1">Pay <span className="font-bold text-slate-800 font-mono">₹50,000</span> secure deposit to lock this layout and schedule developer title clearance review.</p>
                  </div>

                  <div 
                    onClick={() => setPaymentType('outright')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentType === 'outright' 
                        ? 'border-emerald-600 bg-emerald-50/10' 
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <input 
                      type="radio" 
                      name="paymentType" 
                      checked={paymentType === 'outright'}
                      onChange={() => setPaymentType('outright')}
                      className="accent-emerald-600 cursor-pointer"
                    />
                    <label className="font-extrabold text-slate-800 text-xs block mt-1.5 cursor-pointer">Outright Property Purchase</label>
                    <p className="text-[10px] text-slate-500 mt-1">Initialize direct legal title ownership transfer in full settlement for <span className="font-bold text-slate-800 font-mono">{property.priceStr}</span>.</p>
                  </div>
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Manjunath Kalburgi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +91 99450 24417"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="e.g. buyer@gmail.com"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">PAN Card Number (Govt mandated) *</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value)}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-extrabold uppercase font-mono tracking-wider focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Aadhaar Card Number (12 Digit)</label>
                  <input
                    type="text"
                    maxLength={12}
                    value={aadhaarNumber}
                    onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, ''))}
                    placeholder="e.g. 560012341234"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold font-mono tracking-widest focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3 shrink-0">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-xs shadow-md shadow-emerald-600/10 cursor-pointer active:scale-95"
                >
                  Proceed to Payment Selection
                </button>
              </div>

            </form>
          )}

          {step === 2 && (
            <form onSubmit={handlePaymentSubmit} className="space-y-6">
              
              {/* Payment Summary Box */}
              <div className="bg-slate-900 text-white p-5 rounded-2xl flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-semibold text-emerald-400 tracking-wider">{paymentType === 'booking' ? 'Escrow Booking Reservation Fee' : 'Full Property Purchase Amount'}</p>
                  <h4 className="font-bold text-xs">{property.name}</h4>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[9px] font-bold text-slate-400 uppercase block tracking-wider">Total Charge</span>
                  <p className="text-2xl font-extrabold text-emerald-400">{getAmountToPayStr()}</p>
                </div>
              </div>

              {/* Payment Method Selectors */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Choose Payment Method</label>
                <div className="flex gap-2">
                  {['card', 'upi'].map(m => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPayMethod(m)}
                      className={`flex-1 py-2 px-4 rounded-lg font-bold text-xs border cursor-pointer transition-all ${
                        payMethod === m 
                          ? 'border-emerald-600 bg-emerald-50/20 text-emerald-700' 
                          : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      {m === 'card' ? 'Visa / Mastercard / RuPay' : 'UPI (PhonePe / GPay)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditionally rendered inputs */}
              {payMethod === 'card' ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fadeIn">
                  <div className="space-y-1 md:col-span-4">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Card Holder Name</label>
                    <input
                      type="text"
                      required
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="e.g. MANJUNATH K"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Credit/Debit Card Number</label>
                    <input
                      type="text"
                      required
                      maxLength={16}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="e.g. 4321 0000 8765 4321"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold font-mono tracking-widest focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-center font-mono focus:outline-hidden"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">CVV / CVC</label>
                    <input
                      type="password"
                      required
                      maxLength={3}
                      value={cardCvc}
                      onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ''))}
                      placeholder="***"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-center font-mono focus:outline-hidden"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1 animate-fadeIn">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">Unified UPI ID Address</label>
                  <input
                    type="text"
                    required
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. manjunath@ybl"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold font-mono tracking-wide focus:outline-hidden"
                  />
                  <p className="text-[10px] text-slate-400">A payment collect request will be sent to your PhonePe or Google Pay mobile app.</p>
                </div>
              )}

              {/* Escrow Disclaimer copy */}
              <div className="p-3.5 bg-yellow-50 border border-yellow-200/50 rounded-xl flex items-start gap-2.5 text-xs leading-relaxed text-yellow-800">
                <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Important Escrow Policy Note</span><br />
                  This is a simulated secure financial transaction. Money will not be drawn. A confirmed booking reservation will be recorded inside your client browser storage and a certified transaction invoice receipt will be generated.
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center shrink-0">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800"
                >
                  Back to Personal Info
                </button>
                
                <button
                  type="submit"
                  disabled={isPaying}
                  className={`px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white rounded-lg font-extrabold text-xs shadow-md shadow-emerald-600/10 flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                    isPaying ? 'cursor-not-allowed opacity-60' : ''
                  }`}
                >
                  <ShieldCheck className="h-4.5 w-4.5" />
                  <span>{isPaying ? 'Processing Escrow Deposit...' : `Verify & Pay ${getAmountToPayStr()}`}</span>
                </button>
              </div>

            </form>
          )}

          {step === 3 && receiptData && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Success celebration block */}
              <div className="text-center space-y-3">
                <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-600 border border-emerald-200">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-800">Property Secured Successfully!</h3>
                <p className="text-slate-600 text-xs max-w-sm mx-auto leading-relaxed">
                  Your reservation deposit has been registered securely. Your booking receipt and transaction certificate has been compiled.
                </p>
              </div>

              {/* A beautiful printable transaction Invoice Receipt */}
              <div id="print-receipt" className="border border-slate-300/80 bg-slate-50/50 p-6 sm:p-8 rounded-2xl relative shadow-xs font-sans space-y-6">
                
                {/* Receipt Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none opacity-5 pointer-events-none">
                  <Landmark className="h-72 w-72 text-emerald-800" />
                </div>

                {/* Print Title Block */}
                <div className="flex justify-between items-start border-b-2 border-slate-200 pb-4">
                  <div className="text-left">
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-base">
                      <Landmark className="h-5 w-5" />
                      <span>Hubli<span className="text-slate-800">Estate</span></span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Unified Property Portal, Hubballi-Dharwad</p>
                    <p className="text-[9px] text-slate-400 font-mono">support@hubliestate.com</p>
                  </div>
                  <div className="text-right space-y-1 font-mono">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wide">Receipt</span>
                    <p className="text-slate-800 text-xs font-extrabold">{receiptData.bookingNumber}</p>
                    <p className="text-slate-500 text-[9px]">{receiptData.date} | {receiptData.time}</p>
                  </div>
                </div>

                {/* Transaction details list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  {/* Buyer details */}
                  <div className="bg-white p-4 rounded-xl border border-slate-150 space-y-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Buyer Particulars</p>
                    <div className="space-y-1 font-medium text-slate-800">
                      <p className="font-bold">{receiptData.buyerName}</p>
                      <p className="font-mono text-[10px]">PAN: {receiptData.buyerPan}</p>
                      <p className="font-mono text-[10px]">Aadhaar: {receiptData.buyerAadhaar}</p>
                      <p className="text-[10px]">Email: {receiptData.buyerEmail}</p>
                      <p className="text-[10px]">Phone: {receiptData.buyerPhone}</p>
                    </div>
                  </div>

                  {/* Property details */}
                  <div className="bg-white p-4 rounded-xl border border-slate-150 space-y-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Property Particulars</p>
                    <div className="space-y-1 font-medium text-slate-800">
                      <p className="font-bold">{receiptData.propertyName}</p>
                      <p className="text-[10px]">Type: {receiptData.propertyType}</p>
                      <p className="text-[10px]">Location: {receiptData.propertyLocation}</p>
                      <p className="text-[10px] font-bold text-emerald-600">Quote: {receiptData.priceStr}</p>
                      <p className="text-[10px] text-slate-400">Developer/Broker: {receiptData.associatedWith}</p>
                    </div>
                  </div>

                </div>

                {/* Bill payment summary */}
                <div className="bg-slate-900 text-white rounded-xl p-4 font-mono text-xs flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider block">Escrow Settlement</span>
                    <p className="font-bold text-emerald-400 text-xs">{receiptData.paymentType}</p>
                    <p className="text-[9px] text-slate-400 mt-1">Transaction: {receiptData.transactionId}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider block">Amount Settled</span>
                    <p className="text-xl font-extrabold text-emerald-400">{receiptData.amountPaidStr}</p>
                    <p className="text-[9px] text-slate-400 mt-1">Method: {receiptData.paymentMethod}</p>
                  </div>
                </div>

                {/* Audit Seals */}
                <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[10px] text-slate-400 leading-normal">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0" />
                    <span>RERA Karnataka Escrow Audited</span>
                  </div>
                  <p className="font-mono text-[9px] text-right">Certificate Hash: {receiptData.transactionId.replace('TXN-', 'SEC-')}</p>
                </div>

              </div>

              {/* Receipt management buttons */}
              <div className="flex gap-3 justify-end shrink-0">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 border border-slate-200 bg-white text-slate-700 rounded-lg text-xs font-bold hover:bg-slate-50 flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                >
                  <Printer className="h-4 w-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => {
                    setStep(1);
                    setCustomerName('');
                    setCustomerPhone('');
                    setCustomerEmail('');
                    setPanNumber('');
                    setAadhaarNumber('');
                    setCardHolder('');
                    setCardNumber('');
                    setCardExpiry('');
                    setCardCVC('');
                    setUpiId('');
                    onClose();
                    navigate('/dashboard');
                  }}
                  className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                >
                  <Receipt className="h-4 w-4" />
                  <span>View in Dashboard</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
