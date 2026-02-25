# **Manual de Atualização do Site**

## 1. Encerramento das inscrições 

Para que a página mantenha a harmonia visual, não apagamos os editais antigos, apenas alteramos suas cores (classes do Tailwind CSS) para tons de cinza.

### Passo a Passo para Encerrar um Edital

No arquivo `index.html`, localize o bloco do edital que foi finalizado e substitua as seguintes classes:

### I. Etiqueta (Tag superior)
    Muda o texto de "Novo" para "Inscrições Encerradas" e retira a cor fúcsia.
* **O que fazer:** Troque a palavra "NOVO" por "INSCRIÇÕES ENCERRADAS"
* **Procure por:** `bg-fuchsia-100 text-fuchsia-800`
* **Substitua por:** `bg-neutral-200 text-neutral-600`

### II. Botão "Baixar Edital"
Desativa visualmente o botão principal de chamada para ação.
* **Procure por:** `bg-fuchsia-700 hover:bg-fuchsia-800`
* **Substitua por:** `bg-neutral-400 hover:bg-neutral-500`

---
*OBS: Lembre-se de salvar o arquivo `index.html` e fazer o commit para que as alterações reflitam no site (GitHub Pages).*

## 2. Testes

Para testarmos alterações, antes de editarmos diretamente o código no arquivo `index.html`, utilizamos o [Tailwind Play](https://play.tailwindcss.com/).

- Apague o texto de exemplo e insira o bloco HTML que deseja testar (não é necessário inserir o código inteiro, somente o bloco a ser testado)
