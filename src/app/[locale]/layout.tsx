import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { routing } from "@/i18n/routing";
import { Locale } from "@/types/types";
import { QuizProvider } from "@/app/context/QuizContext";

import "./globals.css";

export const metadata: Metadata = {
  title: "Smart Quiz",
  description: "This is smart quiz app",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  return (
    <html>
      <body>
        <NextIntlClientProvider messages={messages}>
          <QuizProvider>{children}</QuizProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
