"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { calculateResult } from "@/lib/scoring";
import { Answer, Result, likertOptions, questions } from "@/lib/quiz-data";

type FlowStep = "intro" | "instructions" | "lead" | "quiz" | "result";

type LeadFieldId =
  | "fullName"
  | "email"
  | "phone"
  | "birthDate"
  | "gender"
  | "area"
  | "income";

type LeadData = Record<LeadFieldId, string>;

type LeadField = {
  id: LeadFieldId;
  label: string;
  type: "text" | "email" | "tel" | "date" | "options";
  placeholder?: string;
  options?: { value: string; label: string }[];
};

type StoredQuizState = {
  step: FlowStep;
  leadStepIndex: number;
  currentQuestionIndex: number;
  leadData: LeadData;
  answers: Answer;
  result?: Result | null;
};

const STORAGE_KEY = "teste-dos-arquetipos-clara-rangel";

const initialLeadData: LeadData = {
  fullName: "",
  email: "",
  phone: "",
  birthDate: "",
  gender: "",
  area: "",
  income: ""
};

const leadFields: LeadField[] = [
  {
    id: "fullName",
    label: "Nome completo",
    type: "text",
    placeholder: "Digite seu nome completo"
  },
  {
    id: "email",
    label: "Endereço de e-mail",
    type: "email",
    placeholder: "seuemail@exemplo.com"
  },
  {
    id: "phone",
    label: "Telefone",
    type: "tel",
    placeholder: "(00) 00000-0000"
  },
  {
    id: "birthDate",
    label: "Data de nascimento",
    type: "date"
  },
  {
    id: "gender",
    label: "Gênero",
    type: "options",
    options: [
      { value: "Feminino", label: "A — Feminino" },
      { value: "Masculino", label: "B — Masculino" },
      { value: "Outro", label: "C — Outro" }
    ]
  },
  {
    id: "area",
    label: "Área de atuação",
    type: "text",
    placeholder: "Ex.: mentoria, estética, educação, consultoria"
  },
  {
    id: "income",
    label: "Renda mensal",
    type: "options",
    options: [
      { value: "De R$1 mil a R$3 mil", label: "A — De R$1 mil a R$3 mil" },
      { value: "De R$3 mil a R$10 mil", label: "B — De R$3 mil a R$10 mil" },
      { value: "De R$10 mil a R$50 mil", label: "C — De R$10 mil a R$50 mil" },
      { value: "De R$50 mil a R$200 mil", label: "D — De R$50 mil a R$200 mil" },
      {
        value: "De R$200 mil a R$1 milhão",
        label: "E — De R$200 mil a R$1 milhão"
      },
      { value: "Mais de R$1 milhão", label: "F — Mais de R$1 milhão" }
    ]
  }
];

export function ArchetypeQuiz() {
  const [step, setStep] = useState<FlowStep>("intro");
  const [leadStepIndex, setLeadStepIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [leadData, setLeadData] = useState<LeadData>(initialLeadData);
  const [answers, setAnswers] = useState<Answer>({});
  const [pendingSelectedValue, setPendingSelectedValue] = useState<number | null>(
    null
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const advanceTimer = useRef<number | null>(null);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedValue = answers[currentQuestion.id];
  const answeredCount = Object.keys(answers).length;
  const result = useMemo<Result>(() => calculateResult(answers), [answers]);
  const currentLeadField = leadFields[leadStepIndex];
  const currentLeadValue = leadData[currentLeadField.id];
  const progressPercentage = getProgressPercentage({
    step,
    leadStepIndex,
    currentQuestionIndex,
    selectedValue
  });
  const progressLabel = getProgressLabel(step, leadStepIndex, currentQuestionIndex);

  useEffect(() => {
    const storedState = window.localStorage.getItem(STORAGE_KEY);

    if (storedState) {
      try {
        const parsedState = JSON.parse(storedState) as StoredQuizState;

        setStep(parsedState.step ?? "intro");
        setLeadStepIndex(
          Math.min(parsedState.leadStepIndex ?? 0, leadFields.length - 1)
        );
        setCurrentQuestionIndex(
          Math.min(parsedState.currentQuestionIndex ?? 0, questions.length - 1)
        );
        setLeadData({ ...initialLeadData, ...(parsedState.leadData ?? {}) });
        setAnswers(parsedState.answers ?? {});
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
      step,
      leadStepIndex,
      currentQuestionIndex,
      leadData,
      answers,
      result: step === "result" ? result : null
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToStore));
  }, [
    answers,
    currentQuestionIndex,
    isLoaded,
    leadData,
    leadStepIndex,
    result,
    step
  ]);

  useEffect(() => {
    return () => {
      if (advanceTimer.current) {
        window.clearTimeout(advanceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    setPendingSelectedValue(null);
  }, [currentQuestionIndex]);

  function clearAutoAdvance() {
    if (advanceTimer.current) {
      window.clearTimeout(advanceTimer.current);
      advanceTimer.current = null;
    }
  }

  function goToStep(nextStep: FlowStep) {
    clearAutoAdvance();
    setStep(nextStep);
    setValidationMessage("");
    setShareStatus("");
  }

  function goBack() {
    clearAutoAdvance();
    setValidationMessage("");
    setShareStatus("");

    if (step === "instructions") {
      setStep("intro");
      return;
    }

    if (step === "lead") {
      if (leadStepIndex > 0) {
        setLeadStepIndex((index) => index - 1);
        return;
      }

      setStep("instructions");
      return;
    }

    if (step === "quiz") {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((index) => index - 1);
        return;
      }

      setStep("lead");
      setLeadStepIndex(leadFields.length - 1);
      return;
    }

    if (step === "result") {
      setStep("quiz");
      setCurrentQuestionIndex(questions.length - 1);
    }
  }

  function handleLeadChange(value: string) {
    setLeadData((currentData) => ({
      ...currentData,
      [currentLeadField.id]: value
    }));
    setValidationMessage("");
  }

  function continueLeadForm() {
    if (!isLeadFieldValid(currentLeadField, currentLeadValue)) {
      setValidationMessage("Preencha este campo para continuar.");
      return;
    }

    // TODO: conectar aqui uma integração futura com CRM, webhook, Google Sheets, Tally ou email marketing.
    if (leadStepIndex === leadFields.length - 1) {
      setStep("quiz");
      setCurrentQuestionIndex(0);
      setValidationMessage("");
      return;
    }

    setLeadStepIndex((index) => index + 1);
    setValidationMessage("");
  }

  function handleLeadSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    continueLeadForm();
  }

  function selectAnswer(value: number) {
    setPendingSelectedValue(value);
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: value
    }));

    clearAutoAdvance();

    advanceTimer.current = window.setTimeout(() => {
      advanceTimer.current = null;
      setPendingSelectedValue(null);

      if (currentQuestionIndex === questions.length - 1) {
        setStep("result");
        setShareStatus("");
        return;
      }

      setCurrentQuestionIndex((index) => Math.min(index + 1, questions.length - 1));
    }, 250);
  }

  function goToNextQuestion() {
    if (selectedValue === undefined) {
      return;
    }

    clearAutoAdvance();

    if (currentQuestionIndex === questions.length - 1) {
      setStep("result");
      setShareStatus("");
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
  }

  function restartFromBeginning() {
    clearAutoAdvance();
    setStep("intro");
    setLeadStepIndex(0);
    setCurrentQuestionIndex(0);
    setLeadData(initialLeadData);
    setAnswers({});
    setValidationMessage("");
    setShareStatus("");
    window.localStorage.removeItem(STORAGE_KEY);
  }

  async function shareResult() {
    const testLink = window.location.origin || window.location.href;
    const shareText = `Oi, tudo bem? Acabei de fazer o meu Teste de Arquétipo e meu resultado foi:

Arquétipo principal: ${result.dominant.archetype.name}
Arquétipo secundário: ${result.secondary.archetype.name}
Arquétipo terciário: ${result.tertiary.archetype.name}

Faz o seu também: ${testLink}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Teste de Arquétipo",
          text: shareText
        });
        setShareStatus("Resultado compartilhado.");
        return;
      }

      await navigator.clipboard.writeText(shareText);
      setShareStatus("Mensagem copiada.");
    } catch {
      setShareStatus("Não foi possível compartilhar agora.");
    }
  }

  const resultIsReady = answeredCount === questions.length;
  const canGoBack = step !== "intro";
  const canGoNext =
    (step === "instructions" && true) ||
    (step === "lead" && true) ||
    (step === "quiz" && selectedValue !== undefined);

  return (
    <div className="cinematic-shell">
      <BackgroundImage />
      <div className="cinematic-overlay" />

      <main className="cinematic-content">
        {step === "intro" ? (
          <IntroStep onStart={() => goToStep("instructions")} />
        ) : null}

        {step === "instructions" ? (
          <InstructionsStep onStart={() => goToStep("lead")} />
        ) : null}

        {step === "lead" ? (
          <LeadStep
            field={currentLeadField}
            index={leadStepIndex}
            onChange={handleLeadChange}
            onContinue={continueLeadForm}
            onSubmit={handleLeadSubmit}
            validationMessage={validationMessage}
            value={currentLeadValue}
          />
        ) : null}

        {step === "quiz" ? (
          <QuizStep
            currentQuestionIndex={currentQuestionIndex}
            onSelectAnswer={selectAnswer}
            onSkipToNext={goToNextQuestion}
            pendingSelectedValue={pendingSelectedValue}
            question={currentQuestion}
            selectedValue={selectedValue}
          />
        ) : null}

        {step === "result" && resultIsReady ? (
          <ResultStep
            leadData={leadData}
            onRestart={restartFromBeginning}
            onShare={shareResult}
            result={result}
            shareStatus={shareStatus}
          />
        ) : null}

        {step === "result" && !resultIsReady ? (
          <Panel className="max-w-2xl">
            <p className="eyebrow">Resultado incompleto</p>
            <h1 className="screen-title">
              Responda todas as perguntas para revelar seu arquétipo.
            </h1>
            <button
              className="champagne-button mt-8"
              onClick={() => {
                setStep("quiz");
                setCurrentQuestionIndex(Math.min(answeredCount, questions.length - 1));
              }}
              type="button"
            >
              Continuar teste
            </button>
          </Panel>
        ) : null}
      </main>

      <BottomProgress
        canGoBack={canGoBack}
        canGoNext={canGoNext}
        label={progressLabel}
        onBack={goBack}
        onNext={
          step === "instructions"
            ? () => goToStep("lead")
            : step === "lead"
              ? continueLeadForm
              : goToNextQuestion
        }
        onRestart={restartFromBeginning}
        percent={progressPercentage}
        showRestart={step !== "intro"}
        step={step}
      />
    </div>
  );
}

function BackgroundImage() {
  return (
    <div className="background-frame" aria-hidden="true">
      <picture>
        <source media="(min-width: 768px)" srcSet="/images/hero-computer.png" />
        <img
          alt=""
          className="background-image"
          draggable={false}
          src="/images/hero-mobile.png"
        />
      </picture>
    </div>
  );
}

function IntroStep({ onStart }: { onStart: () => void }) {
  return (
    <section className="intro-placement">
      <div className="intro-actions">
        <p className="intro-label">Desenvolvido por Clara Rangel</p>
        <button className="champagne-button" onClick={onStart} type="button">
          Começar teste gratuito
        </button>
      </div>
    </section>
  );
}

function InstructionsStep({ onStart }: { onStart: () => void }) {
  return (
    <Panel className="max-w-3xl">
      <p className="eyebrow">Antes de começar</p>
      <div className="instructions-copy">
        <p>
          Antes de começar, responda com sinceridade o quanto cada afirmação
          representa você, sua marca e sua forma de se posicionar.
        </p>
        <p>
          Durante o teste, você vai escolher uma nota de 0 a 5 para cada
          afirmação:
        </p>
        <p>0 significa que não tem nada a ver com você.</p>
        <p>5 significa que tem tudo a ver com você.</p>
        <p>
          Não existe resposta certa ou errada. O mais importante é marcar o que
          representa o seu comportamento hoje.
        </p>
      </div>

      <button className="champagne-button mt-7" onClick={onStart} type="button">
        Iniciar o seu teste
      </button>
    </Panel>
  );
}

function LeadStep({
  field,
  index,
  onChange,
  onContinue,
  onSubmit,
  validationMessage,
  value
}: {
  field: LeadField;
  index: number;
  onChange: (value: string) => void;
  onContinue: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  validationMessage: string;
  value: string;
}) {
  return (
    <Panel className="max-w-3xl">
      <p className="eyebrow">
        Dados iniciais {index + 1} de {leadFields.length}
      </p>

      <form onSubmit={onSubmit}>
        <label className="field-label" htmlFor={field.id}>
          {field.label}
        </label>

        {field.type === "options" ? (
          <div className="choice-list" id={field.id}>
            {field.options?.map((option) => (
              <button
                className={`choice-option ${value === option.value ? "is-selected" : ""}`}
                key={option.value}
                onClick={() => onChange(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        ) : (
          <input
            autoComplete={getAutocomplete(field.id)}
            autoFocus
            className="lead-input"
            id={field.id}
            onChange={(event) => onChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                onContinue();
              }
            }}
            placeholder={field.placeholder}
            required
            type={field.type}
            value={value}
          />
        )}

        {validationMessage ? (
          <p className="validation-message" role="alert">
            {validationMessage}
          </p>
        ) : null}

        <button className="champagne-button mt-8" type="submit">
          Continuar
        </button>
      </form>
    </Panel>
  );
}

function QuizStep({
  currentQuestionIndex,
  onSelectAnswer,
  onSkipToNext,
  pendingSelectedValue,
  question,
  selectedValue
}: {
  currentQuestionIndex: number;
  onSelectAnswer: (value: number) => void;
  onSkipToNext: () => void;
  pendingSelectedValue: number | null;
  question: (typeof questions)[number];
  selectedValue?: number;
}) {
  return (
    <Panel className="max-w-4xl">
      <p className="eyebrow">
        Pergunta {currentQuestionIndex + 1} de {questions.length}
      </p>
      <h1 className="screen-title">{question.statement}</h1>

      <div className="answer-grid mt-9">
        {likertOptions.map((option) => (
          <button
            className={`answer-option ${
              pendingSelectedValue === option.value ||
              (pendingSelectedValue === null && selectedValue === option.value)
                ? "is-selected"
                : ""
            }`}
            key={option.value}
            onClick={() => onSelectAnswer(option.value)}
            onPointerUp={(event) => event.currentTarget.blur()}
            type="button"
          >
            <span>{option.value}</span>
            <p>{option.label}</p>
          </button>
        ))}
      </div>

      <button
        className="ghost-button mt-7"
        disabled={selectedValue === undefined}
        onClick={onSkipToNext}
        type="button"
      >
        Avançar
      </button>
    </Panel>
  );
}

function ResultStep({
  leadData,
  onRestart,
  onShare,
  result,
  shareStatus
}: {
  leadData: LeadData;
  onRestart: () => void;
  onShare: () => void;
  result: Result;
  shareStatus: string;
}) {
  const dominant = result.dominant.archetype;
  const secondary = result.secondary.archetype;
  const tertiary = result.tertiary.archetype;
  const firstName = getFirstName(leadData.fullName);
  const tallyUrl = buildTallyUrl(leadData, result);

  return (
    <section className="result-shell">
      <Panel className="result-panel">
        <p className="eyebrow">Seu resultado</p>
        <h1 className="screen-title">
          {firstName ? `${firstName}, ` : ""}seu arquétipo principal é:{" "}
          {dominant.name}
        </h1>
        <p className="result-intro">{dominant.shortDescription}</p>

        <div className="result-cards">
          <ResultCard
            label="Arquétipo principal"
            name={dominant.name}
            score={result.dominant.score}
          />
          <ResultCard
            label="Arquétipo secundário"
            name={secondary.name}
            score={result.secondary.score}
          />
          <ResultCard
            label="Arquétipo terciário"
            name={tertiary.name}
            score={result.tertiary.score}
          />
        </div>

        <ResultSection title="Combinação estratégica" text={result.strategicCombination} />
        <ResultSection title="Estilo de comunicação" text={dominant.communicationStyle} />
        <ResultSection title="Direção de conteúdo" text={dominant.contentDirection} />
        <ResultSection
          title="Direção de posicionamento"
          text={dominant.positioningDirection}
        />
        <ResultSection title="Ponto de atenção" text={dominant.pointOfAttention} />
        <ResultSection title="Próximo passo recomendado" text={dominant.nextStep} />

        <div className="mentor-cta">
          <h2>Quer uma mentoria individual e personalizada sobre o seu posicionamento arquetípico?</h2>
          <p>
            Seu resultado mostra uma direção, mas o próximo passo é transformar
            isso em posicionamento, conteúdo, oferta e percepção de valor.
          </p>
          <div className="cta-row">
            <a className="champagne-button" href={tallyUrl} rel="noreferrer" target="_blank">
              Quero minha mentoria personalizada
            </a>
            <a
              className="outline-button"
              href="https://www.instagram.com/souclararangel/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Falar com Clara no Instagram
            </a>
          </div>
        </div>

        <div className="result-actions">
          <button className="outline-button" onClick={onShare} type="button">
            Compartilhar resultado
          </button>
          <button className="ghost-button" onClick={onRestart} type="button">
            Refazer teste
          </button>
          {shareStatus ? (
            <p className="share-status" role="status">
              {shareStatus}
            </p>
          ) : null}
        </div>
      </Panel>
    </section>
  );
}

function Panel({
  children,
  className = ""
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`glass-panel ${className}`}>{children}</section>;
}

function ResultCard({
  label,
  name,
  score
}: {
  label: string;
  name: string;
  score: number;
}) {
  return (
    <article className="result-card">
      <p>{label}</p>
      <strong>{name}</strong>
      <span>{score} de 15 pontos</span>
    </article>
  );
}

function ResultSection({ text, title }: { text: string; title: string }) {
  return (
    <article className="result-section">
      <h2>{title}</h2>
      <p>{text}</p>
    </article>
  );
}

function BottomProgress({
  canGoBack,
  canGoNext,
  label,
  onBack,
  onNext,
  onRestart,
  percent,
  showRestart,
  step
}: {
  canGoBack: boolean;
  canGoNext: boolean;
  label: string;
  onBack: () => void;
  onNext: () => void;
  onRestart: () => void;
  percent: number;
  showRestart: boolean;
  step: FlowStep;
}) {
  return (
    <footer className="bottom-progress">
      <div className="progress-meta">
        <span>{label}</span>
        {showRestart ? (
          <button className="restart-link" onClick={onRestart} type="button">
            Voltar ao início
          </button>
        ) : null}
      </div>

      <div className="progress-track" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>

      {step !== "intro" && step !== "result" ? (
        <div className="progress-controls">
          <button
            aria-label="Voltar"
            className="nav-button"
            disabled={!canGoBack}
            onClick={onBack}
            type="button"
          >
            &lt;
          </button>
          <button
            aria-label="Avançar"
            className="nav-button"
            disabled={!canGoNext}
            onClick={onNext}
            type="button"
          >
            &gt;
          </button>
        </div>
      ) : null}
    </footer>
  );
}

function isLeadFieldValid(field: LeadField, value: string) {
  const cleanValue = value.trim();

  if (!cleanValue) {
    return false;
  }

  if (field.type === "email") {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanValue);
  }

  if (field.type === "tel") {
    return cleanValue.replace(/\D/g, "").length >= 8;
  }

  return true;
}

function getAutocomplete(fieldId: LeadFieldId) {
  const autocompleteMap: Record<LeadFieldId, string> = {
    fullName: "name",
    email: "email",
    phone: "tel",
    birthDate: "bday",
    gender: "off",
    area: "organization-title",
    income: "off"
  };

  return autocompleteMap[fieldId];
}

function getFirstName(fullName: string) {
  return fullName.trim().split(" ").filter(Boolean)[0] ?? "";
}

function buildTallyUrl(leadData: LeadData, result: Result) {
  const params = new URLSearchParams({
    name: leadData.fullName,
    email: leadData.email,
    mainArchetype: result.dominant.archetype.name,
    secondaryArchetype: result.secondary.archetype.name,
    tertiaryArchetype: result.tertiary.archetype.name
  });

  return `https://tally.so/r/obANG1?${params.toString()}`;
}

function getProgressLabel(
  step: FlowStep,
  leadStepIndex: number,
  currentQuestionIndex: number
) {
  if (step === "intro") {
    return "Início";
  }

  if (step === "instructions") {
    return "Instruções";
  }

  if (step === "lead") {
    return `Dados ${leadStepIndex + 1} de ${leadFields.length}`;
  }

  if (step === "quiz") {
    return `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
  }

  return "Resultado completo";
}

function getProgressPercentage({
  currentQuestionIndex,
  leadStepIndex,
  selectedValue,
  step
}: {
  currentQuestionIndex: number;
  leadStepIndex: number;
  selectedValue?: number;
  step: FlowStep;
}) {
  if (step === "intro") {
    return 4;
  }

  if (step === "instructions") {
    return 12;
  }

  if (step === "lead") {
    return 18 + ((leadStepIndex + 1) / leadFields.length) * 24;
  }

  if (step === "quiz") {
    const answeredOffset = selectedValue === undefined ? 0 : 1;
    return 44 + ((currentQuestionIndex + answeredOffset) / questions.length) * 46;
  }

  return 100;
}
