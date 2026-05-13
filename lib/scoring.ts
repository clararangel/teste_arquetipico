import {
  Answer,
  ArchetypeKey,
  RankedArchetype,
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
    strategicCombination: buildStrategicCombination(dominant, secondary, tertiary)
  };
}

function buildStrategicCombination(
  dominant: RankedArchetype,
  secondary: RankedArchetype,
  tertiary: RankedArchetype
) {
  return `A combinação ${dominant.archetype.name}, ${secondary.archetype.name} e ${tertiary.archetype.name} mostra uma marca que deve liderar com ${dominant.archetype.essence} O arquétipo ${secondary.archetype.name} funciona como a camada de relação: ele ajusta o tom, aproxima a audiência e deixa a mensagem mais completa. Já o ${tertiary.archetype.name} aparece como assinatura de diferenciação, dando nuance ao conteúdo e ao posicionamento. Na prática, sua comunicação fica mais forte quando a promessa principal é clara, o tom emocional é intencional e cada conteúdo reforça a percepção de valor que você quer ocupar.`;
}
