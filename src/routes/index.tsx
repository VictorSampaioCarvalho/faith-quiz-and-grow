import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caminho da Fé — Descubra seu nível de intimidade com Deus" },
      { name: "description", content: "Faça o quiz, gire a roleta e ganhe acesso ao app que simplifica seus estudos bíblicos." },
      { property: "og:title", content: "Caminho da Fé — Quiz da Fé" },
      { property: "og:description", content: "Responda, gire a roleta e desbloqueie seu desconto no app de estudos bíblicos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Faith = "catolico" | "evangelico";
type Q = { q: string; opts: string[] };

const PROFILE: Record<Faith, Q[]> = {
  catolico: [
    { q: "Com que frequência você reza o Terço?", opts: ["Todos os dias", "Algumas vezes por semana", "Raramente", "Quero começar"] },
    { q: "Você já leu a Bíblia inteira, junto com o Catecismo?", opts: ["Sim, completa", "Só os Evangelhos", "Algumas partes", "Ainda não"] },
    { q: "O que mais te impede de estudar a Palavra?", opts: ["Falta de tempo", "Acho difícil entender", "Não sei por onde começar", "Falta de disciplina"] },
    { q: "Como você gostaria de viver a Santa Missa?", opts: ["Entendendo cada parte", "Com mais devoção", "Participando mais", "Tudo isso"] },
  ],
  evangelico: [
    { q: "Você faz seu devocional diário?", opts: ["Todos os dias", "Algumas vezes por semana", "Raramente", "Quero começar"] },
    { q: "Já completou um plano de leitura da Bíblia?", opts: ["Sim, mais de uma vez", "Comecei e parei", "Só alguns livros", "Ainda não"] },
    { q: "O que mais te impede de estudar a Palavra?", opts: ["Falta de tempo", "Acho difícil entender", "Não sei por onde começar", "Falta de disciplina"] },
    { q: "Como você gostaria de servir na sua igreja?", opts: ["Ensinando a Palavra", "No louvor", "Em células/grupos", "Ainda descobrindo"] },
  ],
};

type QZ = { q: string; opts: string[]; a: number; why: string };
const QUIZ: Record<Faith, QZ[]> = {
  catolico: [
    { q: "Quantos mistérios tem o Santo Rosário?", opts: ["15", "20", "12", "7"], a: 1, why: "São 20: Gozosos, Luminosos, Dolorosos e Gloriosos." },
    { q: "Quem foi o primeiro Papa da Igreja?", opts: ["São Paulo", "São João", "São Pedro", "São Tiago"], a: 2, why: "Jesus disse: “Tu és Pedro, e sobre esta pedra edificarei a minha Igreja” (Mt 16,18)." },
    { q: "Quantos livros tem a Bíblia Católica?", opts: ["66", "73", "70", "81"], a: 1, why: "A Bíblia Católica tem 73 livros, incluindo os deuterocanônicos." },
  ],
  evangelico: [
    { q: "Qual é o maior livro da Bíblia?", opts: ["Gênesis", "Isaías", "Salmos", "Jeremias"], a: 2, why: "Salmos possui 150 capítulos." },
    { q: "Quem escreveu a maior parte das cartas do Novo Testamento?", opts: ["Pedro", "Paulo", "João", "Tiago"], a: 1, why: "O apóstolo Paulo escreveu 13 cartas." },
    { q: "Quantos livros tem a Bíblia Protestante?", opts: ["66", "73", "72", "60"], a: 0, why: "São 39 no Antigo e 27 no Novo Testamento." },
  ],
};

const PRIZES = ["1 Bônus", "Tente de novo", "2 Bônus", "Tente de novo", "Oração extra", "3 Bônus"];

function Index() {
  const [step, setStep] = useState(0);
  const [faith, setFaith] = useState<Faith>("evangelico");
  const [pi, setPi] = useState(0);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);

  const totalSteps = 6;
  const progress = Math.min(100, (step / totalSteps) * 100);
  const name = faith === "catolico" ? "católico" : "evangélico";

  const addXp = (n: number) => setXp((x) => x + n);

  return (
    <main className="min-h-screen bg-background">
      {step < 5 && (
        <div className="sticky top-0 z-20 border-b border-border bg-card/90 backdrop-blur">
          <div className="mx-auto flex max-w-2xl items-center gap-4 px-5 py-3">
            <span className="font-display text-lg font-bold text-primary">✝ Caminho da Fé</span>
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-muted">
              <div className="h-full rounded-full bg-gold-gradient transition-all duration-700" style={{ width: `${progress}%` }} />
            </div>
            <span className="rounded-full bg-accent px-3 py-1 text-sm font-extrabold text-accent-foreground">⭐ {xp} XP</span>
          </div>
        </div>
      )}

      {step === 0 && (
        <section className="bg-night-gradient px-5 py-16 text-primary-foreground">
          <div className="mx-auto max-w-2xl animate-rise text-center">
            <p className="mb-4 inline-block rounded-full border border-gold/50 px-4 py-1 text-sm font-bold text-gold">Teste gratuito • 2 minutos</p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">Qual é o seu nível de <span className="text-gold">intimidade com Deus</span>?</h1>
            <p className="mx-auto mt-5 max-w-lg text-lg opacity-85">Responda algumas perguntas, teste seu conhecimento bíblico e gire a roleta da bênção para ganhar um presente especial.</p>
            <p className="mt-10 text-lg font-bold">Para começar, qual é a sua fé?</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {([["catolico", "⛪", "Sou Católico"], ["evangelico", "📖", "Sou Evangélico"]] as const).map(([f, ic, l]) => (
                <button key={f} onClick={() => { setFaith(f); addXp(50); setStep(1); }}
                  className="rounded-2xl border-2 border-gold/40 bg-primary-foreground/5 p-6 text-xl font-extrabold transition hover:-translate-y-1 hover:border-gold hover:bg-primary-foreground/10">
                  <div className="mb-2 text-5xl">{ic}</div>{l}
                </button>
              ))}
            </div>
            <p className="mt-8 text-sm opacity-70">+ de 48.000 irmãos já fizeram o teste 🙏</p>
          </div>
        </section>
      )}

      {step === 1 && (
        <Card key={pi} label={`Pergunta ${pi + 1} de 4 • Perfil ${name}`} title={PROFILE[faith][pi]!.q}>
          <div className="grid gap-3">
            {PROFILE[faith][pi]!.opts.map((o) => (
              <Option key={o} onClick={() => { addXp(20); pi < 3 ? setPi(pi + 1) : setStep(2); }}>{o}</Option>
            ))}
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card label="Fase bônus 🏆" title={`Desafio Bíblico para ${faith === "catolico" ? "Católicos" : "Evangélicos"}`}>
          <p className="text-lg text-muted-foreground">Agora vamos testar seu conhecimento! São 3 perguntas. Cada acerto vale <b className="text-foreground">+100 XP</b>.</p>
          <Primary onClick={() => setStep(3)}>Aceitar o desafio</Primary>
        </Card>
      )}

      {step === 3 && (() => {
        const item = QUIZ[faith][qi]!;
        return (
          <Card key={qi} label={`Desafio ${qi + 1} de 3 • Acertos: ${score}`} title={item.q}>
            <div className="grid gap-3">
              {item.opts.map((o, i) => {
                const state = picked === null ? "idle" : i === item.a ? "right" : i === picked ? "wrong" : "dim";
                return <Option key={o} state={state} onClick={() => {
                  if (picked !== null) return;
                  setPicked(i);
                  if (i === item.a) { setScore((s) => s + 1); addXp(100); }
                }}>{o}</Option>;
              })}
            </div>
            {picked !== null && (
              <div className="animate-rise mt-5 rounded-xl bg-secondary p-4">
                <p className="font-extrabold">{picked === item.a ? "✅ Glória a Deus, você acertou!" : "📖 Quase! Vamos aprender juntos:"}</p>
                <p className="mt-1 text-muted-foreground">{item.why}</p>
                <Primary onClick={() => { setPicked(null); qi < 2 ? setQi(qi + 1) : setStep(4); }}>Continuar</Primary>
              </div>
            )}
          </Card>
        );
      })()}

      {step === 4 && <Wheel onDone={() => { addXp(200); setStep(5); }} />}

      {step === 5 && <Offer faith={faith} score={score} xp={xp} />}
    </main>
  );
}

function Card({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-2xl animate-rise px-5 py-12">
      <p className="text-sm font-extrabold uppercase tracking-wider text-gold-deep">{label}</p>
      <h2 className="mt-2 mb-6 text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      <div className="rounded-3xl bg-card p-5 shadow-soft md:p-7">{children}</div>
    </section>
  );
}

function Option({ children, onClick, state = "idle" }: { children: React.ReactNode; onClick: () => void; state?: string }) {
  const cls = {
    idle: "border-border hover:border-gold hover:bg-secondary",
    right: "border-success bg-success text-success-foreground",
    wrong: "border-destructive bg-destructive text-destructive-foreground",
    dim: "border-border opacity-50",
  }[state];
  return <button onClick={onClick} className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-lg font-bold transition ${cls}`}>{children}</button>;
}

function Primary({ children, onClick, pulse }: { children: React.ReactNode; onClick?: () => void; pulse?: boolean }) {
  return <button onClick={onClick} className={`mt-5 w-full rounded-2xl bg-gold-gradient px-6 py-5 text-xl font-extrabold text-accent-foreground shadow-gold transition hover:scale-[1.02] ${pulse ? "animate-glow" : ""}`}>{children}</button>;
}

function Wheel({ onDone }: { onDone: () => void }) {
  const [rot, setRot] = useState(0);
  const [spun, setSpun] = useState(false);
  const [done, setDone] = useState(false);
  const seg = 360 / PRIZES.length;
  const bg = useMemo(() => `conic-gradient(${PRIZES.map((_, i) => `var(${i % 2 ? "--primary" : "--gold"}) ${i * seg}deg ${(i + 1) * seg}deg`).join(",")})`, [seg]);
  const spin = () => {
    if (spun) return;
    setSpun(true);
    const target = 5; // 3 Bônus
    setRot(360 * 6 + (360 - (target * seg + seg / 2)));
    setTimeout(() => setDone(true), 5200);
  };
  return (
    <section className="mx-auto max-w-2xl animate-rise px-5 py-12 text-center">
      <p className="text-sm font-extrabold uppercase tracking-wider text-gold-deep">Recompensa desbloqueada</p>
      <h2 className="mt-2 text-3xl font-bold md:text-4xl">Gire a Roleta da Bênção 🎁</h2>
      <p className="mt-3 text-lg text-muted-foreground">Você completou o teste! Gire e descubra seu presente.</p>
      <div className="relative mx-auto mt-8 aspect-square w-full max-w-sm">
        <div className="absolute left-1/2 top-[-6px] z-10 -translate-x-1/2 text-4xl text-destructive">▼</div>
        <div className="h-full w-full rounded-full border-8 border-gold-deep shadow-gold"
          style={{ background: bg, transform: `rotate(${rot}deg)`, transition: "transform 5s cubic-bezier(.17,.67,.12,1)" }}>
          {PRIZES.map((p, i) => (
            <div key={p} className="absolute inset-0 flex justify-center pt-6" style={{ transform: `rotate(${i * seg + seg / 2}deg)` }}>
              <span className={`text-base font-extrabold ${i % 2 ? "text-primary-foreground" : "text-accent-foreground"}`}>{p}</span>
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card text-3xl shadow-soft">✝</div>
      </div>
      {!done ? <Primary pulse onClick={spin}>{spun ? "Girando..." : "GIRAR A ROLETA"}</Primary> : (
        <div className="animate-rise mt-6 rounded-3xl bg-night-gradient p-6 text-primary-foreground">
          <p className="text-2xl font-bold">🎉 Você ganhou <span className="text-gold">3 Bônus exclusivos</span>!</p>
          <p className="mt-1 opacity-80">Seus bônus exclusivos ficam reservados por 10 minutos.</p>
          <Primary onClick={onDone}>Resgatar meus bônus</Primary>
        </div>
      )}
    </section>
  );
}

function Countdown() {
  const [s, setS] = useState(600);
  useEffect(() => { const t = setInterval(() => setS((v) => Math.max(0, v - 1)), 1000); return () => clearInterval(t); }, []);
  return <>{String(Math.floor(s / 60)).padStart(2, "0")}:{String(s % 60).padStart(2, "0")}</>;
}

function Offer({ faith, score, xp }: { faith: Faith; score: number; xp: number }) {
  const cat = faith === "catolico";
  const level = score === 3 ? "Discípulo Dedicado" : score === 2 ? "Peregrino em Crescimento" : "Semente da Fé";
  const features = cat
    ? [["📿", "Terço e orações guiadas", "Mistérios do dia com áudio e meditação."], ["📖", "Liturgia diária explicada", "Entenda as leituras da Missa em linguagem simples."], ["⛪", "Catecismo descomplicado", "A doutrina da Igreja em lições de 5 minutos."], ["🕊️", "Vida dos Santos", "Histórias que inspiram sua caminhada."]]
    : [["🙏", "Devocional diário", "Uma palavra, uma reflexão e uma oração por dia."], ["📖", "Planos de leitura guiados", "Leia a Bíblia toda sem se perder."], ["🎓", "Estudos por livro e tema", "Explicações simples, versículo por versículo."], ["⛪", "Preparação para células", "Roteiros prontos para ensinar e compartilhar."]];
  const common = [["🔊", "Áudio para quem prefere ouvir"], ["🔠", "Letras grandes e fáceis de ler"], ["🏆", "Metas, conquistas e lembretes"], ["📱", "Funciona no celular, sem complicação"]];
  return (
    <div>
      <div className="sticky top-0 z-20 bg-destructive py-2 text-center text-sm font-extrabold text-destructive-foreground">⏳ Seus bônus ficam reservados por <Countdown /></div>
      <section className="bg-night-gradient px-5 py-14 text-center text-primary-foreground">
        <div className="mx-auto max-w-2xl animate-rise">
          <p className="text-gold font-bold">Resultado: {xp} XP • {score}/3 acertos</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">Você é um <span className="text-gold">{level}</span></h1>
          <p className="mx-auto mt-4 max-w-lg text-lg opacity-85">Seu coração já busca a Deus. O que falta é um caminho simples para estudar a Palavra todos os dias — e é exatamente isso que o <b>Caminho da Fé</b> entrega {cat ? "para católicos" : "para evangélicos"}.</p>
          <a href="#oferta"><Primary pulse>QUERO COMEÇAR AGORA</Primary></a>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Tudo o que você recebe</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {features.map(([i, t, d]) => (
            <div key={t} className="rounded-3xl bg-card p-6 shadow-soft"><div className="text-4xl">{i}</div><h3 className="mt-3 text-xl font-bold">{t}</h3><p className="mt-1 text-muted-foreground">{d}</p></div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {common.map(([i, t]) => <div key={t} className="flex items-center gap-3 rounded-2xl bg-secondary p-4 font-bold"><span className="text-2xl">{i}</span>{t}</div>)}
        </div>
      </section>

      <section className="bg-secondary px-5 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-3xl font-bold md:text-4xl">Quem usa, recomenda</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[["Maria, 64 anos", "Nunca consegui ler a Bíblia sozinha. Agora entendo cada passagem!"], ["Carlos, 38 anos", "Faço meu estudo em 10 minutos no ônibus. Mudou minha rotina com Deus."], ["Ana, 27 anos", "Simples, bonito e profundo. Minha fé se fortaleceu muito."]].map(([n, t]) => (
              <figure key={n} className="rounded-3xl bg-card p-6 shadow-soft"><p className="text-gold">★★★★★</p><blockquote className="mt-2 text-lg">“{t}”</blockquote><figcaption className="mt-3 font-extrabold">{n}</figcaption></figure>
            ))}
          </div>
        </div>
      </section>

      <section id="oferta" className="px-5 py-14">
        <h2 className="text-center text-3xl font-bold md:text-4xl">Escolha seu plano</h2>
        <div className="mx-auto mt-8 grid max-w-4xl items-start gap-6 md:grid-cols-2">
          <div className="rounded-3xl border-2 border-border bg-card p-8 text-center shadow-soft">
            <h3 className="text-2xl font-bold">Plano Mensal</h3>
            <ul className="mt-5 space-y-2 text-left text-lg">
              {["App completo " + (cat ? "católico" : "evangélico"), "Novos estudos toda semana", "Cancele quando quiser"].map((b) => <li key={b}>✅ {b}</li>)}
            </ul>
            <p className="mt-6 font-display text-5xl font-bold text-primary">R$ 37,90</p>
            <p className="text-muted-foreground">por mês</p>
            <button className="mt-5 w-full rounded-2xl border-2 border-primary px-6 py-4 text-lg font-extrabold text-primary transition hover:bg-primary hover:text-primary-foreground">Assinar mensal</button>
          </div>
          <div className="relative rounded-3xl border-4 border-gold bg-card p-8 text-center shadow-gold">
            <p className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-gradient px-4 py-1 text-sm font-extrabold text-accent-foreground">⭐ MAIS ESCOLHIDO</p>
            <h3 className="text-2xl font-bold">Plano Vitalício + Bônus</h3>
            <ul className="mt-5 space-y-2 text-left text-lg">
              {["App completo " + (cat ? "católico" : "evangélico"), "Acesso para sempre, pague 1 vez", "🎁 Bônus: 30 orações poderosas", "🎁 Bônus: Guia ‘Bíblia em 1 ano’", "🎁 Bônus: Devocional em áudio", "Todas as atualizações futuras"].map((b) => <li key={b}>✅ {b}</li>)}
            </ul>
            <p className="mt-6 font-display text-5xl font-bold text-primary">R$ 67,90</p>
            <p className="text-muted-foreground">pagamento único • menos que 2 meses do mensal</p>
            <Primary pulse>GARANTIR ACESSO VITALÍCIO</Primary>
          </div>
        </div>
        <p className="mt-6 text-center text-sm text-muted-foreground">🔒 Compra segura • 🛡️ Garantia de 7 dias ou seu dinheiro de volta</p>
      </section>

      <section className="mx-auto max-w-2xl px-5 pb-16">
        <h2 className="text-center text-3xl font-bold">Perguntas frequentes</h2>
        <div className="mt-6 space-y-3">
          {[["Preciso saber usar tecnologia?", "Não. O app é pensado para todas as idades, com letras grandes e botões simples."], ["Funciona para a minha igreja?", cat ? "Sim, todo o conteúdo segue a doutrina da Igreja Católica." : "Sim, o conteúdo é bíblico e serve para todas as denominações evangélicas."], ["Como recebo o acesso?", "Imediatamente após a compra, pelo seu e-mail."], ["E se eu não gostar?", "Você tem 7 dias de garantia. Devolvemos 100% do valor."]].map(([q, a]) => (
            <details key={q} className="rounded-2xl bg-card p-5 shadow-soft"><summary className="cursor-pointer text-lg font-extrabold">{q}</summary><p className="mt-2 text-muted-foreground">{a}</p></details>
          ))}
        </div>
        <p className="mt-10 text-center font-display text-xl italic text-muted-foreground">“Lâmpada para os meus pés é a tua palavra.” — Salmos 119:105</p>
      </section>
    </div>
  );
}
