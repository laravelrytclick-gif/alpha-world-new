"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface EditCollegeModalProps {
  open: boolean;
  onClose: () => void;
  college: any;
  onUpdated: (college: any) => void;
}

export function EditCollegeModal({
  open,
  onClose,
  college,
  onUpdated,
}: EditCollegeModalProps) {
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (college) {
      setFormData({
        name: college.name || "",
        city: college.city || "",
        state: college.state || "",
        type: college.type || "",
        overview: college.overview || "",
        approved_by: college.approved_by?.join(", ") || "",
      });
    }
  }, [college]);

  if (!formData) return null;

  const handleChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const payload = {
        ...formData,
        approved_by: formData.approved_by
          .split(",")
          .map((v: string) => v.trim()),
      };

      const res = await fetch(`/api/colleges/${college._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onUpdated(data.college);
      onClose();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit College</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="College Name"
          />

          <div className="grid grid-cols-2 gap-2">
            <Input
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="City"
            />
            <Input
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              placeholder="State"
            />
          </div>

          <Select
            value={formData.type}
            onValueChange={(v) => handleChange("type", v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Govt">Govt</SelectItem>
              <SelectItem value="Private">Private</SelectItem>
            </SelectContent>
          </Select>

          <Textarea
            value={formData.overview}
            onChange={(e) => handleChange("overview", e.target.value)}
            placeholder="College Overview"
            rows={3}
          />

          <Input
            value={formData.approved_by}
            onChange={(e) =>
              handleChange("approved_by", e.target.value)
            }
            placeholder="Approved by (UGC, AICTE, NAAC)"
          />

          <Button onClick={handleSubmit} className="w-full">
            Update College
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
