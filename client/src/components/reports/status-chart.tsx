import { IssuesByDate } from "src/types";
import { BarChart, XAxis, Bar } from "recharts";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "src/components/ui/chart";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const chartConfig: any = {
    backlog: {
        label: "Backlog",
    },
    todo: {
        label: "To Do",
    },
    "in progress": {
        label: "In Progress",
    },
    done: {
        label: "Done",
    },
    canceled: {
        label: "Canceled",
    },
} satisfies ChartConfig;

export function StatusChart({ data }: { data: IssuesByDate[] }) {
    const [active, setActive] = useState("todo");
    const preparedData = data.map((item) => ({
        date: item.date,
        backlog: item.counts.status.backlog,
        "in progress": item.counts.status["in progress"],
        todo: item.counts.status.todo,
        done: item.counts.status.done,
        canceled: item.counts.status.canceled,
        low: item.counts.priority.low,
        medium: item.counts.priority.medium,
        high: item.counts.priority.high,
    }));
    return (
        <div className="bg-white py-5 px-6 rounded-lg border border-border shadow-sm space-y-3 md:space-y-4">
            <div className="flex flex-col gap-4 md:gap-2 md:flex-row md:items-center md:justify-between">
                <h1 className="text-xl leading-tight flex justify-between md:justify-normal items-center gap-4">
                    <span>Issues status</span>
                </h1>
                <Select
                    value={active}
                    onValueChange={(value) => {
                        setActive(value);
                    }}
                >
                    <SelectTrigger className="w-[140px] h-8">
                        <SelectValue placeholder={active} />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(chartConfig).map((key) => (
                            <SelectItem key={key} value={key}>
                                {chartConfig[key].label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <ChartContainer
                config={chartConfig}
                className="aspect-auto h-[250px] w-full"
            >
                <BarChart
                    accessibilityLayer
                    data={preparedData}
                    margin={{
                        left: 12,
                        right: 12,
                        top: 12,
                        bottom: 12,
                    }}
                >
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={(value) => {
                            const date = new Date(value);
                            return date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                            });
                        }}
                    />
                    <ChartTooltip
                        content={
                            <ChartTooltipContent
                                className="w-[150px]"
                                labelFormatter={(value) => {
                                    return new Date(value).toLocaleDateString(
                                        "en-US",
                                        {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric",
                                        }
                                    );
                                }}
                            />
                        }
                    />
                    <Bar dataKey={active} fill="#0C4A6E" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
