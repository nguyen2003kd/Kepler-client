"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ContactRegistrationSection from "./components/contact-registration";
import DynamicContactForm from "./components/dynamic-contact-form";

function ContactPageContent() {
  const searchParams = useSearchParams();
  const formType = searchParams.get("form");

  return (
    <div className="bg-white">
      {formType ? (
        <DynamicContactForm formType={formType} />
      ) : (
        <ContactRegistrationSection />
      )}
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="bg-white min-h-[400px]" />}>
      <ContactPageContent />
    </Suspense>
  );
}
