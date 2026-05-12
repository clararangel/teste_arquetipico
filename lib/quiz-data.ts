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
  pointOfAttention: string;
  positioningAdvice: string;
  shortDescription: string;
};

export type QuestionDimension =
  | "comportamento"
  | "decisao"
  | "comunicacao"
  | "atracao"
  | "conteudo"
  | "posicionamento";

export type Question = {
  id: number;
  archetype: ArchetypeKey;
  dimension: QuestionDimension;
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
    essence: "leveza, confiança, clareza e uma promessa de recomeço possível.",
    brandStrength:
      "Cria segurança emocional, simplifica decisões e faz a audiência sentir que existe um caminho mais puro, honesto e leve.",
    communicationStyle:
      "Clara, positiva, acolhedora e sem excesso de complexidade. A marca fala com transparência e sustenta uma esperança concreta.",
    contentDirection:
      "Conteúdos sobre clareza, princípios, bastidores honestos, passos simples, escolhas conscientes e redução de ruído.",
    pointOfAttention:
      "Evite parecer ingênua, superficial ou distante das dores reais do público. Leveza precisa vir acompanhada de prova e consistência.",
    positioningAdvice:
      "Posicione sua marca como uma experiência de confiança e simplicidade refinada. Mostre que o caminho pode ser mais limpo sem ser raso.",
    shortDescription:
      "O Inocente conduz pela clareza e pela confiança. Sua marca tende a atrair quem busca simplicidade, honestidade e uma sensação de futuro mais leve."
  },
  explorador: {
    id: "explorador",
    name: "Explorador",
    essence: "liberdade, autonomia, movimento e descoberta de novos territórios.",
    brandStrength:
      "Estimula independência, coragem para experimentar e desejo de sair de fórmulas prontas.",
    communicationStyle:
      "Direta, expansiva, curiosa e provocadora na medida certa. A marca abre caminhos e convida a audiência a experimentar.",
    contentDirection:
      "Conteúdos sobre liberdade de escolha, bastidores de experimentos, novas perspectivas, jornadas, transições e expansão de repertório.",
    pointOfAttention:
      "Cuidado para não parecer dispersa, impaciente ou avessa a compromisso. A liberdade precisa de uma direção clara.",
    positioningAdvice:
      "Use o Explorador para posicionar sua marca como uma rota de autonomia: menos dependência de modelos prontos, mais coragem para construir um caminho próprio.",
    shortDescription:
      "O Explorador move a marca pelo desejo de liberdade. Sua comunicação tende a atrair pessoas que querem autonomia, expansão e novos caminhos."
  },
  sabio: {
    id: "sabio",
    name: "Sábio",
    essence: "conhecimento profundo, método, discernimento e busca pela verdade.",
    brandStrength:
      "Constrói autoridade intelectual, reduz insegurança e transforma complexidade em compreensão estratégica.",
    communicationStyle:
      "Didática, precisa, analítica e elegante. A marca ensina sem infantilizar e sustenta suas ideias com método.",
    contentDirection:
      "Conteúdos educativos, análises, frameworks, diagnósticos, estudos de caso, conceitos e explicações que elevam a consciência do público.",
    pointOfAttention:
      "Evite excesso de teoria, frieza ou distanciamento emocional. Conhecimento precisa se conectar com desejo, contexto e decisão.",
    positioningAdvice:
      "Assuma uma autoridade calma. Mostre profundidade, mas traduza seu saber em orientação aplicável para quem precisa decidir melhor.",
    shortDescription:
      "O Sábio guia pela clareza intelectual. Sua marca tende a ganhar valor quando transforma conhecimento em direção, método e autoridade."
  },
  heroi: {
    id: "heroi",
    name: "Herói",
    essence: "conquista, coragem, superação, disciplina e evolução visível.",
    brandStrength:
      "Mobiliza ação, energia de progresso e senso de capacidade. A audiência sente que pode vencer limites concretos.",
    communicationStyle:
      "Firme, objetiva, energizante e orientada a metas. A marca convoca, desafia e celebra evolução real.",
    contentDirection:
      "Conteúdos sobre desafios, metas, bastidores de disciplina, viradas, resultados, planos de ação e superação de bloqueios.",
    pointOfAttention:
      "Cuidado com dureza excessiva, pressão constante ou narrativa de performance sem humanidade. A força precisa ser sustentável.",
    positioningAdvice:
      "Use o Herói para mostrar transformação por ação. Seja a marca que tira a pessoa da intenção e a conduz para execução com coragem.",
    shortDescription:
      "O Herói posiciona a marca como força de movimento. Ele atrai quem deseja coragem, resultado, conquista e superação."
  },
  "fora-da-lei": {
    id: "fora-da-lei",
    name: "Fora da Lei",
    essence: "ruptura, provocação, independência e coragem para desafiar padrões.",
    brandStrength:
      "Diferencia a marca com força, cria contraste no mercado e atrai pessoas cansadas do óbvio.",
    communicationStyle:
      "Provocativa, direta, magnética e sem reverência ao senso comum. A marca questiona, tensiona e reposiciona conversas.",
    contentDirection:
      "Conteúdos de opinião, quebras de crença, contrapontos ao mercado, verdades desconfortáveis e novas leituras sobre velhos problemas.",
    pointOfAttention:
      "Evite rebeldia performática, agressividade gratuita ou crítica sem proposta. Ruptura premium precisa ter inteligência e direção.",
    positioningAdvice:
      "Use esse arquétipo para criar contraste. Mostre o que sua marca não aceita mais e qual novo padrão você sustenta no lugar.",
    shortDescription:
      "O Fora da Lei diferencia pela ruptura. Sua marca tende a atrair quando desafia o óbvio e revela uma forma mais ousada de pensar."
  },
  mago: {
    id: "mago",
    name: "Mago",
    essence: "transformação, visão, alquimia, encantamento e mudança de percepção.",
    brandStrength:
      "Cria fascínio e faz a audiência acreditar em uma mudança mais profunda do que a solução aparente.",
    communicationStyle:
      "Simbólica, estratégica, envolvente e visionária. A marca revela conexões invisíveis e conduz a pessoa a enxergar de outro modo.",
    contentDirection:
      "Conteúdos sobre transformação, antes e depois, identidade, desejo, percepção, rituais de decisão e mudança de mentalidade.",
    pointOfAttention:
      "Cuidado com abstração demais. O encantamento precisa encontrar método, prova e aplicabilidade.",
    positioningAdvice:
      "Posicione sua marca como uma catalisadora de transformação. Mostre o mecanismo por trás da mudança para que o fascínio se converta em confiança.",
    shortDescription:
      "O Mago transforma percepção em desejo. Sua marca tende a se destacar quando faz a audiência enxergar uma nova possibilidade para si."
  },
  "cara-comum": {
    id: "cara-comum",
    name: "Cara Comum",
    essence: "pertencimento, humanidade, proximidade e confiança cotidiana.",
    brandStrength:
      "Reduz distância, cria identificação e faz a audiência sentir que existe espaço para ela naquela conversa.",
    communicationStyle:
      "Humana, acessível, honesta e sem pedestal. A marca conversa com verdade e aproxima sem perder intenção.",
    contentDirection:
      "Conteúdos de bastidores reais, aprendizados práticos, conversas francas, dilemas cotidianos e histórias de identificação.",
    pointOfAttention:
      "Evite diluir sua autoridade para parecer acessível. Proximidade não precisa significar falta de sofisticação.",
    positioningAdvice:
      "Use esse arquétipo para humanizar sua autoridade. Mostre presença real, linguagem clara e uma promessa que cabe na vida do público.",
    shortDescription:
      "O Cara Comum aproxima pela identificação. Sua marca tende a criar confiança quando conversa com humanidade e realidade."
  },
  amante: {
    id: "amante",
    name: "Amante",
    essence: "desejo, beleza, sensibilidade, intimidade e conexão emocional.",
    brandStrength:
      "Cria magnetismo, eleva a percepção estética e transforma relação em desejo de aproximação.",
    communicationStyle:
      "Sensorial, refinada, emocional e envolvente. A marca fala ao desejo sem perder estratégia.",
    contentDirection:
      "Conteúdos sobre estética, experiência, desejo, identidade, relações, escolhas sensíveis e detalhes que aumentam percepção de valor.",
    pointOfAttention:
      "Cuidado para não depender apenas de beleza ou sedução. O desejo precisa sustentar uma promessa clara e uma entrega consistente.",
    positioningAdvice:
      "Posicione sua marca como uma experiência desejável. Trabalhe linguagem, visual, ritmo e narrativa para fazer a audiência querer estar mais perto.",
    shortDescription:
      "O Amante conduz pela estética e pela conexão. Sua marca tende a atrair quando cria desejo, intimidade e percepção sensorial de valor."
  },
  "bobo-da-corte": {
    id: "bobo-da-corte",
    name: "Bobo da Corte",
    essence: "leveza, prazer, humor inteligente, presença e espontaneidade.",
    brandStrength:
      "Quebra tensão, gera lembrança e torna temas densos mais acessíveis sem perder personalidade.",
    communicationStyle:
      "Viva, espirituosa, leve e sagaz. A marca sabe entreter, provocar riso e criar conexão pelo prazer da conversa.",
    contentDirection:
      "Conteúdos com humor, analogias, bastidores espontâneos, comentários culturais, quebras de expectativa e linguagem memorável.",
    pointOfAttention:
      "Evite parecer inconsequente, rasa ou incapaz de sustentar seriedade. Leveza premium precisa de inteligência editorial.",
    positioningAdvice:
      "Use o Bobo da Corte para criar memorabilidade. Traga prazer à experiência, mas mantenha uma tese clara por trás da leveza.",
    shortDescription:
      "O Bobo da Corte atrai pela leveza inteligente. Sua marca tende a se destacar quando torna a comunicação mais viva, prazerosa e memorável."
  },
  cuidador: {
    id: "cuidador",
    name: "Cuidador",
    essence: "proteção, generosidade, suporte, responsabilidade e orientação segura.",
    brandStrength:
      "Cria confiança profunda, reduz medo e faz a audiência sentir que será acompanhada com responsabilidade.",
    communicationStyle:
      "Acolhedora, firme, paciente e cuidadosa. A marca escuta a dor sem explorar fragilidades.",
    contentDirection:
      "Conteúdos sobre orientação, prevenção de erros, acolhimento, processos seguros, suporte, responsabilidade e tomada de decisão consciente.",
    pointOfAttention:
      "Cuidado para assumir peso demais, salvar quem não quer agir ou suavizar excessivamente sua autoridade.",
    positioningAdvice:
      "Posicione sua marca como uma presença confiável. Mostre cuidado com limites, direção e responsabilidade para não cair em excesso de proteção.",
    shortDescription:
      "O Cuidador sustenta pela confiança. Sua marca tende a atrair quando combina acolhimento, responsabilidade e orientação segura."
  },
  criador: {
    id: "criador",
    name: "Criador",
    essence: "autoria, originalidade, expressão, construção e visão estética.",
    brandStrength:
      "Transforma ideias em experiências próprias, aumenta percepção de exclusividade e fortalece identidade autoral.",
    communicationStyle:
      "Imaginativa, refinada, visual e conceitual. A marca comunica processo, repertório e assinatura.",
    contentDirection:
      "Conteúdos sobre bastidores, referências, processo criativo, desenvolvimento de método, escolhas visuais, produtos e construção de linguagem própria.",
    pointOfAttention:
      "Evite perfeccionismo, excesso de elaboração ou dificuldade de finalizar. A autoria precisa chegar ao mercado.",
    positioningAdvice:
      "Use o Criador para evidenciar sua assinatura. Mostre como você pensa, constrói e transforma repertório em algo reconhecível.",
    shortDescription:
      "O Criador posiciona pela autoria. Sua marca tende a ganhar valor quando transforma ideias, estética e método em uma assinatura própria."
  },
  governante: {
    id: "governante",
    name: "Governante",
    essence: "liderança, excelência, estrutura, autoridade e alto padrão.",
    brandStrength:
      "Eleva percepção de valor, cria confiança por comando e sustenta uma imagem de referência no mercado.",
    communicationStyle:
      "Segura, refinada, criteriosa e diretiva. A marca fala com autoridade e deixa claro o padrão que lidera.",
    contentDirection:
      "Conteúdos sobre liderança, critérios de decisão, bastidores de excelência, posicionamento, autoridade, visão de mercado e estrutura.",
    pointOfAttention:
      "Cuidado com rigidez, distanciamento ou excesso de controle. Autoridade premium também precisa gerar conexão.",
    positioningAdvice:
      "Use o Governante para afirmar território. Mostre padrão, método, direção e uma visão madura sobre o mercado que você lidera.",
    shortDescription:
      "O Governante lidera por autoridade e estrutura. Sua marca tende a atrair quando transmite excelência, direção e alto padrão."
  }
};

export const questions: Question[] = [
  {
    id: 1,
    archetype: "inocente",
    dimension: "atracao",
    statement:
      "Eu quero que minha marca transmita leveza, confiança e uma sensação de recomeço possível."
  },
  {
    id: 2,
    archetype: "inocente",
    dimension: "decisao",
    statement:
      "Na hora de decidir, costumo buscar o caminho mais claro, simples e honesto."
  },
  {
    id: 3,
    archetype: "inocente",
    dimension: "conteudo",
    statement:
      "Meu conteúdo funciona melhor quando inspira esperança, transparência e uma visão positiva do futuro."
  },
  {
    id: 4,
    archetype: "explorador",
    dimension: "posicionamento",
    statement:
      "Eu me sinto atraída por posicionamentos que falam de liberdade, autonomia e descoberta."
  },
  {
    id: 5,
    archetype: "explorador",
    dimension: "decisao",
    statement:
      "Prefiro tomar decisões testando caminhos novos, mesmo antes de ter todas as garantias."
  },
  {
    id: 6,
    archetype: "explorador",
    dimension: "comunicacao",
    statement:
      "Minha comunicação ganha força quando convida as pessoas a sair do piloto automático."
  },
  {
    id: 7,
    archetype: "sabio",
    dimension: "comunicacao",
    statement:
      "Eu gosto de conduzir as pessoas com clareza, método e conhecimento profundo."
  },
  {
    id: 8,
    archetype: "sabio",
    dimension: "decisao",
    statement:
      "Antes de me posicionar, preciso entender o contexto, pesquisar e organizar argumentos."
  },
  {
    id: 9,
    archetype: "sabio",
    dimension: "conteudo",
    statement:
      "Meu conteúdo tende a educar, explicar conceitos e criar autoridade intelectual."
  },
  {
    id: 10,
    archetype: "heroi",
    dimension: "atracao",
    statement:
      "Eu me sinto mais forte quando minha marca inspira conquista, superação e ação."
  },
  {
    id: 11,
    archetype: "heroi",
    dimension: "decisao",
    statement:
      "Gosto de decidir com foco em metas, performance e evolução visível."
  },
  {
    id: 12,
    archetype: "heroi",
    dimension: "comunicacao",
    statement:
      "Minha comunicação chama as pessoas para agir, vencer limites e sustentar disciplina."
  },
  {
    id: 13,
    archetype: "fora-da-lei",
    dimension: "posicionamento",
    statement:
      "Eu gosto de quebrar padrões, provocar o mercado e desafiar o óbvio."
  },
  {
    id: 14,
    archetype: "fora-da-lei",
    dimension: "comportamento",
    statement:
      "Quando algo parece engessado, minha tendência é questionar a regra e propor outra lógica."
  },
  {
    id: 15,
    archetype: "fora-da-lei",
    dimension: "conteudo",
    statement:
      "Meu conteúdo ganha força quando confronta verdades desconfortáveis e reposiciona conversas do mercado."
  },
  {
    id: 16,
    archetype: "mago",
    dimension: "atracao",
    statement:
      "Eu quero que minha marca desperte transformação, fascínio e uma sensação de possibilidade maior."
  },
  {
    id: 17,
    archetype: "mago",
    dimension: "comportamento",
    statement:
      "Costumo enxergar conexões invisíveis entre desejo, percepção e mudança."
  },
  {
    id: 18,
    archetype: "mago",
    dimension: "comunicacao",
    statement:
      "Minha comunicação funciona quando revela um antes e depois profundo."
  },
  {
    id: 19,
    archetype: "cara-comum",
    dimension: "atracao",
    statement:
      "Eu valorizo marcas que aproximam, incluem e fazem a pessoa se sentir pertencente."
  },
  {
    id: 20,
    archetype: "cara-comum",
    dimension: "decisao",
    statement:
      "Prefiro decisões práticas, humanas e conectadas com a realidade do público."
  },
  {
    id: 21,
    archetype: "cara-comum",
    dimension: "conteudo",
    statement:
      "Meu conteúdo flui melhor quando conversa sem pedestal, com verdade e simplicidade."
  },
  {
    id: 22,
    archetype: "amante",
    dimension: "atracao",
    statement:
      "Eu prefiro construir uma marca que transmita desejo, estética, sensibilidade e conexão emocional."
  },
  {
    id: 23,
    archetype: "amante",
    dimension: "decisao",
    statement:
      "Minhas decisões consideram beleza, experiência, vínculo e impacto sensorial."
  },
  {
    id: 24,
    archetype: "amante",
    dimension: "comunicacao",
    statement:
      "Meu conteúdo ganha força quando cria intimidade, identificação e vontade de estar perto."
  },
  {
    id: 25,
    archetype: "bobo-da-corte",
    dimension: "comunicacao",
    statement:
      "Eu gosto de trazer leveza, humor inteligente e espontaneidade para a comunicação."
  },
  {
    id: 26,
    archetype: "bobo-da-corte",
    dimension: "decisao",
    statement:
      "Quando decido, costumo valorizar prazer, timing e presença no momento."
  },
  {
    id: 27,
    archetype: "bobo-da-corte",
    dimension: "conteudo",
    statement:
      "Meu conteúdo se destaca quando entretém, alivia tensões e torna assuntos densos mais acessíveis."
  },
  {
    id: 28,
    archetype: "cuidador",
    dimension: "comportamento",
    statement:
      "Eu me sinto realizada quando minha marca protege, orienta e sustenta o crescimento das pessoas."
  },
  {
    id: 29,
    archetype: "cuidador",
    dimension: "decisao",
    statement:
      "Costumo decidir considerando impacto, segurança e o bem-estar de quem confia em mim."
  },
  {
    id: 30,
    archetype: "cuidador",
    dimension: "comunicacao",
    statement:
      "Minha comunicação acolhe dores reais e oferece direção com responsabilidade."
  },
  {
    id: 31,
    archetype: "criador",
    dimension: "comportamento",
    statement:
      "Eu gosto de transformar ideias em métodos, estéticas, produtos ou experiências autorais."
  },
  {
    id: 32,
    archetype: "criador",
    dimension: "decisao",
    statement:
      "Minhas decisões passam pela originalidade, pela coerência visual e pela qualidade da execução."
  },
  {
    id: 33,
    archetype: "criador",
    dimension: "conteudo",
    statement:
      "Meu conteúdo se destaca quando mostra processos, bastidores, referências e construção."
  },
  {
    id: 34,
    archetype: "governante",
    dimension: "posicionamento",
    statement:
      "Eu quero que minha marca seja vista como referência, autoridade e liderança."
  },
  {
    id: 35,
    archetype: "governante",
    dimension: "decisao",
    statement:
      "Tomo decisões buscando estrutura, excelência, controle e posicionamento de alto nível."
  },
  {
    id: 36,
    archetype: "governante",
    dimension: "comunicacao",
    statement:
      "Minha comunicação transmite direção, critério, sofisticação e senso de comando."
  }
];
