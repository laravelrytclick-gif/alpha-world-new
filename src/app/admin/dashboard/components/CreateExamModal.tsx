"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// src/lib/types.ts

export interface Exam {
  _id: string;
  name: string;
  slug: string;
  exam_type: string;
  overview: string;
  eligibility: string;
  exam_pattern: string;
  syllabus: string;
  important_dates: string;
  is_active: boolean;
  created_at?: string;
}


interface CreateExamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateExamModal({ isOpen, onClose }: CreateExamModalProps) {
  const [formData, setFormData] = useState({
    slug: "",
    logo: "",
    name: "",
    title: "",
    mode: "",
    date: "",
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    const name = formData.name.trim();
    const title = formData.title.trim();
    const mode = formData.mode.trim();

    if (!name || !title || !mode) {
      alert("Name, Title and Mode are required");
      return;
    }

    const slug =
      formData.slug.trim() ||
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const payload = {
      name,
      slug,
      exam_type: mode === "Online" ? "National" : "State",
      overview: title,
      eligibility: "TBD",
      exam_pattern: "TBD",
      syllabus: "TBD",
      important_dates: formData.date || "TBD",
      is_active: true,
    };

    console.log("EXAM PAYLOAD →", payload); // 🔍 debug once

    const res = await fetch("/api/exams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create exam");
    }

    // ✅ Reset form
    setFormData({
      slug: "",
      logo: "",
      name: "",
      title: "",
      mode: "",
      date: "",
    });

    onClose();
  } catch (error: any) {
    console.error("Error creating exam:", error);
    alert(error.message);
  }
};


  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New Exam</SheetTitle>
          <SheetDescription>
            Add a new exam to the platform. Fill in all the required information below.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-[20px] mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Exam Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="e.g., SAT, ACT, TOEFL"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug *</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => handleInputChange("slug", e.target.value)}
                placeholder="sat, act, toefl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input
                id="logo"
                value={formData.logo}
                onChange={(e) => handleInputChange("logo", e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mode">Exam Mode *</Label>
              <Select value={formData.mode} onValueChange={(value) => handleInputChange("mode", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select exam mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Full Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g., Scholastic Assessment Test"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="date">Next Exam Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange("date", e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Exam
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
