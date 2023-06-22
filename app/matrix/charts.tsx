"use client"
import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import * as d3 from 'd3';

export default function ChartsPage() {
  useEffect(() => {
    // Stacked Bar Chart
    const completedCount = 50;
    const pendingCount = 30;
    const totalCount = completedCount + pendingCount;

    const stackedBarChartCtx = document.getElementById('stackedBarChart').getContext('2d');
    const myChart1 = new Chart(stackedBarChartCtx, {
      type: 'bar',
      data: {
        labels: ['Completed', 'Pending', 'Total'],
        datasets: [
          {
            label: 'Tasks',
            data: [completedCount, pendingCount, totalCount],
            backgroundColor: ['green', 'orange', 'blue'],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { stacked: true },
          y: { stacked: true },
        },
      },
    });

    // Line Chart
    const count1 = 10;
    const count2 = 20;
    const count3 = 15;

    const lineChartCtx = document.getElementById('lineChart').getContext('2d');
    const myChart2 = new Chart(lineChartCtx, {
      type: 'line',
      data: {
        labels: ['Date1', 'Date2', 'Date3'],
        datasets: [
          {
            label: 'Completed Todos',
            data: [count1, count2, count3],
            borderColor: 'green',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: { display: true },
          y: { display: true },
        },
      },
    });

    // Pie Chart
    const lowCount = 20;
    const mediumCount = 15;
    const highCount = 10;

    const pieChartCtx = document.getElementById('pieChart').getContext('2d');
    const myChart3 = new Chart(pieChartCtx, {
      type: 'pie',
      data: {
        labels: ['Low', 'Medium', 'High'],
        datasets: [
          {
            label: 'Priority',
            data: [lowCount, mediumCount, highCount],
            backgroundColor: ['green', 'orange', 'red'],
          },
        ],
      },
      options: {
        responsive: true,
      },
    });

    // Gantt Chart
    const ganttChartData = [
      { start: new Date('2023-06-01'), end: new Date('2023-06-05') },
      { start: new Date('2023-06-08'), end: new Date('2023-06-12') },
      // Add more data objects here
    ];

    const ganttChartWidth = 100;
    const ganttChartHeight = 100;

    const ganttXScale = d3.scaleTime()
      .domain([new Date('2023-06-01'), new Date('2023-06-30')]) // Adjust the domain based on your date range
      .range([0, ganttChartWidth]);

    const ganttYScale = d3.scaleBand()
      .domain(d3.range(ganttChartData.length))
      .range([0, ganttChartHeight])
      .padding(0.1);

    const ganttSvg = d3.select('#ganttChart');

    ganttSvg.selectAll('rect')
      .data(ganttChartData)
      .enter()
      .append('rect')
      .attr('x', (d) => ganttXScale(d.start))
      .attr('y', (d, i) => ganttYScale(i))
      .attr('width', (d) => ganttXScale(d.end) - ganttXScale(d.start))
      .attr('height', ganttYScale.bandwidth())
      .attr('fill', 'steelblue');
return () => {
    // Destroy chart 1
    myChart1.destroy();
    myChart2.destroy();
    myChart3.destroy();


  };
  }, []);

  return (
    <div>
      <canvas id="stackedBarChart" width="100" height="50"></canvas>
      <canvas id="lineChart" width="100" height="50"></canvas>
      <canvas id="pieChart" width="400" height="200"></canvas>
      <svg id="ganttChart" width="400" height="200"></svg>
    </div>
  );
}

