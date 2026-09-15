export type Bloco =
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "subtitulo"; texto: string }
  | { tipo: "formula"; latex: string; legenda?: string }
  | { tipo: "lista"; itens: string[] }
  | { tipo: "nota"; titulo: string; texto: string };

export type Artigo = {
  slug: string;
  titulo: string;
  resumo: string;
  categoria: string;
  leitura: string;
  icone: string;
  destaque: string;
  blocos: Bloco[];
};

export const artigos: Artigo[] = [
  {
    slug: "transformadores-eletricos",
    titulo: "Transformadores elétricos: indução mútua a serviço da rede",
    resumo:
      "Como duas bobinas acopladas por um núcleo de ferro elevam e rebaixam tensões e tornam viável a transmissão de energia por centenas de quilômetros.",
    categoria: "Transmissão de energia",
    leitura: "9 min",
    icone: "⚡",
    destaque: "V₂/V₁ = N₂/N₁",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Um transformador é, na essência, o experimento de Faraday transformado em infraestrutura. Duas bobinas — primário e secundário — compartilham o mesmo caminho magnético, normalmente um núcleo de ferro laminado. A corrente alternada no primário cria um campo magnético variável; esse campo atravessa o secundário e, pela lei de Faraday-Neumann-Lenz, induz nele uma força eletromotriz.",
      },
      {
        tipo: "paragrafo",
        texto:
          "O acoplamento entre duas bobinas distintas recebe o nome de indutância mútua M. Ela desempenha, para o par de bobinas, o mesmo papel que a autoindutância L desempenha para uma bobina isolada: é a constante de proporcionalidade entre o fluxo concatenado em um enrolamento e a corrente que circula no outro.",
      },
      {
        tipo: "formula",
        latex: "\\Phi_{21} = M\\,i_1 \\qquad \\varepsilon_2 = -M\\,\\frac{di_1}{dt}",
        legenda: "Indução mútua: a fem no secundário depende da taxa de variação da corrente no primário.",
      },
      { tipo: "subtitulo", texto: "A relação de espiras" },
      {
        tipo: "paragrafo",
        texto:
          "Se o núcleo canaliza praticamente todo o fluxo, cada espira do primário e cada espira do secundário são atravessadas pelo mesmo fluxo φ_B. A fem total de cada lado é a soma das fems espira a espira — exatamente o raciocínio usado para o fluxo concatenado de um solenoide.",
      },
      {
        tipo: "formula",
        latex:
          "\\frac{V_2}{V_1} = \\frac{N_2}{N_1} \\qquad\\text{e, com potência conservada,}\\qquad \\frac{i_2}{i_1} = \\frac{N_1}{N_2}",
      },
      {
        tipo: "paragrafo",
        texto:
          "Eis a razão pela qual a energia elétrica viaja em alta tensão. A perda por efeito Joule numa linha de transmissão vale P = R·i². Elevando a tensão por um fator 100, a corrente cai por um fator 100 e a perda cai por um fator 10 000. Perto do consumidor, outro transformador faz o caminho inverso.",
      },
      { tipo: "subtitulo", texto: "Por que só funciona em corrente alternada" },
      {
        tipo: "paragrafo",
        texto:
          "A fem induzida depende de dφ_B/dt, não de φ_B. Uma corrente contínua estabelece um fluxo constante e, após o transitório inicial, nada mais é induzido no secundário. A corrente alternada garante variação permanente — e é por isso que a rede elétrica mundial é AC.",
      },
      {
        tipo: "nota",
        titulo: "Perdas reais",
        texto:
          "Núcleos são laminados e isolados entre si justamente para quebrar os caminhos das correntes de Foucault, que aqueceriam o ferro inutilmente. Somam-se ainda perdas por histerese e por resistência ôhmica dos enrolamentos. Transformadores de potência modernos superam 99% de rendimento.",
      },
      {
        tipo: "lista",
        itens: [
          "Subestações: elevam de ~15 kV (gerador) para 230-750 kV (linha).",
          "Transformadores de distribuição: rebaixam para 220/127 V.",
          "Fontes chaveadas: operam em dezenas de kHz, o que permite núcleos minúsculos de ferrite.",
          "Transformadores de isolação: separam galvanicamente equipamento e rede, por segurança.",
        ],
      },
    ],
  },
  {
    slug: "geradores-e-alternadores",
    titulo: "Geradores e alternadores: convertendo movimento em corrente",
    resumo:
      "Uma espira girando num campo magnético é toda a base das usinas hidrelétricas, térmicas, nucleares e eólicas — e explica por que a tensão da tomada é senoidal.",
    categoria: "Conversão de energia",
    leitura: "8 min",
    icone: "🌀",
    destaque: "ε = NBAω·sen(ωt)",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Praticamente toda a eletricidade consumida no planeta nasce do mesmo gesto: girar um conjunto de espiras dentro de um campo magnético. Muda apenas quem faz girar — água represada, vapor de uma caldeira, vapor aquecido por fissão nuclear ou vento.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Com a espira girando a uma velocidade angular ω, a área efetiva vista pelo campo varia com o cosseno do ângulo, e o fluxo concatenado acompanha essa variação.",
      },
      {
        tipo: "formula",
        latex:
          "\\Phi_B(t) = N B A \\cos(\\omega t) \\;\\Longrightarrow\\; \\varepsilon = -\\frac{d\\Phi_B}{dt} = N B A \\omega \\sin(\\omega t)",
        legenda: "A senoide de 60 Hz da tomada é a assinatura direta da lei de Faraday.",
      },
      { tipo: "subtitulo", texto: "O sinal negativo cobra seu preço" },
      {
        tipo: "paragrafo",
        texto:
          "A lei de Lenz não é um detalhe de sinal: é conservação de energia. A corrente induzida cria um campo que se opõe à variação do fluxo, gerando um torque contrário ao movimento. Quanto mais corrente o gerador entrega, mais difícil é girá-lo. Por isso uma usina consome mais combustível quando a demanda sobe — a carga elétrica é literalmente sentida no eixo.",
      },
      { tipo: "subtitulo", texto: "Alternador x dínamo" },
      {
        tipo: "lista",
        itens: [
          "Alternador: entrega corrente alternada via anéis coletores. É o padrão em usinas e em automóveis.",
          "Dínamo: usa um comutador que inverte as conexões a cada meia volta, retificando mecanicamente a saída.",
          "Em usinas de grande porte, o campo magnético é criado por eletroímãs no rotor; controlar essa excitação é o que ajusta a tensão gerada.",
          "A frequência da rede é fixada pela rotação: um gerador de 2 polos precisa girar a 3600 rpm para produzir 60 Hz.",
        ],
      },
      {
        tipo: "nota",
        titulo: "Densidade de energia",
        texto:
          "Máquinas elétricas têm entreferros estreitos porque a energia por unidade de volume no campo magnético vale u = B²/2μ₀. Dobrar B quadruplica a energia armazenada por metro cúbico — e, com ela, a potência que a máquina consegue converter.",
      },
    ],
  },
  {
    slug: "motores-de-inducao",
    titulo: "Motores de indução: o campo girante de Tesla",
    resumo:
      "Sem escovas, sem contato elétrico com o rotor. Correntes induzidas e a força de Lorentz movem desde ventiladores até trens e carros elétricos.",
    categoria: "Máquinas elétricas",
    leitura: "10 min",
    icone: "⚙️",
    destaque: "s = (nₛ − n)/nₛ",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "O motor de indução é o inverso exato do gerador. Três enrolamentos do estator, defasados de 120° no espaço e alimentados por correntes defasadas de 120° no tempo, produzem um campo magnético de módulo constante que gira no espaço: o campo girante.",
      },
      {
        tipo: "formula",
        latex: "n_s = \\frac{120\\,f}{p}",
        legenda: "Velocidade síncrona em rpm, com f em hertz e p o número de polos.",
      },
      { tipo: "subtitulo", texto: "Por que o rotor gira" },
      {
        tipo: "paragrafo",
        texto:
          "O rotor gaiola de esquilo é apenas um conjunto de barras condutoras curto-circuitadas. O campo girante varre essas barras, o fluxo através delas varia e correntes intensas são induzidas. Essas correntes, imersas no próprio campo do estator, sofrem a força de Lorentz F = i·L × B, que produz torque.",
      },
      {
        tipo: "formula",
        latex: "\\vec{F} = i\\,\\vec{L} \\times \\vec{B} \\qquad \\tau = k\\,\\Phi\\,i_{rotor}\\cos\\varphi",
      },
      { tipo: "subtitulo", texto: "O escorregamento é obrigatório" },
      {
        tipo: "paragrafo",
        texto:
          "Se o rotor alcançasse a velocidade do campo, não haveria variação de fluxo, nem corrente induzida, nem torque. Por isso o rotor sempre gira um pouco mais devagar. Essa diferença relativa é o escorregamento s, tipicamente entre 2% e 6% em carga nominal.",
      },
      {
        tipo: "formula",
        latex: "s = \\frac{n_s - n}{n_s}",
      },
      {
        tipo: "lista",
        itens: [
          "Robustez: nenhum contato elétrico móvel, logo quase nenhuma manutenção.",
          "Partida: a corrente de partida pode chegar a 6-8 vezes a nominal, daí partidas estrela-triângulo e soft-starters.",
          "Inversores de frequência variam f para controlar a rotação com precisão e economia.",
          "Frenagem regenerativa: acima da velocidade síncrona a máquina vira gerador e devolve energia à rede ou à bateria.",
        ],
      },
    ],
  },
  {
    slug: "cooktop-de-inducao",
    titulo: "Cooktop de indução: correntes de Foucault cozinhando o jantar",
    resumo:
      "A panela é o próprio resistor. Entenda como eddy currents e efeito Joule aquecem o fundo da panela sem esquentar o vidro.",
    categoria: "Cotidiano",
    leitura: "8 min",
    icone: "🔥",
    destaque: "P = R·i²",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Sob a placa de vitrocerâmica há uma bobina plana percorrida por corrente alternada de alta frequência, tipicamente entre 20 e 50 kHz. Essa corrente cria um campo magnético que varia dezenas de milhares de vezes por segundo logo acima do vidro.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Quando uma panela ferromagnética é colocada ali, o fundo metálico se comporta como uma espira em curto. O fluxo variável induz nele correntes fechadas — as correntes de Foucault, ou eddy currents — que circulam em redemoinhos dentro do próprio metal.",
      },
      {
        tipo: "formula",
        latex: "\\varepsilon_{ind} = -\\frac{d\\Phi_B}{dt} \\qquad P_{dissipada} = R\\,i^2",
        legenda: "A potência vira calor por efeito Joule dentro da panela, não na superfície do fogão.",
      },
      { tipo: "subtitulo", texto: "Efeito pelicular e ferromagnetismo" },
      {
        tipo: "paragrafo",
        texto:
          "Em alta frequência, a corrente induzida se concentra numa camada fina da superfície — o efeito pelicular. A profundidade de penetração diminui com a frequência e com a permeabilidade magnética do material, o que concentra o aquecimento e eleva a resistência efetiva vista pela corrente.",
      },
      {
        tipo: "formula",
        latex: "\\delta = \\sqrt{\\frac{2\\rho}{\\omega\\mu}}",
        legenda: "Profundidade pelicular: em aço, poucos décimos de milímetro a 25 kHz.",
      },
      {
        tipo: "nota",
        titulo: "Por que o alumínio não funciona bem",
        texto:
          "Alumínio e cobre têm permeabilidade próxima à do vácuo e resistividade baixa: acoplam mal com a bobina e dissipam pouco. Panelas de aço inox ferrítico ou ferro fundido atraem ímã — o teste caseiro definitivo.",
      },
      {
        tipo: "lista",
        itens: [
          "Rendimento de 85-90%, contra ~40% do gás.",
          "O vidro só aquece por condução vinda da panela.",
          "Sem panela, o sistema detecta a ausência de carga e desliga.",
          "Nos transformadores essas mesmas correntes são um problema; aqui, são o produto.",
        ],
      },
    ],
  },
  {
    slug: "carregamento-sem-fio-qi",
    titulo: "Carregamento sem fio Qi: indução com ressonância",
    resumo:
      "Dois solenoides planos separados por milímetros de ar, sintonizados na mesma frequência, transferem dezenas de watts sem nenhum contato metálico.",
    categoria: "Eletrônica de consumo",
    leitura: "7 min",
    icone: "📱",
    destaque: "f₀ = 1/(2π√(LC))",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "O padrão Qi é um transformador com entreferro de ar. A base contém a bobina transmissora; o aparelho, a receptora. Sem núcleo de ferro contínuo, o acoplamento é fraco: boa parte do fluxo gerado se dispersa e nunca chega à outra bobina.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A solução é a ressonância. Cada bobina é associada a um capacitor, formando circuitos LC sintonizados na mesma frequência — entre 110 e 205 kHz no padrão Qi. Na ressonância, a corrente circulante é muito maior que a corrente de entrada, o que amplifica o campo e compensa o acoplamento fraco.",
      },
      {
        tipo: "formula",
        latex: "f_0 = \\frac{1}{2\\pi\\sqrt{LC}} \\qquad k = \\frac{M}{\\sqrt{L_1 L_2}}",
        legenda: "k é o coeficiente de acoplamento; em Qi fica tipicamente entre 0,3 e 0,7.",
      },
      { tipo: "subtitulo", texto: "Comunicação pela própria bobina" },
      {
        tipo: "paragrafo",
        texto:
          "O receptor informa ao transmissor quanta potência precisa modulando sua própria carga. Essa variação se reflete no primário via indutância mútua e é lida como um sinal digital. É por isso que o carregador reduz a potência quando a bateria se aproxima de 100%.",
      },
      {
        tipo: "lista",
        itens: [
          "Folha de ferrite atrás de cada bobina: canaliza o fluxo e blinda a eletrônica.",
          "Detecção de objeto estranho: uma moeda sobre a base absorveria energia por eddy currents e superaqueceria; o sistema compara potência enviada e recebida e interrompe.",
          "Alinhamento magnético (MagSafe): ímãs garantem o k máximo.",
          "Escalas maiores: escovas de dente, implantes médicos e carregamento indutivo de veículos elétricos.",
        ],
      },
    ],
  },
  {
    slug: "freios-magneticos",
    titulo: "Freios magnéticos: parar sem tocar",
    resumo:
      "Montanhas-russas e trens de alta velocidade freiam com a lei de Lenz — dissipando energia cinética em calor, sem pastilhas e sem desgaste.",
    categoria: "Transporte e segurança",
    leitura: "7 min",
    icone: "🧲",
    destaque: "F ∝ −v",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Quando uma placa metálica atravessa um campo magnético, o fluxo através de cada região dela varia e correntes de Foucault aparecem. Pela lei de Lenz, essas correntes criam um campo que se opõe à variação — e o resultado macroscópico é uma força que sempre se opõe ao movimento.",
      },
      {
        tipo: "formula",
        latex: "F_{frenagem} \\propto -\\,\\sigma\\,B^2\\,v",
        legenda: "A força cresce com a velocidade: frenagem forte no início, suave no fim.",
      },
      { tipo: "subtitulo", texto: "Frenagem assintótica" },
      {
        tipo: "paragrafo",
        texto:
          "Como a força é proporcional à velocidade, o freio magnético puro nunca imobiliza o veículo — apenas o aproxima do repouso exponencialmente. Por isso ele é sempre combinado com um freio mecânico para a parada final e o estacionamento.",
      },
      {
        tipo: "nota",
        titulo: "Por que isso é seguro",
        texto:
          "Em montanhas-russas usam-se ímãs permanentes: não há eletrônica, alimentação nem atuador que possa falhar. A frenagem é uma consequência física inevitável da passagem da aleta metálica entre os ímãs.",
      },
      {
        tipo: "lista",
        itens: [
          "Trens de alta velocidade: freios de Foucault lineares sobre o trilho poupam as pastilhas nas desacelerações longas.",
          "Caminhões pesados: retardadores eletromagnéticos evitam o superaquecimento dos freios em descidas.",
          "Bicicletas ergométricas e esteiras: a carga é ajustada aproximando ímãs do volante.",
          "Balanças e galvanômetros: amortecimento por eddy currents evita oscilação do ponteiro.",
        ],
      },
      {
        tipo: "paragrafo",
        texto:
          "A energia cinética não desaparece: vira calor no próprio disco ou trilho, distribuído em volume. Em veículos elétricos, a alternativa é a frenagem regenerativa, em que o motor atua como gerador e devolve parte dessa energia à bateria.",
      },
    ],
  },
  {
    slug: "sensores-rfid-captadores",
    titulo: "Sensores indutivos, RFID e captadores de guitarra",
    resumo:
      "Indução em pequena escala: detectar metal sem contato, alimentar um chip sem bateria e transformar a vibração de uma corda em música.",
    categoria: "Sensores e sinais",
    leitura: "8 min",
    icone: "📡",
    destaque: "ε = −dΦ/dt",
    blocos: [
      { tipo: "subtitulo", texto: "Sensor de proximidade indutivo" },
      {
        tipo: "paragrafo",
        texto:
          "Um oscilador LC mantém um campo alternado na face do sensor. Quando um objeto metálico se aproxima, correntes de Foucault induzidas nele extraem energia do circuito e amortecem a oscilação. O eletrônico detecta a queda de amplitude e comuta a saída. Nenhum contato mecânico, milhões de ciclos sem desgaste.",
      },
      { tipo: "subtitulo", texto: "RFID e NFC" },
      {
        tipo: "paragrafo",
        texto:
          "Uma etiqueta RFID passiva não tem bateria. Sua antena é uma bobina: o campo do leitor induz nela uma fem que, retificada, alimenta o microchip. Para responder, o chip modula a carga sobre a própria bobina, e o leitor percebe essa variação refletida por indutância mútua — a chamada modulação por retroespalhamento de carga.",
      },
      {
        tipo: "formula",
        latex: "\\varepsilon_{ind} = -N\\,\\frac{d\\Phi_B}{dt} \\qquad \\Phi_{21} = M\\,i_1",
      },
      { tipo: "subtitulo", texto: "Captadores de guitarra" },
      {
        tipo: "paragrafo",
        texto:
          "Um captador é um ímã permanente envolto por milhares de espiras de fio fino. O ímã magnetiza o trecho de corda logo acima dele; quando a corda vibra, o fluxo através da bobina oscila na mesma frequência e uma fem é induzida. É literalmente a lei de Faraday chegando ao amplificador.",
      },
      {
        tipo: "lista",
        itens: [
          "Single-coil: brilhante, mas capta zumbido de 60 Hz da rede.",
          "Humbucker: duas bobinas em oposição cancelam o ruído comum e somam o sinal útil.",
          "Milhares de espiras significam L alto — o captador forma um filtro com a capacitância do cabo, moldando o timbre.",
          "Detectores de metal, sensores de rotação ABS e leitores de cartão magnético operam pelo mesmo princípio.",
        ],
      },
    ],
  },
  {
    slug: "campo-eletrico-induzido",
    titulo: "Campo elétrico induzido: o campo que não tem potencial",
    resumo:
      "Um fluxo magnético variável cria campo elétrico mesmo no vácuo, sem cargas. E esse campo, ao contrário do eletrostático, não é conservativo.",
    categoria: "Fundamento — Aula 33",
    leitura: "10 min",
    icone: "🌐",
    destaque: "∮E·dl = −dΦ_B/dt",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "A lei de Faraday costuma ser apresentada com uma espira condutora: o fluxo varia, aparece corrente. Mas a afirmação é mais profunda. Um fluxo magnético variável gera campo elétrico sempre — inclusive no vácuo, sem nenhum condutor e sem nenhuma carga presente. A espira é apenas o detector.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Considere uma espira circular de raio r num campo magnético uniforme perpendicular ao seu plano. O trabalho para levar uma carga de prova q ao longo de todo o circuito é W = q∮E·dl, e o trabalho por unidade de carga é, por definição, a força eletromotriz.",
      },
      {
        tipo: "formula",
        latex: "\\varepsilon = \\frac{W}{q} = \\oint \\vec{E}\\cdot d\\vec{l} = -\\frac{d\\Phi_B}{dt}",
        legenda: "Forma integral da lei de Faraday. A lei de Lenz fixa o sentido de E ao longo da curva.",
      },
      { tipo: "subtitulo", texto: "A demonstração da não conservatividade" },
      {
        tipo: "paragrafo",
        texto:
          "Num campo eletrostático, a diferença de potencial entre dois pontos não depende do caminho. Fazendo o ponto final coincidir com o inicial, a integral fechada é necessariamente nula — essa é a assinatura matemática de um campo conservativo.",
      },
      {
        tipo: "formula",
        latex:
          "V_b - V_a = -\\int_a^b \\vec{E}\\cdot d\\vec{l} \\;\\;\\Longrightarrow\\;\\; \\oint_{\\text{estático}} \\vec{E}\\cdot d\\vec{l} = 0",
      },
      {
        tipo: "paragrafo",
        texto:
          "Para o campo induzido, porém, essa mesma integral fechada vale −dΦ_B/dt, que é diferente de zero sempre que o fluxo varia. Logo o campo induzido não é conservativo: o trabalho depende do caminho, e uma carga pode dar voltas ganhando energia continuamente.",
      },
      {
        tipo: "nota",
        titulo: "Consequência conceitual",
        texto:
          "Não existe potencial escalar V para o campo elétrico induzido. Potencial e energia potencial elétrica simplesmente não têm significado aqui — falar em 'a tensão em um ponto' de um circuito com fluxo variável é ambíguo, pois o valor medido depende de por onde passam os fios do voltímetro.",
      },
      {
        tipo: "lista",
        itens: [
          "Campo de cargas: linhas abertas, começam em carga positiva e terminam em negativa.",
          "Campo induzido: linhas sempre fechadas, sem extremidade livre — não há fonte nem sumidouro.",
          "O campo induzido existe independentemente de haver carga de prova; uma carga livre numa região de B variável sente força.",
          "Em forma diferencial: ∇ × E = −∂B/∂t, uma das quatro equações de Maxwell.",
        ],
      },
      { tipo: "subtitulo", texto: "Exemplo: dentro e fora de um solenoide" },
      {
        tipo: "paragrafo",
        texto:
          "Um solenoide longo de raio R, com n espiras por metro, conduz i = I₀·cos(ωt). O campo no interior vale B = μ₀ n i e é praticamente nulo fora. Tomando circunferências de integração concêntricas ao eixo:",
      },
      {
        tipo: "formula",
        latex:
          "r < R:\\;\\; E = \\frac{\\mu_0 n I_0 \\omega\\, r}{2}\\sin(\\omega t) \\qquad r > R:\\;\\; E = \\frac{\\mu_0 n I_0 \\omega R^2}{2r}\\sin(\\omega t)",
        legenda: "Dentro, E cresce linearmente com r; fora, decai com 1/r — mesmo onde B é nulo.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Note o resultado surpreendente: fora do solenoide não há campo magnético algum, e ainda assim existe campo elétrico induzido. O que importa não é o valor local de B, mas o fluxo abraçado pela curva de integração.",
      },
      {
        tipo: "formula",
        latex: "|E| = \\frac{r}{2}\\left|\\frac{dB}{dt}\\right|",
        legenda: "Caso particular: campo uniforme variando dentro de uma região circular.",
      },
    ],
  },
  {
    slug: "correntes-de-foucault",
    titulo: "Correntes de Foucault: o vilão que virou ferramenta",
    resumo:
      "Como redemoinhos de corrente surgem em condutores maciços, por que os núcleos são laminados em forma de pente e onde essa dissipação passa a ser útil.",
    categoria: "Fundamento — Aula 33",
    leitura: "11 min",
    icone: "🌊",
    destaque: "núcleos laminados",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Imagine uma placa metálica maciça se movendo para a direita, com parte de sua área dentro de um campo magnético e parte fora. À medida que ela sai do campo, o fluxo abraçado por qualquer circuito imaginário desenhado na placa diminui. Pela lei de Faraday, surge fem; como o metal é um bom condutor, surge corrente.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Essas correntes não seguem um fio: fecham-se em laços dentro do próprio volume do condutor, como redemoinhos. São as correntes de Foucault, batizadas em homenagem a Jean B. L. Foucault (1819-1868), que mostrou que a frenagem da placa vem da força magnética sobre essas correntes e que a energia se converte em calor por efeito Joule.",
      },
      {
        tipo: "formula",
        latex: "\\vec{F} = i\\,\\vec{L}\\times\\vec{B} \\qquad P_{J} = R\\,i^2",
        legenda: "A força resultante se opõe ao movimento (Lenz) e a potência dissipada aquece o metal.",
      },
      { tipo: "subtitulo", texto: "Por que só o lado dentro do campo conta" },
      {
        tipo: "paragrafo",
        texto:
          "Analisando os quatro lados do laço de corrente na placa: o lado que está dentro do campo experimenta i·L × B não nulo, apontando contra o movimento. O lado oposto está fora da região de campo, onde B = 0, e portanto não sofre força. Os dois lados transversais têm forças opostas que se cancelam. O saldo é uma força de frenagem.",
      },
      { tipo: "subtitulo", texto: "O problema: perdas em motores e transformadores" },
      {
        tipo: "paragrafo",
        texto:
          "Dentro de um transformador ou de um motor, o núcleo de ferro é um condutor maciço imerso num campo que varia 60 vezes por segundo. Correntes de Foucault gigantescas circulariam nele, aquecendo o ferro e roubando potência útil — uma perda direta no rendimento da máquina, além de risco térmico para o isolamento dos enrolamentos.",
      },
      {
        tipo: "nota",
        titulo: "A solução: núcleos laminados",
        texto:
          "Em vez de um bloco maciço, o núcleo é montado com finas chapas de aço-silício empilhadas e isoladas entre si por verniz ou óxido — um núcleo fatiado, em forma de pente. As lâminas são paralelas ao campo, de modo que o caminho magnético continua contínuo, mas os laços de corrente ficam confinados a cada fatia fina. Como a fem induzida em cada laço cai e a resistência do caminho estreito sobe, a dissipação despenca. As perdas caem aproximadamente com o quadrado da espessura da lâmina.",
      },
      {
        tipo: "lista",
        itens: [
          "Lâminas típicas de 0,20 a 0,50 mm em transformadores de potência.",
          "Em alta frequência, usam-se ferrites: cerâmicas ferromagnéticas de resistividade altíssima, onde eddy currents praticamente não circulam.",
          "O silício no aço aumenta a resistividade e reduz ainda mais as perdas.",
          "Fios trançados (litz) combatem o mesmo fenômeno dentro dos próprios condutores.",
        ],
      },
      { tipo: "subtitulo", texto: "A virada: quando a perda é o produto" },
      {
        tipo: "paragrafo",
        texto:
          "O mesmo efeito que estraga um transformador é a razão de ser de outras tecnologias. No cooktop de indução, a panela é deliberadamente feita de material que dissipa bem, e todo o calor do jantar vem de correntes de Foucault. Em freios dinâmicos de trens e montanhas-russas, a força contrária ao movimento é justamente o que se deseja: frenagem sem contato, sem pastilhas e sem desgaste.",
      },
      {
        tipo: "lista",
        itens: [
          "Fornos de indução industriais: fundem toneladas de metal sem chama.",
          "Solda e tratamento térmico por indução: aquecimento localizado e controlado.",
          "Amortecimento de balanças e galvanômetros: o ponteiro para sem oscilar.",
          "Detectores de metais e separadores de alumínio em reciclagem.",
        ],
      },
    ],
  },
  {
    slug: "fem-de-movimento-relatividade",
    titulo: "Fem de movimento ε = Blv e a relatividade entre observadores",
    resumo:
      "Dois observadores discordam sobre a origem da força — um vê força magnética, o outro vê campo elétrico — mas medem exatamente a mesma fem.",
    categoria: "Fundamento — Aula 33",
    leitura: "9 min",
    icone: "🚀",
    destaque: "F/q = E + v × B",
    blocos: [
      {
        tipo: "paragrafo",
        texto:
          "Considere uma barra condutora de comprimento l deslizando com velocidade v, perpendicularmente a um campo magnético B. Cada portador de carga dentro do metal se move junto com a barra e, por isso, sofre a força magnética de Lorentz.",
      },
      {
        tipo: "formula",
        latex: "\\vec{F}_m = q\\,\\vec{v}\\times\\vec{B}",
      },
      {
        tipo: "paragrafo",
        texto:
          "Essa força empurra as cargas ao longo da barra. O trabalho realizado sobre a carga ao percorrer o comprimento l é W = qvBl, e a força eletromotriz é o trabalho por unidade de carga:",
      },
      {
        tipo: "formula",
        latex: "\\varepsilon = \\frac{W}{q} = B\\,l\\,v",
        legenda: "Fem de movimento — idêntica ao resultado obtido pela variação do fluxo, ε = −dΦ/dt.",
      },
      {
        tipo: "paragrafo",
        texto:
          "A componente da força paralela ao fio é equilibrada pelas colisões internas do metal, o que mantém a velocidade de arraste constante; a componente transversal tende a empurrar a carga contra a parede lateral do condutor. O resultado macroscópico é uma corrente estacionária no circuito.",
      },
      { tipo: "subtitulo", texto: "O mesmo fenômeno, duas explicações" },
      {
        tipo: "paragrafo",
        texto:
          "Um observador S, em repouso em relação ao ímã, vê o circuito se movendo: para ele a corrente nasce da força magnética qv × B. Já um observador S', em repouso em relação ao circuito, não vê as cargas se moverem lateralmente — para ele é o campo magnético que se desloca. Ele precisa postular um campo elétrico induzido entre as extremidades da barra para explicar a mesma corrente.",
      },
      {
        tipo: "formula",
        latex: "S:\\;\\; \\frac{\\vec{F}}{q} = \\vec{v}\\times\\vec{B} \\qquad S':\\;\\; \\frac{\\vec{F}}{q} = \\vec{E} \\qquad \\varepsilon_S = \\varepsilon_{S'} = Blv",
      },
      {
        tipo: "nota",
        titulo: "A síntese",
        texto:
          "Observadores em diferentes estados de movimento medem a mesma força eletromotriz induzida, mas discordam sobre a origem da força que a produz. Para um terceiro observador, que vê tanto o circuito quanto o campo em movimento, a força é uma combinação das duas contribuições.",
      },
      {
        tipo: "formula",
        latex: "\\vec{F} = q\\vec{E} + q\\,\\vec{v}\\times\\vec{B} \\;\\Longrightarrow\\; \\frac{\\vec{F}}{q} = \\vec{E} + \\vec{v}\\times\\vec{B}",
        legenda: "A força total por unidade de carga é a mesma para todos; só a divisão entre elétrico e magnético muda.",
      },
      {
        tipo: "paragrafo",
        texto:
          "Essa constatação não é um detalhe técnico: foi exatamente ela que motivou Einstein a abrir o artigo de 1905 sobre relatividade restrita discutindo a indução entre ímã e condutor. Campo elétrico e campo magnético não são entidades independentes — são faces do mesmo campo eletromagnético, e a divisão entre elas depende do referencial.",
      },
    ],
  },
];

export function getArtigo(slug: string) {
  return artigos.find((a) => a.slug === slug);
}
