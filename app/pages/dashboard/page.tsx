"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDateRangePicker } from "@/app/constants/date-range-picker";
import Overview from "@/app/constants/overview";
import { RecentSales } from "@/app/constants/recent-sales";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { ProductsTable } from "@/app/constants/products";


export default function DashboardPage() {
  return (
    <>
      <div className=" flex-col md:flex-row ">
        <div className="flex-1 space-y-4 p-2 md:p-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex flex-col md:flex-row items-center space-x-2">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
          <Tabs defaultValue="overview" className="  space-y-4">
            <TabsList className="*:px-2 *:py-1 justify-between rounded-lg *:border ">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-2 md:col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Recent Sales</CardTitle>
                    <CardDescription>
                      You made 265 sales this month.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RecentSales />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="products" className="space-y-4">
              <ProductsTable />
            </TabsContent>
            <TabsContent value="reports" className="space-y-4">
              Coming Soon
            </TabsContent>
            <TabsContent value="orders" className="space-y-4">
            orders coming soon
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
