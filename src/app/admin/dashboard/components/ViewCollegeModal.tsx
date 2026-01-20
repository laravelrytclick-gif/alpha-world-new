"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ViewCollegeModalProps {
  open: boolean;
  onClose: () => void;
  college: any;
}

export function ViewCollegeModal({
  open,
  onClose,
  college,
}: ViewCollegeModalProps) {
  if (!college) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>College Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3 text-sm">
          <p><strong>Name:</strong> {college.name}</p>

          <p>
            <strong>Location:</strong>{" "}
            {college.city}, {college.state}
          </p>

          <p>
            <strong>Type:</strong>{" "}
            <Badge variant="outline">{college.type}</Badge>
          </p>

          {college.overview && (
            <p>
              <strong>Overview:</strong>{" "}
              <span className="text-muted-foreground">
                {college.overview}
              </span>
            </p>
          )}

          {college.approved_by?.length > 0 && (
            <p>
              <strong>Approved By:</strong>{" "}
              {college.approved_by.join(", ")}
            </p>
          )}

          {college.created_by && (
            <p className="text-xs text-muted-foreground pt-2">
              Created by {college.created_by.name} (
              {college.created_by.email})
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
