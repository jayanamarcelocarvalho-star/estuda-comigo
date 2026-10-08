
function abrirTela(id) {
  document.querySelectorAll(".tela").forEach(function(tela) {
    tela.classList.remove("ativa");
  });

  document.getElementById(id).classList.add("ativa");
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (id === "progresso") atualizarProgresso();
}

const resumos = {
  matematica: {
    titulo: "Porcentagem",
    texto: "25% significa um quarto. Para calcular 25% de 80, divida 80 por 4. O resultado é 20."
  },
  portugues: {
    titulo: "Interpretação de texto",
    texto: "Leia com atenção, identifique a ideia principal e procure no texto as informações que justificam sua resposta."
  },
  humanas: {
    titulo: "História e Geografia",
    texto: "História estuda as ações humanas ao longo do tempo. Geografia estuda o espaço e a relação entre sociedade e natureza."
  },
  ingles: {
    titulo: "Inglês básico",
    texto: "Hello significa Olá; Good morning significa Bom dia; Please significa Por favor; Thank you significa Obrigado(a)."
  }
};

function mostrarResumo(materia) {
  const caixa = document.getElementById("resumo");
  caixa.hidden = false;
  caixa.innerHTML = "";

  const titulo = document.createElement("h3");
  titulo.textContent = resumos[materia].titulo;

  const texto = document.createElement("p");
  texto.textContent = resumos[materia].texto;

  caixa.append(titulo, texto);
}

const questoes = [
  {
    pergunta: "Quanto é 25% de 80?",
    opcoes: ["A) 10", "B) 20", "C) 25", "D) 30"],
    correta: 1,
    explicacao: "25% é um quarto. Um quarto de 80 é 20."
  },
  {
    pergunta: "Quanto é 7 × 8?",
    opcoes: ["A) 48", "B) 54", "C) 56", "D) 64"],
    correta: 2,
    explicacao: "7 multiplicado por 8 é igual a 56."
  },
  {
    pergunta: "Qual palavra significa 'Good morning'?",
    opcoes: ["A) Boa noite", "B) Até logo", "C) Bom dia", "D) Obrigado"],
    correta: 2,
    explicacao: "Good morning significa Bom dia."
  }
];

let indice = 0;
let respondidas = 0;
let acertos = 0;

function carregarQuestao() {
  const q = questoes[indice];

  document.getElementById("numero").textContent =
    "Questão " + (indice + 1) + " de " + questoes.length;

  document.getElementById("pergunta").textContent = q.pergunta;
  document.getElementById("resultado").textContent = "";
  document.getElementById("proxima").hidden = true;

  const area = document.getElementById("alternativas");
  area.innerHTML = "";

  q.opcoes.forEach(function(opcao, i) {
    const botao = document.createElement("button");
    botao.textContent = opcao;

    botao.onclick = function() {
      responder(i);
    };

    area.appendChild(botao);
  });
}

function responder(escolha) {
  const q = questoes[indice];
  const botoes = document.querySelectorAll("#alternativas button");

  if (botoes[0].disabled) return;

  respondidas++;

  if (escolha === q.correta) {
    acertos++;
    document.getElementById("resultado").textContent =
      "✅ Correto! " + q.explicacao;
  } else {
    document.getElementById("resultado").textContent =
      "❌ Não foi dessa vez. " + q.explicacao;
  }

  botoes.forEach(function(botao) {
    botao.disabled = true;
  });

  document.getElementById("proxima").hidden = false;
  atualizarProgresso();
}

function proximaQuestao() {
  indice = (indice + 1) % questoes.length;
  carregarQuestao();
}

let tarefas = [];

document.getElementById("formulario").addEventListener("submit", function(evento) {
  evento.preventDefault();

  const campo = document.getElementById("tarefa");
  const texto = campo.value.trim();

  if (!texto) return;

  tarefas.push({ texto: texto, feita: false });
  campo.value = "";

  renderizarTarefas();
});

function renderizarTarefas() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach(function(tarefa, indiceTarefa) {
    const linha = document.createElement("label");
    const check = document.createElement("input");
    const texto = document.createElement("span");

    check.type = "checkbox";
    check.checked = tarefa.feita;

    check.onchange = function() {
      tarefa.feita = check.checked;
      renderizarTarefas();
    };

    texto.textContent = tarefa.texto;
    linha.append(check, texto);
    linha.style.display = "flex";
    linha.style.alignItems = "center";
    linha.style.gap = "10px";
    linha.style.margin = "10px 0";

    lista.appendChild(linha);
  });

  atualizarProgresso();
}

function atualizarProgresso() {
  document.getElementById("respondidas").textContent = respondidas;
  document.getElementById("acertos").textContent = acertos;
  document.getElementById("concluidas").textContent =
    tarefas.filter(function(tarefa) {
      return tarefa.feita;
    }).length;
}

carregarQuestao();
atualizarProgresso();

