<template>
  <section v-if="data.total>data.perPage">
    <nav aria-label="pagination" class="pagination" role="navigation">
      <a :disabled="data.page===1" class="pagination-previous" title="Goto previous page"
         @click.prevent="openPage(prevPage)">
        <i class="fas fa-arrow-left"></i>
      </a>
      <a :disabled="data.page===data.lastPage" class="pagination-next" title="Goto next page"
         @click.prevent="openPage(nextPage)">
        <i class="fas fa-arrow-right"></i>
      </a>
      <ul class="pagination-list">
        <template v-if="data.page>3">
          <li><a aria-label="Goto page 1" class="pagination-link" title="Goto page 1"
                 @click.prevent="openPage(1)">1</a></li>
          <li><span class="pagination-ellipsis">&hellip;</span></li>
          <li><a :title="`Goto page ${prevPage}`" class="pagination-link"
                 @click.prevent="openPage(prevPage)">{{ prevPage }}</a>
          </li>

          <template v-if="currentOrNextIsLastPage">
            <li v-if="data.page!==data.lastPage">
              <a class="pagination-link is-current"
                 @click.prevent="openPage(data.page)">{{ data.page }}</a>
            </li>
          </template>
          <template v-else>
            <li v-if="data.page!==data.lastPage">
              <a class="pagination-link is-current"
                 @click.prevent="openPage(data.page)">{{ data.page }}</a>
            </li>
            <li><a :title="`Goto page ${nextPage}`" class="pagination-link"
                   @click.prevent="openPage(nextPage)">{{ nextPage }}</a>
            </li>
          </template>

          <li><span class="pagination-ellipsis">&hellip;</span></li>

          <!-- If is last page -->
          <template v-if="data.page===data.lastPage">
            <li>
              <a class="pagination-link is-current" @click.prevent="openPage(data.lastPage)">
                {{ data.lastPage }}
              </a>
            </li>
          </template>
          <!-- If not last page-->
          <template v-else>
            <li>
              <a class="pagination-link" @click.prevent="openPage(data.lastPage)">
                {{ data.lastPage }}
              </a>
            </li>
          </template>
        </template>
        <template v-else>
          <template v-for="(pageIndex, pID) in pagesArray">
            <li :key="pID"><a :class="'pagination-link ' + (data.page===pageIndex ?'is-current':'')"
                              :title="`Goto page ${pageIndex}`"
                              @click.prevent="openPage(pageIndex)">{{ pageIndex }}</a>
            </li>
          </template>
          <template v-if="data.lastPage>5">
            <li><span class="pagination-ellipsis">&hellip;</span></li>
            <li><a :title="`Goto page ${data.lastPage}`" class="pagination-link"
                   @click.prevent="openPage(data.lastPage)">{{ data.lastPage }}</a>
            </li>
          </template>
        </template>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => ({
        total: 0, // Total Results
        perPage: 0, // Total Results Per Page
        page: 1, // Current Page
        lastPage: 0, // Last Page
        data: [] // Data Returned
      })
    },
    name: {
      type: String,
      default: 'page'
    }
  },
  data() {
    return {}
  },
  computed: {
    nextPage() {
      return this.data.page + 1
    },
    prevPage() {
      return this.data.page - 1
    },
    currentOrNextIsLastPage() {
      if (this.data.page === this.data.lastPage) {
        return true
      } else return (this.data.page + 1) === this.data.lastPage;
    },
    pagesArray() {
      const lists = [];
      let i = 0;
      const maxLinks = this.data.lastPage > 5 ? 5 : this.data.lastPage;
      while (i < maxLinks) {
        lists[i] = i + 1;
        i++;
      }
      return lists;
    }
  },
  methods: {
    openPage(page) {
      const query = {...this.$route.query, page};
      this.$router.push({name: this.$route.name, params: this.$route.params, query}).catch(e => e);
    }
  }
}
</script>