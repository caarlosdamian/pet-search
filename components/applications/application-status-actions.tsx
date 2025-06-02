"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Clock, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ApplicationStatusActionsProps {
  currentStatus: string
  onStatusUpdate: (status: string) => Promise<void>
  isUpdating: boolean
}

export default function ApplicationStatusActions({
  currentStatus,
  onStatusUpdate,
  isUpdating,
}: ApplicationStatusActionsProps) {
  const actions = [
    {
      status: "pending",
      label: "Mark as Pending",
      icon: Clock,
      variant: "outline" as const,
      description: "Move this application back to pending status.",
    },
    {
      status: "approved",
      label: "Approve Application",
      icon: CheckCircle,
      variant: "default" as const,
      description: "Approve this adoption application. The applicant will be notified.",
    },
    {
      status: "rejected",
      label: "Reject Application",
      icon: XCircle,
      variant: "destructive" as const,
      description: "Reject this adoption application. The applicant will be notified.",
    },
  ]

  return (
    <div className="space-y-3">
      {actions.map((action) => {
        const Icon = action.icon
        const isCurrentStatus = currentStatus === action.status
        const isDisabled = isCurrentStatus || isUpdating

        return (
          <AlertDialog key={action.status}>
            <AlertDialogTrigger asChild>
              <Button variant={action.variant} className="w-full justify-start" disabled={isDisabled}>
                {isUpdating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Icon className="mr-2 h-4 w-4" />}
                {action.label}
                {isCurrentStatus && " (Current)"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {action.status === "approved" && "Approve Application"}
                  {action.status === "rejected" && "Reject Application"}
                  {action.status === "pending" && "Mark as Pending"}
                </AlertDialogTitle>
                <AlertDialogDescription>{action.description}</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onStatusUpdate(action.status)}
                  className={
                    action.variant === "destructive"
                      ? "bg-red-600 hover:bg-red-700"
                      : action.variant === "default"
                        ? "bg-green-600 hover:bg-green-700"
                        : ""
                  }
                >
                  Confirm
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )
      })}
    </div>
  )
}
