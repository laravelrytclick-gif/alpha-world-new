"use client";

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Eye } from "lucide-react";

import { ViewExamModal } from "@/app/admin/dashboard/components/ViewExamModal";
import { EditExamModal } from "@/app/admin/dashboard/components/EditExamModal";

/* ================= TYPES ================= */
interface Exam {
  _id: string;
  name: string;
  overview: string;
  exam_type: "National" | "State";
  important_dates: string;
  is_active: boolean;
  created_by?: {
    name: string;
    email: string;
  };
}

/* ================= COMPONENT ================= */
export function AdminExamsTable() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewExam, setViewExam] = useState<any>(null);
  const [editExam, setEditExam] = useState<any>(null);

  /* ================= FETCH ALL ================= */
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/exams", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setExams(data.exams);
      } catch (err) {
        console.error("Fetch exams error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  /* ================= VIEW ================= */
  const handleView = async (exam: Exam) => {
    const res = await fetch(`/api/exams/${exam._id}`);
    const data = await res.json();
    setViewExam(data.exam);
  };

  /* ================= EDIT ================= */
  const handleEdit = async (exam: Exam) => {
    const res = await fetch(`/api/exams/${exam._id}`);
    const data = await res.json();
    setEditExam(data.exam);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Deactivate this exam?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`/api/exams/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setExams((prev) => prev.filter((e) => e._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Exams Management</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </CardContent>
      </Card>
    );
  }

  /* ================= UI ================= */
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Exams Management</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Overview</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Important Dates</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {exams.map((exam) => (
                <TableRow key={exam._id}>
                  <TableCell className="font-medium">
                    {exam.name}
                  </TableCell>

                  <TableCell className="max-w-xs truncate">
                    {exam.overview}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {exam.exam_type}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {exam.important_dates || "TBD"}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-600"
                    >
                      Active
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(exam)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(exam)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(exam._id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {exams.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No exams found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================= MODALS ================= */}
      <ViewExamModal
        open={!!viewExam}
        exam={viewExam}
        onClose={() => setViewExam(null)}
      />

      <EditExamModal
        open={!!editExam}
        exam={editExam}
        onClose={() => setEditExam(null)}
        onUpdated={(updated) =>
          setExams((prev) =>
            prev.map((e) =>
              e._id === updated._id ? updated : e
            )
          )
        }
      />
    </>
  );
}
