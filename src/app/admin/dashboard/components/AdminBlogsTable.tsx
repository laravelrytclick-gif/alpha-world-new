"use client";

import { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Trash2, Eye } from "lucide-react";

import { ViewBlogModal } from "@/app/admin/dashboard/components/ViewBlogModal";
import { EditBlogModal } from "@/app/admin/dashboard/components/EditBlogModal";

/* ================= TYPES ================= */
interface Blog {
  _id: string;
  title: string;
  body: string;
  slug: string;
  is_published: boolean;
  created_at: string;
}

/* ================= COMPONENT ================= */
export function AdminBlogsTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const [viewBlog, setViewBlog] = useState<Blog | null>(null);
  const [editBlog, setEditBlog] = useState<Blog | null>(null);

  /* ================= FETCH ALL ================= */
useEffect(() => {
  const fetchBlogs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("/api/blogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API error:", data);
        setBlogs([]);
        return;
      }

      
      setBlogs(Array.isArray(data.blogs) ? data.blogs : []);
    } catch (error) {
      console.error("Fetch blogs error:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  fetchBlogs();
}, []);


  /* ================= VIEW ================= */
  const handleView = async (blog: Blog) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`/api/blogs/${blog._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }

    setViewBlog(data.blog);
  };

  /* ================= EDIT ================= */
  const handleEdit = async (blog: Blog) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const res = await fetch(`/api/blogs/${blog._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }

    setEditBlog(data.blog);
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog?")) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Blogs Management</CardTitle>
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
          <CardTitle>Blogs Management</CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell className="truncate max-w-xs">
                    {blog.title}
                  </TableCell>

                  <TableCell className="font-mono text-xs">
                    {blog.slug}
                  </TableCell>

                  <TableCell>
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
                  </TableCell>

                  <TableCell>
                    {new Date(blog.created_at).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" onClick={() => handleView(blog)}>
                        <Eye className="h-4 w-4" />
                      </Button>

                      <Button size="sm" variant="ghost" onClick={() => handleEdit(blog)}>
                        <Edit className="h-4 w-4" />
                      </Button>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => handleDelete(blog._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {blogs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No blogs found.
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================= MODALS ================= */}
      <ViewBlogModal
        open={!!viewBlog}
        blog={viewBlog}
        onClose={() => setViewBlog(null)} 
      />

      <EditBlogModal
        open={!!editBlog}
        blog={editBlog}
        onClose={() => setEditBlog(null)}
        onUpdated={(updated: Blog) =>
          setBlogs((prev) =>
            prev.map((b) => (b._id === updated._id ? updated : b))
          )
        }
      />
    </>
  );
}
