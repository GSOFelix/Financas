export const Meses =  ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
export const Tipos = ["Receitas","Despesas"];
export const anos = Array.from(
    { length: 5 }, 
    (_, i) => new Date().getFullYear() - 2 + i 
  );