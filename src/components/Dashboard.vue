<template>
  <div id="dashboard" v-show="queryName && dataProfile.login && dataDashboard && !loading">
    <h3 id="dashboardTitle">
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

<style lang="scss" scoped>
@keyframes fadeInAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#dashboard {
  display: flex;
  flex-direction: column;
  margin: auto 0;
  height: 25rem;
  width: 45rem;
  align-items: center;
  opacity: 0;
  animation: fadeInAnimation 1.3s ease-in-out forwards;
  color: $white;

  #dashboardTitle {
    margin: 0 0 auto 0;
    color: $white;
    font-size: 1.5rem;
  }

  #dashboardChart {
    height: 25rem;
    width: 25rem;
  }
}

@media screen and (max-width: 1006px) {
  #dashboard {
    margin: 0 auto;
    height: 48vw;
    min-width: 20rem;
    width: 70vw;
  }
}

@media screen and (max-width: 997px) {
  #dashboard {
    height: 20rem;
    width: 65vw;
  }
}

@media screen and (max-width: 768px) {
  #dashboard {
    width: 87vw;
  }
}
</style>
