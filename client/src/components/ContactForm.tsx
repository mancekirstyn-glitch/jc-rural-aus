/**
 * ContactForm Component
 * Captures lead information with validation and submission tracking.
 * Integrates with Manus Forge API for form submission handling.
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const SERVICES = [
  { value: "lamb-marking", label: "Lamb marking" },
  { value: "fencing", label: "Fencing" },
  { value: "shearing-support", label: "Shearing support" },
  { value: "livestock-handling", label: "Livestock handling" },
  { value: "tractor-operations", label: "Tractor operations" },
  { value: "general-labour", label: "General farm labour" },
  { value: "other", label: "Other / Multiple services" },
];

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us about your job";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide more details (at least 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Prepare form data with UTM tracking
      const urlParams = new URLSearchParams(window.location.search);
      const submissionData = {
        ...formData,
        utm_source: urlParams.get("utm_source") || "direct",
        utm_medium: urlParams.get("utm_medium") || "organic",
        utm_campaign: urlParams.get("utm_campaign") || "landing_page",
        submitted_at: new Date().toISOString(),
        page_url: window.location.href,
      };

      // Send to Manus Forge API for storage and notification
      const response = await fetch(
        `${import.meta.env.VITE_FRONTEND_FORGE_API_URL}/api/forms/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_FRONTEND_FORGE_API_KEY}`,
          },
          body: JSON.stringify({
            form_type: "contact_form",
            app_id: import.meta.env.VITE_APP_ID,
            data: submissionData,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      // Success
      setSubmitStatus("success");
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });

      toast.success("Thank you! We'll be in touch soon.");

      // Track form submission event
      if (window.umami) {
        window.umami.track("form_submission", {
          form_type: "contact_form",
          service: formData.service,
        });
      }

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      toast.error("Failed to submit form. Please try calling us directly.");

      // Fallback: Suggest direct contact
      setTimeout(() => {
        setSubmitStatus("idle");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form-wrapper">
      <div className="form-grid">
        {/* Name Field */}
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Your name <span className="form-required">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., John Smith"
            className={`form-input ${errors.name ? "form-input-error" : ""}`}
            disabled={isSubmitting}
          />
          {errors.name && (
            <span className="form-error">
              <AlertCircle aria-hidden="true" />
              {errors.name}
            </span>
          )}
        </div>

        {/* Phone Field */}
        <div className="form-group">
          <label htmlFor="phone" className="form-label">
            Phone number <span className="form-required">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g., 0459 646 941"
            className={`form-input ${errors.phone ? "form-input-error" : ""}`}
            disabled={isSubmitting}
          />
          {errors.phone && (
            <span className="form-error">
              <AlertCircle aria-hidden="true" />
              {errors.phone}
            </span>
          )}
        </div>

        {/* Email Field */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email address <span className="form-required">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="e.g., john@farm.com.au"
            className={`form-input ${errors.email ? "form-input-error" : ""}`}
            disabled={isSubmitting}
          />
          {errors.email && (
            <span className="form-error">
              <AlertCircle aria-hidden="true" />
              {errors.email}
            </span>
          )}
        </div>

        {/* Service Selection */}
        <div className="form-group">
          <label htmlFor="service" className="form-label">
            What service do you need? <span className="form-required">*</span>
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={`form-input form-select ${errors.service ? "form-input-error" : ""}`}
            disabled={isSubmitting}
          >
            <option value="">— Select a service —</option>
            {SERVICES.map((svc) => (
              <option key={svc.value} value={svc.value}>
                {svc.label}
              </option>
            ))}
          </select>
          {errors.service && (
            <span className="form-error">
              <AlertCircle aria-hidden="true" />
              {errors.service}
            </span>
          )}
        </div>
      </div>

      {/* Message Field */}
      <div className="form-group form-group-full">
        <label htmlFor="message" className="form-label">
          Tell us about the job <span className="form-required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe the work you need done, location, timing, and any other details..."
          rows={5}
          className={`form-input form-textarea ${errors.message ? "form-input-error" : ""}`}
          disabled={isSubmitting}
        />
        {errors.message && (
          <span className="form-error">
            <AlertCircle aria-hidden="true" />
            {errors.message}
          </span>
        )}
      </div>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="form-status form-status-success">
          <CheckCircle2 aria-hidden="true" />
          <div>
            <strong>Thank you!</strong>
            <p>We've received your inquiry. We'll be in touch within 24 hours.</p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="form-status form-status-error">
          <AlertCircle aria-hidden="true" />
          <div>
            <strong>Submission failed</strong>
            <p>Please try calling us directly at 0459 646 941 or try again in a moment.</p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="form-actions">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="form-submit-button"
        >
          {isSubmitting ? (
            <>
              <span className="spinner" aria-hidden="true" />
              Submitting...
            </>
          ) : (
            <>
              <Mail aria-hidden="true" />
              Send inquiry
            </>
          )}
        </Button>
        <p className="form-help-text">
          Or call us directly: <a href="tel:+61459646941"><Phone aria-hidden="true" /> 0459 646 941</a>
        </p>
      </div>
    </form>
  );
}

// Extend window interface for Umami analytics
declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, unknown>) => void;
    };
  }
}
