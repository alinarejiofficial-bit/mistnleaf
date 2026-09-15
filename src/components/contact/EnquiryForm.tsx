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
      className="enquiry-form"
      onSubmit={handleSubmit(async (values) => {
        const data = new FormData();
        Object.entries(values).forEach(([key, value]) => data.set(key, value));
        await submitEnquiryAction(data);
      })}
    >
      <label className="enquiry-form__field">
        Name *
        <input {...register("name")} autoComplete="name" />
        {errors.name ? (
          <span className="enquiry-form__error">{errors.name.message}</span>
        ) : null}
      </label>

      <div className="enquiry-form__row">
        <label className="enquiry-form__field">
          Email *
          <input type="email" {...register("email")} autoComplete="email" />
          {errors.email ? (
            <span className="enquiry-form__error">{errors.email.message}</span>
          ) : null}
        </label>
        <label className="enquiry-form__field">
          Phone *
          <input {...register("phone")} autoComplete="tel" />
          {errors.phone ? (
            <span className="enquiry-form__error">{errors.phone.message}</span>
          ) : null}
        </label>
      </div>

      <label className="enquiry-form__field">
        Subject *
        <select {...register("subject")}>
          <option>Stay enquiry</option>
          <option>Availability question</option>
          <option>Directions / transfers</option>
          <option>Experiences</option>
          <option>Other</option>
        </select>
      </label>

      <label className="enquiry-form__field">
        Message *
        <textarea rows={5} {...register("message")} />
        {errors.message ? (
          <span className="enquiry-form__error">{errors.message.message}</span>
        ) : null}
      </label>

      <div className="enquiry-form__actions">
        <button
          type="submit"
          disabled={isSubmitting}
          className="enquiry-form__submit"
        >
          {isSubmitting ? "Sending…" : "Submit enquiry"}
        </button>
      </div>
    </form>
  );
}
