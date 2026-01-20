"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminCollegesTable } from "./components/AdminCollegesTable";
import { AdminBlogsTable } from "./components/AdminBlogsTable";
import { AdminExamsTable } from "./components/AdminExamsTable";
import { AdminCoursesTable } from "./components/AdminCoursesTable";
import { CreateCollegeModal } from "./components/CreateCollegeModal";
import { CreateBlogModal } from "./components/CreateBlogModal";
import { CreateExamModal } from "./components/CreateExamModal";
import { CreateCourseModal } from "./components/CreateCourseModal";
import { Plus, GraduationCap, BookOpen, FileText, Book } from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("colleges");
  const [isCollegeModalOpen, setIsCollegeModalOpen] = useState(false);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);

  const handleCreateClick = () => {
    switch (activeTab) {
      case "colleges":
        setIsCollegeModalOpen(true);
        break;
      case "blogs":
        setIsBlogModalOpen(true);
        break;
      case "exams":
        setIsExamModalOpen(true);
        break;
      case "courses":
        setIsCourseModalOpen(true);
        break;
    }
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      {/* <AppSidebar variant="inset" /> */}
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* Dashboard Header */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                      Manage colleges, blogs, exams, and courses
                    </p>
                  </div>
                  <Button onClick={handleCreateClick}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create {activeTab.charAt(0).toUpperCase() + activeTab.slice(1, -1)}
                  </Button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 px-4 lg:px-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Colleges</CardTitle>
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Blogs</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">567</div>
                    <p className="text-xs text-muted-foreground">
                      +8% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Exams</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89</div>
                    <p className="text-xs text-muted-foreground">
                      +5% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Courses</CardTitle>
                    <Book className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3,456</div>
                    <p className="text-xs text-muted-foreground">
                      +15% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs for different content types */}
              <div className="px-4 lg:px-6">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="colleges" className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" />
                      Colleges
                    </TabsTrigger>
                    <TabsTrigger value="blogs" className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Blogs
                    </TabsTrigger>
                    <TabsTrigger value="exams" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Exams
                    </TabsTrigger>
                    <TabsTrigger value="courses" className="flex items-center gap-2">
                      <Book className="h-4 w-4" />
                      Courses
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="colleges" className="mt-6">
                    <AdminCollegesTable />
                  </TabsContent>
                  <TabsContent value="blogs" className="mt-6">
                    <AdminBlogsTable />
                  </TabsContent>
                  <TabsContent value="exams" className="mt-6">
                    <AdminExamsTable />
                  </TabsContent>
                  <TabsContent value="courses" className="mt-6">
                    <AdminCoursesTable />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Modals */}
              <CreateCollegeModal
                isOpen={isCollegeModalOpen}
                onClose={() => setIsCollegeModalOpen(false)}
              />
              <CreateBlogModal
                isOpen={isBlogModalOpen}
                onClose={() => setIsBlogModalOpen(false)}
              />
              <CreateExamModal
                isOpen={isExamModalOpen}
                onClose={() => setIsExamModalOpen(false)}
              />
              <CreateCourseModal
                isOpen={isCourseModalOpen}
                onClose={() => setIsCourseModalOpen(false)}
              />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
