import React, { useEffect, useMemo, useRef, useState } from "react";
import cx from "classnames";
import ChartPrimitive, {
  ChartData,
  ChartOptions,
  ChartType,
} from "chart.js/auto";
import styles from "./Chart.module.css";
import { Button } from "antd";
import { customCanvasBackgroundColor } from "../lib/customCanvasBackgroundColor";

interface ChartProps {
  data: ChartData | null;
  className?: string;
  options?: ChartOptions;
  type: ChartType;
  loading?: boolean;
}

export const Chart = ({
  data,
  className,
  options,
  type,
  loading,
}: ChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<ChartPrimitive | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.font = `500 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`;
        if (!data) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.fillStyle = "rgba(0,0,0,0.45)";
          ctx.fillText(
            "Loading...",
            ctx.canvas.width / 2 - 100,
            ctx.canvas.height / 2 - 12,
            200
          );
          return;
        }
        if (!data.datasets.length) {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.fillStyle = "rgba(0,0,0,0.45)";
          ctx.fillText(
            "No data to display",
            ctx.canvas.width / 2 - 150,
            ctx.canvas.height / 2 - 12,
            300
          );
          return;
        }
        chartRef.current = new ChartPrimitive(ctx, {
          type,
          plugins: [customCanvasBackgroundColor],
          options: {
            ...options,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              ...options?.plugins,
              [customCanvasBackgroundColor.id]: {
                color: "#fff",
              },
            },
          },

          data,
        });
      }
    }
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [data, options, type]);

  return (
    <>
      <canvas
        width={760}
        height={275}
        className={cx(styles.Chart, className)}
        ref={canvasRef}
      />
        <Button
          className={styles.Chart__pngButton}
          onClick={() => {
            if (canvasRef.current) {
              canvasRef.current.toBlob((blob) => {
                if (!blob) return;
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `top_history.png`;
                a.click();
              }, "image/png");
            }
          }}
          disabled={!canvasRef.current}
        >
          PNG
        </Button>
    </>
  );
};
