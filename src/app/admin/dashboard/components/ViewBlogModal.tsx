"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ViewBlogModalProps {
  open: boolean;
  onClose: () => void;
  blog: any;
}

export function ViewBlogModal({
  open,
  onClose,
  blog,
}: ViewBlogModalProps) {
  if (!blog) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Blog Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <strong>Title:</strong>
            <p className="mt-1">{blog.title}</p>
          </div>

          <div>
            <strong>Slug:</strong>
            <p className="font-mono text-xs text-muted-foreground">
              {blog.slug}
            </p>
          </div>

          <div>
            <strong>Status:</strong>{" "}
            <Badge
              variant="outline"
              className={
                blog.is_published
                  ? "text-green-600 border-green-600"
                  : "text-orange-600 border-orange-600"
              }
            >
              {blog.is_published ? "Published" : "Draft"}
            </Badge>
          </div>

          <div>
            <strong>Content:</strong>
            <div className="mt-2 p-3 border rounded-md max-h-[300px] overflow-y-auto text-muted-foreground">
              {blog.body}
            </div>
          </div>

          {blog.created_at && (
            <p className="text-xs text-muted-foreground">
              Created on{" "}
              {new Date(blog.created_at).toLocaleDateString()}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
