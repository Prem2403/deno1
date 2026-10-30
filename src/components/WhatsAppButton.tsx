import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface WhatsAppButtonProps {
  onOpenBooking: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState<Array<{ sender: 'concierge' | 'guest'; text: string; time: string }>>([
    {
      sender: 'concierge',
      text: 'Good day. Welcome to THE HOTEL SUNSET. I am Dimitris, your private concierge. How may I orchestrate your arrival or stay today?',
      time: '12:00 PM',
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newGuestMsg = {
      sender: 'guest' as const,
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessagesList((prev) => [...prev, newGuestMsg]);
    setMessage('');

    // Automated immediate warm concierge reply
    setTimeout(() => {
      setMessagesList((prev) => [
        ...prev,
        {
          sender: 'concierge',
          text: 'Thank you for contacting us. I have noted your inquiry and will prepare tailored arrangements. Would you like to check dates or reserve a private villa hold?',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 900);
  };

  return (
    <>
      {/* Floating WhatsApp Button with Soft Periodic Pulse */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Connect with Sanctuary Concierge on WhatsApp"
          className="whatsapp-pulse btn-luxury flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] shadow-xl focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
        >
          <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
          <span className="text-xs font-semibold tracking-wider uppercase font-sans hidden sm:inline">
            WhatsApp Concierge
          </span>
        </button>
      </div>

      {/* Floating Concierge Chat Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="WhatsApp Concierge Chat"
          className="fixed bottom-22 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-[#fbf9f5] rounded-3xl shadow-2xl border border-[#181716]/10 overflow-hidden animate-[modalScaleIn_0.5s_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
          style={{
            animation: 'modalScaleIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          }}
        >
          {/* Header */}
          <div className="bg-[#181716] p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                  <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#181716] rounded-full" />
              </div>
              <div>
                <h4 className="text-sm font-serif font-medium text-white flex items-center gap-1.5">
                  THE HOTEL SUNSET Concierge Desk
                  <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                </h4>
                <p className="text-[10px] text-green-300 font-sans tracking-wide">
                  Online · Instant Response (Avg 2 min)
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat Window"
              className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="p-4 h-64 overflow-y-auto space-y-3 bg-[#f4efe6]/50 text-xs font-sans">
            {messagesList.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${
                  msg.sender === 'guest' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'guest'
                      ? 'bg-[#181716] text-white rounded-br-none'
                      : 'bg-white text-[#181716] shadow-xs rounded-bl-none border border-[#181716]/5'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-[#736e67] mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}
          </div>

          {/* Quick Action Button within chat */}
          <div className="px-4 py-2 bg-stone-100 border-t border-[#181716]/5 flex items-center justify-between">
            <span className="text-[10px] text-[#736e67]">Ready to reserve?</span>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="text-[11px] font-semibold text-[#c5a059] hover:underline"
            >
              View Available Villas &rarr;
            </button>
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-[#181716]/8 flex gap-2">
            <input
              type="text"
              placeholder="Ask about villas, airport transfer, dining..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 text-xs px-3 py-2 bg-[#f4efe6] rounded-full focus:outline-none focus:ring-1 focus:ring-[#25D366] text-[#181716]"
            />
            <button
              type="submit"
              aria-label="Send Message"
              className="btn-luxury p-2 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
