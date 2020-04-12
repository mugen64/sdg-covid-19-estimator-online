<template>
  <div class="app">
    <header class="app__bar">
      <h1 class="app__title">
        <span class="covid19">COVID-19</span>
        <span class="text--secondary font-weight--4h">Estimator</span>
      </h1>
    </header>
    <main class="app__content">
      <nuxt />
    </main>
    <footer class="app__footer">
      <p>
        Created For
        <span class="font-weight--bold">#BuildForSDG Challenge 2020</span>
      </p>
      <p>
        Copyright &copy; {{ years }}
        <a
          href="https://github.com/mugen64"
          target="_blank"
          rel="noopener noreferrer"
          >Faridah Namutebi</a
        >
      </p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  },
  computed: {
    years() {
      if (this.year <= 2020) return `${this.year}`;
      return `2020 - ${this.year}`;
    }
  }
};
</script>
<style lang="scss">
.covid19 {
  font-size: 1.75rem;
  color: $white;
}
footer {
  p {
    margin-bottom: 0.5rem;
    text-align: center;
  }
}
</style>
