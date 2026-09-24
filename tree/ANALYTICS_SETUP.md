# Relatórios da /tree com GA4

## O que será medido

- Visualizações e usuários da página.
- Origem de tráfego, dispositivo e localização agregada.
- Clique por unidade e ação: informações e reservas, eventos, iFood e Keeta.
- Uso das abas e botões principais.

Não medimos mensagens enviadas no WhatsApp, reservas confirmadas, pedidos concluídos ou receita.

## Ativação

1. Acesse [Google Analytics](https://analytics.google.com/) com a conta que será dona dos dados.
2. Crie ou selecione a conta/propriedade da D'Brescia e escolha **Administrador > Fluxos de dados > Web**.
3. Cadastre a URL `https://lippcruz.github.io/dbrescia.com.br-v2/tree/` e nomeie o fluxo como `D'Brescia /tree`.
4. Copie o **ID de medição** no formato `G-XXXXXXXXXX`.
5. Insira apenas esse ID em `tree/analytics-config.js`, no campo `measurementId`.
6. Publique a alteração. Na primeira visita, o banner pede consentimento antes de carregar o GA4.

## Painel

No Looker Studio, conecte a propriedade GA4 e crie filtros por data, `action_type`, `unit` e `destination`. O evento customizado é `tree_interaction`.
