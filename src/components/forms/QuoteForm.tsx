"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { quoteFormSchema, type QuoteFormValues } from "@/lib/validators/quote";
import { submitQuoteRequest } from "@/actions/quote";
import { PROJECT_TIMELINES, PROJECT_TYPES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "", email: "", phone: "", company: "", projectLocation: "",
      projectType: "", timeline: "", additionalNotes: "",
      items: [{ productName: "", quantity: "1", notes: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  async function onSubmit(data: QuoteFormValues) {
    setIsSubmitting(true);
    try {
      const res = await submitQuoteRequest(data);
      if (res.ok) {
        toast.success("Quote request submitted! Our team will contact you soon.");
        form.reset();
      } else {
        toast.error(res.error || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      
      {/* 1. Contact Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2 text-slate-900">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Full Name *</Label>
            <Input {...form.register("name")} placeholder="John Doe" className="w-full" />
            {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input type="email" {...form.register("email")} placeholder="john@example.com" className="w-full" />
            {form.formState.errors.email && <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Phone *</Label>
            <Input {...form.register("phone")} placeholder="+92 300 1234567" className="w-full" />
            {form.formState.errors.phone && <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Company *</Label>
            <Input {...form.register("company")} placeholder="Your Company Ltd." className="w-full" />
            {form.formState.errors.company && <p className="text-sm text-destructive">{form.formState.errors.company.message}</p>}
          </div>
        </div>
      </div>

      {/* 2. Project Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold border-b pb-2 text-slate-900">Project Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2 w-full">
            <Label>Project Location *</Label>
            <Input {...form.register("projectLocation")} placeholder="City, Province" className="w-full" />
            {form.formState.errors.projectLocation && <p className="text-sm text-destructive">{form.formState.errors.projectLocation.message}</p>}
          </div>
          
          <div className="space-y-2 w-full">
            <Label>Project Type</Label>
            <Select onValueChange={(v) => form.setValue("projectType", v as string)}>
              {/* 🚨 w-full lagaya hai taake mobile par poori width le */}
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 w-full">
            <Label>Timeline</Label>
            <Select onValueChange={(v) => form.setValue("timeline", v as string)}>
              {/* 🚨 w-full lagaya hai taake mobile par poori width le */}
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_TIMELINES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 3. Requested Items */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 gap-3">
          <h3 className="text-lg font-semibold text-slate-900">Requested Items *</h3>
          <Button type="button" variant="outline" size="sm" onClick={() => append({ productName: "", quantity: "1", notes: "" })} className="w-full sm:w-auto">
            <Plus className="size-4 mr-1" /> Add Item
          </Button>
        </div>
        
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col md:flex-row gap-4 items-start bg-slate-50 p-4 rounded-xl border border-slate-200 relative">
            
            <div className="flex-1 w-full space-y-2">
              <Label>Product Name</Label>
              <Input {...form.register(`items.${index}.productName`)} placeholder="e.g. 500 kVA Transformer" className="bg-white w-full" />
            </div>
            
            <div className="w-full md:w-24 space-y-2">
              <Label>Qty</Label>
              <Input {...form.register(`items.${index}.quantity`)} placeholder="1" className="bg-white w-full" />
            </div>
            
            <div className="flex-[2] w-full space-y-2">
              <Label>Notes (Optional)</Label>
              <Input {...form.register(`items.${index}.notes`)} placeholder="Specific requirements..." className="bg-white w-full" />
            </div>
            
            {fields.length > 1 && (
              <Button type="button" variant="destructive" size="icon" className="md:mt-8 self-end md:self-auto" onClick={() => remove(index)}>
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
        ))}
      </div>

      {/* 4. Additional Notes */}
      <div className="space-y-2">
        <Label>Additional Notes</Label>
        <Textarea {...form.register("additionalNotes")} placeholder="Any other details..." rows={4} className="w-full" />
      </div>

      {/* 5. Submit Button */}
      <Button type="submit" size="lg" className="w-full h-12 text-base font-bold" disabled={isSubmitting}>
        {isSubmitting ? <><Loader2 className="mr-2 size-4 animate-spin" /> Submitting...</> : "Submit Quote Request"}
      </Button>
    </form>
  );
}