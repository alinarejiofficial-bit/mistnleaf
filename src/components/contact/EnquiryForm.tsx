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
      className="contact-form"
      onSubmit={handleSubmit(async (values) => {
        const data = new FormData();
        Object.entries(values).forEach(([key, value]) => data.set(key, value));
        await submitEnquiryAction(data);
      })}
    >
      <label className="contact-form__field">
        <span className="contact-form__label">Name</span>
        <input
          {...register("name")}
          autoComplete="name"
          placeholder="Your name"
        />
        {errors.name ? (
          <span className="contact-form__error">{errors.name.message}</span>
        ) : null}
      </label>
      <div className="contact-form__row">
        <label className="contact-form__field">
          <span className="contact-form__label">Email</span>
          <input
            type="email"
            {...register("email")}
            autoComplete="email"
            placeholder="you@email.com"
          />
          {errors.email ? (
            <span className="contact-form__error">{errors.email.message}</span>
          ) : null}
        </label>
        <label className="contact-form__field">
          <span className="contact-form__label">Phone</span>
          <input
            {...register("phone")}
            autoComplete="tel"
            placeholder="+91 …"
          />
          {errors.phone ? (
            <span className="contact-form__error">{errors.phone.message}</span>
          ) : null}
        </label>
      </div>
      <label className="contact-form__field">
        <span className="contact-form__label">Subject</span>
        <select {...register("subject")}>
          <option>Stay enquiry</option>
          <option>Availability question</option>
          <option>Directions / transfers</option>
          <option>Experiences</option>
          <option>Other</option>
        </select>
      </label>
      <label className="contact-form__field">
        <span className="contact-form__label">Message</span>
        <textarea
          rows={5}
          {...register("message")}
          placeholder="Dates, guests, or anything we should know…"
        />
        {errors.message ? (
          <span className="contact-form__error">{errors.message.message}</span>
        ) : null}
      </label>
      <button type="submit" disabled={isSubmitting} className="contact-form__submit">
        {isSubmitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
