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
import { Checkbox } from "@/components/ui/checkbox";

interface EditBlogModalProps {
  open: boolean;
  onClose: () => void;
  blog: any;
  onUpdated: (blog: any) => void;
}

export function EditBlogModal({
  open,
  onClose,
  blog,
  onUpdated,
}: EditBlogModalProps) {
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        body: blog.body || "",
        is_published: blog.is_published || false,
      });
    }
  }, [blog]);

  if (!formData) return null;

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`/api/content/${blog._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      onUpdated(data.blog);
      onClose();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="Blog Title"
          />

          <Input
            value={formData.slug}
            onChange={(e) => handleChange("slug", e.target.value)}
            placeholder="Slug"
          />

          <Textarea
            value={formData.body}
            onChange={(e) => handleChange("body", e.target.value)}
            placeholder="Blog Content"
            rows={8}
          />

          <div className="flex items-center gap-2">
            <Checkbox
              checked={formData.is_published}
              onCheckedChange={(v) =>
                handleChange("is_published", Boolean(v))
              }
            />
            <span className="text-sm">
              Publish this blog
            </span>
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Update Blog
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
