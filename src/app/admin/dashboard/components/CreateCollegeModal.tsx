"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { College } from "@/app/context/CollegeContext";

interface CreateCollegeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateCollegeModal({ isOpen, onClose }: CreateCollegeModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "",
    established: "",
    ranking: "",
    courseCount: "",
    description: "",
    address: "",
    pincode: "",
    phone: "",
  });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in");
        return;
      }

      const [city = "", state = ""] = formData.location.split(",");

      const payload = {
        name: formData.name.trim(),
        city: city.trim(),
        state: state.trim(),
        type: formData.type === "Public" ? "Govt" : "Private",
        overview: formData.description.trim(),
        fees: "TBD",
        admission_process: "TBD",
        is_active: true,
      };

      const res = await fetch("/api/colleges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      let data: any;
      try {
        data = await res.json();
      } catch {
        throw new Error("Server did not return JSON");
      }

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create college");
      }

      console.log("College created:", data);

      setFormData({
        name: "",
        location: "",
        type: "",
        established: "",
        ranking: "",
        courseCount: "",
        description: "",
        address: "",
        pincode: "",
        phone: "",
      });

      onClose();
    } catch (error: any) {
      console.error("Error creating college:", error.message);
      alert(error.message);
    }
  };



  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create New College</SheetTitle>
          <SheetDescription>
            Add a new college to the platform. Fill in all the required information below.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6 p-[20px] mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">College Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter college name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="City, State, Country"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select college type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Public">Public</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="established">Established Year</Label>
              <Input
                id="established"
                value={formData.established}
                onChange={(e) => handleInputChange("established", e.target.value)}
                placeholder="e.g., 1850"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ranking">Ranking</Label>
              <Input
                id="ranking"
                value={formData.ranking}
                onChange={(e) => handleInputChange("ranking", e.target.value)}
                placeholder="e.g., #1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="courseCount">Number of Courses</Label>
              <Input
                id="courseCount"
                type="number"
                value={formData.courseCount}
                onChange={(e) => handleInputChange("courseCount", e.target.value)}
                placeholder="e.g., 150"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the college"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Full address"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pincode">Pincode</Label>
              <Input
                id="pincode"
                value={formData.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                placeholder="123456"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (123) 456-7890"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create College
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
