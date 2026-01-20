"use client";

import { useState, useEffect } from "react";
import { ViewCourseModal } from "@/app/admin/dashboard/components/ViewCourseModal";
import { EditCourseModal } from "@/app/admin/dashboard/components/EditCourseModal";

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

// Course interface
interface Course {
  _id: string;
  name: string;
  description: string;
  duration: string;
  level: "Undergraduate" | "Graduate" | "Postgraduate" | "Diploma";
  fees: string;
  category: string;
  created_by?: {
    name: string;
    email: string;
  };
}

export function AdminCoursesTable() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewCourse, setViewCourse] = useState<Course | null>(null);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message);

        setCourses(data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // View course
  const handleView = async (course: Course) => {
    const res = await fetch(`/api/courses/${course._id}`);
    const data = await res.json();
    setViewCourse(data.course);
  };

  // Edit course
  const handleEdit = async (course: Course) => {
    const res = await fetch(`/api/courses/${course._id}`);
    const data = await res.json();
    setEditCourse(data.course);
  };

  // Delete (soft)
  const handleDelete = async (courseId: string) => {
    if (!confirm("Are you sure you want to deactivate this course?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`/api/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setCourses((prev) => prev.filter((c) => c._id !== courseId));
    } catch (error: any) {
      console.error("Delete error:", error);
      alert(error.message);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Courses Management</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Courses Management</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Level</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell className="font-medium">
                    {course.name}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">{course.level}</Badge>
                  </TableCell>

                  <TableCell>{course.duration}</TableCell>
                  <TableCell>{course.fees}</TableCell>

                  <TableCell>
                    <Badge variant="secondary">{course.category}</Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(course)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(course)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(course._id)}
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

          {courses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No courses found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Modal */}
      <ViewCourseModal
        open={!!viewCourse}
        course={viewCourse}
        onClose={() => setViewCourse(null)}
      />

      {/* Edit Modal */}
      <EditCourseModal
        open={!!editCourse}
        course={editCourse}
        onClose={() => setEditCourse(null)}
        onUpdated={(updated) =>
          setCourses((prev) =>
            prev.map((c) => (c._id === updated._id ? updated : c))
          )
        }
      />
    </>
  );
}
