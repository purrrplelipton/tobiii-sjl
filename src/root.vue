<template>
  <header />
  <div class="wrapper">
    <div class="selected-filters" v-if="selectedFilters.length">
      <div>
        <template v-for="(tag, i) in selectedFilters" :key="`${tag}-${i}`">
          <div>
            <span v-html="tag" />
            <button type="button" @click="removeFilter(tag)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </button>
          </div>
        </template>
      </div>
      <button type="button" @click="clearSelectedFilters">
        <span>clear</span>
      </button>
    </div>
    <ul>
      <template
        v-for="(
          {
            id,
            company,
            logo,
            new: isNew,
            featured,
            position,
            role,
            level,
            postedAt,
            contract,
            location,
            languages,
            tools,
          },
          i
        ) in filteredJobs"
        :key="`${id}_${i}`"
      >
        <li :data-featured="featured" :id="`#${position.replace(/\W/gu, '-')}`">
          <div>
            <div class="company-logo">
              <div>
                <img :src="logo" :alt="`${company}'s logo`" />
              </div>
            </div>
            <div>
              <div>
                <p v-html="company" />
                <div>
                  <span v-if="isNew">NEW!</span>
                  <span v-if="featured">FEATURED</span>
                </div>
              </div>
              <a
                :href="`#${position.replace(/\W/gu, '-')}`"
                target="_blank"
                rel="noopener noreferrer"
                v-html="position"
              />
              <div>
                <template
                  v-for="(detail, i) in [postedAt, contract, location]"
                  :key="`${detail}-${i}`"
                >
                  <span v-html="detail" />
                </template>
              </div>
            </div>
          </div>
          <hr />
          <div class="filter-tags">
            <template
              v-for="(req, i) in [role, level, ...languages, ...tools]"
              :key="`${req}-${i}`"
            >
              <button type="button" @click="selectFilter(req)">
                <span v-html="req" />
              </button>
            </template>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RootComponent",
  data() {
    return {
      selectedFilters: [],
      jobs: [
        {
          id: 1,
          company: "Photosnap",
          logo: "/company-logos/photosnap.svg",
          new: true,
          featured: true,
          position: "Senior Frontend Developer",
          role: "Frontend",
          level: "Senior",
          postedAt: "1d ago",
          contract: "Full Time",
          location: "USA Only",
          languages: ["HTML", "CSS", "JavaScript"],
          tools: [],
        },
        {
          id: 2,
          company: "Manage",
          logo: "/company-logos/manage.svg",
          new: true,
          featured: true,
          position: "Fullstack Developer",
          role: "Fullstack",
          level: "Midweight",
          postedAt: "1d ago",
          contract: "Part Time",
          location: "Remote",
          languages: ["Python"],
          tools: ["React"],
        },
        {
          id: 3,
          company: "Account",
          logo: "/company-logos/account.svg",
          new: true,
          featured: false,
          position: "Junior Frontend Developer",
          role: "Frontend",
          level: "Junior",
          postedAt: "2d ago",
          contract: "Part Time",
          location: "USA Only",
          languages: ["JavaScript"],
          tools: ["React", "Sass"],
        },
        {
          id: 4,
          company: "MyHome",
          logo: "/company-logos/myhome.svg",
          new: false,
          featured: false,
          position: "Junior Frontend Developer",
          role: "Frontend",
          level: "Junior",
          postedAt: "5d ago",
          contract: "Contract",
          location: "USA Only",
          languages: ["CSS", "JavaScript"],
          tools: [],
        },
        {
          id: 5,
          company: "Loop Studios",
          logo: "/company-logos/loop-studios.svg",
          new: false,
          featured: false,
          position: "Software Engineer",
          role: "Fullstack",
          level: "Midweight",
          postedAt: "1w ago",
          contract: "Full Time",
          location: "Worldwide",
          languages: ["JavaScript"],
          tools: ["Ruby", "Sass"],
        },
        {
          id: 6,
          company: "FaceIt",
          logo: "/company-logos/faceit.svg",
          new: false,
          featured: false,
          position: "Junior Backend Developer",
          role: "Backend",
          level: "Junior",
          postedAt: "2w ago",
          contract: "Full Time",
          location: "UK Only",
          languages: ["Ruby"],
          tools: ["RoR"],
        },
        {
          id: 7,
          company: "Shortly",
          logo: "/company-logos/shortly.svg",
          new: false,
          featured: false,
          position: "Junior Developer",
          role: "Frontend",
          level: "Junior",
          postedAt: "2w ago",
          contract: "Full Time",
          location: "Worldwide",
          languages: ["HTML", "JavaScript"],
          tools: ["Sass"],
        },
        {
          id: 8,
          company: "Insure",
          logo: "/company-logos/insure.svg",
          new: false,
          featured: false,
          position: "Junior Frontend Developer",
          role: "Frontend",
          level: "Junior",
          postedAt: "2w ago",
          contract: "Full Time",
          location: "USA Only",
          languages: ["JavaScript"],
          tools: ["Vue", "Sass"],
        },
        {
          id: 9,
          company: "Eyecam Co.",
          logo: "/company-logos/eyecam-co.svg",
          new: false,
          featured: false,
          position: "Full Stack Engineer",
          role: "Fullstack",
          level: "Midweight",
          postedAt: "3w ago",
          contract: "Full Time",
          location: "Worldwide",
          languages: ["JavaScript", "Python"],
          tools: ["Django"],
        },
        {
          id: 10,
          company: "The Air Filter Company",
          logo: "/company-logos/the-air-filter-company.svg",
          new: false,
          featured: false,
          position: "Front-end Dev",
          role: "Frontend",
          level: "Junior",
          postedAt: "1mo ago",
          contract: "Part Time",
          location: "Worldwide",
          languages: ["JavaScript"],
          tools: ["React", "Sass"],
        },
      ],
    };
  },
  methods: {
    selectFilter(req) {
      if (!this.selectedFilters.includes(req)) {
        this.selectedFilters = [...this.selectedFilters, req];
      }
    },
    removeFilter(req) {
      this.selectedFilters = this.selectedFilters.filter(
        (fltr) => fltr !== req
      );
    },
    clearSelectedFilters() {
      if (this.selectedFilters.length > 0) {
        this.selectedFilters = [];
      }
    },
  },
  computed: {
    filteredJobs() {
      if (!this.selectedFilters.length) {
        return this.jobs;
      }
      return this.jobs.filter((job) => {
        const jobTags = [job.role, job.level, ...job.languages, ...job.tools];
        return this.selectedFilters.every((fltr) => jobTags.includes(fltr));
      });
    },
  },
};
</script>

<style>
:root {
  min-height: 100%;
  color: hsl(180, 29%, 50%);
  background-color: hsl(180, 52%, 96%);
  font-family: "League Spartan", sans-serif;
}

*::before,
*,
*::after {
  margin: 0;
  padding: 0;
  border-width: 0;
  border-style: solid;
  border-color: transparent;
  outline-width: 2px;
  outline-style: solid;
  outline-color: transparent;
  box-sizing: border-box;
  font: inherit;
  color: inherit;
  vertical-align: middle;
}

#root {
  display: contents;
}

.wrapper {
  width: 100%;
  max-width: 1280px;
  margin-left: auto;
  margin-right: auto;
}

header {
  background-color: hsl(180, 29%, 50%);
  background-image: url(./assets/bg-header-mobile.svg);
  background-repeat: no-repeat;
  background-size: cover;
  height: 156px;
}

.selected-filters {
  position: sticky;
  z-index: 99;
  top: 20px;
  width: 90%;
  margin: -40px auto auto;
  background-color: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  box-shadow: 0 8px 24px #0002;
}

.selected-filters > div {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
}

.selected-filters > div div {
  color: hsl(180, 29%, 50%);
  background-color: hsl(180, 52%, 96%);
  border-radius: 4px;
  display: flex;
  align-items: center;
}

.selected-filters > div div span {
  padding: 0 8px;
}

.selected-filters > div div button {
  color: #fff;
  background-color: hsl(180, 29%, 50%);
  padding: 8px;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
}

.selected-filters > div div button:hover,
.selected-filters > div div button:focus {
  background-color: hsl(180, 14%, 20%);
}

.selected-filters > div div button svg {
  width: 14px;
}

.selected-filters > button {
  flex-shrink: 0;
  background-color: transparent;
  color: hsl(180, 8%, 52%);
}

.selected-filters > button:hover,
.selected-filters > button:focus {
  text-decoration: underline;
  color: inherit;
}

ul {
  list-style-type: none;
  margin: 64px auto 32px;
}

li {
  width: 90%;
  background-color: #fff;
  border-radius: 6px;
  margin-left: auto;
  margin-right: auto;
  padding: 32px 24px;
  position: relative;
  box-shadow: 0 8px 24px #0002;
}

li[data-featured="true"]::before {
  content: "";
  position: absolute;
  inset: 0 calc(100% - 4px) 0 0;
  background-color: hsl(180, 29%, 50%);
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}

li:not(:last-child) {
  margin-bottom: 48px;
}

.company-logo {
  width: 52px;
  position: absolute;
  top: 0;
  transform: translateY(-50%);
}

.company-logo div {
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 999px;
  position: relative;
}

.company-logo img {
  position: absolute;
  inset: 0;
  object-fit: cover;
  object-position: center;
}

.company-logo + div > div:first-child {
  display: flex;
  align-items: center;
  gap: 1em;
}

.company-logo + div > div:first-child div {
  display: flex;
  align-items: center;
  gap: 0.5em;
  color: #fff;
}

.company-logo + div > div:first-child div span {
  padding: 6px 8px 3px;
  border-radius: 999px;
}

.company-logo + div > div:first-child div span:first-child {
  background-color: hsl(180, 29%, 50%);
}

.company-logo + div > div:first-child div span:last-child {
  background-color: hsl(180, 14%, 20%);
}

.company-logo + div > a {
  display: inline-block;
  color: hsl(180, 14%, 20%);
  margin: 0.5em 0;
  text-decoration: none;
}

.company-logo + div > a:hover,
.company-logo + div > a:focus {
  color: inherit;
}

.company-logo + div > div:last-child {
  display: flex;
  align-items: center;
  color: hsl(180, 8%, 52%);
}

.company-logo + div > div:last-child span:not(:first-child)::before {
  content: "\2022";
  display: inline-block;
  width: 1em;
  aspect-ratio: 1 / 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

hr {
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: hsl(180, 29%, 50%);
  margin: 1em 0;
}

.filter-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}

.filter-tags button {
  flex-shrink: 0;
  background-color: transparent;
  border-radius: 4px;
  padding: 6px 8px 4px;
  background-color: hsl(180, 52%, 96%);
}

.filter-tags button:hover,
.filter-tags button:focus {
  color: #fff;
  background-color: hsl(180, 29%, 50%);
}

@media (min-width: 1024px) {
  header {
    background-image: url(./assets/bg-header-desktop.svg);
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  li > div:first-child {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .company-logo {
    width: 64px;
    position: static;
    transform: none;
  }

  hr {
    display: none;
  }
}
</style>
