"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ApplicationFiltersProps {
  showOrganizationFilter?: boolean
}

export default function ApplicationFilters({ showOrganizationFilter = false }: ApplicationFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    status: searchParams.get("status") || "all",
    petType: searchParams.get("petType") || "all",
    dateRange: searchParams.get("dateRange") || "all",
    organizationId: searchParams.get("organizationId") || "all",
  })

  const [organizations, setOrganizations] = useState<Array<{ id: string; name: string }>>([])

  // Fetch organizations for super admin filter
  useEffect(() => {
    if (showOrganizationFilter) {
      fetchOrganizations()
    }
  }, [showOrganizationFilter])

  const fetchOrganizations = async () => {
    try {
      const response = await fetch("/api/organizations")
      if (response.ok) {
        const data = await response.json()
        setOrganizations(data)
      }
    } catch (error) {
      console.error("Error fetching organizations:", error)
    }
  }

  // Update filters when URL changes
  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      status: searchParams.get("status") || "all",
      petType: searchParams.get("petType") || "all",
      dateRange: searchParams.get("dateRange") || "all",
      organizationId: searchParams.get("organizationId") || "all",
    })
  }, [searchParams])

  const handleChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    const params = new URLSearchParams()

    if (filters.search) params.set("search", filters.search)
    if (filters.status !== "all") params.set("status", filters.status)
    if (filters.petType !== "all") params.set("petType", filters.petType)
    if (filters.dateRange !== "all") params.set("dateRange", filters.dateRange)
    if (showOrganizationFilter && filters.organizationId !== "all") {
      params.set("organizationId", filters.organizationId)
    }

    // Reset to page 1 when filters change
    params.set("page", "1")

    router.push(`/admin/applications?${params.toString()}`)
  }

  const resetFilters = () => {
    setFilters({
      search: "",
      status: "all",
      petType: "all",
      dateRange: "all",
      organizationId: "all",
    })

    router.push("/admin/applications")
  }

  return (
    <div className="space-y-4">
      <div
        className={`grid grid-cols-1 gap-4 ${showOrganizationFilter ? "sm:grid-cols-2 lg:grid-cols-5" : "sm:grid-cols-2 lg:grid-cols-4"}`}
      >
        <div>
          <Input
            placeholder="Search applications..."
            value={filters.search}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        </div>

        <Select value={filters.status} onValueChange={(value) => handleChange("status", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.petType} onValueChange={(value) => handleChange("petType", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Pet Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="dog">Dogs</SelectItem>
            <SelectItem value="cat">Cats</SelectItem>
            <SelectItem value="bird">Birds</SelectItem>
            <SelectItem value="small-animal">Small Animals</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.dateRange} onValueChange={(value) => handleChange("dateRange", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>

        {showOrganizationFilter && (
          <Select value={filters.organizationId} onValueChange={(value) => handleChange("organizationId", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Organization" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Organizations</SelectItem>
              {organizations.map((org) => (
                <SelectItem key={org.id} value={org.id}>
                  {org.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
        <Button onClick={applyFilters} className="bg-rose-600 hover:bg-rose-500">
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
