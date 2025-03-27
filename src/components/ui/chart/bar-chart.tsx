
import * as React from "react";
import * as RechartsPrimitive from "recharts";
import { ChartContainer } from "./chart-container";
import { ChartTooltip } from "./chart-tooltip";
import { ChartConfig } from "./types";

export interface BarChartProps {
  data: any[];
  index: string;
  categories: string[];
  colors?: string[];
  valueFormatter?: (value: string | number) => string;
  showLegend?: boolean;
  className?: string;
}

export const BarChart = React.forwardRef<HTMLDivElement, BarChartProps>((
  { 
    data, 
    index, 
    categories, 
    colors = ["#2563eb"], 
    valueFormatter, 
    showLegend = true,
    className,
  }, 
  ref
) => {
  const config: ChartConfig = React.useMemo(() => {
    return categories.reduce<ChartConfig>((acc, category, i) => {
      acc[category] = { color: colors[i % colors.length] };
      return acc;
    }, {});
  }, [categories, colors]);

  return (
    <ChartContainer 
      ref={ref} 
      config={config} 
      className={className}
    >
      {({ chartId }) => (
        <RechartsPrimitive.BarChart data={data}>
          <RechartsPrimitive.XAxis dataKey={index} />
          <RechartsPrimitive.YAxis />
          <RechartsPrimitive.CartesianGrid strokeDasharray="3 3" />
          <ChartTooltip
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid gap-2">
                    <div className="font-semibold">{label}</div>
                    <div className="grid gap-1">
                      {payload.map((item: any, i: number) => (
                        <div key={i} className="flex items-center gap-2">
                          <div
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {item.name}:
                          </span>
                          <span className="font-medium">
                            {valueFormatter ? valueFormatter(item.value) : item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }}
          />
          {showLegend && <RechartsPrimitive.Legend />}
          {categories.map((category, i) => (
            <RechartsPrimitive.Bar
              key={category}
              dataKey={category}
              fill={colors[i % colors.length]}
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsPrimitive.BarChart>
      )}
    </ChartContainer>
  );
});
BarChart.displayName = "BarChart";
