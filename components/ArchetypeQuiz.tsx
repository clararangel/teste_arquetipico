"use client";

import { useEffect, useMemo, useState } from "react";
import { calculateResult } from "@/lib/scoring";
import {
  Answer,
  Result,
  likertOptions,
  questions
} from "@/lib/quiz-data";

type QuizStage = "landing" | "quiz" | "result";

type StoredQuizState = {
  stage: QuizStage;
  currentQuestionIndex: number;
  answers: Answer;
};

const STORAGE_KEY = "teste-dos-arquetipos-clara-rangel";

export function ArchetypeQuiz() {
  const [stage, setStage] = useState<QuizStage>("landing");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [shareStatus, setShareStatus] = useState("");

  useEffect(() => {
    const storedState = window.localStorage.getItem(STORAGE_KEY);

    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState) as StoredQuizState;

        if (parsedState.answers && parsedState.stage) {
          setStage(parsedState.stage);
          setAnswers(parsedState.answers);
          setCurrentQuestionIndex(
            Math.min(parsedState.currentQuestionIndex ?? 0, questions.length - 1)
          );
        }
      } catch {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const stateToStore: StoredQuizState = {
      stage,
      currentQuestionIndex,
      answers
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToStore));
  }, [answers, currentQuestionIndex, isLoaded, stage]);

  const currentQuestion = questions[currentQuestionIndex];
  const answeredCount = Object.keys(answers).length;
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;
  const result = useMemo<Result>(() => calculateResult(answers), [answers]);
  const selectedValue = answers[currentQuestion.id];

  function beginQuiz() {
    setStage("quiz");
    setCurrentQuestionIndex(0);
    setShareStatus("");
  }

  function selectAnswer(value: number) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: value
    }));
  }

  function goToPreviousQuestion() {
    setCurrentQuestionIndex((index) => Math.max(index - 1, 0));
    setShareStatus("");
  }

  function goToNextQuestion() {
    if (currentQuestionIndex === questions.length - 1) {
      setStage("result");
      setShareStatus("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restartQuiz() {
    const cleanAnswers: Answer = {};

    setAnswers(cleanAnswers);
    setCurrentQuestionIndex(0);
    setStage("quiz");
    setShareStatus("");
    window.localStorage.removeItem(STORAGE_KEY);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function shareResult() {
    const shareText = `Meu arquétipo dominante no Teste dos Arquétipos é ${result.dominant.archetype.name}. Secundário: ${result.secondary.archetype.name}. Terciário: ${result.tertiary.archetype.name}.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Meu resultado no Teste dos Arquétipos",
          text: shareText,
          url: window.location.href
        });
        setShareStatus("Resultado compartilhado.");
        return;
      }

      await navigator.clipboard.writeText(shareText);
      setShareStatus("Resultado copiado para compartilhar.");
    } catch {
      setShareStatus("Não foi possível compartilhar agora.");
    }
  }

  if (stage === "quiz") {
    return (
      <main className="min-h-screen bg-ivory text-ink">
        <QuizHeader answeredCount={answeredCount} />

        <section className="mx-auto flex w-full max-w-4xl flex-col px-5 pb-12 pt-6 md:px-8 md:pt-10">
          <div className="mb-7 overflow-hidden rounded-full border border-marsala/15 bg-porcelain">
            <div
              className="h-2 rounded-full bg-marsala transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          <article className="editorial-card animate-in">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-sm text-coffee/75">
              <span>
                Questão {currentQuestionIndex + 1} de {questions.length}
              </span>
              <span className="rounded-full border border-bronze/25 px-3 py-1 text-bronze">
                {currentQuestion.dimension}
              </span>
            </div>

            <h1 className="serif-title text-3xl leading-tight text-wine md:text-5xl">
              {currentQuestion.statement}
            </h1>

            <div className="mt-10 grid gap-3">
              {likertOptions.map((option) => {
                const isSelected = selectedValue === option.value;

                return (
                  <button
                    className={`likert-option ${isSelected ? "is-selected" : ""}`}
                    key={option.value}
                    onClick={() => selectAnswer(option.value)}
                    type="button"
                  >
                    <span className="likert-number">{option.value}</span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                className="secondary-button"
                disabled={currentQuestionIndex === 0}
                onClick={goToPreviousQuestion}
                type="button"
              >
                Anterior
              </button>

              <button
                className="primary-button"
                disabled={selectedValue === undefined}
                onClick={goToNextQuestion}
                type="button"
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Ver resultado"
                  : "Próxima"}
              </button>
            </div>
          </article>
        </section>

        <Footer />
      </main>
    );
  }

  if (stage === "result") {
    return (
      <main className="min-h-screen bg-porcelain text-ink">
        <ResultView
          onRestart={restartQuiz}
          onShare={shareResult}
          result={result}
          shareStatus={shareStatus}
        />
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-ivory text-ink">
      <LandingView onBegin={beginQuiz} />
      <Footer />
    </main>
  );
}

function QuizHeader({ answeredCount }: { answeredCount: number }) {
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-6 md:px-8">
      <div>
        <p className="text-xs uppercase text-bronze">Diagnóstico gratuito</p>
        <p className="serif-title mt-1 text-2xl text-wine">
          Teste dos Arquétipos
        </p>
      </div>

      <p className="rounded-full border border-marsala/15 bg-porcelain px-4 py-2 text-sm text-coffee">
        {answeredCount}/{questions.length} respostas
      </p>
    </header>
  );
}

function LandingView({ onBegin }: { onBegin: () => void }) {
  return (
    <section className="hero-shell">
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-5 py-7 md:px-8 md:py-10">
        <header className="flex flex-wrap items-center justify-between gap-4 text-sm text-porcelain/80">
          <span>Clara Rangel</span>
          <span>Arquétipos e posicionamento</span>
        </header>

        <div className="max-w-4xl py-16 md:py-20">
          <p className="mb-6 text-sm uppercase text-bronze">
            Diagnóstico estratégico gratuito
          </p>

          <h1 className="serif-title max-w-3xl text-5xl leading-none text-porcelain md:text-7xl">
            Teste de Arquétipo
          </h1>

          <p className="mt-7 max-w-2xl text-xl leading-8 text-porcelain/90 md:text-2xl">
            Descubra qual arquétipo guia a sua marca, sua comunicação e sua
            forma de gerar desejo.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-porcelain/75">
            Desenvolvido por Clara Rangel — especialista em arquétipos e
            posicionamento.
          </p>

          <button className="hero-button mt-9" onClick={onBegin} type="button">
            Começar teste
          </button>
        </div>

        <div className="landing-note">
          <p>
            Este teste analisa padrões de comportamento, comunicação, desejo,
            decisão e posicionamento para identificar seu arquétipo dominante,
            secundário e terciário.
          </p>
        </div>
      </div>
    </section>
  );
}

function ResultView({
  onRestart,
  onShare,
  result,
  shareStatus
}: {
  onRestart: () => void;
  onShare: () => void;
  result: Result;
  shareStatus: string;
}) {
  const dominant = result.dominant.archetype;
  const secondary = result.secondary.archetype;
  const tertiary = result.tertiary.archetype;

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 md:px-8 md:py-16">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase text-bronze">
            Resultado do diagnóstico
          </p>
          <h1 className="serif-title mt-3 max-w-4xl text-4xl leading-tight text-wine md:text-6xl">
            Seu arquétipo dominante é: {dominant.name}
          </h1>
        </div>

        <a
          className="primary-button"
          href="https://www.instagram.com/clararangelmkt"
          rel="noreferrer"
          target="_blank"
        >
          Falar com Clara sobre meu posicionamento
        </a>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="editorial-card animate-in">
          <p className="mb-8 text-lg leading-8 text-coffee">
            {dominant.shortDescription}
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <ResultPill
              label="Arquétipo secundário"
              name={secondary.name}
              score={result.secondary.score}
            />
            <ResultPill
              label="Arquétipo terciário"
              name={tertiary.name}
              score={result.tertiary.score}
            />
          </div>

          <div className="mt-9 border-t border-marsala/10 pt-8">
            <h2 className="serif-title text-3xl text-wine">
              Combinação estratégica
            </h2>
            <p className="mt-4 leading-8 text-coffee">
              {result.strategicCombination}
            </p>
          </div>
        </article>

        <aside className="space-y-4">
          <ResultBlock title="Essência" text={dominant.essence} />
          <ResultBlock title="Força de marca" text={dominant.brandStrength} />
          <ResultBlock
            title="Estilo de comunicação"
            text={dominant.communicationStyle}
          />
        </aside>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <ResultBlock title="Direção de conteúdo" text={dominant.contentDirection} />
        <ResultBlock title="Ponto de atenção" text={dominant.pointOfAttention} />
        <ResultBlock
          title="Como esse arquétipo pode aparecer na sua marca pessoal"
          text={dominant.positioningAdvice}
        />
      </div>

      <section className="mt-8 rounded-[8px] border border-marsala/10 bg-ivory/70 p-5 md:p-7">
        <h2 className="serif-title text-2xl text-wine">
          Leitura dos 12 arquétipos
        </h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {result.ranking.map((item) => (
            <div
              className="flex items-center justify-between gap-4 border-b border-marsala/10 py-3 last:border-b-0"
              key={item.archetype.id}
            >
              <span className="text-coffee">{item.archetype.name}</span>
              <span className="font-medium text-wine">{item.score} pontos</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="primary-button" onClick={onShare} type="button">
          Compartilhar resultado
        </button>
        <button className="secondary-button" onClick={onRestart} type="button">
          Refazer teste
        </button>
        {shareStatus ? (
          <p className="text-sm text-coffee" role="status">
            {shareStatus}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function ResultPill({
  label,
  name,
  score
}: {
  label: string;
  name: string;
  score: number;
}) {
  return (
    <div className="rounded-[8px] border border-bronze/25 bg-porcelain p-5">
      <p className="text-sm uppercase text-bronze">{label}</p>
      <p className="serif-title mt-2 text-3xl text-wine">{name}</p>
      <p className="mt-2 text-sm text-coffee">{score} de 15 pontos</p>
    </div>
  );
}

function ResultBlock({ text, title }: { text: string; title: string }) {
  return (
    <article className="rounded-[8px] border border-marsala/10 bg-porcelain p-5 shadow-sm md:p-6">
      <h2 className="serif-title text-2xl text-wine">{title}</h2>
      <p className="mt-3 leading-7 text-coffee">{text}</p>
    </article>
  );
}

function Footer() {
  return (
    <footer className="border-t border-marsala/10 px-5 py-6 text-center text-sm text-coffee/75 md:px-8">
      Teste dos Arquétipos desenvolvido por Clara Rangel.
    </footer>
  );
}
