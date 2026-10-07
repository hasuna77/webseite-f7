"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, MessageCircle, Send, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const GREETING: Message = {
  role: "assistant",
  content:
    "Hallo! Ich bin der digitale Assistent von F7 Studio. Frag mich gern nach Leistungen, Preisen oder freien Terminen.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.slice(-12),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply ?? "Entschuldige, da ist etwas schiefgelaufen." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Verbindung fehlgeschlagen. Bitte versuch es erneut oder schreib uns über /kontakt.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-[32rem] w-[22rem] max-w-[calc(100vw-2.5rem)] flex-col overflow-hidden rounded-3xl border border-beige-dark/40 bg-paper shadow-soft"
          >
            <div className="flex items-center justify-between bg-ink px-5 py-4 text-white">
              <div>
                <p className="font-display text-sm">Studio-Assistent</p>
                <p className="text-xs text-white/60">Antwortet meist sofort</p>
              </div>
              <button
                aria-label="Chat schließen"
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "ml-auto bg-green text-white"
                      : "bg-beige text-ink-soft"
                  }`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 rounded-2xl bg-beige px-4 py-2.5 text-sm text-ink-soft">
                  <Loader2 className="h-4 w-4 animate-spin" /> tippt...
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2 border-t border-beige-dark/40 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Deine Frage..."
                className="flex-1 rounded-full bg-beige px-4 py-2.5 text-sm text-ink outline-none placeholder:text-ink-soft/50 focus:ring-2 focus:ring-green"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Senden"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green text-white transition-opacity disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Chat schließen" : "Chat öffnen"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green text-white shadow-soft transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </div>
  );
}
