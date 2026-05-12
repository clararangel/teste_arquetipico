import {
  Answer,
  ArchetypeKey,
  Result,
  archetypeOrder,
  archetypes,
  questions
} from "@/lib/quiz-data";

const initialScores = (): Record<ArchetypeKey, number> =>
  archetypeOrder.reduce(
    (scores, archetype) => ({
      ...scores,
      [archetype]: 0
    }),
    {} as Record<ArchetypeKey, number>
  );

export function calculateResult(answers: Answer): Result {
  const scores = initialScores();

  questions.forEach((question) => {
    scores[question.archetype] += answers[question.id] ?? 0;
  });

  const ranking = archetypeOrder
    .map((archetype) => ({
      archetype: archetypes[archetype],
      score: scores[archetype]
    }))
    .sort((a, b) => b.score - a.score);

  const [dominant, secondary, tertiary] = ranking;

  return {
    scores,
    ranking,
    dominant,
    secondary,
    tertiary,
    strategicCombination: buildStrategicCombination(
      dominant.archetype.name,
      secondary.archetype.name,
      tertiary.archetype.name
    )
  };
}

function buildStrategicCombination(
  dominantName: string,
  secondaryName: string,
  tertiaryName: string
) {
  return `A combinação ${dominantName}, ${secondaryName} e ${tertiaryName} indica uma marca que deve liderar com a força do arquétipo dominante, usar o secundário como camada de relacionamento e deixar o terciário como assinatura de diferenciação. Na prática, o posicionamento fica mais forte quando a promessa principal é clara, a comunicação preserva nuances emocionais e o conteúdo prova maturidade estratégica sem perder desejo.`;
}
