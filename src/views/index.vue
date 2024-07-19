<template>
    <div>
      <ul class="flex space-x-2 rtl:space-x-reverse">
        <li>
          <a href="javascript:;" class="text-primary hover:underline">Dashboard</a>
        </li>
        <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
          <span>Sinh viên vắng</span>
        </li>
      </ul>
      <h1 style="text-align: center">Thống kê sinh viên vắng theo lớp</h1>
  
      <div class="centered">
        <label for="date">Ngày:</label>
        <input type="date" id="date" v-model="selectedDate" />
        <button @click="loadChart">Tải lại dữ liệu</button>
      </div>
      <div class="chart-container">
        <canvas id="barChart"></canvas>
      </div>
      
      <div v-if="absentStudents.length > 0">
        <br>
        <h2 style="text-align: center;">Danh sách sinh viên vắng</h2>
        <table>
          <thead>
            <tr>
              <th>Họ và tên</th>
              <th>Mã sinh viên</th>
              <th>Khóa</th>
              <th>Lớp</th>
              <th>Ngày vắng</th>
              <th>Số buổi vắng</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="student in absentStudents" :key="student.id">
              <td>{{ student.full_name }}</td>
              <td>{{ student.student_code }}</td>
              <td>{{ student.student_cohort_id[1] }}</td>
              <td>{{ student.student_class_id[1] }}</td>
  
              <td>{{ student.date_absent }}</td>
              <td>{{ student.number_lesson_absent }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController } from 'chart.js';
  
  Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, BarController);
  
  export default {
    name: 'BarChart',
    data() {
      return {
        absentStudents: [],
        selectedDate: new Date().toISOString().split('T')[0], 
        chart: null, 
      };
    },
    methods: {
      async loadChart() {
        const [year, month, day] = this.selectedDate.split('-').map(Number);
        try {
          const response = await this.fetchAbsentData(day, month, year);
          const data = response?.data;
          if (data) {
            this.createBarChart(data);
          } else {
            console.error('No data returned from API');
          }
        } catch (error) {
          console.error('Error loading chart data:', error);
        }
      },
      async fetchAbsentData(day, month, year) {
        try {
          const response = await axios.post('https://fw-226-8099.toiyeuptit.com/dashboard/sinh-vien-vang/lop', {
            day: day,
            month: month,
            year: year,
          });
          return response.data;
        } catch (error) {
          console.error('Error:', error);
          return null;
        }
      },
      async fetchAbsentStudents(classId) {
        try {
          const response = await axios.get(`https://fw-226-8099.toiyeuptit.com/danh-sach-sinh-vien-vang/${classId}`);
          return response.data;
        } catch (error) {
          console.error('Error:', error);
          return null;
        }
      },
      createBarChart(data) {
        if (!data || !data.student_class_absent || !data.list_color) {
          console.error('data:', data);
          return;
        }
  
        const ctx = document.getElementById('barChart').getContext('2d');
  
        if (this.chart) {
          this.chart.destroy();
        }
  
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: data.student_class_absent.map((item) => item.class_name),
            datasets: [
              {
                label: 'Số SV vắng',
                data: data.student_class_absent.map((item) => item.number_absent),
                backgroundColor: data.list_color,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const index = tooltipItem.dataIndex;
                    return `Số SV vắng: ${data.student_class_absent[index].number_absent}`;
                  },
                },
              },
              legend: {
                display: true,
              },
            },
            scales: {
              x: {
                beginAtZero: true,
              },
            },
            onClick: async (event, elements) => {
              if (elements.length > 0) {
                const index = elements[0].index;
                const id = data.student_class_absent[index].id;
                const absentStudents = await this.fetchAbsentStudents(id);
                if (absentStudents && absentStudents.data) {
                  this.absentStudents = absentStudents.data.student_absent_ids; 
                } else {
                  console.error('No data');
                  this.absentStudents = [];
                }
              }
            },
          },
        });
      },
    },
    mounted() {
      this.loadChart();
    },
  };
  </script>
  
  <style scoped>
  .chart-container {
    width: 50%;
    margin: 0 auto;
  }
  canvas {
    width: 100% !important;
    height: 300px !important;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  table,
  th,
  td {
    border: 1px solid #ddd;
  }
  th,
  td {
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  input[type='date'] {
    margin: 0 10px;
    padding: 5px;
    width: 150px;
  }
  
  button {
    padding: 5px 10px;
    margin-top: 10px;
  }
  .centered {
    text-align: center; 
  }
  
  .centered label,
  .centered input,
  .centered button {
    display: inline-block; 
    margin: 0 5px; 
  }
  </style>
  
