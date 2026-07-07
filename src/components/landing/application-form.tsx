"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/section";
import {
  applicationSchema,
  type ApplicationFormData,
} from "@/lib/validations/application";
import { cn } from "@/lib/utils";

const TRAINING_OPTIONS = [
  { value: "none", label: "Brak doświadczenia" },
  { value: "beginner", label: "Początkujący" },
  { value: "intermediate", label: "Średniozaawansowany" },
  { value: "advanced", label: "Zaawansowany" },
] as const;

const CONTACT_OPTIONS = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Telefon" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

const TIER_OPTIONS = [
  { value: "starter", label: "Starter, 399 zł/mies." },
  { value: "standard", label: "Standard, 699 zł/mies." },
  { value: "premium", label: "Premium, 1 199 zł/mies." },
] as const;

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-label mb-2 block text-tertiary">{label}</label>
      {children}
      {error && (
        <p className="mt-1.5 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClassName =
  "h-12 w-full rounded-sm border border-border bg-white px-4 text-base text-light-text outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20";

export function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      tier: "standard",
      preferredContact: "email",
      gdprConsent: false,
      marketingConsent: false,
    },
  });

  async function onSubmit(data: ApplicationFormData) {
    setServerError(null);

    const response = await fetch("/api/aplikacja", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      setServerError("Nie udało się wysłać aplikacji. Spróbuj ponownie.");
      return;
    }

    setSubmitted(true);
  }

  return (
    <Section id="aplikacja" theme="light">
      <div className="mx-auto max-w-xl">
        <div>
          <p className="text-label text-tertiary">Aplikacja</p>
          <h2 className="text-display mt-3 text-light-text">Zacznij współpracę</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Krótki formularz. Oddzwonimy w 24 godziny.
          </p>
        </div>

        {submitted ? (
          <div
            className="mt-10 border border-border bg-white p-8 text-center"
            role="status"
          >
            <h3 className="text-xl font-medium text-light-text">Dziękujemy!</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Otrzymaliśmy Twoją aplikację. Skontaktujemy się w ciągu 24 godzin
              wybraną formą kontaktu.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-6"
            noValidate
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Imię" error={errors.firstName?.message}>
                <input
                  className={inputClassName}
                  autoComplete="given-name"
                  {...register("firstName")}
                />
              </Field>

              <Field label="Email" error={errors.email?.message}>
                <input
                  type="email"
                  className={inputClassName}
                  autoComplete="email"
                  {...register("email")}
                />
              </Field>
            </div>

            <Field label="Telefon" error={errors.phone?.message}>
              <input
                type="tel"
                className={inputClassName}
                autoComplete="tel"
                {...register("phone")}
              />
            </Field>

            <Field label="Wybrany pakiet" error={errors.tier?.message}>
              <select className={cn(inputClassName, "appearance-none")} {...register("tier")}>
                {TIER_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field label="Twój główny cel" error={errors.goal?.message}>
              <textarea
                className={cn(inputClassName, "min-h-[120px] py-3")}
                rows={4}
                {...register("goal")}
              />
            </Field>

            <div className="grid gap-6 sm:grid-cols-3">
              <Field label="Aktualna waga (kg)" error={errors.currentWeight?.message}>
                <input
                  type="number"
                  className={inputClassName}
                  {...register("currentWeight", { valueAsNumber: true })}
                />
              </Field>

              <Field label="Waga docelowa (kg)" error={errors.targetWeight?.message}>
                <input
                  type="number"
                  className={inputClassName}
                  {...register("targetWeight", { valueAsNumber: true })}
                />
              </Field>

              <Field label="Wiek" error={errors.age?.message}>
                <input
                  type="number"
                  className={inputClassName}
                  {...register("age", { valueAsNumber: true })}
                />
              </Field>
            </div>

            <Field
              label="Doświadczenie treningowe"
              error={errors.trainingExperience?.message}
            >
              <select
                className={cn(inputClassName, "appearance-none")}
                {...register("trainingExperience")}
              >
                {TRAINING_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              label="Największa trudność"
              error={errors.biggestStruggle?.message}
            >
              <textarea
                className={cn(inputClassName, "min-h-[120px] py-3")}
                rows={4}
                {...register("biggestStruggle")}
              />
            </Field>

            <fieldset>
              <legend className="text-label mb-3 block text-tertiary">
                Preferowany kontakt
              </legend>
              <div className="flex flex-wrap gap-4">
                {CONTACT_OPTIONS.map((option) => (
                  <label
                    key={option.value}
                    className="flex cursor-pointer items-center gap-2 text-sm text-light-text"
                  >
                    <input
                      type="radio"
                      value={option.value}
                      className="size-4 accent-[oklch(0.72_0.08_75)]"
                      {...register("preferredContact")}
                    />
                    {option.label}
                  </label>
                ))}
              </div>
              {errors.preferredContact && (
                <p className="mt-1.5 text-sm text-destructive" role="alert">
                  {errors.preferredContact.message}
                </p>
              )}
            </fieldset>

            <div className="space-y-3 border-t border-border pt-6">
              <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-muted-foreground">
                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 accent-[oklch(0.72_0.08_75)]"
                  {...register("gdprConsent")}
                />
                Wyrażam zgodę na przetwarzanie danych osobowych w celu obsługi
                aplikacji. *
              </label>
              {errors.gdprConsent && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.gdprConsent.message}
                </p>
              )}

              <label className="flex cursor-pointer gap-3 text-sm leading-relaxed text-muted-foreground">
                <input
                  type="checkbox"
                  className="mt-1 size-4 shrink-0 accent-[oklch(0.72_0.08_75)]"
                  {...register("marketingConsent")}
                />
                Chcę otrzymywać informacje o programie (opcjonalnie).
              </label>
            </div>

            {serverError && (
              <p className="text-sm text-destructive" role="alert">
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Wysyłanie..." : "Wyślij aplikację"}
            </Button>
          </form>
        )}
      </div>
    </Section>
  );
}
