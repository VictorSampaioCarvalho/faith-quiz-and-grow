import { useEffect, useRef, useState } from "react";

type Faith = "catolico" | "evangelico";

function Phone({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <figure className="phone-slide shrink-0 snap-center">
      <div className="phone-frame">
        <div className="phone-notch" aria-hidden />
        <div className="phone-screen">{children}</div>
      </div>
      <figcaption className="mt-3 text-center text-sm font-bold text-primary-foreground/80">
        {label}
      </figcaption>
    </figure>
  );
}

function ScreenHome({ cat }: { cat: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#0b1220] text-white">
      <div className="px-3 pt-7 pb-2">
        <p className="text-[10px] text-white/50">Boa tarde</p>
        <p className="text-sm font-extrabold">Irmão(ã) da Fé</p>
        <div className="mt-2 rounded-xl bg-white px-2.5 py-2 text-[10px] font-semibold text-slate-500">
          🔍 Buscar em 1.050 estudos…
        </div>
        <div className="mt-2 flex gap-1.5 overflow-hidden">
          {(cat
            ? ["Liturgia", "Terço", "Santos", "Catecismo"]
            : ["Gênesis", "Romanos", "Anjos", "Oração"]
          ).map((t) => (
            <span
              key={t}
              className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[9px] font-bold"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-3 mt-1 rounded-2xl bg-linear-to-br from-amber-400 to-orange-600 p-3 shadow-lg">
        <p className="text-[9px] font-extrabold tracking-wider text-white/90">
          DEVOCIONAL DE HOJE
        </p>
        <p className="mt-1 text-[11px] font-bold leading-snug">
          {cat ? "“Eis a serva do Senhor…”" : "“Tudo posso naquele…”"}
        </p>
        <p className="mt-0.5 text-[9px] text-white/80">
          {cat ? "Lc 1,38 — com áudio" : "Fp 4,13 — com áudio"}
        </p>
        <span className="mt-2 inline-block rounded-lg bg-white/20 px-2 py-1 text-[9px] font-extrabold">
          Ler agora ›
        </span>
      </div>
      <div className="mx-3 mt-2 grid grid-cols-2 gap-1.5">
        {[
          ["📖", "Bíblia"],
          ["🎬", "Aulas"],
          ["🎧", "Áudios"],
          ["🤖", "IA"],
        ].map(([i, t]) => (
          <div
            key={t}
            className="rounded-xl bg-white/8 px-2 py-2 text-center text-[9px] font-bold"
          >
            <div className="text-sm">{i}</div>
            {t}
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-around border-t border-white/10 py-2 text-[8px] text-white/55">
        {["Início", "Bíblia", "Estudar", "Ao vivo", "Perfil"].map((n) => (
          <span key={n} className={n === "Início" ? "font-bold text-amber-400" : ""}>
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

function ScreenBible({ cat }: { cat: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#0b1220] text-white">
      <div className="flex items-center justify-between px-3 pt-7 pb-2">
        <p className="text-sm font-extrabold">{cat ? "Romanos 8" : "Romanos 8"}</p>
        <div className="flex gap-1 text-[9px] font-bold">
          <span className="rounded-md bg-white/10 px-1.5 py-0.5">A−</span>
          <span className="rounded-md bg-amber-400/20 px-1.5 py-0.5 text-amber-300">A+</span>
        </div>
      </div>
      <div className="mx-3 rounded-xl bg-emerald-500/15 px-2 py-1.5 text-center text-[9px] font-extrabold text-emerald-300">
        ✓ Bíblia completa e correta — {cat ? "73 livros" : "66 livros"}
      </div>
      <div className="flex-1 space-y-2 overflow-hidden px-3 pt-2 text-[10px] leading-relaxed text-white/85">
        <p>
          <b className="text-amber-300">28</b> Sabemos que todas as coisas cooperam para o bem
          daqueles que amam a Deus…
        </p>
        <p>
          <b className="text-amber-300">29</b> Pois os que de antemão conheceu, também os
          predestinou…
        </p>
        <p className="text-white/45">Toque em qualquer versículo para explicar.</p>
      </div>
      <div className="m-3 rounded-xl bg-white/10 py-2 text-center text-[10px] font-extrabold">
        📝 Anotar sobre o capítulo
      </div>
    </div>
  );
}

function ScreenExplain() {
  return (
    <div className="flex h-full flex-col bg-[#0b1220] text-white">
      <div className="px-3 pt-7 pb-1">
        <p className="text-[10px] text-white/50">Romanos 8:28</p>
        <p className="text-xs font-extrabold leading-snug">
          “Todas as coisas cooperam para o bem…”
        </p>
        <div className="mt-2 flex gap-1">
          {[
            ["♥", "Favoritar"],
            ["⇄", "Comparar"],
            ["★", "Guardar"],
            ["🤖", "Perguntar"],
          ].map(([i, t]) => (
            <span
              key={t}
              className="flex flex-1 flex-col items-center rounded-lg bg-white/8 py-1 text-[8px] font-bold"
            >
              <span className="text-[11px]">{i}</span>
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="mx-3 mt-2 rounded-xl border border-violet-400/30 bg-violet-500/15 p-2.5">
        <p className="text-[9px] font-extrabold text-violet-300"># EXPLICAÇÃO</p>
        <p className="mt-1 text-[9px] leading-snug text-white/80">
          Paulo ensina que Deus transforma até as dores em propósito para quem O ama.
        </p>
      </div>
      <div className="mx-3 mt-1.5 rounded-xl border border-sky-400/30 bg-sky-500/10 p-2.5">
        <p className="text-[9px] font-extrabold text-sky-300">CONTEXTO</p>
        <p className="mt-1 text-[9px] leading-snug text-white/80">
          Escrito aos cristãos de Roma sob pressão. Mensagem de esperança e segurança.
        </p>
      </div>
      <div className="mx-3 mt-1.5 flex items-center gap-2 rounded-xl bg-amber-400/15 p-2">
        <span className="text-lg">🤖</span>
        <div>
          <p className="text-[9px] font-extrabold text-amber-300">IA tira sua dúvida</p>
          <p className="text-[8px] text-white/65">Pergunte em linguagem simples, 24h.</p>
        </div>
      </div>
    </div>
  );
}

function ScreenVideos() {
  return (
    <div className="flex h-full flex-col bg-[#0b1220] text-white">
      <div className="flex items-center justify-between px-3 pt-7 pb-2">
        <div>
          <p className="text-sm font-extrabold">Gênesis</p>
          <p className="text-[9px] text-white/50">12 vídeo-aulas • PDF incluso</p>
        </div>
        <span className="rounded-full bg-amber-400 px-2.5 py-1 text-[9px] font-extrabold text-slate-900">
          Começar
        </span>
      </div>
      <div className="flex-1 space-y-1.5 overflow-hidden px-3">
        {[
          ["▶", "Introdução ao Livro", "Vídeo • 14 min"],
          ["▶", "A Criação explicada", "Vídeo • 18 min"],
          ["🎧", "Áudio-livro: Gênesis", "Áudio • 42 min"],
          ["▶", "Adão, Eva e o pecado", "Vídeo • 16 min"],
        ].map(([i, t, m]) => (
          <div key={t} className="flex items-center gap-2 rounded-xl bg-white/8 p-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-indigo-500 to-violet-700 text-xs font-bold">
              {i}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-extrabold">{t}</p>
              <p className="text-[8px] text-white/50">{m}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenLive({ cat }: { cat: boolean }) {
  return (
    <div className="flex h-full flex-col bg-[#0b1220] text-white">
      <div className="px-3 pt-7 pb-2">
        <p className="text-sm font-extrabold">Ao vivo & eventos</p>
        <p className="text-[9px] text-white/50">Participe sem sair de casa</p>
      </div>
      <div className="relative mx-3 overflow-hidden rounded-2xl bg-linear-to-br from-rose-600 to-red-800 p-3">
        <span className="absolute right-2 top-2 animate-pulse rounded-full bg-white px-2 py-0.5 text-[8px] font-extrabold text-red-700">
          ● AO VIVO
        </span>
        <p className="mt-4 text-[11px] font-extrabold leading-snug">
          {cat ? "Rosário em comunidade" : "Culto de oração online"}
        </p>
        <p className="mt-1 text-[9px] text-white/80">+2.400 irmãos assistindo agora</p>
        <span className="mt-2 inline-block rounded-lg bg-white/20 px-2 py-1 text-[9px] font-extrabold">
          Entrar no evento ›
        </span>
      </div>
      <div className="mt-2 space-y-1.5 px-3">
        {[
          ["📅", "Estudo ao vivo — Quinta 20h"],
          ["🎬", "Replay: Apocalipse explicado"],
          ["🎧", "Áudio-livro da semana"],
        ].map(([i, t]) => (
          <div
            key={t}
            className="flex items-center gap-2 rounded-xl bg-white/8 px-2.5 py-2 text-[10px] font-bold"
          >
            <span>{i}</span>
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function ScreenLibrary({ cat }: { cat: boolean }) {
  const cards = cat
    ? [
        ["from-blue-600 to-blue-900", "Antigo Testamento", "320 estudos"],
        ["from-violet-600 to-purple-900", "Novo Testamento", "280 estudos"],
        ["from-amber-500 to-orange-800", "Santos & Catecismo", "150 estudos"],
        ["from-emerald-600 to-teal-900", "Liturgia & Missa", "95 estudos"],
      ]
    : [
        ["from-blue-600 to-blue-900", "Antigo Testamento", "320 estudos"],
        ["from-violet-600 to-purple-900", "Novo Testamento", "280 estudos"],
        ["from-rose-600 to-pink-900", "Personagens", "140 estudos"],
        ["from-emerald-600 to-teal-900", "Temas da Fé", "110 estudos"],
      ];
  return (
    <div className="flex h-full flex-col bg-[#0b1220] text-white">
      <div className="px-3 pt-7 pb-2">
        <p className="text-sm font-extrabold">Estudar</p>
        <p className="text-[9px] text-white/50">Resumos + contexto completo</p>
      </div>
      <div className="grid flex-1 grid-cols-2 gap-1.5 overflow-hidden px-3 pb-3">
        {cards.map(([g, t, n]) => (
          <div
            key={t}
            className={`flex flex-col justify-end rounded-2xl bg-linear-to-br ${g} p-2.5`}
          >
            <p className="text-[10px] font-extrabold leading-tight">{t}</p>
            <p className="mt-0.5 text-[8px] text-white/75">{n}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const DELIVERABLES = [
  {
    icon: "📖",
    title: "Bíblia completa e correta",
    text: "Texto fiel, letras grandes e busca rápida. Sem versão truncada.",
  },
  {
    icon: "🧠",
    title: "Resumos + contexto + explicação",
    text: "Cada passagem descomplicada: o que diz, por que importa e como aplicar.",
  },
  {
    icon: "🎬",
    title: "Vídeo-aulas e áudio-livros",
    text: "Assista ou ouça no celular, no ônibus, em casa — no seu ritmo.",
  },
  {
    icon: "🤖",
    title: "IA que tira suas dúvidas",
    text: "Pergunte em português simples. Resposta clara, 24 horas por dia.",
  },
  {
    icon: "📡",
    title: "Eventos e aulas ao vivo",
    text: "Participe de estudos e orações em tempo real com a comunidade.",
  },
  {
    icon: "🎁",
    title: "Bônus exclusivos liberados",
    text: "Orações, guia Bíblia em 1 ano e conteúdo premium incluso na oferta.",
  },
];

export function AppShowcase({ faith }: { faith: Faith }) {
  const cat = faith === "catolico";
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const slides = [
    { label: "Início do app", node: <ScreenHome cat={cat} /> },
    { label: "Bíblia completa", node: <ScreenBible cat={cat} /> },
    { label: "Explicação + IA", node: <ScreenExplain /> },
    { label: "Biblioteca de estudos", node: <ScreenLibrary cat={cat} /> },
    { label: "Vídeo-aulas & áudio", node: <ScreenVideos /> },
    { label: "Ao vivo & eventos", node: <ScreenLive cat={cat} /> },
  ];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const slide = el.querySelector<HTMLElement>(".phone-slide");
      if (!slide) return;
      const idx = Math.round(el.scrollLeft / (slide.offsetWidth + 16));
      setActive(Math.max(0, Math.min(slides.length - 1, idx)));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [slides.length]);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    const slide = el?.querySelectorAll<HTMLElement>(".phone-slide")[i];
    if (!el || !slide) return;
    const left = slide.offsetLeft - (el.clientWidth - slide.offsetWidth) / 2;
    el.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-night-gradient px-0 py-14 text-primary-foreground">
      <div className="mx-auto max-w-5xl px-5">
        <p className="animate-reveal-up text-xs font-extrabold uppercase tracking-[0.2em] text-gold">
          O app por dentro
        </p>
        <h2 className="animate-reveal-up stagger-1 mt-2 max-w-2xl font-display text-3xl font-bold leading-tight md:text-5xl">
          Telas reais do que você{" "}
          <span className="text-gold">vai receber</span>. Deslize e veja.
        </h2>
        <p className="animate-reveal-up stagger-2 mt-4 max-w-2xl text-base opacity-85 md:text-lg">
          Não é promessa vazia. É Bíblia completa, estudos com contexto, vídeo-aulas,
          áudio-livros, IA para dúvidas e eventos ao vivo — tudo no celular, fácil de usar.
        </p>
      </div>

      <div className="relative mt-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-[oklch(0.18_0.05_262)] to-transparent md:w-16" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-[oklch(0.18_0.05_262)] to-transparent md:w-16" />

        <div
          ref={trackRef}
          className="phone-track flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-7.25rem)] pb-2 md:gap-6 md:px-10"
        >
          {slides.map((s) => (
            <Phone key={s.label} label={s.label}>
              {s.node}
            </Phone>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.label}
            type="button"
            aria-label={`Ir para ${s.label}`}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-6 bg-gold" : "w-2 bg-primary-foreground/30"
            }`}
          />
        ))}
      </div>
      <p className="mt-3 text-center text-sm font-bold text-gold animate-arrow-nudge md:hidden">
        ← Deslize para ver mais →
      </p>

      <div className="mx-auto mt-10 max-w-5xl px-5">
        <h3 className="text-center text-2xl font-bold md:text-3xl">
          O que entra no seu acesso —{" "}
          <span className="text-gold">sem enrolação</span>
        </h3>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {DELIVERABLES.map((d, i) => (
            <article
              key={d.title}
              className={`animate-reveal-up ${["stagger-1", "stagger-2", "stagger-3", "stagger-4", "stagger-5", "stagger-6"][i]} rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-4 backdrop-blur`}
            >
              <div className="flex items-start gap-3">
                <span className="animate-bounce-soft text-3xl">{d.icon}</span>
                <div>
                  <h4 className="text-base font-extrabold leading-snug">{d.title}</h4>
                  <p className="mt-1 text-sm text-primary-foreground/70">{d.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <a href="#oferta" className="mx-auto mt-8 block max-w-md">
          <button className="animate-glow w-full rounded-2xl bg-gold-gradient px-6 py-5 text-xl font-extrabold text-accent-foreground shadow-gold transition hover:scale-[1.02]">
            QUERO TUDO ISSO AGORA
          </button>
        </a>
        <p className="mt-3 text-center text-xs opacity-60">
          Acesso imediato após a compra • Funciona no celular
        </p>
      </div>
    </section>
  );
}
