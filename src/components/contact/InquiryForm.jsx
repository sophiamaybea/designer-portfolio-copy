import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

export default function InquiryForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "Please fill in all required fields.", variant: "destructive" });
      return;
    }
    setSubmitted(true);
    toast({ title: "Inquiry sent successfully." });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 text-center"
      >
        <h3 className="font-body text-2xl md:text-3xl font-light text-foreground mb-4">
          Thank you for reaching out.
        </h3>
        <p className="font-body text-base text-muted-foreground">
          I'll review your inquiry and respond within 48 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-2">
            Name *
          </label>
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Your full name"
            className="bg-transparent border-0 border-b border-border rounded-none font-body text-base h-12 focus:ring-0 focus:border-b-2 focus:border-cobalt"
          />
        </div>
        <div>
          <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-2">
            Email *
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="you@company.com"
            className="bg-transparent border-0 border-b border-border rounded-none font-body text-base h-12 focus:ring-0 focus:border-b-2 focus:border-cobalt"
          />
        </div>
        <div>
          <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-2">
            Company
          </label>
          <Input
            value={formData.company}
            onChange={(e) => handleChange("company", e.target.value)}
            placeholder="Company name"
            className="bg-transparent border-0 border-b border-border rounded-none font-body text-base h-12 focus:ring-0 focus:border-b-2 focus:border-cobalt"
          />
        </div>
        <div>
          <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-2">
            Project Type
          </label>
          <Select value={formData.projectType} onValueChange={(v) => handleChange("projectType", v)}>
            <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none font-body text-base h-12 focus:ring-0 focus:border-b-2 focus:border-cobalt">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="branding" className="focus:bg-charcoal focus:text-gallery">Brand Identity</SelectItem>
              <SelectItem value="digital" className="focus:bg-charcoal focus:text-gallery">Digital Product</SelectItem>
              <SelectItem value="spatial" className="focus:bg-charcoal focus:text-gallery">Spatial Design</SelectItem>
              <SelectItem value="motion" className="focus:bg-charcoal focus:text-gallery">Motion Design</SelectItem>
              <SelectItem value="typography" className="focus:bg-charcoal focus:text-gallery">Typography</SelectItem>
              <SelectItem value="other" className="focus:bg-charcoal focus:text-gallery">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-2">
            Budget Range
          </label>
          <Select value={formData.budget} onValueChange={(v) => handleChange("budget", v)}>
            <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none font-body text-base h-12 focus:ring-0 focus:border-b-2 focus:border-cobalt">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10-25k" className="focus:bg-charcoal focus:text-gallery">$10K – $25K</SelectItem>
              <SelectItem value="25-50k" className="focus:bg-charcoal focus:text-gallery">$25K – $50K</SelectItem>
              <SelectItem value="50-100k" className="focus:bg-charcoal focus:text-gallery">$50K – $100K</SelectItem>
              <SelectItem value="100k+" className="focus:bg-charcoal focus:text-gallery">$100K+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-2">
            Timeline
          </label>
          <Select value={formData.timeline} onValueChange={(v) => handleChange("timeline", v)}>
            <SelectTrigger className="bg-transparent border-0 border-b border-border rounded-none font-body text-base h-12 focus:ring-0 focus:border-b-2 focus:border-cobalt">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-2months" className="focus:bg-charcoal focus:text-gallery">1 – 2 months</SelectItem>
              <SelectItem value="3-6months" className="focus:bg-charcoal focus:text-gallery">3 – 6 months</SelectItem>
              <SelectItem value="6months+" className="focus:bg-charcoal focus:text-gallery">6+ months</SelectItem>
              <SelectItem value="flexible" className="focus:bg-charcoal focus:text-gallery">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="font-mono text-xs tracking-widest uppercase text-muted-foreground block mb-2">
          Project Details *
        </label>
        <Textarea
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Tell me about your project, goals, and what success looks like..."
          className="bg-transparent border-0 border-b border-border rounded-none font-body text-base min-h-[160px] focus:ring-0 focus:border-b-2 focus:border-cobalt"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center px-10 py-4 bg-charcoal text-gallery font-mono text-xs tracking-widest uppercase hover:bg-cobalt transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cobalt focus:ring-offset-4"
      >
        Send Inquiry
      </button>
    </form>
  );
}