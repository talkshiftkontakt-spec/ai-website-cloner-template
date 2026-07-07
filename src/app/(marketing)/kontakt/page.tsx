"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
 const [sent, setSent] = useState(false);

 return (
 <div className="container-site section-padding">
 <div className="mx-auto max-w-xl">
 <h1 className="font-display text-4xl font-bold">Kontakt</h1>
 <p className="mt-4 text-muted-foreground">
 Masz pytanie? Napisz do nas, odpowiadamy w ciągu 24 godzin.
 </p>

 {sent ? (
 <div className="mt-10 rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
 <p className="font-semibold text-foreground">Wiadomość wysłana!</p>
 <p className="mt-2 text-sm text-muted-foreground">
 Odpowiemy na {siteConfig.email} w ciągu 24h.
 </p>
 </div>
 ) : (
 <form
 className="mt-10 space-y-4"
 onSubmit={(e) => {
 e.preventDefault();
 setSent(true);
 }}
 >
 <div>
 <Label htmlFor="contact-name">Imię</Label>
 <Input id="contact-name" required className="mt-2" />
 </div>
 <div>
 <Label htmlFor="contact-email">Email</Label>
 <Input id="contact-email" type="email" required className="mt-2" />
 </div>
 <div>
 <Label htmlFor="contact-message">Wiadomość</Label>
 <Textarea id="contact-message" required className="mt-2" />
 </div>
 <Button type="submit" size="lg" className="w-full h-12">
 Wyślij wiadomość
 </Button>
 </form>
 )}

 <div className="mt-12 space-y-2 text-sm text-muted-foreground">
 <p>
 Email:{" "}
 <a href={`mailto:${siteConfig.email}`} className="text-primary hover:underline">
 {siteConfig.email}
 </a>
 </p>
 <p>Telefon: {siteConfig.phone}</p>
 <p>{siteConfig.address}</p>
 </div>
 </div>
 </div>
 );
}
