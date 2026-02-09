import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Send, Loader2, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

// EmailJS Configuration
const EMAILJS_SERVICE_ID = "service_fdiynvw";
const EMAILJS_TEMPLATE_ID = "template_wpe8gha";
const EMAILJS_PUBLIC_KEY = "8_whRrB50nDsW0DHq";

type FormStatus = "idle" | "sending" | "success" | "error";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  // Validation functions
  const validateName = (name: string): string | undefined => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (name.trim().length > 50) return "Name must be less than 50 characters";
    return undefined;
  };

  const validateEmail = (email: string): string | undefined => {
    if (!email.trim()) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  const validateMessage = (message: string): string | undefined => {
    if (!message.trim()) return "Message is required";
    if (message.trim().length < 10) return "Message must be at least 10 characters";
    if (message.trim().length > 1000) return "Message must be less than 1000 characters";
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      message: validateMessage(form.message),
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
    // Validate the specific field on blur
    if (field === "name") setErrors({ ...errors, name: validateName(form.name) });
    if (field === "email") setErrors({ ...errors, email: validateEmail(form.email) });
    if (field === "message") setErrors({ ...errors, message: validateMessage(form.message) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true });
    
    // Validate form
    if (!validateForm()) {
      return;
    }

    setStatus("sending");

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current!,
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-mono text-primary mb-3 tracking-wider">Contact</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-4">Let's connect</h3>
          <p className="text-muted-foreground mb-10">
            Have a project in mind or want to chat? Feel free to reach out.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Links */}
            <div className="space-y-4">
              <a
                href="mailto:yogeshvadivel456@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={16} className="text-primary" />
                </div>
                <span className="text-sm">yogeshvadivel456@gmail.com</span>
              </a>
              <a
                href="https://github.com/Yogesh-VG0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Github size={16} className="text-primary" />
                </div>
                <span className="text-sm">github.com/Yogesh-VG0</span>
              </a>
              <a
                href="https://www.linkedin.com/in/yogesh-vadivel-a287a6269/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Linkedin size={16} className="text-primary" />
                </div>
                <span className="text-sm">linkedin.com/in/yogesh-vadivel</span>
              </a>
            </div>

            {/* Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (touched.name) setErrors({ ...errors, name: validateName(e.target.value) });
                  }}
                  onBlur={() => handleBlur("name")}
                  className={`w-full px-4 py-3 rounded-lg bg-secondary border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                    touched.name && errors.name
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-border focus:ring-primary/50"
                  }`}
                  disabled={status === "sending"}
                />
                {touched.name && errors.name && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (touched.email) setErrors({ ...errors, email: validateEmail(e.target.value) });
                  }}
                  onBlur={() => handleBlur("email")}
                  className={`w-full px-4 py-3 rounded-lg bg-secondary border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 transition-colors ${
                    touched.email && errors.email
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-border focus:ring-primary/50"
                  }`}
                  disabled={status === "sending"}
                />
                {touched.email && errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle size={12} />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <textarea
                  name="title"
                  placeholder="Message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (touched.message) setErrors({ ...errors, message: validateMessage(e.target.value) });
                  }}
                  onBlur={() => handleBlur("message")}
                  className={`w-full px-4 py-3 rounded-lg bg-secondary border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 resize-none transition-colors ${
                    touched.message && errors.message
                      ? "border-red-500 focus:ring-red-500/50"
                      : "border-border focus:ring-primary/50"
                  }`}
                  disabled={status === "sending"}
                />
                <div className="flex justify-between mt-1">
                  {touched.message && errors.message ? (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} />
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className={`text-xs ${form.message.length > 1000 ? "text-red-500" : "text-muted-foreground"}`}>
                    {form.message.length}/1000
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Sending...
                  </>
                ) : status === "success" ? (
                  <>
                    <CheckCircle size={14} />
                    Message Sent!
                  </>
                ) : status === "error" ? (
                  <>
                    <XCircle size={14} />
                    Failed to Send
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Send Message
                  </>
                )}
              </button>
              {status === "success" && (
                <p className="text-sm text-green-500">Thanks for reaching out! I'll get back to you soon.</p>
              )}
              {status === "error" && (
                <p className="text-sm text-red-500">Something went wrong. Please try again or email me directly.</p>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
