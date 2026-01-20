"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditExamModalProps {
  open: boolean;
  onClose: () => void;
  exam: any;
  onUpdated: (exam: any) => void;
}

export function EditExamModal({
  open,
  onClose,
  exam,
  onUpdated,
}: EditExamModalProps) {
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (exam) {
      setFormData({
        name: exam.name || "",
        title: exam.title || "",
        slug: exam.slug || "",
        mode: exam.mode || "",
        date: exam.date?.slice(0, 10) || "",
      });
    }
  }, [exam]);

  if (!formData) return null;

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`/api/exams/${exam._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onUpdated(data.exam);
      onClose();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Exam</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Exam Name"
          />

          <Input
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Full Title"
          />

          <Input
            value={formData.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            placeholder="Slug"
          />

          <Select
            value={formData.mode}
            onValueChange={(v) => handleChange("mode", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Online">Online</SelectItem>
              <SelectItem value="Offline">Offline</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
          />

          <Button onClick={handleSubmit} className="w-full">
            Update Exam
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
