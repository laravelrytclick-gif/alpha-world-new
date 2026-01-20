"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ViewCourseModalProps {
  open: boolean;
  onClose: () => void;
  course: any;
}

export function ViewCourseModal({ open, onClose, course }: ViewCourseModalProps) {
  if (!course) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{course.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <p><strong>Description:</strong> {course.description}</p>
          <p><strong>Duration:</strong> {course.duration}</p>

          <div className="flex gap-2">
            <Badge>{course.level}</Badge>
            <Badge variant="secondary">{course.category}</Badge>
          </div>

          <p><strong>Fees:</strong> {course.fees}</p>

          {course.created_by && (
            <p className="text-muted-foreground text-xs">
              Created by {course.created_by.name} ({course.created_by.email})
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
