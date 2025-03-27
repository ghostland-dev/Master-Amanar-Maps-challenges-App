
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { ChartContainer } from "./chart-container";
import { ChartTooltip } from "./chart-tooltip";
import { ChartConfig } from "./types";

export const PieChart = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ChartContainer> & {
    data: any[];
    index: string;
    category: string;
    colors?: string[];
    valueFormatter?: (value: string | number) => string;
    showLegend?: boolean;
  }
>(({ data, index, category, colors = ["#2563eb", "#4ade80", "#f97316", "#f43f5e"], valueFormatter, showLegend = true, ...props }, ref) => {
  const config: ChartConfig = React.useMemo(() => {
    return data.reduce<ChartConfig>((acc, item, i) => {
      acc[item[index]] = { color: colors[i % colors.length], label: item[index] };
      return acc;
    }, {});
  }, [data, index, colors]);

  return (
    <ChartContainer ref={ref} config={config} {...props}>
      <RechartsPrimitive.PieChart>
        <RechartsPrimitive.Pie
          data={data}
          dataKey={category}
          nameKey={index}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
        >
          {data.map((entry, i) => (
            <RechartsPrimitive.Cell
              key={`cell-${i}`}
              fill={colors[i % colors.length]}
            />
          ))}
        </RechartsPrimitive.Pie>
        <ChartTooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const [item] = payload;
            return (
              <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {valueFormatter ? valueFormatter(item.value as string | number) : item.value}
                  </div>
                </div>
              </div>
            );
          }}
        />
        {showLegend && <RechartsPrimitive.Legend />}
      </RechartsPrimitive.PieChart>
    </ChartContainer>
  );
});
PieChart.displayName = "PieChart";
