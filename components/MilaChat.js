// Mila – React Chat Interface (MVP)
// Uses OpenAI API (ChatGPT) with switchable language (SK/EN)

import { useState } from "react";

export default function MilaChat() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Ahoj, som Mila.\nSom tu, aby som ti vytvorila priestor, kde môžeš hovoriť... o čomkoľvek, čo práve cítiš, prežívaš alebo premýšľaš.\n\n🧘 Môžeme sa spolu pozrieť na tvoje myšlienky, emócie, alebo len tak byť v tichu.\n\n🌍 Hovorím po slovensky aj po anglicky – stačí napísať v jazyku, ktorý ti je príjemný.\n\nAko sa dnes máš?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, userMessage],
        systemPrompt: `Tvoja úloha je správať sa ako empatická a vzdelaná psychologická sprievodkyňa menom Mila.
Si nápomocná, láskavá a rozprávaš ľudsky, ale s rešpektom voči psychologickým princípom.
Nikdy nedávaš medicínske rady ani nediagnostikuješ.
Ak používateľ naznačuje, že je v kríze (napr. sebapoškodzovanie, samovražedné myšlienky), odporučíš mu obrátiť sa na odbornú pomoc alebo linku dôvery.
Vieš pýtať správne otázky, ktoré podporujú sebapoznanie a bezpečný vnútorný dialóg.
Odpovedáš v slovenčine, pokiaľ používateľ nezvolí angličtinu.
Si tu, aby si používateľa vypočula, povzbudila, objasnila súvislosti a ponúkla jednoduché psychologické techniky (napr. dýchanie, reframing, journaling).
Na konci každej odpovede sa môžeš spýtať jemne: 'Chceš sa o tom porozprávať viac?' alebo 'Čo prežívaš práve teraz?'`
      })
    });

    const data = await response.json();
    setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold text-center">Môžeš hovoriť?</h1>
      <div className="h-[400px] overflow-y-auto border p-3 rounded-xl bg-white shadow">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === "user" ? "text-right" : "text-left"}>
            <div className={`my-2 p-2 inline-block rounded-xl ${msg.role === "user" ? "bg-blue-100" : "bg-gray-100"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div className="italic text-gray-400">Mila premýšľa...</div>}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border rounded-lg p-2"
          placeholder="Napíš sem svoje myšlienky..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700"
        >
          Poslať
        </button>
      </div>
    </div>
  );
}