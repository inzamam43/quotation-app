import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Send, RefreshCw, Download, Mail, MessageCircle } from "lucide-react";
import { toast } from "sonner";

interface WorkQueueItem {
  id: string;
  customerName: string;
  amount: string;
  status: "Pending" | "Sent" | "Accepted" | "Failed";
  sendMethod: "Email" | "WhatsApp";
  date: string;
}

const mockData: WorkQueueItem[] = [
  {
    id: "QT-2024-001",
    customerName: "John Smith",
    amount: "$2,450",
    status: "Sent",
    sendMethod: "Email",
    date: "2024-02-20",
  },
  {
    id: "QT-2024-002",
    customerName: "Sarah Johnson",
    amount: "$3,200",
    status: "Pending",
    sendMethod: "WhatsApp",
    date: "2024-02-21",
  },
  {
    id: "QT-2024-003",
    customerName: "Mike Brown",
    amount: "$1,850",
    status: "Accepted",
    sendMethod: "Email",
    date: "2024-02-21",
  },
  {
    id: "QT-2024-004",
    customerName: "Emily Davis",
    amount: "$4,100",
    status: "Sent",
    sendMethod: "WhatsApp",
    date: "2024-02-22",
  },
  {
    id: "QT-2024-005",
    customerName: "David Wilson",
    amount: "$2,750",
    status: "Failed",
    sendMethod: "Email",
    date: "2024-02-22",
  },
  {
    id: "QT-2024-006",
    customerName: "Lisa Anderson",
    amount: "$5,600",
    status: "Pending",
    sendMethod: "Email",
    date: "2024-02-22",
  },
  {
    id: "QT-2024-007",
    customerName: "Tom Martinez",
    amount: "$3,900",
    status: "Accepted",
    sendMethod: "WhatsApp",
    date: "2024-02-22",
  },
  {
    id: "QT-2024-008",
    customerName: "Rachel Green",
    amount: "$2,150",
    status: "Failed",
    sendMethod: "WhatsApp",
    date: "2024-02-22",
  },
];

export default function WorkQueue() {
  const [filter, setFilter] = useState<string>("all");
  const [data, setData] = useState<WorkQueueItem[]>(mockData);

  const filteredData =
    filter === "all"
      ? data
      : data.filter((item) => item.status.toLowerCase() === filter);

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      { variant: "default" | "secondary" | "destructive" | "outline"; color?: string }
    > = {
      Accepted: { variant: "default" },
      Pending: { variant: "secondary" },
      Sent: { variant: "outline" },
      Failed: { variant: "destructive" },
    };
    const config = variants[status] || { variant: "default" };
    return (
      <Badge variant={config.variant} className="capitalize">
        {status}
      </Badge>
    );
  };

  const handleSend = (id: string) => {
    toast.success(`Quotation ${id} sent successfully!`);
    setData(
      data.map((item) =>
        item.id === id ? { ...item, status: "Sent" as const } : item
      )
    );
  };

  const handleRetry = (id: string) => {
    toast.success(`Retrying quotation ${id}...`);
    setData(
      data.map((item) =>
        item.id === id ? { ...item, status: "Pending" as const } : item
      )
    );
  };

  const handleDownload = (id: string) => {
    toast.success(`Downloading quotation ${id}...`);
  };

  const getStatusCount = (status: string) => {
    if (status === "all") return data.length;
    return data.filter((item) => item.status.toLowerCase() === status).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Work Queue</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and track your quotation deliveries
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All ({getStatusCount("all")})</SelectItem>
            <SelectItem value="pending">
              Pending ({getStatusCount("pending")})
            </SelectItem>
            <SelectItem value="sent">Sent ({getStatusCount("sent")})</SelectItem>
            <SelectItem value="accepted">
              Accepted ({getStatusCount("accepted")})
            </SelectItem>
            <SelectItem value="failed">
              Failed ({getStatusCount("failed")})
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{getStatusCount("all")}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">
              {getStatusCount("pending")}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Pending
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {getStatusCount("accepted")}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Accepted
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">
              {getStatusCount("failed")}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Failed
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Work Queue Table */}
      <Card>
        <CardHeader>
          <CardTitle>Quotation Queue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quotation ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Send Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">
                        No quotations found
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.customerName}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {item.sendMethod === "Email" ? (
                            <Mail className="h-4 w-4 text-blue-600" />
                          ) : (
                            <MessageCircle className="h-4 w-4 text-green-600" />
                          )}
                          <span>{item.sendMethod}</span>
                        </div>
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          {item.status === "Pending" && (
                            <Button
                              size="sm"
                              variant="default"
                              onClick={() => handleSend(item.id)}
                            >
                              <Send className="h-3 w-3 mr-1" />
                              Send
                            </Button>
                          )}
                          {item.status === "Failed" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRetry(item.id)}
                            >
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Retry
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDownload(item.id)}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
