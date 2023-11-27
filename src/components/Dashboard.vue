<template>
  <div class="flex flex-col my-auto max-lg:mx-auto h-[25rem] max-mb:h-[17rem] max-lg:h-[15rem] w-[100%] lg:w-[45rem] items-center opacity-0 animate-fadeIn text-white" v-show="queryName && dataProfile.login && dataDashboard && !loading">
    <h3 class="mb-auto text-white text-2xl">
      {{ this.dataProfile.login }}'s Contribution Graph
    </h3>
    <canvas id="dashboardChart"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import moment from "moment";

export default {
  name: "Dashboard",
  data() {
    return {
      today: moment(),
      data: {
        contribution: [],
        month_day: [],
      },
      chart: null,
    };
  },
  methods: {
    getContribution() {
      const dataDashboard = this.dataDashboard;
      
      const contributions = Object.values(dataDashboard).map((item) => moment(item.created_at).format("MMM D"));

      const contributionCount = this.data.month_day.map((day) => {
        let count = 0;
        contributions.forEach((contribution) => {
          if (contribution === day) {
            count++;
          }
        });
        return count;
      });

      this.data.contribution = contributionCount;

      return this.data.contribution;
    },
    getMonthsAndDate() {
      const dates = [this.today];

      for (let i = 1; i < 7; i++) {
        dates.push(moment(this.today).subtract(i * 1, "days"));
      }

      const months = dates.map((date) => moment(date).format("MMM D"));
      this.data.month_day = months.reverse();

      return this.data.month_day;
    },
    generateChartData() {
      return {
        labels: this.getMonthsAndDate(),
        datasets: [
          {
            data: this.getContribution(),
            borderColor: "#2ecc71",
            borderWidth: 1,
          },
        ],
      };
    },
    createChart() {
      const ctx = document.getElementById("dashboardChart");
      
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(ctx, {
        type: "line",
        data: this.generateChartData(),
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    },
  },
  props: {
    queryName: String,
    dataProfile: Object,
    dataDashboard: Array,
    loading: Boolean,
  },
  watch: {
    dataDashboard: {
      handler: "createChart",
      immediate: true,
    },
  },
  emits: ["getProfileData"],
  mounted() {
    this.createChart();
  },
};
</script>