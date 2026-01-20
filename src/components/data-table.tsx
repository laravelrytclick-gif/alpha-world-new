"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent, 
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
} from "@tabler/icons-react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { toast } from "sonner"
import { z } from "zod"

import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
})

// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}


// Blogs columns - will be defined inside DataTable
const createBlogColumns = (
  setEditingItem: any,
  setIsEditBlogOpen: any,
  openViewModal: (item: any) => void
) => [
  {
    id: "select",
    header: ({ table }: any) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }: any) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: "Title",
    cell: ({ row }: any) => (
      <div className="max-w-xs">
        <div className="font-medium text-slate-900">{row.original.header}</div>
        <div className="text-sm text-slate-500">{row.original.category}</div>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.date}</div>
    ),
  },
  {
    accessorKey: "readTime",
    header: "Read Time",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.readTime}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onClick={() => {
              setEditingItem(row.original)
              setIsEditBlogOpen(true)
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openViewModal(row.original)}>
            View
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// Colleges columns - will be defined inside DataTable
const createCollegeColumns = (
  setEditingItem: any,
  setIsEditCollegeOpen: any,
  openViewModal: (item: any) => void
) => [
  {
    id: "select",
    header: ({ table }: any) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }: any) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "College Name",
    cell: ({ row }: any) => (
      <div className="max-w-xs">
        <div className="font-medium text-slate-900">{row.original.name}</div>
        <div className="text-sm text-slate-500">{row.original.location}</div>
      </div>
    ),
  },
  {
    accessorKey: "rank",
    header: "Rank",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.rank}</div>
    ),
  },
  {
    accessorKey: "tuition",
    header: "Tuition",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.tuition}</div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.rating}</div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onClick={() => {
              setEditingItem(row.original)
              setIsEditCollegeOpen(true)
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openViewModal(row.original)}>
            View
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// Courses columns - will be defined inside DataTable
const createCourseColumns = (
  setEditingItem: any,
  setIsEditCourseOpen: any,
  openViewModal: (item: any) => void
) => [
  {
    id: "select",
    header: ({ table }: any) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }: any) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Course Title",
    cell: ({ row }: any) => (
      <div className="max-w-xs">
        <div className="font-medium text-slate-900">{row.original.title}</div>
        <div className="text-sm text-slate-500">{row.original.category}</div>
      </div>
    ),
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.duration}</div>
    ),
  },
  {
    accessorKey: "popularIn",
    header: "Popular In",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.popularIn}</div>
    ),
  },
  {
    accessorKey: "avgTuition",
    header: "Avg. Tuition",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.avgTuition}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onClick={() => {
              setEditingItem(row.original)
              setIsEditCourseOpen(true)
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openViewModal(row.original)}>
            View
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

// Countries columns - will be defined inside DataTable
const createCountryColumns = (
  setEditingItem: any,
  setIsEditCountryOpen: any,
  openViewModal: (item: any) => void
) => [
  {
    id: "select",
    header: ({ table }: any) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }: any) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: any) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Country",
    cell: ({ row }: any) => (
      <div className="max-w-xs flex items-center gap-2">
        <span className="text-2xl">{row.original.flag}</span>
        <div className="font-medium text-slate-900">{row.original.name}</div>
      </div>
    ),
  },
  {
    accessorKey: "universities",
    header: "Universities",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.universities}</div>
    ),
  },
  {
    accessorKey: "popularCourses",
    header: "Popular Courses",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.popularCourses}</div>
    ),
  },
  {
    accessorKey: "avgTuition",
    header: "Avg. Tuition",
    cell: ({ row }: any) => (
      <div className="text-sm text-slate-600">{row.original.avgTuition}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: any) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: "actions",
    cell: ({ row }: any) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem
            onClick={() => {
              setEditingItem(row.original)
              setIsEditCountryOpen(true)
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => openViewModal(row.original)}>
            View
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]


const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "header",
    header: "Colleges",
    cell: ({ row }) => {
      return <TableCellViewer item={row.original} />
    },
    enableHiding: false,
  },
  {
    accessorKey: "type",
    header: "Courses",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Exams",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "Done" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "target",
    header: () => <div className="w-full text-right">Target</div>,
    cell: ({ row }) => (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
            loading: `Saving ${row.original.header}`,
            success: "Done",
            error: "Error",
          })
        }}
      >
        <Label htmlFor={`${row.original.id}-target`} className="sr-only">
          Target
        </Label>
        <Input
          className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
          defaultValue={row.original.target}
          id={`${row.original.id}-target`}
        />
      </form>
    ),
  },
  // {
  //   accessorKey: "limit",
  //   header: () => <div className="w-full text-right">Limit</div>,
  //   cell: ({ row }) => (
  //     <form
  //       onSubmit={(e) => {
  //         e.preventDefault()
  //         toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
  //           loading: `Saving ${row.original.header}`,
  //           success: "Done",
  //           error: "Error",
  //         })
  //       }}
  //     >
  //       <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
  //         Limit
  //       </Label>
  //       <Input
  //         className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
  //         defaultValue={row.original.limit}
  //         id={`${row.original.id}-limit`}
  //       />
  //     </form>
  //   ),
  // },
  {
    accessorKey: "reviewer",
    header: "Reviewer",
    cell: ({ row }) => {
      const isAssigned = row.original.reviewer !== "Assign reviewer"

      if (isAssigned) {
        return row.original.reviewer
      }

      return (
        <>
          <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
            Reviewer
          </Label>
          <Select>
            <SelectTrigger
              className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
              size="sm"
              id={`${row.original.id}-reviewer`}
            >
              <SelectValue placeholder="Assign reviewer" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
              <SelectItem value="Jamik Tashpulatov">
                Jamik Tashpulatov
              </SelectItem>
            </SelectContent>
          </Select>
        </>
      )
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const [isAddBlogOpen, setIsAddBlogOpen] = React.useState(false)
  const [isAddCollegeOpen, setIsAddCollegeOpen] = React.useState(false)
  const [isAddCourseOpen, setIsAddCourseOpen] = React.useState(false)
  const [isAddCountryOpen, setIsAddCountryOpen] = React.useState(false)
  const [isAddExamOpen, setIsAddExamOpen] = React.useState(false)
  const [isEditBlogOpen, setIsEditBlogOpen] = React.useState(false)
  const [isEditCollegeOpen, setIsEditCollegeOpen] = React.useState(false)
  const [isEditCourseOpen, setIsEditCourseOpen] = React.useState(false)
  const [isEditCountryOpen, setIsEditCountryOpen] = React.useState(false)
  const [isEditExamOpen, setIsEditExamOpen] = React.useState(false)
  const [editingItem, setEditingItem] = React.useState<any>(null)
  const [activeTab, setActiveTab] = React.useState("blogs");
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false)
  const [viewEntity, setViewEntity] = React.useState<
    "blogs" | "colleges" | "courses" | "countries" | null
  >(null)

  const closeViewModal = React.useCallback(() => {
    setIsViewModalOpen(false)
    setViewEntity(null)
    setEditingItem(null)
  }, [])

  const openViewModal = React.useCallback(
    (entity: "blogs" | "colleges" | "courses" | "countries", item: any) => {
      setViewEntity(entity)
      setEditingItem(item)
      setIsViewModalOpen(true)
    },
    []
  )

  // Dummy data for each tab (replace with real data as needed)
  const blogsData: z.infer<typeof schema>[] = []
  const collegesData: z.infer<typeof schema>[] = []
  const coursesData: z.infer<typeof schema>[] = []
  const countriesData: z.infer<typeof schema>[] = []
  
    React.useEffect(() => {
      const newData = 
        activeTab === "blogs" ? blogsData : 
        activeTab === "colleges" ? collegesData : 
        activeTab === "courses" ? coursesData :
        activeTab === "countries" ? countriesData :
        initialData
      setData(newData)
      setRowSelection({})
      setPagination({ pageIndex: 0, pageSize: 10 })
    }, [activeTab, blogsData, collegesData, coursesData, countriesData, initialData])

  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )


  const currentColumns = 
    activeTab === "blogs" ? createBlogColumns(setEditingItem, setIsEditBlogOpen, (item) => openViewModal("blogs", item)) : 
    activeTab === "colleges" ? createCollegeColumns(setEditingItem, setIsEditCollegeOpen, (item) => openViewModal("colleges", item)) : 
    activeTab === "courses" ? createCourseColumns(setEditingItem, setIsEditCourseOpen, (item) => openViewModal("courses", item)) :
    activeTab === "countries" ? createCountryColumns(setEditingItem, setIsEditCountryOpen, (item) => openViewModal("countries", item)) :
    columns

  const viewEntityLabel =
    viewEntity === "blogs"
      ? "Blog"
      : viewEntity === "colleges"
        ? "College"
        : viewEntity === "courses"
          ? "Course"
          : viewEntity === "countries"
            ? "Country"
            : ""

  const viewFields = React.useMemo(() => {
    if (!viewEntity || !editingItem) return []

    if (viewEntity === "blogs") {
      return [
        { label: "Title", value: editingItem.header },
        { label: "Category", value: editingItem.category },
        { label: "Status", value: editingItem.status },
        { label: "Date", value: editingItem.date },
        { label: "Read Time", value: editingItem.readTime },
        { label: "Description", value: editingItem.description, fullWidth: true },
      ]
    }

    if (viewEntity === "colleges") {
      return [
        { label: "College Name", value: editingItem.name },
        { label: "Location", value: editingItem.location },
        { label: "Rank", value: editingItem.rank },
        { label: "Tuition", value: editingItem.tuition },
        { label: "Rating", value: editingItem.rating },
        { label: "Acceptance Rate", value: editingItem.acceptanceRate },
      ]
    }

    if (viewEntity === "courses") {
      return [
        { label: "Course Title", value: editingItem.title },
        { label: "Category", value: editingItem.category },
        { label: "Duration", value: editingItem.duration },
        { label: "Popular In", value: editingItem.popularIn },
        { label: "Avg. Tuition", value: editingItem.avgTuition },
        { label: "Status", value: editingItem.status },
      ]
    }

    return [
      { label: "Country", value: editingItem.name },
      { label: "Flag", value: editingItem.flag },
      { label: "Universities", value: editingItem.universities },
      { label: "Popular Courses", value: editingItem.popularCourses },
      { label: "Avg. Tuition", value: editingItem.avgTuition },
      { label: "Status", value: editingItem.status },
    ]
  }, [editingItem, viewEntity])


  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  return (
    <>
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6"
    >
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <Select defaultValue="outline">
          <SelectTrigger
            className="flex w-fit @4xl/main:hidden"
            size="sm"
            id="view-selector"
          >
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="outline">Outline</SelectItem>
            <SelectItem value="past-performance">Past Performance</SelectItem>
            <SelectItem value="key-personnel">Key Personnel</SelectItem>
            <SelectItem value="focus-documents">Focus Documents</SelectItem>
          </SelectContent>
        </Select>
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 hidden **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1 @4xl/main:flex">
          <TabsTrigger value="outline">Outline</TabsTrigger>
          <TabsTrigger value="past-performance">
            Past Performance <Badge variant="secondary">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="key-personnel">
            Key Personnel <Badge variant="secondary">2</Badge>
          </TabsTrigger>
          <TabsTrigger value="focus-documents">Focus Documents</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Section</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6"
      >
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>


    {isViewModalOpen && editingItem && viewEntity && (
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={closeViewModal}
      >
        <div
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">{viewEntityLabel} Details</h2>
            <p className="text-slate-600 mt-1">View information</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {viewFields.map((field: any) => (
                <div
                  key={field.label}
                  className={field.fullWidth ? "md:col-span-2" : ""}
                >
                  <Label className="text-sm font-medium text-slate-700">{field.label}</Label>
                  <div className="mt-1 w-full p-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900">
                    {field.value ?? ""}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 p-6 pt-0 border-t border-slate-200">
            <Button type="button" variant="outline" onClick={closeViewModal}>
              Close
            </Button>
          </div>
        </div>
      </div>
    )}

    {/* Add Blog Modal */}
    {isAddBlogOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Add New Blog</h2>
            <p className="text-slate-600 mt-1">Create a new blog post for your website</p>
          </div>
          <form className="p-6 space-y-6" onSubmit={(e) => {
            e.preventDefault()
            toast.success("Blog added successfully!")
            setIsAddBlogOpen(false)
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="blog-title" className="text-sm font-medium text-slate-700">Title</Label>
                <Input id="blog-title" placeholder="Enter blog title" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="blog-category" className="text-sm font-medium text-slate-700">Category</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guides">Guides</SelectItem>
                    <SelectItem value="scholarships">Scholarships</SelectItem>
                    <SelectItem value="success">Success Stories</SelectItem>
                    <SelectItem value="tips">Study Tips</SelectItem>
                    <SelectItem value="news">Education News</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="blog-image" className="text-sm font-medium text-slate-700">Image URL</Label>
              <Input id="blog-image" type="url" placeholder="https://example.com/image.jpg" className="mt-1" required />
            </div>
            <div>
              <Label htmlFor="blog-description" className="text-sm font-medium text-slate-700">Description</Label>
              <textarea
                id="blog-description"
                rows={4}
                className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                placeholder="Enter blog description..."
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="blog-read-time" className="text-sm font-medium text-slate-700">Read Time</Label>
                <Input id="blog-read-time" placeholder="e.g., 5 min read" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="blog-date" className="text-sm font-medium text-slate-700">Publish Date</Label>
                <Input id="blog-date" type="date" className="mt-1" required />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => setIsAddBlogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Add Blog
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Add College Modal */}
    {isAddCollegeOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Add New College</h2>
            <p className="text-slate-600 mt-1">Add a new college to your database</p>
          </div>
          <form className="p-6 space-y-6" onSubmit={(e) => {
            e.preventDefault()
            toast.success("College added successfully!")
            setIsAddCollegeOpen(false)
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="college-name" className="text-sm font-medium text-slate-700">College Name</Label>
                <Input id="college-name" placeholder="Enter college name" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="college-location" className="text-sm font-medium text-slate-700">Location</Label>
                <Input id="college-location" placeholder="City, Country" className="mt-1" required />
              </div>
            </div>
            <div>
              <Label htmlFor="college-image" className="text-sm font-medium text-slate-700">Image URL</Label>
              <Input id="college-image" type="url" placeholder="https://example.com/college-image.jpg" className="mt-1" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="college-rank" className="text-sm font-medium text-slate-700">Rank</Label>
                <Input id="college-rank" placeholder="e.g., #1 in Engineering" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="college-tuition" className="text-sm font-medium text-slate-700">Tuition Fee</Label>
                <Input id="college-tuition" placeholder="e.g., $50,000/year" className="mt-1" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="college-acceptance" className="text-sm font-medium text-slate-700">Acceptance Rate</Label>
                <Input id="college-acceptance" placeholder="e.g., 15%" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="college-rating" className="text-sm font-medium text-slate-700">Rating</Label>
                <Input id="college-rating" placeholder="e.g., 4.5/5" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="college-employability" className="text-sm font-medium text-slate-700">Employability Score</Label>
              <Input id="college-employability" placeholder="e.g., 95%" className="mt-1" />
            </div>
            <div>
              <Label className="text-sm font-medium text-slate-700">Tags/Features</Label>
              <div className="mt-2 space-y-2">
                {["Scholarship", "Top Ranked", "Research University", "International Students", "Campus Housing"].map((tag) => (
                  <label key={tag} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 text-orange-500 focus:ring-orange-500" />
                    <span className="text-sm text-slate-700">{tag}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => setIsAddCollegeOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Add College
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Add Course Modal */}
    {isAddCourseOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Add New Course</h2>
            <p className="text-slate-600 mt-1">Add a new course to your database</p>
          </div>
          <form className="p-6 space-y-6" onSubmit={(e) => {
            e.preventDefault()
            toast.success("Course added successfully!")
            setIsAddCourseOpen(false)
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="course-title" className="text-sm font-medium text-slate-700">Course Title</Label>
                <Input id="course-title" placeholder="Enter course title" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="course-category" className="text-sm font-medium text-slate-700">Category</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="course-duration" className="text-sm font-medium text-slate-700">Duration</Label>
                <Input id="course-duration" placeholder="e.g., 1-2 years" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="course-popular-in" className="text-sm font-medium text-slate-700">Popular In</Label>
                <Input id="course-popular-in" placeholder="e.g., USA, UK, Canada" className="mt-1" required />
              </div>
            </div>
            <div>
              <Label htmlFor="course-tuition" className="text-sm font-medium text-slate-700">Average Tuition</Label>
              <Input id="course-tuition" placeholder="e.g., $30,000 - $50,000" className="mt-1" required />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Add Course
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Edit Blog Modal */}
    {isEditBlogOpen && editingItem && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Edit Blog</h2>
            <p className="text-slate-600 mt-1">Update blog information</p>
          </div>
          <form className="p-6 space-y-6" onSubmit={(e) => {
            e.preventDefault()
            toast.success("Blog updated successfully!")
            setIsEditBlogOpen(false)
            setEditingItem(null)
          }}>
            <div>
              <Label htmlFor="edit-blog-title" className="text-sm font-medium text-slate-700">Title</Label>
              <Input id="edit-blog-title" defaultValue={editingItem.header} className="mt-1" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-blog-category" className="text-sm font-medium text-slate-700">Category</Label>
                <Select defaultValue={editingItem.category}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Guides">Guides</SelectItem>
                    <SelectItem value="Scholarships">Scholarships</SelectItem>
                    <SelectItem value="Success">Success</SelectItem>
                    <SelectItem value="Tips">Tips</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-blog-status" className="text-sm font-medium text-slate-700">Status</Label>
                <Select defaultValue={editingItem.status}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Published">Published</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="edit-blog-description" className="text-sm font-medium text-slate-700">Description</Label>
              <textarea id="edit-blog-description" defaultValue={editingItem.description} className="mt-1 w-full p-3 border border-slate-300 rounded-lg" rows={3} required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-blog-date" className="text-sm font-medium text-slate-700">Date</Label>
                <Input id="edit-blog-date" defaultValue={editingItem.date} className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="edit-blog-read-time" className="text-sm font-medium text-slate-700">Read Time</Label>
                <Input id="edit-blog-read-time" defaultValue={editingItem.readTime} className="mt-1" required />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => setIsEditBlogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Update Blog
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Edit College Modal */}
    {isEditCollegeOpen && editingItem && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Edit College</h2>
            <p className="text-slate-600 mt-1">Update college information</p>
          </div>
          <form className="p-6 space-y-6" onSubmit={(e) => {
            e.preventDefault()
            toast.success("College updated successfully!")
            setIsEditCollegeOpen(false)
            setEditingItem(null)
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-college-name" className="text-sm font-medium text-slate-700">College Name</Label>
                <Input id="edit-college-name" defaultValue={editingItem.name} className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="edit-college-location" className="text-sm font-medium text-slate-700">Location</Label>
                <Input id="edit-college-location" defaultValue={editingItem.location} className="mt-1" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-college-rank" className="text-sm font-medium text-slate-700">Rank</Label>
                <Input id="edit-college-rank" defaultValue={editingItem.rank} className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="edit-college-tuition" className="text-sm font-medium text-slate-700">Tuition Fee</Label>
                <Input id="edit-college-tuition" defaultValue={editingItem.tuition} className="mt-1" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-college-rating" className="text-sm font-medium text-slate-700">Rating</Label>
                <Input id="edit-college-rating" defaultValue={editingItem.rating} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="edit-college-acceptance" className="text-sm font-medium text-slate-700">Acceptance Rate</Label>
                <Input id="edit-college-acceptance" defaultValue={editingItem.acceptanceRate || ""} className="mt-1" />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => setIsEditCollegeOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Update College
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Edit Course Modal */}
    {isEditCourseOpen && editingItem && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Edit Course</h2>
            <p className="text-slate-600 mt-1">Update course information</p>
          </div>
          <form className="p-6 space-y-6" onSubmit={(e) => {
            e.preventDefault()
            toast.success("Course updated successfully!")
            setIsEditCourseOpen(false)
            setEditingItem(null)
          }}>
            <div>
              <Label htmlFor="edit-course-title" className="text-sm font-medium text-slate-700">Course Title</Label>
              <Input id="edit-course-title" defaultValue={editingItem.title} className="mt-1" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-course-category" className="text-sm font-medium text-slate-700">Category</Label>
                <Select defaultValue={editingItem.category}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="medicine">Medicine</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-course-duration" className="text-sm font-medium text-slate-700">Duration</Label>
                <Input id="edit-course-duration" defaultValue={editingItem.duration} className="mt-1" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-course-popular-in" className="text-sm font-medium text-slate-700">Popular In</Label>
                <Input id="edit-course-popular-in" defaultValue={editingItem.popularIn} className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="edit-course-tuition" className="text-sm font-medium text-slate-700">Average Tuition</Label>
                <Input id="edit-course-tuition" defaultValue={editingItem.avgTuition} className="mt-1" required />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-course-status" className="text-sm font-medium text-slate-700">Status</Label>
              <Select defaultValue={editingItem.status}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => setIsEditCourseOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Update Course
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Edit Country Modal */}
    {isEditCountryOpen && editingItem && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Edit Country</h2>
            <p className="text-slate-600 mt-1">Update country information</p>
          </div>
          <form className="p-6 space-y-6" onSubmit={(e) => {
            e.preventDefault()
            toast.success("Country updated successfully!")
            setIsEditCountryOpen(false)
            setEditingItem(null)
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-country-name" className="text-sm font-medium text-slate-700">Country Name</Label>
                <Input id="edit-country-name" defaultValue={editingItem.name} className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="edit-country-flag" className="text-sm font-medium text-slate-700">Flag Emoji</Label>
                <Input id="edit-country-flag" defaultValue={editingItem.flag} className="mt-1" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="edit-country-universities" className="text-sm font-medium text-slate-700">Number of Universities</Label>
                <Input id="edit-country-universities" defaultValue={editingItem.universities} className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="edit-country-tuition" className="text-sm font-medium text-slate-700">Average Tuition</Label>
                <Input id="edit-country-tuition" defaultValue={editingItem.avgTuition} className="mt-1" required />
              </div>
            </div>
            <div>
              <Label htmlFor="edit-country-courses" className="text-sm font-medium text-slate-700">Popular Courses</Label>
              <Input id="edit-country-courses" defaultValue={editingItem.popularCourses} className="mt-1" required />
            </div>
            <div>
              <Label htmlFor="edit-country-status" className="text-sm font-medium text-slate-700">Status</Label>
              <Select defaultValue={editingItem.status}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => setIsEditCountryOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Update Country
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}

    {/* Add Country Modal */}
    {isAddCountryOpen && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900">Add New Country</h2>
            <p className="text-slate-600 mt-1">Add a new country to your database</p>
          </div>
          <form className="p-6 space-y-6" onSubmit={(e) => {
            e.preventDefault()
            toast.success("Country added successfully!")
            setIsAddCountryOpen(false)
          }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="country-name" className="text-sm font-medium text-slate-700">Country Name</Label>
                <Input id="country-name" placeholder="Enter country name" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="country-flag" className="text-sm font-medium text-slate-700">Flag Emoji</Label>
                <Input id="country-flag" placeholder="e.g., 🇺🇸" className="mt-1" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="country-universities" className="text-sm font-medium text-slate-700">Number of Universities</Label>
                <Input id="country-universities" placeholder="e.g., 100" className="mt-1" required />
              </div>
              <div>
                <Label htmlFor="country-tuition" className="text-sm font-medium text-slate-700">Average Tuition</Label>
                <Input id="country-tuition" placeholder="e.g., $25,000 - $50,000" className="mt-1" required />
              </div>
            </div>
            <div>
              <Label htmlFor="country-courses" className="text-sm font-medium text-slate-700">Popular Courses</Label>
              <Input id="country-courses" placeholder="e.g., Business, Engineering, Medicine" className="mt-1" required />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <Button type="button" variant="outline" onClick={() => setIsAddCountryOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                Add Country
              </Button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  )
}

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--primary)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--primary)",
  },
} satisfies ChartConfig

function TableCellViewer({ item }: { item: z.infer<typeof schema> }) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Showing total visitors for the last 6 months
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          {!isMobile && (
            <>
              <ChartContainer config={chartConfig}>
                <AreaChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    left: 0,
                    right: 10,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                    hide
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Area
                    dataKey="mobile"
                    type="natural"
                    fill="var(--color-mobile)"
                    fillOpacity={0.6}
                    stroke="var(--color-mobile)"
                    stackId="a"
                  />
                  <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
              <Separator />
              <div className="grid gap-2">
                <div className="flex gap-2 leading-none font-medium">
                  Trending up by 5.2% this month{" "}
                  <IconTrendingUp className="size-4" />
                </div>
                <div className="text-muted-foreground">
                  Showing total visitors for the last 6 months. This is just
                  some random text to test the layout. It spans multiple lines
                  and should wrap around.
                </div>
              </div>
              <Separator />
            </>
          )}
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Header</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Type</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Table of Contents">
                      Table of Contents
                    </SelectItem>
                    <SelectItem value="Executive Summary">
                      Executive Summary
                    </SelectItem>
                    <SelectItem value="Technical Approach">
                      Technical Approach
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Capabilities">Capabilities</SelectItem>
                    <SelectItem value="Focus Documents">
                      Focus Documents
                    </SelectItem>
                    <SelectItem value="Narrative">Narrative</SelectItem>
                    <SelectItem value="Cover Page">Cover Page</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Done">Done</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Not Started">Not Started</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="target">Target</Label>
                <Input id="target" defaultValue={item.target} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="limit">Limit</Label>
                <Input id="limit" defaultValue={item.limit} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="reviewer">Reviewer</Label>
              <Select defaultValue={item.reviewer}>
                <SelectTrigger id="reviewer" className="w-full">
                  <SelectValue placeholder="Select a reviewer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                  <SelectItem value="Jamik Tashpulatov">
                    Jamik Tashpulatov
                  </SelectItem>
                  <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}