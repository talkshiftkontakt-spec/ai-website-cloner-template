import { z } from "zod";

export const applicationSchema = z.object({
  firstName: z.string().min(2, "Podaj imię"),
  email: z.string().email("Podaj prawidłowy adres email"),
  phone: z.string().min(9, "Podaj numer telefonu"),
  tier: z.enum(["starter", "standard", "premium"]),
  goal: z.string().min(20, "Opisz swój cel dokładniej (min. 20 znaków)"),
  currentWeight: z.number().min(40).max(300),
  targetWeight: z.number().min(40).max(300),
  age: z.number().min(18).max(80),
  trainingExperience: z.enum(["none", "beginner", "intermediate", "advanced"]),
  biggestStruggle: z.string().min(10, "Opisz swoją największą trudność"),
  preferredContact: z.enum(["email", "phone", "whatsapp"]),
  gdprConsent: z
    .boolean()
    .refine((value) => value === true, { message: "Zgoda jest wymagana" }),
  marketingConsent: z.boolean().optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
