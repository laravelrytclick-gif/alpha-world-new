"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface EditCourseModalProps {
  open: boolean;
  onClose: () => void;
  course: any;
  onUpdated: (course: any) => void;
}

export function EditCourseModal({
  open,
  onClose,
  course,
  onUpdated,
}: EditCourseModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    fees: "",
    category: "",
  });

  // ✅ sync form when course changes
  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || "",
        description: course.description || "",
        duration: course.duration || "",
        fees: course.fees || "",
        category: course.category || "",
      });
    }
  }, [course]);

  if (!course) return null;

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`/api/courses/${course._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onUpdated(data.course);
      onClose();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Course Name"
          />

          <Textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Description"
          />

          <Input
            value={formData.duration}
            onChange={(e) => handleChange("duration", e.target.value)}
            placeholder="Duration"
          />

          <Input
            value={formData.fees}
            onChange={(e) => handleChange("fees", e.target.value)}
            placeholder="Fees"
          />

          <Input
            value={formData.category}
            onChange={(e) => handleChange("category", e.target.value)}
            placeholder="Category"
          />

          <Button onClick={handleSubmit} className="w-full">
            Update Course
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
