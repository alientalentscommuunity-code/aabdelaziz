import React, { useState, useEffect } from "react";
import { Mail, X, Upload, Send, User, Building2, Briefcase, GraduationCap, Users, Coffee, Handshake, Rocket, MessageCircle, Lightbulb, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RequestFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const personas = [
  { value: "peer", label: "Peer / Fellow Builder", icon: Users, description: "Fellow PMs, developers, designers, or tech professionals" },
  { value: "talent-hunter", label: "Talent Hunter / Recruiter", icon: Briefcase, description: "Recruiters, hiring managers, or HR professionals" },
  { value: "vc", label: "VC / Investor / Incubator", icon: Building2, description: "Venture capitalists, angel investors, or incubator representatives" },
  { value: "co-founder", label: "Potential Co-founder", icon: Rocket, description: "Looking for a technical/product co-founder" },
  { value: "educational", label: "Educational Institution", icon: GraduationCap, description: "Universities, bootcamps, or training programs" },
  { value: "mentor", label: "Mentor", icon: Lightbulb, description: "Experienced professionals willing to mentor" },
  { value: "mentee", label: "Mentee", icon: User, description: "Seeking guidance and mentorship" },
  { value: "community", label: "Community Member", icon: Users, description: "ALIENs community members and followers" },
  { value: "other", label: "Other", icon: MessageCircle, description: "Something else entirely" },
];

// Purpose definitions by persona relevance
const allPurposes = [
  { value: "coffee-chat", label: "Coffee Chat", icon: Coffee, description: "Casual conversation and networking", relevantFor: ["peer", "vc", "mentor", "mentee", "community", "other", "co-founder", "talent-hunter"] },
  { value: "hiring", label: "Hiring / Job Opportunity", icon: Briefcase, description: "Full-time, contract, or project-based work", relevantFor: ["talent-hunter", "vc", "educational"] },
  { value: "partnership", label: "Partnership / Collaboration", icon: Handshake, description: "Strategic partnerships or joint ventures", relevantFor: ["vc", "educational", "peer", "other"] },
  { value: "co-founding", label: "Co-founding Opportunity", icon: Rocket, description: "Building a startup together", relevantFor: ["co-founder", "vc"] },
  { value: "mentoring", label: "Mentoring (Give/Receive)", icon: Lightbulb, description: "Mentorship relationship", relevantFor: ["mentor", "mentee", "peer", "community"] },
  { value: "advisory", label: "Advisory / Consulting", icon: Building2, description: "Advisory roles or consulting projects", relevantFor: ["vc", "educational", "talent-hunter", "peer"] },
  { value: "speaking", label: "Speaking / Workshop", icon: Users, description: "Conference talks, workshops, or panels", relevantFor: ["educational", "vc", "peer", "community"] },
  { value: "media", label: "Media / Interview", icon: MessageCircle, description: "Podcasts, articles, or interviews", relevantFor: ["community", "peer", "vc", "other"] },
  { value: "other", label: "Other", icon: MessageCircle, description: "Something else", relevantFor: ["peer", "talent-hunter", "vc", "co-founder", "educational", "mentor", "mentee", "community", "other"] },
];

export function RequestFormDialog({ open, onOpenChange }: RequestFormDialogProps) {
  const [formData, setFormData] = useState({
    persona: "",
    purpose: "",
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    organization: "",
    details: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Track if form has changes
  useEffect(() => {
    const hasAnyChanges = 
      formData.persona !== "" ||
      formData.purpose !== "" ||
      formData.name !== "" ||
      formData.email !== "" ||
      formData.phone !== "" ||
      formData.linkedin !== "" ||
      formData.organization !== "" ||
      formData.details !== "" ||
      file !== null;
    setHasChanges(hasAnyChanges);
  }, [formData, file]);

  // Get relevant purposes based on selected persona
  const getRelevantPurposes = () => {
    if (!formData.persona) return allPurposes;
    return allPurposes.filter(p => p.relevantFor.includes(formData.persona));
  };

  // Handle persona change - reset purpose if not relevant
  const handlePersonaChange = (value: string) => {
    const newPersona = value;
    const relevantPurposes = allPurposes.filter(p => p.relevantFor.includes(newPersona));
    const currentPurposeStillRelevant = relevantPurposes.some(p => p.value === formData.purpose);
    
    setFormData({ 
      ...formData, 
      persona: newPersona, 
      purpose: currentPurposeStillRelevant ? formData.purpose : "" 
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setHasChanges(false);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        persona: "",
        purpose: "",
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        organization: "",
        details: "",
      });
      setFile(null);
      onOpenChange(false);
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen && hasChanges && !isSubmitting && !isSubmitted) {
      setShowConfirmClose(true);
    } else {
      onOpenChange(newOpen);
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmClose(false);
    setFormData({
      persona: "",
      purpose: "",
      name: "",
      email: "",
      phone: "",
      linkedin: "",
      organization: "",
      details: "",
    });
    setFile(null);
    onOpenChange(false);
  };

  const handleCancelClose = () => {
    setShowConfirmClose(false);
  };

  if (isSubmitted) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-black border-white/10">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-4">
              <Send className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-black italic uppercase tracking-tighter text-white mb-2">
              Request Sent!
            </h3>
            <p className="text-white/40 text-sm font-medium italic">
              Thanks for reaching out. I&apos;ll get back to you soon.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const relevantPurposes = getRelevantPurposes();

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-2xl bg-black border-white/10 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/10 rounded-xl flex items-center justify-center">
                <Mail className="w-5 h-5 text-green-500" />
              </div>
              Request Form
            </DialogTitle>
            <DialogDescription className="text-white/40 font-medium italic">
              Tell me who you are and what you&apos;re looking for. I&apos;ll respond within 24-48 hours.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {/* Persona Selection */}
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-white">
                Who are you? <span className="text-green-500">*</span>
              </Label>
              <Select
                required
                value={formData.persona}
                onValueChange={handlePersonaChange}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white focus:ring-green-500/20 h-11">
                  <SelectValue placeholder="Select your persona..." />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 max-h-80">
                  {personas.map((persona) => {
                    const Icon = persona.icon;
                    return (
                      <SelectItem
                        key={persona.value}
                        value={persona.value}
                        className="text-white focus:bg-white/10 focus:text-white cursor-pointer py-3"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-green-500" />
                          <span>{persona.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {formData.persona && (
                <p className="text-xs text-white/30 italic">
                  {personas.find(p => p.value === formData.persona)?.description}
                </p>
              )}
            </div>

            {/* Purpose Selection */}
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-white">
                What&apos;s the purpose? <span className="text-green-500">*</span>
              </Label>
              <Select
                required
                value={formData.purpose}
                onValueChange={(value) => setFormData({ ...formData, purpose: value })}
                disabled={!formData.persona}
              >
                <SelectTrigger className={cn(
                  "bg-white/5 border-white/10 text-white focus:ring-green-500/20 h-11",
                  !formData.persona && "opacity-50 cursor-not-allowed"
                )}>
                  <SelectValue placeholder={formData.persona ? "Select purpose..." : "Select persona first..."} />
                </SelectTrigger>
                <SelectContent className="bg-black border-white/10 max-h-80">
                  {relevantPurposes.map((purpose) => {
                    const Icon = purpose.icon;
                    return (
                      <SelectItem
                        key={purpose.value}
                        value={purpose.value}
                        className="text-white focus:bg-white/10 focus:text-white cursor-pointer py-3"
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-orange-500" />
                          <span>{purpose.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {formData.purpose && (
                <p className="text-xs text-white/30 italic">
                  {allPurposes.find(p => p.value === formData.purpose)?.description}
                </p>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-4 pt-2 border-t border-white/10">
              <Label className="text-xs font-black uppercase tracking-widest text-white">
                Contact Information
              </Label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-white/60">
                    Full Name <span className="text-green-500">*</span>
                  </Label>
                  <Input
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-green-500/20 h-11"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-white/60">
                    Email <span className="text-green-500">*</span>
                  </Label>
                  <Input
                    required
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-green-500/20 h-11"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-white/60">
                    Phone (Optional)
                  </Label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-green-500/20 h-11"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-white/60">
                    LinkedIn / Twitter (Optional)
                  </Label>
                  <Input
                    placeholder="linkedin.com/in/..."
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-green-500/20 h-11"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-white/60">
                  Organization / Company (Optional)
                </Label>
                <Input
                  placeholder="Company, University, or Organization name"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-green-500/20 h-11"
                />
              </div>
            </div>

            {/* Details */}
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-white">
                More Details & Context <span className="text-green-500">*</span>
              </Label>
              <Textarea
                required
                placeholder="Tell me more about what you're looking for, your timeline, budget (if applicable), or any other relevant details..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:ring-green-500/20 min-h-[140px]"
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <Label className="text-xs font-black uppercase tracking-widest text-white">
                Attach File (Optional)
              </Label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                />
                <label
                  htmlFor="file-upload"
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border border-dashed cursor-pointer transition-all duration-300",
                    file 
                      ? "bg-green-500/10 border-green-500/30" 
                      : "bg-white/5 border-white/20 hover:border-white/40"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    file ? "bg-green-500/20" : "bg-white/10"
                  )}>
                    <Upload className={cn(
                      "w-5 h-5",
                      file ? "text-green-500" : "text-white/40"
                    )} />
                  </div>
                  <div className="flex-1 min-w-0">
                    {file ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-white font-medium truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            setFile(null);
                          }}
                          className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                          <X className="w-4 h-4 text-white/60" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-white/60 font-medium">Click to upload file</p>
                        <p className="text-xs text-white/30">PDF, DOC, Images up to 10MB</p>
                      </>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-green-500 text-black font-black uppercase tracking-widest text-xs italic hover:bg-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Request
                  </span>
                )}
              </Button>
              <p className="text-center text-xs text-white/20 mt-3 italic">
                All fields marked with <span className="text-green-500">*</span> are required
              </p>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Close Dialog */}
      <AlertDialog open={showConfirmClose} onOpenChange={setShowConfirmClose}>
        <AlertDialogContent className="bg-black border-white/10 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-black italic uppercase tracking-tighter text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              Discard Changes?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white/40 font-medium italic">
              You have unsaved changes. Are you sure you want to close this form? Your progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel 
              onClick={handleCancelClose}
              className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:text-white"
            >
              Keep Editing
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmClose}
              className="bg-orange-500 text-black hover:bg-orange-400 font-black uppercase tracking-widest text-xs italic"
            >
              Discard & Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
