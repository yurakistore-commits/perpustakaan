"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Search, MoreHorizontal, Phone, Video, Paperclip, Smile } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { cn } from "@/lib/utils";

const contacts = [
  { id: "2", name: "Siti Nurhaliza", role: "Admin", lastMsg: "Sudah diproses ya", time: "2m", unread: 2, online: true },
  { id: "3", name: "Budi Santoso", role: "Guru", lastMsg: "Rekomendasi buku baru...", time: "15m", unread: 0, online: true },
  { id: "4", name: "Rina Kartika", role: "Siswa", lastMsg: "Terima kasih pak", time: "1h", unread: 0, online: false },
  { id: "8", name: "Dewi Lestari", role: "Guru", lastMsg: "Baik, nanti saya cek", time: "3h", unread: 1, online: false },
];

const messages = [
  { id: "m1", sender: "2", content: "Pak, ada buku baru yang perlu diinput ke sistem", time: "10:30", isSelf: false },
  { id: "m2", sender: "1", content: "Baik, judul bukunya apa?", time: "10:32", isSelf: true },
  { id: "m3", sender: "2", content: "\"Atomic Habits\" karya James Clear. Sudah ada 5 eksemplar.", time: "10:33", isSelf: false },
  { id: "m4", sender: "1", content: "Oke, tolong scan ISBN-nya dan upload cover bukunya ya", time: "10:35", isSelf: true },
  { id: "m5", sender: "2", content: "Sudah diproses ya", time: "10:40", isSelf: false },
];

export default function MessagesPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const roleColors: Record<string, string> = {
    Admin: "#38BDF8",
    Guru: "#34D399",
    Siswa: "#FBBF24",
  };

  return (
    <div className="space-y-0">
      <div className="mb-5">
        <h2 className="text-[20px] font-bold text-white font-display">Messages</h2>
        <p className="text-[13px] text-[#6B6780] mt-0.5">Internal communication</p>
      </div>

      <div className="glass-card overflow-hidden" style={{ height: "calc(100vh - 200px)", minHeight: "500px" }}>
        <div className="flex h-full">
          {/* Contacts sidebar */}
          <div className="w-full sm:w-80 border-r border-white/[0.06] flex flex-col shrink-0">
            <div className="p-3 border-b border-white/[0.06]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#6B6780]" />
                <input type="text" placeholder="Search contacts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="input-field pl-9 py-2 text-[13px]" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 hover:bg-white/[0.03] transition-colors text-left",
                    selectedContact.id === contact.id && "bg-white/[0.04]"
                  )}
                >
                  <div className="relative">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold"
                      style={{ backgroundColor: (roleColors[contact.role] || "#A78BFA") + "15", color: roleColors[contact.role] || "#A78BFA" }}
                    >
                      {getInitials(contact.name)}
                    </div>
                    {contact.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#34D399] border-2 border-[#13111C]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] font-medium text-white">{contact.name}</span>
                      <span className="text-[10px] text-[#6B6780]">{contact.time}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-[12px] text-[#6B6780] truncate">{contact.lastMsg}</p>
                      {contact.unread > 0 && (
                        <span className="ml-2 min-w-[18px] h-[18px] rounded-full bg-[#7C3AED] text-white text-[10px] font-bold flex items-center justify-center px-1">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="hidden sm:flex flex-col flex-1">
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold"
                  style={{ backgroundColor: (roleColors[selectedContact.role] || "#A78BFA") + "15", color: roleColors[selectedContact.role] || "#A78BFA" }}
                >
                  {getInitials(selectedContact.name)}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-white">{selectedContact.name}</p>
                  <p className="text-[11px] text-[#6B6780]">{selectedContact.online ? "Online" : "Offline"} · {selectedContact.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg text-[#6B6780] hover:text-white hover:bg-white/[0.04] transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-[#6B6780] hover:text-white hover:bg-white/[0.04] transition-colors">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-lg text-[#6B6780] hover:text-white hover:bg-white/[0.04] transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn("flex", msg.isSelf ? "justify-end" : "justify-start")}
                >
                  <div className={cn(
                    "max-w-[70%] px-4 py-2.5 rounded-2xl text-[13px]",
                    msg.isSelf
                      ? "bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] text-white rounded-br-md"
                      : "bg-[#1A1726] text-[#E5E3EC] rounded-bl-md"
                  )}>
                    <p>{msg.content}</p>
                    <p className={cn("text-[10px] mt-1", msg.isSelf ? "text-white/50" : "text-[#6B6780]")}>{msg.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg text-[#6B6780] hover:text-white hover:bg-white/[0.04] transition-colors">
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="input-field flex-1 py-2.5"
                  onKeyDown={(e) => e.key === "Enter" && setMessageInput("")}
                />
                <button className="p-2 rounded-lg text-[#6B6780] hover:text-white hover:bg-white/[0.04] transition-colors">
                  <Smile className="w-4 h-4" />
                </button>
                <button onClick={() => setMessageInput("")} className="p-2.5 rounded-lg bg-[#7C3AED] text-white hover:bg-[#6D28D9] transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
