"use client";
import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getBusinessBySlug } from "@/lib/search";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckCircle2 } from "lucide-react";

const steps = ["Service", "Location & Schedule", "Budget", "Contact"];

function QuotePageContent() {
  const searchParams = useSearchParams();
  const businessSlug = searchParams.get("business") || "";
  const business = getBusinessBySlug(businessSlug);

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    serviceType: "",
    location: business?.city || "",
    schedule: "",
    budget: "",
    name: "",
    phone: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateStep = () => {
    const e: Record<string, string> = {};
    if (step === 0 && !form.serviceType) e.serviceType = "Please select a service type";
    if (step === 1 && !form.location) e.location = "Please enter your location";
    if (step === 3) {
      if (!form.name) e.name = "Name is required";
      if (!form.phone) e.phone = "Phone is required";
      else if (!/^\+?\d{8,15}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Invalid phone format";
      if (!form.email) e.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep()) return;
    if (step < 3) setStep(step + 1);
    else setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-slate-50 min-h-screen dark:bg-slate-950">
        <div className="container-page py-16 text-center">
          <div className="mx-auto max-w-md card p-8">
            <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500 mb-4" />
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Your request has been sent!
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {business ? `Your quote request has been sent to ${business.name}.` : "Your quote request has been sent."}{" "}
              Expect a response within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen dark:bg-slate-950">
      <div className="container-page py-8">
        <Breadcrumbs items={[{ label: "Get a Quote" }]} />

        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Request a Quote{business ? ` from ${business.name}` : ""}
          </h1>

          {/* Progress */}
          <div className="mb-8 flex items-center gap-2">
            {steps.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  i <= step ? "bg-primary-600 text-white" : "bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400"
                }`}>
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 rounded ${i < step ? "bg-primary-600" : "bg-slate-200 dark:bg-slate-700"}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-4">
              Step {step + 1}: {steps[step]}
            </h2>

            {step === 0 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Service type</label>
                <select value={form.serviceType} onChange={(e) => update("serviceType", e.target.value)} className="input-field">
                  <option value="">Select a service…</option>
                  {(business?.services || ["General inquiry", "Consultation", "Repair", "Installation", "Maintenance"]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.serviceType && <p className="mt-1 text-xs text-red-500">{errors.serviceType}</p>}
              </div>
            )}

            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Your location</label>
                  <input value={form.location} onChange={(e) => update("location", e.target.value)} className="input-field" placeholder="City or address" />
                  {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Schedule preference</label>
                  <select value={form.schedule} onChange={(e) => update("schedule", e.target.value)} className="input-field">
                    <option value="">Flexible</option>
                    <option value="asap">As soon as possible</option>
                    <option value="this-week">This week</option>
                    <option value="next-week">Next week</option>
                    <option value="this-month">This month</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Budget range</label>
                <select value={form.budget} onChange={(e) => update("budget", e.target.value)} className="input-field">
                  <option value="">Not sure yet</option>
                  <option value="under-500">Under 500 MAD</option>
                  <option value="500-2000">500 – 2,000 MAD</option>
                  <option value="2000-5000">2,000 – 5,000 MAD</option>
                  <option value="5000-plus">5,000+ MAD</option>
                </select>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full name *</label>
                  <input value={form.name} onChange={(e) => update("name", e.target.value)} className="input-field" placeholder="Your name" />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone *</label>
                  <input value={form.phone} onChange={(e) => update("phone", e.target.value)} className="input-field" placeholder="+212 6XX XXX XXX" />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email *</label>
                  <input value={form.email} onChange={(e) => update("email", e.target.value)} className="input-field" type="email" placeholder="you@example.com" />
                  {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-between">
              {step > 0 ? (
                <button onClick={() => setStep(step - 1)} className="btn-outline">Back</button>
              ) : <div />}
              <button onClick={next} className="btn-primary">
                {step === 3 ? "Submit Request" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-8 flex justify-center text-slate-500">Loading quote form...</div>}>
      <QuotePageContent />
    </Suspense>
  );
}
