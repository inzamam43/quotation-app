import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const stats = [
  {
    title: "Total Quotations",
    value: "156",
    icon: FileText,
    change: "+12%",
    trend: "up",
  },
  {
    title: "Pending Quotations",
    value: "23",
    icon: Clock,
    change: "+5%",
    trend: "up",
  },
  {
    title: "Accepted Quotations",
    value: "98",
    icon: CheckCircle,
    change: "+18%",
    trend: "up",
  },
  {
    title: "Rejected Quotations",
    value: "35",
    icon: XCircle,
    change: "-8%",
    trend: "down",
  },
];

const revenueStats = [
  { title: "Weekly Revenue", value: "$12,450", icon: TrendingUp },
  { title: "Monthly Revenue", value: "$48,250", icon: DollarSign },
  { title: "Yearly Revenue", value: "$524,800", icon: TrendingUp },
];

const weeklyData = [
  { name: "Mon", revenue: 1200 },
  { name: "Tue", revenue: 1900 },
  { name: "Wed", revenue: 1600 },
  { name: "Thu", revenue: 2400 },
  { name: "Fri", revenue: 2200 },
  { name: "Sat", revenue: 1800 },
  { name: "Sun", revenue: 1350 },
];

const monthlyData = [
  { name: "Jan", revenue: 42000 },
  { name: "Feb", revenue: 38000 },
  { name: "Mar", revenue: 45000 },
  { name: "Apr", revenue: 48000 },
  { name: "May", revenue: 51000 },
  { name: "Jun", revenue: 48250 },
];

const recentQuotations = [
  {
    id: "QT-2024-001",
    customer: "John Smith",
    amount: "$2,450",
    status: "Accepted",
    date: "2024-02-20",
  },
  {
    id: "QT-2024-002",
    customer: "Sarah Johnson",
    amount: "$3,200",
    status: "Pending",
    date: "2024-02-21",
  },
  {
    id: "QT-2024-003",
    customer: "Mike Brown",
    amount: "$1,850",
    status: "Accepted",
    date: "2024-02-21",
  },
  {
    id: "QT-2024-004",
    customer: "Emily Davis",
    amount: "$4,100",
    status: "Sent",
    date: "2024-02-22",
  },
  {
    id: "QT-2024-005",
    customer: "David Wilson",
    amount: "$2,750",
    status: "Rejected",
    date: "2024-02-22",
  },
];

const getStatusBadge = (status: string) => {
  const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
    Accepted: "default",
    Pending: "secondary",
    Sent: "outline",
    Rejected: "destructive",
  };
  return (
    <Badge variant={variants[status] || "default"} className="capitalize">
      {status}
    </Badge>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1>Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's your business overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                    <p
                      className={`text-sm mt-2 ${
                        stat.trend === "up"
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {revenueStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6", r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Quotations */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Quotations</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Quotation ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentQuotations.map((quotation) => (
                <TableRow key={quotation.id}>
                  <TableCell className="font-medium">{quotation.id}</TableCell>
                  <TableCell>{quotation.customer}</TableCell>
                  <TableCell>{quotation.amount}</TableCell>
                  <TableCell>{getStatusBadge(quotation.status)}</TableCell>
                  <TableCell>{quotation.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
