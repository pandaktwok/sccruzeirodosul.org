# Sociedade Cultural Cruzeiro do Sul (SCCS)

Este é o repositório oficial do site da **Sociedade Cultural Cruzeiro do Sul**, uma instituição dedicada a transformar vidas através da música e da cultura na região de Criciúma/SC. 

O site apresenta os principais projetos socioculturais, a história da instituição e oferece canais diretos para apoio e doação (como o Fundo da Infância e Adolescência - FIA, o Fundo Municipal do Idoso - FMI, e Doação Direta).

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando uma abordagem "no-build" (sem necessidade de bundlers) para garantir facilidade de manutenção e atualizações rápidas diretamente no arquivo.

- **HTML5 / CSS3**
- **React 18** (carregado via CDN)
- **Babel Standalone** (para compilação do código JSX em tempo real no navegador)
- **Lucide React** (para ícones consistentes)
- Sistema de cores moderno usando padrão **Oklch**

## 📁 Estrutura do Projeto

Toda a lógica de renderização, componentes de interface e estilos estão centralizados em um único arquivo para simplificar a hospedagem e modificação:

- `index.html`: Contém toda a estrutura da página, os componentes React (`Header`, `Hero`, `Donation`, `Projects`, `FAQ`, etc) e a folha de estilos global.

## ⚙️ Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/pandaktwok/sccruzeirodosul.org.git
   ```
2. Como o projeto é auto-contido e não possui dependências de backend ou Node.js (package.json), você só precisa iniciar um servidor local estático ou abrir o arquivo em um navegador (via extensão Live Server no VS Code).
   ```bash
   # Exemplo usando npx
   npx serve .
   ```

## 🤝 Projetos em Destaque

Alguns dos projetos abordados pela SCCS que podem receber apoio:
- **CRIAR - Tema I - Cyberbullying**
- **Cultura e Informação para a Pessoa Idosa**
- **Harmonia Educacional**
- **Músicos do Futuro**

---
*Site desenvolvido para a [Sociedade Cultural Cruzeiro do Sul](https://sccruzeirodosul.org/)*
