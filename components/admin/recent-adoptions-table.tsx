import Image from "next/image"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Adoption {
  _id: string
  status: string
  updatedAt: string
  pet: {
    name: string
    type: string
    breed: string
    imageUrl: string
  }[]
  user: {
    name: string
    email: string
  }[]
}

export default function RecentAdoptionsTable({ adoptions }: { adoptions: Adoption[] }) {
  if (!adoptions || adoptions.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
        <p className="text-sm text-gray-500">No recent adoptions found</p>
      </div>
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Pet</TableHead>
          <TableHead>Adopter</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {adoptions.map((adoption) => {
          const pet = adoption.pet[0]
          const user = adoption.user[0]

          return (
            <TableRow key={adoption._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 overflow-hidden rounded-md">
                    <Image
                      src={pet?.imageUrl || "/placeholder.svg?height=40&width=40"}
                      alt={pet?.name || "Pet"}
                      width={40}
                      height={40}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium">{pet?.name || "Unknown"}</p>
                    <p className="text-xs text-gray-500">
                      {pet?.breed || "Unknown"} {pet?.type || ""}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <p className="font-medium">{user?.name || "Unknown"}</p>
                <p className="text-xs text-gray-500">{user?.email || ""}</p>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">
                  {adoption.status}
                </Badge>
              </TableCell>
              <TableCell>
                {adoption.updatedAt
                  ? formatDistanceToNow(new Date(adoption.updatedAt), { addSuffix: true })
                  : "Unknown"}
              </TableCell>
              <TableCell className="text-right">
                <Link
                  href={`/admin/applications/${adoption._id}`}
                  className="text-sm font-medium text-rose-600 hover:text-rose-500"
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
