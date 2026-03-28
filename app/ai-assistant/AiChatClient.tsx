
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Country {
  iso2: string;
  name: string;
}

interface Props {
  countries: Country[];
  userId: string | null;
  isPro: boolean;
  monthlyUsage: number;
  freeAnonLimit: number;
  freeUserLimit: number;
}

const ANON_KEY = "gpe_ai_anon_count";

function getAnonCount(): number {
  try { return parseInt(localStorage.getItem(ANON_KEY) || "0", 10); } catch { return 0; }
}
function incrementAnonCount(): number {
  try {
    const next = getAnonCount() + 1;
    localStorage.setItem(ANON_KEY, String(next));
    return next;
  } catch { return 99; }
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }
  return (
    <button onClick={copy} className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-slate-500 hover:text-slate-300 mt-2">
      {copied ? (
        <><svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-green-400">Copied</span></>
      ) : (
        <><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg><span>Copy</span></>
      )}
    </button>
  );
}

function SignUpPrompt() {
  return (
    <div className="mx-auto max-w-lg border border-blue-500/30 bg-blue-600/5 rounded-2xl p-8 text-center my-4">
      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      </div>
      <h3 className="text-white font-bold text-xl mb-2">Enjoying PayrollExpert AI?</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-md mx-auto">
        Create a free account to continue. Free accounts get 10 AI questions per month — no payment required.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="/sign-up/" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
          Create free account
        </a>
        <a href="/sign-in/" className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold px-6 py-3 rounded-xl transition-colors text-sm">
          Sign in
        </a>
      </div>
      <p className="text-slate-600 text-xs mt-4">No credit card required</p>
    </div>
  );
}

function UpgradePrompt() {
  return (
    <div className="mx-auto max-w-lg border border-slate-700 bg-slate-900 rounded-2xl overflow-hidden my-4">
      <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600" />
      <div className="p-8">
        <h3 className="text-white font-bold text-xl mb-2">Upgrade to PayrollExpert Pro</h3>
        <p className="text-slate-400 text-sm mb-6">You have used your 10 free questions this month. Upgrade for unlimited access.</p>
        <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
          {["Unlimited AI questions","Save unlimited calculations","Full PDF exports","Termination rules — all countries","Contractor classification rules","Double taxation treaty data","Remote work PE rules","Rate-change email alerts"].map((f) => (
            <div key={f} className="flex items-center gap-2 text-slate-300 text-sm">
              <svg className="w-4 h-4 text-blue-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              {f}
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <a href="/pricing/" className="flex-1 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors text-sm">
            Upgrade to Pro — £29/mo
          </a>
          <a href="/pricing/" className="inline-flex items-center justify-center bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-semibold px-5 py-3.5 rounded-xl transition-colors text-sm">
            £249/yr
          </a>
        </div>
      </div>
    </div>
  );
}

const SUGGESTIONS = [
  "What are the income tax brackets in the UK?",
  "Compare employer costs in Germany vs Netherlands",
  "How does social security work in Singapore?",
  "What notice period is required in France?",
];

export default function AiChatClient({ countries, userId, isPro, monthlyUsage, freeAnonLimit, freeUserLimit }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const [anonCount, setAnonCount] = useState(0);
  const [showLimit, setShowLimit] = useState<"anon" | "free" | null>(null);
  const [usageCount, setUsageCount] = useState(monthlyUsage);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setAnonCount(getAnonCount()); }, []);

  function isNearBottom() {
    const el = messagesRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 120;
  }

  useEffect(() => {
    if (isNearBottom()) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, thinking]);

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const code = e.target.value;
    setCountryCode(code);
    const found = countries.find((c) => c.iso2 === code);
    setCountryName(found ? found.name : "");
  }

  function checkLimit(): "anon" | "free" | null {
    if (isPro) return null;
    if (!userId && anonCount >= freeAnonLimit) return "anon";
    if (userId && !isPro && usageCount >= freeUserLimit) return "free";
    return null;
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    const limit = checkLimit();
    if (limit) { setShowLimit(limit); return; }

    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setThinking(true);

    if (!userId) {
      const newCount = incrementAnonCount();
      setAnonCount(newCount);
    } else {
      setUsageCount((prev) => prev + 1);
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...(userId ? { "x-user-id": userId } : {}) },
        body: JSON.stringify({
          message: text,
          countryCode: countryCode || null,
          countryName: countryName || null,
          history: messages.slice(-10),
        }),
      });

      if (!res.ok) throw new Error("Failed");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      let firstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        assistantText += decoder.decode(value, { stream: true });
        if (firstChunk) {
          setThinking(false);
          setMessages((prev) => [...prev, { role: "assistant", content: assistantText }]);
          firstChunk = false;
        } else {
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: "assistant", content: assistantText };
            return updated;
          });
        }
      }

      const newAnonCount = !userId ? getAnonCount() : anonCount;
      if (!userId && newAnonCount >= freeAnonLimit) setShowLimit("anon");
      if (userId && !isPro && usageCount + 1 >= freeUserLimit) setShowLimit("free");

    } catch {
      setThinking(false);
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Please try again." }]);
    } finally {
      setLoading(false);
      setThinking(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* Header */}
      <div className="border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">PayrollExpert AI</div>
              <div className="text-slate-500 text-xs">Verified global payroll data</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select value={countryCode} onChange={handleCountryChange}
              className="bg-slate-800/80 border border-slate-700 text-slate-300 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-blue-500 max-w-[160px]">
              <option value="">All countries</option>
              {countries.map((c) => <option key={c.iso2} value={c.iso2}>{c.name}</option>)}
            </select>
            {!userId && <a href="/sign-in/" className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">Sign in</a>}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={messagesRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-8">

          {/* Welcome state */}
          {messages.length === 0 && !thinking && (
            <div className="text-center py-12">
              <div className="w-14 h-14 bg-blue-600/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h2 className="text-white font-bold text-2xl mb-2">PayrollExpert AI</h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
                Ask me anything about payroll, employment law, tax, social security, and HR compliance for any country in the world.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 max-w-xl mx-auto">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => { setInput(s); textareaRef.current?.focus(); }}
                    className="text-left bg-slate-800/50 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/40 rounded-xl px-4 py-3.5 text-slate-300 text-sm transition-all leading-snug">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message list */}
          <div className="flex flex-col gap-8">
            {messages.map((msg, i) => (
              <div key={i} className={msg.role === "user" ? "flex justify-end" : "flex justify-start group"}>
                {msg.role === "user" ? (
                  <div className="max-w-[75%] bg-blue-600 text-white rounded-2xl rounded-tr-sm px-5 py-3.5 text-sm leading-relaxed">
                    {msg.content}
                  </div>
                ) : (
                  <div className="flex-1 max-w-full">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                        </svg>
                      </div>
                      <span className="text-slate-400 text-xs font-medium">PayrollExpert AI</span>
                    </div>
                    <div className="prose prose-invert prose-sm max-w-none text-slate-200 prose-headings:text-white prose-headings:font-semibold prose-strong:text-white prose-li:text-slate-300 prose-a:text-blue-400 prose-code:text-blue-300 prose-code:bg-slate-800 prose-code:px-1 prose-code:rounded">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                    <CopyButton text={msg.content} />
                  </div>
                )}
              </div>
            ))}

            {/* Thinking indicator */}
            {thinking && (
              <div className="flex justify-start">
                <div className="flex-1 max-w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <span className="text-slate-400 text-xs font-medium">PayrollExpert AI</span>
                  </div>
                  <div className="flex items-center gap-1.5 py-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:"0ms"}} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:"150ms"}} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay:"300ms"}} />
                    <span className="text-slate-500 text-xs ml-2">Searching verified data...</span>
                  </div>
                </div>
              </div>
            )}

            {showLimit === "anon" && <SignUpPrompt />}
            {showLimit === "free" && <UpgradePrompt />}
          </div>

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-slate-800/60 bg-slate-950/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-4 py-4">
          {countryName && (
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-xs text-slate-600">Context:</span>
              <span className="inline-flex items-center gap-1.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-medium px-2.5 py-1 rounded-full">
                {countryName}
                <button onClick={() => { setCountryCode(""); setCountryName(""); }} className="hover:text-white ml-0.5">×</button>
              </span>
            </div>
          )}
          <div className="flex gap-3 items-end">
            <textarea ref={textareaRef} value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={showLimit ? "Create an account or upgrade to continue..." : "Ask about payroll, tax, employment law..."}
              disabled={!!showLimit || loading}
              rows={1}
              className="flex-1 bg-slate-800/60 border border-slate-700 focus:border-blue-500/60 text-slate-200 placeholder-slate-600 rounded-xl px-4 py-3.5 text-sm resize-none focus:outline-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ minHeight: "52px", maxHeight: "160px" }}
            />
            <button onClick={sendMessage} disabled={!input.trim() || loading || !!showLimit}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl px-4 py-3.5 transition-colors shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </div>
          <p className="text-slate-700 text-xs mt-2.5 text-center">
            PayrollExpert AI uses verified data. Always confirm with a qualified professional.
          </p>
        </div>
      </div>
    </div>
  );
}
