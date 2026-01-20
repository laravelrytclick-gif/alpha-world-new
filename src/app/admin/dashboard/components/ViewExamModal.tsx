"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ViewExamModalProps {
  open: boolean;
  onClose: () => void;
  exam: any;
}

export function ViewExamModal({
  open,
  onClose,
  exam,
}: ViewExamModalProps) {
  if (!exam) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Exam Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <p><strong>Name:</strong> {exam.name}</p>
          <p><strong>Title:</strong> {exam.title}</p>

          <p>
            <strong>Mode:</strong>{" "}
            <Badge variant="outline">{exam.mode}</Badge>
          </p>

          <p>
            <strong>Slug:</strong>{" "}
            <span className="text-muted-foreground">{exam.slug}</span>
          </p>

          <p>
            <strong>Date:</strong>{" "}
            {exam.date
              ? new Date(exam.date).toLocaleDateString()
              : "—"}
          </p>

          {exam.created_by && (
            <p className="text-xs text-muted-foreground pt-2">
              Created by {exam.created_by.name} ({exam.created_by.email})
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
