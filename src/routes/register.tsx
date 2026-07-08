import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { TravoriumLogo } from "@/components/travorium/Logo";
import { saveUser } from "@/lib/travorium";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — TRAVORIUM" },
      { name: "description", content: "Create your free TRAVORIUM investor account in 2 minutes." },
    ],
  }),
  component: Register,
});

const schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z.string().trim().min(9, "Enter a valid phone number").max(20),
  email: z.string().trim().email("Invalid email").max(120).optional().or(z.literal("")),
  district: z.string().min(1, "Please select a district"),
  referralCode: z.string().trim().max(40).optional().or(z.literal("")),
  agree: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
});
type FormValues = z.infer<typeof schema>;

const districts = ["Kigali", "Eastern Province", "Western Province", "Northern Province", "Southern Province"];

function Register() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { agree: false as unknown as true },
  });

  const onSubmit = async (v: FormValues) => {
    setSubmitting(true);
    saveUser({
      fullName: v.fullName,
      phone: v.phone,
      email: v.email || undefined,
      district: v.district,
      referralCode: v.referralCode || undefined,
      registeredAt: new Date().toISOString(),
    });
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Account created!");
    navigate({ to: "/payment" });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6 md:px-8">
        <Link to="/"><TravoriumLogo /></Link>
        <Link to="/" className="text-sm text-text-gray hover:text-text-dark">← Back home</Link>
      </div>

      <div className="mx-auto max-w-md px-5 py-8 md:py-14">
        <div className="rounded-3xl border border-border bg-card p-7 shadow-[0_20px_60px_-24px_rgba(10,10,26,0.15)] md:p-9">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-text-dark">Register</h1>
            <p className="mt-2 text-sm text-text-gray">Join 500+ investors today — no credit card required</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <Field label="Full Name" error={errors.fullName?.message}>
              <input {...register("fullName")} placeholder="Enter your full name" className="input" />
            </Field>
            <Field label="Phone Number" error={errors.phone?.message}>
              <input {...register("phone")} type="tel" placeholder="Enter your phone number" className="input" />
            </Field>
            <Field label="Email (optional)" error={errors.email?.message}>
              <input {...register("email")} type="email" placeholder="Enter your email" className="input" />
            </Field>
            <Field label="District" error={errors.district?.message}>
              <select {...register("district")} className="input" defaultValue="">
                <option value="" disabled>Select district</option>
                {districts.map((d) => <option key={d} value={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Referral Code (optional)" error={errors.referralCode?.message}>
              <input {...register("referralCode")} placeholder="Enter referral code" className="input" />
            </Field>

            <label className="flex items-start gap-3 pt-1 text-sm text-text-dark">
              <input type="checkbox" {...register("agree")} className="mt-0.5 h-4 w-4 accent-[var(--gold-dark)]" />
              <span>
                I agree to the <a className="text-gold-dark underline">Terms of Service</a> and <a className="text-gold-dark underline">Privacy Policy</a>
              </span>
            </label>
            {errors.agree && <p className="text-xs text-destructive">{errors.agree.message as string}</p>}

            <button
              type="submit"
              disabled={submitting}
              className="btn-gold flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm disabled:opacity-70"
            >
              {submitting ? <><Loader2 className="animate-spin" size={16} /> Creating account…</> : "Register Now"}
            </button>

            <p className="text-center text-sm text-text-gray">
              Already have an account? <Link to="/" className="font-semibold text-gold-dark">Log In</Link>
            </p>
          </form>
        </div>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: #fff;
          padding: 12px 14px;
          font-size: 14px;
          min-height: 44px;
          transition: border .15s ease, box-shadow .15s ease;
        }
        .input:focus {
          outline: none;
          border-color: var(--gold);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--gold) 20%, transparent);
        }
      `}</style>
    </div>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-text-dark">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
