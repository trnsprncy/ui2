import Hero from "@/components/hero";
import { Parallax } from "@/components/parallax";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import React from "react";

const _card = {
  title: "Card Heading",
  description: "This is a card description",
  body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum eveniet pariatur labore blanditiis fugit. Obcaecati repudiandae error nisi a distinctio.",
  footer: "card Footer",
};

export default async function Home() {
  return (
    <>
      <main
        id="main-content"
        className="w-full h-full flex flex-1 flex-col p-6 md:p-12 shadow-euphonious bg-gradient-to-r from-background to-transparent"
      >
        <Parallax
          backgroundComponent={
            <div className="absolute inset-0 dark:bg-dot-white/[0.4] bg-dot-black/[0.4] dot-grid" />
          }
        >
          <section className="relative mt-12 max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center gap-y-9 z-10">
            <Hero />
          </section>
        </Parallax>
        {/* <section className="relative w-full max-w-3xl mx-auto my-36 border-x-4 border-white border-l border-r text-white">
          <p className="text-lg text-center pb-12">Our tools in crafting UI.</p>
          <Ticker>
          {[Icons["logo"], Icons["Ui"], Icons["Npmjs"], Icons["gitHub"]].map(
            (icon, i) => (
              <span key={i}>{icon({ width: "64px", height: "64px" })}</span>
            )
          )}
          </Ticker>
        </section> */}
        {/* <section className="relative w-full max-w-5xl mx-auto">
          <p className="text-4xl text-center font-semibold py-12">
            Features & Benefits
          </p>
          <div className="flex gap-x-6">
            {[...Array(1).fill("")].map((_, i) => (
              <FeatureCard key={i} {..._card} />
            ))}
          </div>
        </section> */}
      </main>
    </>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  body: string;
  footer: string;
};
function FeatureCard({ title, description, body, footer }: FeatureCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <p className="font-bold text-2xl">{title}</p>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{body}</CardContent>
      <CardFooter className="text-sm text-gray-500">{footer}</CardFooter>
    </Card>
  );
}
