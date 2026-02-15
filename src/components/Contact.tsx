import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Send, Loader2, CheckCircle, XCircle, AlertCircle, ArrowUpRight } from "lucide-react";
import emailjs from "@emailjs/browser";
import { fadeUp, staggerContainer, hoverLift, tapScale } from "@/lib/motion";

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

const socials = [
  {
    icon: <Mail size={18} />,
    label: "yogeshvadivel456@gmail.com",
    href: "mailto:yogeshvadivel456@gmail.com",
  },
  {
    icon: <Github size={18} />,
    label: "github.com/Yogesh-VG0",
    href: "https://github.com/Yogesh-VG0",
  },
  {
    icon: <Linkedin size={18} />,
    label: "linkedin.com/in/yogesh-vadivel",
    href: "https://www.linkedin.com/in/yogesh-vadivel-a287a6269/",
  },
];

const Contact = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState({ name: false, email: false, message: false });

  const validateName = (v: string) => {
    if (!v.trim()) return "Name is required";
    if (v.trim().length < 2) return "Name must be at least 2 characters";
    if (v.trim().length > 50) return "Name must be less than 50 characters";
  };
  const validateEmail = (v: string) => {
    if (!v.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Please enter a valid email";
  };
  const validateMessage = (v: string) => {
    if (!v.trim()) return "Message is required";
    if (v.trim().length < 10) return "Message must be at least 10 characters";
    if (v.trim().length > 1000) return "Message must be under 1000 characters";
  };

  const validateForm = (): boolean => {
    const e: FormErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      message: validateMessage(form.message),
    };
    setErrors(e);
    return !e.name && !e.email && !e.message;
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched({ ...touched, [field]: true });
    const validators = { name: validateName, email: validateEmail, message: validateMessage };
    setErrors({ ...errors, [field]: validators[field](form[field]) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!validateForm()) return;
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current!, EMAILJS_PUBLIC_KEY);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTouched({ name: false, email: false, message: false });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputCls = (field: keyof FormErrors) =>
    `w-full px-4 py-3 rounded-xl bg-card/50 backdrop-blur-sm border text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all duration-200 ${
      touched[field] && errors[field]
        ? "border-red-500/60 focus:ring-red-500/30"
        : "border-border/40 focus:ring-primary/30 focus:border-primary/40"
    }`;

  return (
    <section id="contact" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-sm font-mono text-primary mb-2 tracking-wider uppercase">Contact</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Let's connect</h2>
            <div className="section-ornament mb-4" />
            <p className="text-muted-foreground max-w-lg">
              Have a project in mind or want to chat? Feel free to reach out —
              I'm always open to new opportunities and collaborations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {/* Social links — left column */}
            <motion.div variants={fadeUp} className="md:col-span-2 space-y-4">
              {socials.map((s) => (
                <motion.a
                  key={s.href}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={hoverLift}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0 text-primary">
                    {s.icon}
                  </div>
                  <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors break-all">
                    {s.label}
                  </span>
                  <ArrowUpRight size={14} className="text-muted-foreground/0 group-hover:text-primary transition-all -translate-x-1 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 flex-shrink-0" />
                </motion.a>
              ))}
            </motion.div>

            {/* Form — right column */}
            <motion.form
              ref={formRef}
              onSubmit={handleSubmit}
              noValidate
              variants={fadeUp}
              className="md:col-span-3 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
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
                    className={inputCls("name")}
                    disabled={status === "sending"}
                    aria-invalid={touched.name && !!errors.name}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.name}
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
                    className={inputCls("email")}
                    disabled={status === "sending"}
                    aria-invalid={touched.email && !!errors.email}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <textarea
                  name="title"
                  placeholder="Your message..."
                  rows={5}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (touched.message) setErrors({ ...errors, message: validateMessage(e.target.value) });
                  }}
                  onBlur={() => handleBlur("message")}
                  className={`${inputCls("message")} resize-none`}
                  disabled={status === "sending"}
                  aria-invalid={touched.message && !!errors.message}
                />
                <div className="flex justify-between items-center mt-1.5">
                  {touched.message && errors.message ? (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.message}
                    </p>
                  ) : <span />}
                  <span className={`text-xs ${form.message.length > 1000 ? "text-red-500" : "text-muted-foreground/60"}`}>
                    {form.message.length}/1000
                  </span>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={tapScale}
                className={`inline-flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg ${
                  status === "success"
                    ? "bg-emerald-500 text-white shadow-emerald-500/20"
                    : status === "error"
                    ? "bg-red-500 text-white shadow-red-500/20"
                    : "bg-primary text-primary-foreground shadow-primary/20 hover:shadow-primary/30"
                }`}
              >
                {status === "sending" ? (
                  <><Loader2 size={14} className="animate-spin" /> Sending...</>
                ) : status === "success" ? (
                  <><CheckCircle size={14} /> Sent!</>
                ) : status === "error" ? (
                  <><XCircle size={14} /> Failed</>
                ) : (
                  <><Send size={14} /> Send Message</>
                )}
              </motion.button>

              {status === "success" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-emerald-500">
                  Thanks for reaching out! I'll get back to you soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-500">
                  Something went wrong. Try again or email me directly.
                </motion.p>
              )}
            </motion.form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
