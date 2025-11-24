"use client";

import * as React from "react";
import posthog from "posthog-js";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";

type DataRequestCategory =
  | "access"
  | "delete"
  | "restrict"
  | "withdraw-consent"
  | "other";

interface DataRequestFormProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function DataRequestForm({ onSuccess, onError }: DataRequestFormProps) {
  const [category, setCategory] = React.useState<DataRequestCategory>("access");
  const [description, setDescription] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);
  const [hasPosthogId, setHasPosthogId] = React.useState<boolean>(false);

  // Check if PostHog distinct_id is available
  React.useEffect(() => {
    const distinctId = posthog.get_distinct_id();
    console.log("distinctId", distinctId);
    setHasPosthogId(distinctId !== "$posthog_cookieless");
  }, []);

  const categories: Array<{ value: DataRequestCategory; label: string }> = [
    { value: "access", label: "Access my data" },
    { value: "delete", label: "Delete my data" },
    { value: "restrict", label: "Restrict processing" },
    { value: "withdraw-consent", label: "Withdraw consent" },
    { value: "other", label: "Other" },
  ];

  async function submitDataRequest(payload: {
    category: string;
    description: string;
    userEmail: string;
    posthogDistinctId?: string;
  }) {
    const response = await fetch("/api/data-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error ?? "Unknown error");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const posthogDistinctId = posthog.get_distinct_id();

      await submitDataRequest({
        category,
        description,
        userEmail: userEmail.trim(),
        posthogDistinctId,
      });

      setSubmitSuccess(true);
      setDescription("");
      setUserEmail("");
      onSuccess?.();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send request";
      setSubmitError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="category" className="mb-2 block">
          Request Type <span className="text-destructive">*</span>
        </Label>
        <Select
          value={category}
          onValueChange={(value) => setCategory(value as DataRequestCategory)}
          required
        >
          <SelectTrigger id="category" className="w-full">
            <SelectValue placeholder="Select a request type" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.value} value={cat.value}>
                {cat.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description" className="mb-2 block">
          Description <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please describe your request..."
          required
          rows={5}
        />
      </div>

      <div>
        <Label htmlFor="email" className="mb-2 block">
          Email <span className="text-destructive">*</span>
        </Label>
        <Input
          id="email"
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox id="posthog-id" checked={hasPosthogId} disabled />
        <div className="flex-1">
          <Label htmlFor="posthog-id" className="cursor-not-allowed">
            PostHog unique identifier{" "}
            {hasPosthogId ? "available" : "not available"}
          </Label>
          {hasPosthogId ? (
            <Label
              htmlFor="posthog-id"
              className="text-xs text-muted-foreground mt-1"
            >
              Your PostHog unique identifier will be included with this request
              to help us locate and process your data in our analytics system.
            </Label>
          ) : (
            <Label
              htmlFor="posthog-id"
              className="text-xs text-muted-foreground mt-1 cursor-not-allowed"
            >
              No PostHog unique identifier is associated with this account. This
              may be because analytics cookies are disabled or you have opted
              out of analytics tracking.
            </Label>
          )}
        </div>
      </div>

      {submitError && (
        <div className="bg-destructive/10 border-destructive/50 text-destructive rounded-md border p-3 text-sm">
          {submitError}
        </div>
      )}

      {submitSuccess && (
        <div className="bg-green-500/10 border-green-500/50 text-green-700 dark:text-green-400 rounded-md border p-3 text-sm">
          Your request has been submitted successfully. We&apos;ll get back to
          you soon.
        </div>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </Button>
    </form>
  );
}
