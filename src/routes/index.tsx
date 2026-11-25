import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppShowcase } from "../components/AppShowcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Caminho da Fé — Descubra seu nível de intimidade com Deus" },
      {
        name: "description",
        content:
          "Faça o quiz, gire a roleta e ganhe acesso ao app que simplifica seus estudos bíblicos.",
      },
      { property: "og:title", content: "Caminho da Fé — Quiz da Fé" },
      {
        property: "og:description",
        content: "Responda, gire a roleta e desbloqueie seu desconto no app de estudos bíblicos.",
      },
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
    {
      q: "Com que frequência você reza o Terço?",
      opts: ["Todos os dias", "Algumas vezes por semana", "Raramente", "Quero começar"],
    },
    {
      q: "Você já leu a Bíblia inteira, junto com o Catecismo?",
      opts: ["Sim, completa", "Só os Evangelhos", "Algumas partes", "Ainda não"],
    },
    {
      q: "O que mais te impede de estudar a Palavra?",
      opts: [
        "Falta de tempo",
        "Acho difícil entender",
        "Não sei por onde começar",
        "Falta de disciplina",
      ],
    },
    {
      q: "Como você gostaria de viver a Santa Missa?",
      opts: ["Entendendo cada parte", "Com mais devoção", "Participando mais", "Tudo isso"],
    },
  ],
  evangelico: [
    {
      q: "Você faz seu devocional diário?",
      opts: ["Todos os dias", "Algumas vezes por semana", "Raramente", "Quero começar"],
    },
    {
      q: "Já completou um plano de leitura da Bíblia?",
      opts: ["Sim, mais de uma vez", "Comecei e parei", "Só alguns livros", "Ainda não"],
    },
    {
      q: "O que mais te impede de estudar a Palavra?",
      opts: [
        "Falta de tempo",
        "Acho difícil entender",
        "Não sei por onde começar",
        "Falta de disciplina",
      ],
    },
    {
      q: "Como você gostaria de servir na sua igreja?",
      opts: ["Ensinando a Palavra", "No louvor", "Em células/grupos", "Ainda descobrindo"],
    },
  ],
};

type QZ = { q: string; opts: string[]; a: number; why: string };
const QUIZ: Record<Faith, QZ[]> = {
  catolico: [
    {
      q: "Quantos mistérios tem o Santo Rosário?",
      opts: ["15", "20", "12", "7"],
      a: 1,
      why: "São 20: Gozosos, Luminosos, Dolorosos e Gloriosos.",
    },
    {
      q: "Quem foi o primeiro Papa da Igreja?",
      opts: ["São Paulo", "São João", "São Pedro", "São Tiago"],
      a: 2,
      why: "Jesus disse: “Tu és Pedro, e sobre esta pedra edificarei a minha Igreja” (Mt 16,18).",
    },
    {
      q: "Quantos livros tem a Bíblia Católica?",
      opts: ["66", "73", "70", "81"],
      a: 1,
      why: "A Bíblia Católica tem 73 livros, incluindo os deuterocanônicos.",
    },
  ],
  evangelico: [
    {
      q: "Qual é o maior livro da Bíblia?",
      opts: ["Gênesis", "Isaías", "Salmos", "Jeremias"],
      a: 2,
      why: "Salmos possui 150 capítulos.",
    },
    {
      q: "Quem escreveu a maior parte das cartas do Novo Testamento?",
      opts: ["Pedro", "Paulo", "João", "Tiago"],
      a: 1,
      why: "O apóstolo Paulo escreveu 13 cartas.",
    },
    {
      q: "Quantos livros tem a Bíblia Protestante?",
      opts: ["66", "73", "72", "60"],
      a: 0,
      why: "São 39 no Antigo e 27 no Novo Testamento.",
    },
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
              <div
                className="h-full rounded-full bg-gold-gradient transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="rounded-full bg-accent px-3 py-1 text-sm font-extrabold text-accent-foreground">
              ⭐ {xp} XP
            </span>
          </div>
        </div>
      )}

      {step === 0 && (
        <section className="bg-night-gradient px-5 py-16 text-primary-foreground">
          <div className="mx-auto max-w-2xl animate-rise text-center">
            <p className="mb-4 inline-block rounded-full border border-gold/50 px-4 py-1 text-sm font-bold text-gold">
              Comece já!
            </p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">
              Qual é o seu nível de <span className="text-gold">intimidade com Deus</span>?
            </h1>
            <p className="mx-auto mt-5 max-w-lg text-lg opacity-85">
              Responda algumas perguntas, teste seu conhecimento bíblico e gire a roleta da bênção
              para ganhar um presente especial.
            </p>
            <p className="mt-10 text-lg font-bold">Para começar, qual é a sua fé?</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["catolico", "⛪", "Sou Católico"],
                  ["evangelico", "📖", "Sou Evangélico"],
                ] as const
              ).map(([f, ic, l]) => (
                <button
                  key={f}
                  onClick={() => {
                    setFaith(f);
                    addXp(50);
                    setStep(1);
                  }}
                  className="rounded-2xl border-2 border-gold/40 bg-primary-foreground/5 p-6 text-xl font-extrabold transition hover:-translate-y-1 hover:border-gold hover:bg-primary-foreground/10"
                >
                  <div className="mb-2 text-5xl">{ic}</div>
                  {l}
                </button>
              ))}
            </div>
            <p className="mt-8 text-sm opacity-70">+ de 48.000 irmãos já fizeram o teste 🙏</p>
          </div>
        </section>
      )}

      {step === 1 && (
        <Card
          key={pi}
          label={`Pergunta ${pi + 1} de 4 • Perfil ${name}`}
          title={PROFILE[faith][pi]!.q}
        >
          <div className="grid gap-3">
            {PROFILE[faith][pi]!.opts.map((o) => (
              <Option
                key={o}
                onClick={() => {
                  addXp(20);
                  pi < 3 ? setPi(pi + 1) : setStep(2);
                }}
              >
                {o}
              </Option>
            ))}
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card
          label="Fase bônus 🏆"
          title={`Desafio Bíblico para ${faith === "catolico" ? "Católicos" : "Evangélicos"}`}
        >
          <p className="text-lg text-muted-foreground">
            Agora vamos testar seu conhecimento! São 3 perguntas. Cada acerto vale{" "}
            <b className="text-foreground">+100 XP</b>.
          </p>
          <Primary onClick={() => setStep(3)}>Aceitar o desafio</Primary>
        </Card>
      )}

      {step === 3 &&
        (() => {
          const item = QUIZ[faith][qi]!;
          return (
            <Card key={qi} label={`Desafio ${qi + 1} de 3 • Acertos: ${score}`} title={item.q}>
              <div className="grid gap-3">
                {item.opts.map((o, i) => {
                  const state =
                    picked === null
                      ? "idle"
                      : i === item.a
                        ? "right"
                        : i === picked
                          ? "wrong"
                          : "dim";
                  return (
                    <Option
                      key={o}
                      state={state}
                      onClick={() => {
                        if (picked !== null) return;
                        setPicked(i);
                        if (i === item.a) {
                          setScore((s) => s + 1);
                          addXp(100);
                        }
                      }}
                    >
                      {o}
                    </Option>
                  );
                })}
              </div>
              {picked !== null && (
                <div className="animate-rise mt-5 rounded-xl bg-secondary p-4">
                  <p className="font-extrabold">
                    {picked === item.a
                      ? "✅ Glória a Deus, você acertou!"
                      : "📖 Quase! Vamos aprender juntos:"}
                  </p>
                  <p className="mt-1 text-muted-foreground">{item.why}</p>
                  <Primary
                    onClick={() => {
                      setPicked(null);
                      qi < 2 ? setQi(qi + 1) : setStep(4);
                    }}
                  >
                    Continuar
                  </Primary>
                </div>
              )}
            </Card>
          );
        })()}

      {step === 4 && (
        <Wheel
          onDone={() => {
            addXp(200);
            setStep(5);
          }}
        />
      )}

      {step === 5 && <Offer faith={faith} score={score} xp={xp} />}
    </main>
  );
}

function Card({
  label,
  title,
  children,
}: {
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-2xl animate-rise px-5 py-12">
      <p className="text-sm font-extrabold uppercase tracking-wider text-gold-deep">{label}</p>
      <h2 className="mt-2 mb-6 text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      <div className="rounded-3xl bg-card p-5 shadow-soft md:p-7">{children}</div>
    </section>
  );
}

function Option({
  children,
  onClick,
  state = "idle",
}: {
  children: React.ReactNode;
  onClick: () => void;
  state?: string;
}) {
  const cls = {
    idle: "border-border hover:border-gold hover:bg-secondary",
    right: "border-success bg-success text-success-foreground",
    wrong: "border-destructive bg-destructive text-destructive-foreground",
    dim: "border-border opacity-50",
  }[state];
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-2xl border-2 px-5 py-4 text-left text-lg font-bold transition ${cls}`}
    >
      {children}
    </button>
  );
}

function Primary({
  children,
  onClick,
  pulse,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  pulse?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`mt-5 w-full rounded-2xl bg-gold-gradient px-6 py-5 text-xl font-extrabold text-accent-foreground shadow-gold transition hover:scale-[1.02] ${pulse ? "animate-glow" : ""}`}
    >
      {children}
    </button>
  );
}

function Wheel({ onDone }: { onDone: () => void }) {
  const [rot, setRot] = useState(0);
  const [spun, setSpun] = useState(false);
  const [done, setDone] = useState(false);
  const seg = 360 / PRIZES.length;
  const bg = useMemo(
    () =>
      `conic-gradient(${PRIZES.map((_, i) => `var(${i % 2 ? "--primary" : "--gold"}) ${i * seg}deg ${(i + 1) * seg}deg`).join(",")})`,
    [seg],
  );
  const spin = () => {
    if (spun) return;
    setSpun(true);
    const target = 5; // 3 Bônus
    setRot(360 * 6 + (360 - (target * seg + seg / 2)));
    setTimeout(() => setDone(true), 5200);
  };
  return (
    <section className="mx-auto max-w-2xl animate-rise px-5 py-12 text-center">
      <p className="text-sm font-extrabold uppercase tracking-wider text-gold-deep">
        Recompensa desbloqueada
      </p>
      <h2 className="mt-2 text-3xl font-bold md:text-4xl">Gire a Roleta da Bênção 🎁</h2>
      <p className="mt-3 text-lg text-muted-foreground">
        Você completou o teste! Gire e descubra seu presente.
      </p>
      <div className="relative mx-auto mt-8 aspect-square w-full max-w-sm">
        <div className="absolute left-1/2 top-[-6px] z-10 -translate-x-1/2 text-4xl text-destructive">
          ▼
        </div>
        <div
          className="h-full w-full rounded-full border-8 border-gold-deep shadow-gold"
          style={{
            background: bg,
            transform: `rotate(${rot}deg)`,
            transition: "transform 5s cubic-bezier(.17,.67,.12,1)",
          }}
        >
          {PRIZES.map((p, i) => (
            <div
              key={p}
              className="absolute inset-0 flex justify-center pt-6"
              style={{ transform: `rotate(${i * seg + seg / 2}deg)` }}
            >
              <span
                className={`text-base font-extrabold ${i % 2 ? "text-primary-foreground" : "text-accent-foreground"}`}
              >
                {p}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-card text-3xl shadow-soft">
          ✝
        </div>
      </div>
      {!done ? (
        <Primary pulse onClick={spin}>
          {spun ? "Girando..." : "GIRAR A ROLETA"}
        </Primary>
      ) : (
        <div className="animate-rise mt-6 rounded-3xl bg-night-gradient p-6 text-primary-foreground">
          <p className="text-2xl font-bold">
            🎉 Você ganhou <span className="text-gold">3 Bônus exclusivos</span>!
          </p>
          <p className="mt-1 opacity-80">Seus bônus exclusivos ficam reservados por 10 minutos.</p>
          <Primary onClick={onDone}>Resgatar meus bônus</Primary>
        </div>
      )}
    </section>
  );
}

function Countdown() {
  const [s, setS] = useState(600);
  useEffect(() => {
    const t = setInterval(() => setS((v) => Math.max(0, v - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <>
      {String(Math.floor(s / 60)).padStart(2, "0")}:{String(s % 60).padStart(2, "0")}
    </>
  );
}

function Offer({ faith, score, xp }: { faith: Faith; score: number; xp: number }) {
  const cat = faith === "catolico";
  const level =
    score === 3 ? "Discípulo Dedicado" : score === 2 ? "Peregrino em Crescimento" : "Semente da Fé";

  const journey = [
    {
      n: "1",
      title: "Abra o app",
      text: "Um botão grande. Sem complicação.",
      img: "/offer/offer-facil.jpg",
      anim: "animate-float",
    },
    {
      n: "2",
      title: "Leia ou ouça",
      text: "Letras grandes ou áudio guiado.",
      img: "/offer/offer-audio.jpg",
      anim: "animate-bounce-soft",
    },
    {
      n: "3",
      title: "Ore e cresça",
      text: "Em poucos minutos, todo dia.",
      img: "/offer/offer-oracao.jpg",
      anim: "animate-pulse-scale",
    },
  ];

  const bonuses = [
    { icon: "📖", title: "Bônus de + de 100 orações poderosas", delay: "stagger-1" },
    {
      icon: "📱",
      title: "extensões de leitura bíblica em conjunto com plataformas",
      delay: "stagger-2",
    },
    {
      icon: "✞︎",
      title: "Conteúdo exclusivo em áudios e vídeos em alta qualidade",
      delay: "stagger-3",
    },
  ];

  return (
    <div>
      <div className="sticky top-0 z-20 bg-destructive py-2 text-center text-sm font-extrabold text-destructive-foreground">
        <span className="inline-block animate-pulse-scale">⏳</span> Seus bônus ficam reservados por{" "}
        <Countdown />
      </div>

      {/* Transição animada da roleta → oferta */}
      <section className="overflow-hidden bg-night-gradient px-5 py-10 text-center text-primary-foreground">
        <div className="mx-auto max-w-2xl animate-reveal-up">
          <div className="mx-auto mb-5 h-28 w-28 overflow-hidden rounded-full border-4 border-gold shadow-gold animate-float">
            <img
              src="/offer/offer-bonus.jpg"
              alt="Seus bônus desbloqueados"
              className="h-full w-full object-cover"
            />
          </div>
          <p className="text-gold font-bold animate-rise">
            Resultado: {xp} XP • {score}/3 acertos
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Você é um <span className="text-gold">{level}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg opacity-85">
            Seu coração já busca a Deus. Agora veja, de forma simples, como o <b>Caminho da Fé</b>{" "}
            ajuda {cat ? "católicos" : "evangélicos"} a estudar a Palavra todo dia — sem
            complicação.
          </p>
          <div className="mt-6 flex flex-col items-center gap-1 text-gold">
            <span className="text-sm font-extrabold uppercase tracking-wider">
              Veja como funciona
            </span>
            <span className="text-3xl animate-arrow-nudge">↓</span>
          </div>
        </div>
      </section>

      {/* Jornada visual em 3 passos */}
      <section className="mx-auto max-w-4xl px-5 py-14">
        <h2 className="animate-reveal-up text-center text-3xl font-bold md:text-4xl">
          Simples assim — em 3 passos
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-lg text-muted-foreground">
          Feito para quem quer crescer na fé sem se perder em tecnologia.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {journey.map((step, i) => (
            <article
              key={step.n}
              className={`animate-path-step relative overflow-hidden rounded-3xl bg-card shadow-soft ${["stagger-1", "stagger-2", "stagger-3"][i]}`}
            >
              <div className="relative aspect-4/3 overflow-hidden w-full p-3">
                <img
                  src={step.img}
                  alt={step.title}
                  className="h-full w-fit rounded-2xl shadow-gray-400 shadow-md object-contain bg-border/50 m-auto "
                />
                <span
                  className={`absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold-gradient text-xl font-extrabold text-accent-foreground shadow-gold ${step.anim}`}
                >
                  {step.n}
                </span>
              </div>
              <div className="p-5 text-center">
                <h3 className="text-xl font-bold">{step.title}</h3>
                <p className="mt-1 text-muted-foreground">{step.text}</p>
              </div>
              {i < journey.length - 1 && (
                <span className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 text-3xl text-gold md:block animate-float">
                  →
                </span>
              )}
            </article>
          ))}
        </div>
        <a href="#oferta" className="mx-auto mt-8 block max-w-md">
          <Primary pulse>QUERO ESSE CAMINHO SIMPLES</Primary>
        </a>
      </section>

      <AppShowcase faith={faith} />

      {/* Depoimentos animados */}
      <section className="mx-auto max-w-4xl px-5 py-14">
        <h2 className="animate-reveal-up text-center text-3xl font-bold md:text-4xl">
          Quem usa, recomenda
        </h2>
        <div className=" mt-8 grid gap-4 md:grid-cols-3">
          {[
            {
              n: "Maria, 64 anos",
              t: "Nunca consegui ler a Bíblia sozinha. Agora entendo cada passagem!",
              delay: "stagger-1",
            },
            {
              n: "Carlos, 38 anos",
              t: "Faço meu estudo no ônibus indo para o trabalho. Mudou minha rotina com Deus.",
              delay: "stagger-2",
            },
            {
              n: "Ana, 27 anos",
              t: "Simples, bonito e profundo. Minha fé se fortaleceu muito. Fora a facilidade de puxar o celular e ter tudo na palma da mão",
              delay: "stagger-3",
            },
          ].map((item) => (
            <figure
              key={item.n}
              className={`animate-reveal-up ${item.delay} rounded-3xl bg-card p-6 shadow-soft`}
            >
              <p className="animate-rise text-gold">★★★★★</p>
              <blockquote className="mt-2 text-lg">“{item.t}”</blockquote>
              <figcaption className="mt-3 font-extrabold">{item.n}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Oferta final — planos animados */}
      <section id="oferta" className="bg-night-gradient px-5 py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl">
          <div className="animate-reveal-up text-center">
            <div className="mx-auto mb-5 h-24 w-24 overflow-hidden rounded-2xl border-2 border-gold shadow-gold animate-float">
              <img
                src="/offer/offer-planos.jpg"
                alt="Escolha entre mensal e vitalício"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-3xl font-bold md:text-5xl">
              Escolha seu plano — <span className="text-gold">é fácil</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg opacity-85">
              Dois caminhos claros. Compare lado a lado e escolha o que faz sentido para você.
            </p>
          </div>

          {/* Mini guia visual */}
          <div className="mx-auto mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
            <div className="animate-path-step stagger-1 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/5 p-4 text-center">
              <p className="text-sm opacity-70">Opção flexível</p>
              <p className="mt-1 text-xl font-extrabold">Mês a mês</p>
              <p className="text-gold font-bold">R$ 37,90</p>
            </div>
            <div className="animate-path-step stagger-2 relative overflow-hidden rounded-2xl border-2 border-gold bg-gold/15 p-4 text-center">
              <div className="pointer-events-none absolute inset-0 animate-spotlight" aria-hidden />
              <p className="relative text-sm text-gold">Mais vantajoso</p>
              <p className="relative mt-1 text-xl font-extrabold">Paga 1 vez</p>
              <p className="relative text-gold font-bold">R$ 67,90</p>
            </div>
          </div>

          <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
            {/* Plano mensal */}
            <div className="animate-reveal-up stagger-1 flex flex-col rounded-3xl border-2 border-primary-foreground/15 bg-card p-8 text-center text-card-foreground shadow-soft">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-3xl animate-float">
                📿
              </div>
              <h3 className="mt-4 text-2xl font-bold">Plano Mensal</h3>
              <p className="mt-1 text-sm text-muted-foreground">Ideal para experimentar</p>
              <ul className="mt-5 flex-1 space-y-3 text-left text-lg">
                {[
                  "App completo " + (cat ? "católico" : "evangélico"),
                  "Novos estudos toda semana",
                  "Cancele quando quiser",
                ].map((b, i) => (
                  <li
                    key={b}
                    className={`animate-draw-check flex items-start gap-2 ${["stagger-1", "stagger-2", "stagger-3"][i]}`}
                  >
                    <span className="mt-0.5 text-success">✅</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <p className="animate-price-pop font-display text-5xl font-bold text-primary">
                  R$ 37,90
                </p>
                <p className="text-muted-foreground">por mês</p>
              </div>
              <button className="mt-5 w-full rounded-2xl border-2 border-primary px-6 py-4 text-lg font-extrabold text-primary transition hover:bg-primary hover:text-primary-foreground">
                Assinar mensal
              </button>
            </div>

            {/* Plano vitalício */}
            <div className="animate-reveal-up stagger-2 relative flex flex-col rounded-3xl border-4 border-gold bg-card p-8 text-center text-card-foreground shadow-gold">
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl animate-spotlight"
                aria-hidden
              />
              <p className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-gradient px-4 py-1 text-sm font-extrabold text-accent-foreground animate-bounce-soft">
                ⭐ MAIS ESCOLHIDO • MELHOR CUSTO
              </p>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-gradient text-3xl animate-pulse-scale">
                ✞︎
              </div>
              <h3 className="mt-4 text-2xl font-bold">Plano Vitalício + Bônus</h3>
              <p className="mt-1 text-sm font-bold text-gold-deep">
                Pague uma vez • use para sempre
              </p>

              <div className="mt-5 grid gap-2">
                {bonuses.map((b) => (
                  <div
                    key={b.title}
                    className={`animate-path-step ${b.delay} flex items-center gap-3 rounded-xl bg-secondary px-3 py-2 text-left font-bold`}
                  >
                    <span className="animate-wiggle text-2xl">{b.icon}</span>
                    <span>{b.title}</span>
                  </div>
                ))}
              </div>

              <ul className="mt-5 flex-1 space-y-3 text-left text-lg">
                {[
                  "App completo " + (cat ? "católico" : "evangélico"),
                  "Acesso para sempre, pague 1 vez",
                  "Todas as atualizações futuras",
                ].map((b, i) => (
                  <li
                    key={b}
                    className={`animate-draw-check flex items-start gap-2 ${["stagger-1", "stagger-2", "stagger-3"][i]}`}
                  >
                    <span className="mt-0.5 text-success">✅</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-4 rounded-2xl bg-secondary/80 p-3">
                <p className="text-sm text-muted-foreground line-through">De R$ 37,90 / mês</p>
                <p className="text-sm font-bold text-gold-deep">
                  Economize pagando só R$ 67,90 uma vez
                </p>
              </div>

              <div className="mt-4">
                <p className="animate-price-pop font-display text-5xl font-bold text-primary">
                  R$ 67,90
                </p>
                <p className="text-muted-foreground">pagamento único • oferta por tempo limitado</p>
              </div>
              <Primary pulse>GARANTIR ACESSO VITALÍCIO</Primary>
            </div>
          </div>

          <p className="mt-8 text-center text-sm opacity-80">
            🔒 Compra segura • 🛡️ Garantia de 7 dias ou seu dinheiro de volta
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-5 py-14 pb-16">
        <h2 className="animate-reveal-up text-center text-3xl font-bold">Perguntas frequentes</h2>
        <div className="mt-6 space-y-3">
          {[
            {
              q: "Preciso saber usar tecnologia?",
              a: "Não. O app é pensado para todas as idades, com letras grandes e botões simples.",
              delay: "stagger-1",
            },
            {
              q: "Funciona para a minha igreja?",
              a: cat
                ? "Sim, todo o conteúdo segue a doutrina da Igreja Católica."
                : "Sim, o conteúdo é bíblico e serve para todas as denominações evangélicas.",
              delay: "stagger-2",
            },
            {
              q: "Como recebo o acesso?",
              a: "Imediatamente após a compra, pelo seu e-mail.",
              delay: "stagger-3",
            },
            {
              q: "E se eu não gostar?",
              a: "Você tem 7 dias de garantia. Devolvemos 100% do valor.",
              delay: "stagger-4",
            },
          ].map((item) => (
            <details
              key={item.q}
              className={`animate-reveal-up ${item.delay} rounded-2xl bg-card p-5 shadow-soft`}
            >
              <summary className="cursor-pointer text-lg font-extrabold">{item.q}</summary>
              <p className="mt-2 text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-10 text-center font-display text-xl italic text-muted-foreground">
          “Lâmpada para os meus pés é a tua palavra.” — Salmos 119:105
        </p>
      </section>
    </div>
  );
}
