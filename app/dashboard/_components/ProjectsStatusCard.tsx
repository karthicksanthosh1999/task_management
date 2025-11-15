"use client";
import BarChart from "@/components/charts/ColumnBarChart";
import DonutChart from "@/components/charts/DonetChart";
import WorkStatusLineChart from "@/components/charts/LineChart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import SkeletonWrapper from "@/lib/sklitonWrapper";
import { isoDateFormatForChart } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

interface IChartStatus {
  completed: string;
  day: string;
  pending: string;
  planning: string;
  progress: string;
}

const ProjectsStatusCard = () => {
  const [projectStatusDonutChart, setProjectStatusDonutChart] = useState<{
    labels: string[];
    series: number[];
  }>();
  const [completedTaskMonthlyCount, setCompletedTaskMonthlyCount] = useState<{
    categories: string[];
    series: number[];
  }>();
  const [categories, setCategories] = useState<string[]>([]);
  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/projects/project-state`)
      .then((res) => {
        setProjectStatusDonutChart(res.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/work/completed-task-chart`)
      .then((res) => {
        setCompletedTaskMonthlyCount(res.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/api/work/daily-status-chart")
      .then((res) => {
        let data = res.data?.data;
        console.log(data);
        const dates = data.map((d: IChartStatus) =>
          isoDateFormatForChart(new Date(d.day))
        );
        setCategories(dates);

        setSeries([
          {
            name: "Completed",
            data: data.map((d: IChartStatus) => d.completed),
          },
          { name: "Pending", data: data.map((d: IChartStatus) => d.pending) },
          { name: "Planning", data: data.map((d: IChartStatus) => d.planning) },
          { name: "Progress", data: data.map((d: IChartStatus) => d.progress) },
        ]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Project Status */}
        <div>
          <Card className="h-[450px]">
            <CardContent>
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>Projects status card</CardDescription>
              </CardHeader>
              <Separator className="my-2" />

              {projectStatusDonutChart && (
                <SkeletonWrapper isLoading={loading}>
                  <DonutChart
                    labels={projectStatusDonutChart.labels}
                    series={projectStatusDonutChart.series}
                  />
                </SkeletonWrapper>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Completed Tasks (Bar Chart) */}
        <div>
          <Card className="h-[450px]">
            <CardContent>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
                <CardDescription>
                  Completed tasks monthly wise card
                </CardDescription>
              </CardHeader>

              <Separator className="my-2" />

              {completedTaskMonthlyCount && (
                <BarChart
                  categories={completedTaskMonthlyCount.categories}
                  data={completedTaskMonthlyCount.series}
                />
              )}
            </CardContent>
          </Card>
        </div>

        {/* Work Status Line Chart (big one) */}
        <div className="lg:col-span-2 col-span-1">
          <Card className="h-[450px]">
            <CardContent>
              <CardHeader>
                <CardTitle>Completed Tasks</CardTitle>
                <CardDescription>
                  Completed tasks monthly wise card
                </CardDescription>
              </CardHeader>

              <Separator className="my-2" />

              {series && categories && (
                <WorkStatusLineChart categories={categories} series={series} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProjectsStatusCard;
