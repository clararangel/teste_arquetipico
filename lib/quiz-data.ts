export const likertOptions = [
  { value: 0, label: "Nada a ver comigo" },
  { value: 1, label: "Pouco a ver comigo" },
  { value: 2, label: "Às vezes" },
  { value: 3, label: "Tem bastante a ver comigo" },
  { value: 4, label: "Muito a ver comigo" },
  { value: 5, label: "Totalmente eu" }
] as const;

export type ArchetypeKey =
  | "inocente"
  | "explorador"
  | "sabio"
  | "heroi"
  | "fora-da-lei"
  | "mago"
  | "cara-comum"
  | "amante"
  | "bobo-da-corte"
  | "cuidador"
  | "criador"
  | "governante";

export type Archetype = {
  id: ArchetypeKey;
  name: string;
  essence: string;
  brandStrength: string;
  communicationStyle: string;
  contentDirection: string;
  positioningDirection: string;
  pointOfAttention: string;
  positioningAdvice: string;
  nextStep: string;
  shortDescription: string;
};

export type Question = {
  id: number;
  archetype: ArchetypeKey;
  statement: string;
};

export type Answer = Record<number, number>;

export type RankedArchetype = {
  archetype: Archetype;
  score: number;
};

export type Result = {
  scores: Record<ArchetypeKey, number>;
  ranking: RankedArchetype[];
  dominant: RankedArchetype;
  secondary: RankedArchetype;
  tertiary: RankedArchetype;
  strategicCombination: string;
};

export const archetypeOrder: ArchetypeKey[] = [
  "inocente",
  "explorador",
  "sabio",
  "heroi",
  "fora-da-lei",
  "mago",
  "cara-comum",
  "amante",
  "bobo-da-corte",
  "cuidador",
  "criador",
  "governante"
];

export const archetypes: Record<ArchetypeKey, Archetype> = {
  inocente: {
    id: "inocente",
    name: "Inocente",
    essence: "clareza, leveza e confiança para simplificar escolhas.",
    brandStrength:
      "A marca transmite segurança emocional e faz a audiência sentir que existe um caminho mais leve, honesto e possível.",
    communicationStyle:
      "Clara, otimista, transparente e sem excesso de ruído. A mensagem precisa parecer limpa, confiável e fácil de entender.",
    contentDirection:
      "Conteúdos com passos simples, verdades honestas, bastidores leves, princípios da marca e escolhas que reduzem confusão.",
    positioningDirection:
      "Posicione a marca como uma guia para quem quer voltar ao essencial e decidir com mais paz, sem perder maturidade.",
    pointOfAttention:
      "Cuidado para não parecer ingênua ou rasa. Leveza precisa vir acompanhada de prova, consistência e presença estratégica.",
    positioningAdvice:
      "Na marca pessoal, o Inocente aparece em uma estética limpa, uma fala direta e uma promessa de clareza real para a vida da cliente.",
    nextStep:
      "Transforme sua simplicidade em método: nomeie o processo, mostre evidências e deixe claro por que o caminho leve também é estratégico.",
    shortDescription:
      "O Inocente revela uma marca que atrai pela confiança, pela clareza e pela sensação de que o caminho pode ser mais simples sem ser superficial."
  },
  explorador: {
    id: "explorador",
    name: "Explorador",
    essence: "liberdade, autonomia e coragem para abrir novos caminhos.",
    brandStrength:
      "A marca desperta movimento e atrai pessoas que desejam sair de fórmulas prontas para construir uma rota própria.",
    communicationStyle:
      "Direta, expansiva e curiosa. A fala precisa convidar a audiência a experimentar, testar e pensar além do padrão.",
    contentDirection:
      "Conteúdos sobre novas possibilidades, bastidores de descobertas, mudanças de rota, autonomia e decisões fora do piloto automático.",
    positioningDirection:
      "Posicione a marca como uma rota de expansão para quem quer liberdade com direção, repertório e responsabilidade.",
    pointOfAttention:
      "Cuidado com dispersão. A liberdade precisa de um território claro para não virar mensagem solta.",
    positioningAdvice:
      "Na marca pessoal, o Explorador aparece em narrativas de jornada, escolhas independentes e convites para a audiência expandir a própria visão.",
    nextStep:
      "Defina qual liberdade sua marca entrega e transforme essa promessa em uma trilha prática para a cliente seguir.",
    shortDescription:
      "O Explorador mostra uma marca movida por autonomia, descoberta e desejo de criar caminhos próprios."
  },
  sabio: {
    id: "sabio",
    name: "Sábio",
    essence: "conhecimento, método e discernimento para tomar melhores decisões.",
    brandStrength:
      "A marca constrói autoridade com profundidade e ajuda a audiência a entender o que antes parecia confuso.",
    communicationStyle:
      "Didática, precisa, analítica e calma. A fala deve ensinar sem complicar e sustentar ideias com lógica.",
    contentDirection:
      "Conteúdos educativos, análises, frameworks, estudos de caso, conceitos explicados e diagnósticos claros.",
    positioningDirection:
      "Posicione a marca como referência intelectual que organiza o pensamento e transforma informação em decisão.",
    pointOfAttention:
      "Cuidado para não virar só teoria. O conhecimento precisa tocar desejo, contexto e aplicação prática.",
    positioningAdvice:
      "Na marca pessoal, o Sábio aparece em aulas, análises, mapas mentais, opiniões bem fundamentadas e clareza de método.",
    nextStep:
      "Crie uma assinatura metodológica. Sua autoridade cresce quando a audiência entende como você pensa e por que isso gera resultado.",
    shortDescription:
      "O Sábio revela uma marca que lidera pela clareza intelectual, pela profundidade e pela capacidade de orientar decisões."
  },
  heroi: {
    id: "heroi",
    name: "Herói",
    essence: "coragem, superação e ação para conquistar resultados.",
    brandStrength:
      "A marca ativa energia de movimento e faz a audiência sentir que é capaz de vencer limites concretos.",
    communicationStyle:
      "Firme, objetiva e motivadora. A fala chama para ação, responsabilidade e evolução visível.",
    contentDirection:
      "Conteúdos sobre metas, desafios, disciplina, viradas, resultados, planos de ação e superação de bloqueios.",
    positioningDirection:
      "Posicione a marca como uma força de execução para quem precisa sair da intenção e sustentar movimento.",
    pointOfAttention:
      "Cuidado com pressão excessiva. Força sem humanidade pode afastar quem ainda precisa de segurança para agir.",
    positioningAdvice:
      "Na marca pessoal, o Herói aparece em narrativas de conquista, rotina, decisão, consistência e provas de transformação.",
    nextStep:
      "Mostre o caminho de ação em etapas. Sua marca fica mais forte quando transforma coragem em plano executável.",
    shortDescription:
      "O Herói mostra uma marca que inspira coragem, ação e superação para chegar a um resultado mais alto."
  },
  "fora-da-lei": {
    id: "fora-da-lei",
    name: "Fora da Lei",
    essence: "ruptura, provocação e coragem para desafiar o óbvio.",
    brandStrength:
      "A marca cria contraste no mercado e atrai pessoas cansadas de discursos repetidos.",
    communicationStyle:
      "Provocativa, direta e inteligente. A fala precisa questionar padrões e defender uma nova forma de enxergar o problema.",
    contentDirection:
      "Conteúdos de opinião, quebras de crença, contrapontos ao mercado, verdades desconfortáveis e provocações com proposta.",
    positioningDirection:
      "Posicione a marca como uma voz que rompe padrões antigos e apresenta um novo critério de escolha.",
    pointOfAttention:
      "Cuidado com rebeldia sem direção. Provocar só funciona quando existe uma tese forte por trás.",
    positioningAdvice:
      "Na marca pessoal, o Fora da Lei aparece em opiniões marcantes, posicionamentos firmes e coragem para dizer o que o mercado evita.",
    nextStep:
      "Defina qual padrão você combate e qual padrão melhor você coloca no lugar. Essa é a base da sua diferenciação.",
    shortDescription:
      "O Fora da Lei revela uma marca que se diferencia pela coragem de questionar, romper e reposicionar conversas."
  },
  mago: {
    id: "mago",
    name: "Mago",
    essence: "transformação, visão de futuro e mudança de percepção.",
    brandStrength:
      "A marca cria fascínio porque mostra uma possibilidade maior do que a solução aparente.",
    communicationStyle:
      "Visionária, simbólica e envolvente. A fala revela conexões invisíveis e ajuda a pessoa a se ver de outro jeito.",
    contentDirection:
      "Conteúdos sobre transformação, antes e depois, identidade, percepção, desejo, visão de futuro e mudança de mentalidade.",
    positioningDirection:
      "Posicione a marca como catalisadora de transformação para quem quer mudar não só uma ação, mas a forma de se perceber.",
    pointOfAttention:
      "Cuidado com abstração demais. O encantamento precisa ser sustentado por método, prova e clareza.",
    positioningAdvice:
      "Na marca pessoal, o Mago aparece em narrativas de transformação, símbolos, rituais, linguagem de mudança e promessas profundas.",
    nextStep:
      "Mostre o mecanismo da transformação. Quando o público entende como a mudança acontece, o fascínio vira confiança.",
    shortDescription:
      "O Mago mostra uma marca que transforma percepção em desejo e conduz a audiência para uma nova possibilidade."
  },
  "cara-comum": {
    id: "cara-comum",
    name: "Cara Comum",
    essence: "proximidade, pertencimento e verdade cotidiana.",
    brandStrength:
      "A marca cria identificação, reduz distância e faz a audiência sentir que aquela conversa também é para ela.",
    communicationStyle:
      "Humana, simples e honesta. A fala precisa soar próxima sem perder intenção e autoridade.",
    contentDirection:
      "Conteúdos com bastidores reais, aprendizados práticos, conversas francas, dilemas comuns e histórias de identificação.",
    positioningDirection:
      "Posicione a marca como uma presença acessível e confiável para quem quer evolução sem pedestal.",
    pointOfAttention:
      "Cuidado para não diminuir sua autoridade para parecer próxima. Acessibilidade também pode ser premium.",
    positioningAdvice:
      "Na marca pessoal, o Cara Comum aparece em linguagem direta, bastidores reais, vulnerabilidade bem dosada e senso de comunidade.",
    nextStep:
      "Transforme sua proximidade em confiança estruturada. Mostre que você entende a realidade da cliente e sabe conduzi-la.",
    shortDescription:
      "O Cara Comum revela uma marca que cria confiança pela identificação, pela humanidade e pela conversa sem distância."
  },
  amante: {
    id: "amante",
    name: "Amante",
    essence: "desejo, beleza, sensibilidade e conexão emocional.",
    brandStrength:
      "A marca aumenta percepção de valor criando uma experiência desejável, sensorial e emocionalmente próxima.",
    communicationStyle:
      "Refinada, sensível e envolvente. A fala precisa criar intimidade, desejo e vontade de aproximação.",
    contentDirection:
      "Conteúdos sobre estética, experiência, desejo, identidade, detalhes, relações e escolhas que elevam percepção de valor.",
    positioningDirection:
      "Posicione a marca como uma experiência que a pessoa deseja viver, não apenas como uma solução que ela precisa comprar.",
    pointOfAttention:
      "Cuidado para depender só de beleza. Desejo precisa vir junto de promessa clara, entrega consistente e maturidade estratégica.",
    positioningAdvice:
      "Na marca pessoal, o Amante aparece em visual refinado, linguagem sensorial, presença magnética e cuidado com os detalhes.",
    nextStep:
      "Conecte estética a estratégia. Mostre por que a experiência que você cria muda a forma como a cliente se percebe.",
    shortDescription:
      "O Amante revela uma marca que atrai pelo desejo, pela estética e pela conexão emocional."
  },
  "bobo-da-corte": {
    id: "bobo-da-corte",
    name: "Bobo da Corte",
    essence: "leveza, prazer, espontaneidade e humor inteligente.",
    brandStrength:
      "A marca cria lembrança e aproxima temas difíceis com mais prazer, presença e personalidade.",
    communicationStyle:
      "Viva, leve e sagaz. A fala precisa divertir sem perder a tese e tornar a conversa mais memorável.",
    contentDirection:
      "Conteúdos com humor, comentários rápidos, quebras de expectativa, bastidores espontâneos e analogias simples.",
    positioningDirection:
      "Posicione a marca como uma experiência leve e inteligente para quem quer aprender ou decidir sem peso excessivo.",
    pointOfAttention:
      "Cuidado para parecer rasa ou inconsequente. A leveza precisa carregar uma ideia forte.",
    positioningAdvice:
      "Na marca pessoal, o Bobo da Corte aparece em carisma, espontaneidade, timing, humor refinado e capacidade de simplificar tensões.",
    nextStep:
      "Use a leveza como porta de entrada e a estratégia como sustentação. O humor deve reforçar sua autoridade, não substituir.",
    shortDescription:
      "O Bobo da Corte mostra uma marca que atrai pela leveza inteligente, pela presença viva e pela memorabilidade."
  },
  cuidador: {
    id: "cuidador",
    name: "Cuidador",
    essence: "acolhimento, proteção e responsabilidade na condução.",
    brandStrength:
      "A marca cria confiança profunda porque a audiência sente que será orientada com cuidado e segurança.",
    communicationStyle:
      "Acolhedora, paciente e firme. A fala reconhece a dor sem explorar fragilidade.",
    contentDirection:
      "Conteúdos sobre orientação, erros a evitar, segurança, suporte, cuidado com processos e decisões mais conscientes.",
    positioningDirection:
      "Posicione a marca como uma presença segura para quem precisa ser conduzida com responsabilidade e clareza.",
    pointOfAttention:
      "Cuidado para assumir peso demais. Cuidar não significa salvar quem não quer se mover.",
    positioningAdvice:
      "Na marca pessoal, o Cuidador aparece em escuta, suporte, didática calma, limites claros e promessa de acompanhamento sério.",
    nextStep:
      "Crie limites para o seu cuidado. Sua autoridade cresce quando acolhe e conduz sem se apagar.",
    shortDescription:
      "O Cuidador revela uma marca que gera confiança por acolhimento, responsabilidade e orientação segura."
  },
  criador: {
    id: "criador",
    name: "Criador",
    essence: "autoria, originalidade e construção de algo com assinatura.",
    brandStrength:
      "A marca ganha valor por ter linguagem própria, visão estética e capacidade de transformar ideias em experiência.",
    communicationStyle:
      "Autoral, visual e conceitual. A fala mostra repertório, processo e escolhas conscientes.",
    contentDirection:
      "Conteúdos sobre bastidores, referências, criação de método, processo criativo, conceitos, estética e construção de linguagem.",
    positioningDirection:
      "Posicione a marca como uma assinatura própria, reconhecida pela forma única de pensar, criar e entregar.",
    pointOfAttention:
      "Cuidado com perfeccionismo. A marca precisa chegar ao mercado, não ficar presa em elaboração infinita.",
    positioningAdvice:
      "Na marca pessoal, o Criador aparece em identidade visual marcante, ideias originais, produtos autorais e bastidores de criação.",
    nextStep:
      "Nomeie sua assinatura. Mostre o que torna sua forma de criar diferente e por que isso aumenta valor percebido.",
    shortDescription:
      "O Criador mostra uma marca que se diferencia pela autoria, pela estética e pela capacidade de construir conceitos originais."
  },
  governante: {
    id: "governante",
    name: "Governante",
    essence: "liderança, excelência e alto padrão de decisão.",
    brandStrength:
      "A marca transmite autoridade, direção e valor elevado porque sabe qual território lidera.",
    communicationStyle:
      "Segura, refinada e diretiva. A fala deixa claros os critérios, o padrão e a visão de liderança.",
    contentDirection:
      "Conteúdos sobre liderança, critérios de escolha, posicionamento, mercado, excelência, estrutura e tomada de decisão.",
    positioningDirection:
      "Posicione a marca como referência para quem busca direção, padrão elevado e visão madura de crescimento.",
    pointOfAttention:
      "Cuidado com rigidez ou distância emocional. Autoridade premium também precisa criar conexão.",
    positioningAdvice:
      "Na marca pessoal, o Governante aparece em presença segura, estética sofisticada, direção firme e autoridade reconhecida.",
    nextStep:
      "Defina o território que você lidera. Sua marca precisa comunicar padrão, método e visão com precisão.",
    shortDescription:
      "O Governante revela uma marca que lidera por autoridade, estrutura e percepção de alto padrão."
  }
};

export const questions: Question[] = [
  {
    id: 1,
    archetype: "inocente",
    statement: "Eu gosto que minha marca transmita leveza, confiança e simplicidade."
  },
  {
    id: 2,
    archetype: "inocente",
    statement: "Eu prefiro explicar as coisas de um jeito claro, direto e sem complicar."
  },
  {
    id: 3,
    archetype: "inocente",
    statement: "Eu quero que as pessoas se sintam mais tranquilas depois de consumir meu conteúdo."
  },
  {
    id: 4,
    archetype: "explorador",
    statement: "Eu gosto de falar sobre liberdade, escolhas e novos caminhos."
  },
  {
    id: 5,
    archetype: "explorador",
    statement: "Eu me sinto bem quando posso testar ideias novas sem seguir uma fórmula pronta."
  },
  {
    id: 6,
    archetype: "explorador",
    statement: "Eu quero que minha marca incentive as pessoas a saírem do automático."
  },
  {
    id: 7,
    archetype: "sabio",
    statement: "Eu prefiro ensinar com profundidade, clareza e método."
  },
  {
    id: 8,
    archetype: "sabio",
    statement: "Antes de me posicionar, eu gosto de entender bem o assunto."
  },
  {
    id: 9,
    archetype: "sabio",
    statement: "Eu gosto de criar conteúdos que ajudam as pessoas a pensar melhor."
  },
  {
    id: 10,
    archetype: "heroi",
    statement: "Eu gosto de inspirar ação, coragem e superação."
  },
  {
    id: 11,
    archetype: "heroi",
    statement: "Eu me sinto motivada quando tenho uma meta clara para conquistar."
  },
  {
    id: 12,
    archetype: "heroi",
    statement: "Eu quero que minha marca ajude as pessoas a vencerem seus próprios limites."
  },
  {
    id: 13,
    archetype: "fora-da-lei",
    statement: "Eu tenho vontade de quebrar padrões e provocar o mercado."
  },
  {
    id: 14,
    archetype: "fora-da-lei",
    statement: "Eu não gosto de repetir discursos só porque todo mundo está falando igual."
  },
  {
    id: 15,
    archetype: "fora-da-lei",
    statement: "Eu gosto de defender ideias fortes, mesmo quando elas incomodam um pouco."
  },
  {
    id: 16,
    archetype: "mago",
    statement: "Eu gosto de mostrar possibilidades, transformação e visão de futuro."
  },
  {
    id: 17,
    archetype: "mago",
    statement: "Eu quero que minha marca faça as pessoas enxergarem a si mesmas de outro jeito."
  },
  {
    id: 18,
    archetype: "mago",
    statement: "Eu gosto de falar sobre mudanças profundas, identidade e desejo."
  },
  {
    id: 19,
    archetype: "cara-comum",
    statement: "Eu prefiro uma comunicação humana, próxima e fácil de entender."
  },
  {
    id: 20,
    archetype: "cara-comum",
    statement: "Eu gosto quando meu conteúdo faz as pessoas pensarem: isso também acontece comigo."
  },
  {
    id: 21,
    archetype: "cara-comum",
    statement: "Eu quero que minha marca pareça acessível, real e sem pedestal."
  },
  {
    id: 22,
    archetype: "amante",
    statement: "Eu gosto que minha marca transmita beleza, desejo e conexão emocional."
  },
  {
    id: 23,
    archetype: "amante",
    statement: "Eu presto atenção na estética, nos detalhes e na experiência que minha marca cria."
  },
  {
    id: 24,
    archetype: "amante",
    statement: "Eu quero que meu conteúdo gere vontade de estar mais perto de mim."
  },
  {
    id: 25,
    archetype: "bobo-da-corte",
    statement: "Eu gosto de deixar a comunicação mais leve, divertida e espontânea."
  },
  {
    id: 26,
    archetype: "bobo-da-corte",
    statement: "Eu gosto quando meu conteúdo faz as pessoas sorrirem ou relaxarem."
  },
  {
    id: 27,
    archetype: "bobo-da-corte",
    statement: "Eu consigo falar de assuntos sérios de um jeito mais leve."
  },
  {
    id: 28,
    archetype: "cuidador",
    statement: "Eu gosto de acolher, orientar e fazer as pessoas se sentirem seguras."
  },
  {
    id: 29,
    archetype: "cuidador",
    statement: "Eu penso bastante no impacto que minha fala pode causar nas pessoas."
  },
  {
    id: 30,
    archetype: "cuidador",
    statement: "Eu quero que minha marca seja vista como confiável e responsável."
  },
  {
    id: 31,
    archetype: "criador",
    statement: "Eu gosto de criar experiências, conceitos e ideias originais."
  },
  {
    id: 32,
    archetype: "criador",
    statement: "Eu quero que minha marca tenha uma identidade própria e reconhecível."
  },
  {
    id: 33,
    archetype: "criador",
    statement: "Eu gosto de mostrar bastidores, processos e referências criativas."
  },
  {
    id: 34,
    archetype: "governante",
    statement: "Eu quero que minha marca seja vista como referência e liderança."
  },
  {
    id: 35,
    archetype: "governante",
    statement: "Eu gosto de transmitir segurança, critério e alto padrão."
  },
  {
    id: 36,
    archetype: "governante",
    statement: "Eu quero que minha comunicação passe autoridade e direção."
  }
];
