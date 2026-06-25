This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
```mermaid
graph TD
%% DISPARADORES
subgraph Disparadores
A[🚀 Push a la rama 'main']
B[🔀 Pull Request hacia 'main']
end
%% PIPELINE
subgraph Etapas del Pipeline de CI
    C[📥 1. Checkout del código]
    D[⚙️ 2. Setup Node.js]
    E[📦 3. Instalar dependencias <br> 'npm install']
    F[🧪 4. Ejecutar Tests <br> 'npm test']
end

%% RESULTADOS
subgraph Resultados Esperados
    G[✅ Éxito <br> Se habilita el Merge a main]
    H[❌ Fallo <br> Se bloquea la integración y se notifica]
end

%% CONEXIONES
A --> C
B --> C
C --> D
D --> E
E --> F

F -->|Si los tests pasan| G
F -->|Si algún test falla| H

%% Estilos (Opcional, para darle color)
style G fill:#d4edda,stroke:#28a745,color:#155724
style H fill:#f8d7da,stroke:#dc3545,color:#721c24
```