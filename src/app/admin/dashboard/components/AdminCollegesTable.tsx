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

import { ViewCollegeModal } from "@/app/admin/dashboard/components/ViewCollegeModal";
import { EditCollegeModal } from "@/app/admin/dashboard/components/EditCollegeModal";

/* ================= TYPES ================= */
interface College {
  _id: string;
  name: string;
  city: string;
  state: string;
  type: "Govt" | "Private";
  ranking?: string;
  courseCount?: number;
  is_active: boolean;
  created_by?: {
    name: string;
    email: string;
  };
}

/* ================= COMPONENT ================= */
export function AdminCollegesTable() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewCollege, setViewCollege] = useState<any>(null);
  const [editCollege, setEditCollege] = useState<any>(null);

  /* ================= FETCH ALL ================= */
useEffect(() => {
  const fetchColleges = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/colleges", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("API RESPONSE:", data);

      if (!res.ok) throw new Error(data.message);

      // 🔥 FIX IS HERE
      setColleges(Array.isArray(data.colleges) ? data.colleges : []);
    } catch (err) {
      console.error("Fetch colleges error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchColleges();
}, []);



  /* ================= VIEW ================= */
  const handleView = async (college: College) => {
    const res = await fetch(`/api/colleges/${college._id}`);
    const data = await res.json();
    setViewCollege(data.college);
  };

  /* ================= EDIT ================= */
  const handleEdit = async (college: College) => {
    const res = await fetch(`/api/colleges/${college._id}`);
    const data = await res.json();
    setEditCollege(data.college);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Deactivate this college?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`/api/colleges/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setColleges((prev) => prev.filter((c) => c._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Colleges Management</CardTitle>
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
          <CardTitle>Colleges Management</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

           <TableBody>
  {Array.isArray(colleges) &&
    colleges.map((college) => (
      <TableRow key={college._id}>
        <TableCell className="font-medium">
          {college.name}
        </TableCell>

        <TableCell>
          {college.city}, {college.state}
        </TableCell>

        <TableCell>
          <Badge variant="outline">{college.type}</Badge>
        </TableCell>

        <TableCell>{college.courseCount ?? 0}</TableCell>

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
            <Button variant="ghost" size="sm" onClick={() => handleView(college)}>
              <Eye className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="sm" onClick={() => handleEdit(college)}>
              <Edit className="h-4 w-4" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(college._id)}
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

          {colleges.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No colleges found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================= MODALS ================= */}
      <ViewCollegeModal
        open={!!viewCollege}
        college={viewCollege}
        onClose={() => setViewCollege(null)}
      />

      <EditCollegeModal
        open={!!editCollege}
        college={editCollege}
        onClose={() => setEditCollege(null)}
        onUpdated={(updated:any) =>
          setColleges((prev) =>
            prev.map((c) =>
              c._id === updated._id ? updated : c
            )
          )
        }
      />
    </>
  );
}
