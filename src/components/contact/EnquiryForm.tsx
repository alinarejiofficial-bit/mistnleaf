"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { submitEnquiryAction } from "@/app/contact/actions";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(7, "Enter a contact number"),
  subject: z.string().min(2, "Choose a subject"),
  message: z.string().min(10, "Please share a bit more detail"),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "mt-1 w-full border border-line bg-[#d1bfab] px-3 py-2.5 text-black outline-none transition focus:border-black";

export function EnquiryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "Stay enquiry",
      message: "",
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (values) => {
        const data = new FormData();
        Object.entries(values).forEach(([key, value]) => data.set(key, value));
        await submitEnquiryAction(data);
      })}
    >
      <label className="block text-sm text-black">
        Name *
        <input {...register("name")} className={fieldClass} />
        {errors.name ? (
          <span className="mt-1 block text-xs text-black">
            {errors.name.message}
          </span>
        ) : null}
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm text-black">
          Email *
          <input type="email" {...register("email")} className={fieldClass} />
          {errors.email ? (
            <span className="mt-1 block text-xs text-black">
              {errors.email.message}
            </span>
          ) : null}
        </label>
        <label className="block text-sm text-black">
          Phone *
          <input {...register("phone")} className={fieldClass} />
          {errors.phone ? (
            <span className="mt-1 block text-xs text-black">
              {errors.phone.message}
            </span>
          ) : null}
        </label>
      </div>
      <label className="block text-sm text-black">
        Subject *
        <select {...register("subject")} className={fieldClass}>
          <option>Stay enquiry</option>
          <option>Availability question</option>
          <option>Directions / transfers</option>
          <option>Experiences</option>
          <option>Other</option>
        </select>
      </label>
      <label className="block text-sm text-black">
        Message *
        <textarea rows={5} {...register("message")} className={fieldClass} />
        {errors.message ? (
          <span className="mt-1 block text-xs text-black">
            {errors.message.message}
          </span>
        ) : null}
      </label>
      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-11 bg-[#1a271c] px-6 py-3 text-[0.8rem] font-medium uppercase tracking-[0.08em] text-[#f5efe6] transition hover:bg-[#2a3b30] disabled:opacity-60"
      >
        {isSubmitting ? "Sending…" : "Submit enquiry"}
      </button>
    </form>
  );
}
