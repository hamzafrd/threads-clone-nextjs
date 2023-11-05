This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install necessary depedencies :

```bash
pnpm install
# or
npm install
```

First, run the development server:

```bash
pnpm dev
# or
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Source Included in this Project

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) and other bundled library from next itself, also a few other libraries such as :

- [`clerk`](https://dashboard.clerk.com/apps/new) for authentication. rename `.env.example` to `.env.local`. Read [Guide](https://clerk.com/docs/references/nextjs/read-session-data) here _(need sign up for key)_.
- [`react-form`](https://ui.shadcn.com/docs/components/form), input, and textarea from [`shadcn`](https://ui.shadcn.com/docs/installation/next) to simplified react form. Note that your tailwind config and globab css will be overwriten after adding shadcn. **_make sure to backup it up_**.
- [`uploadthing`](https://uploadthing.com/) to upload files to app.
- [`mongoose`](https://mongoosejs.com/docs/index.html) to manage data from mongoDB.
- [`svix`](https://www.svix.com/) for web hooks.
- [`zod`](https://zod.dev/) to validate data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)
