<template>
  <div class="content">
    <div class="col-md-8 ml-auto mr-auto">
      <h2 class="text-center">Users List</h2>
      <!-- <p class="text-center">
        With a selection of custom components & and Element UI components, you
        can built beautiful data tables. For more info check
        <a
          href="http://element.eleme.io/#/en-US/component/table"
          target="_blank"
          >Element UI Table</a
        >
      </p> -->
    </div>
    <div class="row mt-5">
      <div class="col-12">
        <card card-body-classes="table-full-width">
          <h4 slot="header" class="card-title">Users List</h4>
          <div>
            <div
              class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <el-select
                class="select-primary mb-3 pagination-select"
                v-model="pagination.perPage"
                placeholder="Per page"
              >
                <el-option
                  class="select-primary"
                  v-for="item in pagination.perPageOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>

              <base-input>
                <el-input
                  type="search"
                  class="mb-3 search-input"
                  clearable
                  prefix-icon="el-icon-search"
                  placeholder="Search records"
                  v-model="searchQuery"
                  aria-controls="datatables"
                >
                </el-input>
              </base-input>
            </div>
            <el-table :data="queriedData">
              <el-table-column
                :min-width="200"
                align="left"
                label="User Details"
              >
                <div slot-scope="props">
                  <div style="display: flex">
                    <!-- <img
                      :src="props.row.user_id.image"
                      style="
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        margin-right: 10px;
                        object-fit: cover;
                      "
                    /> -->
                    <div>
                      <div>{{ props.row.email }}</div>
                      <div>
                        {{ props.row.first_name + " " + props.row.last_name }}
                      </div>
                    </div>
                  </div>
                </div>
              </el-table-column>

              <el-table-column
                :min-width="200"
                align="left"
                label="Phone Number"
              >
                <div slot-scope="props">
                  <div>
                    <div>{{ props.row.phone_number }}</div>
                  </div>
                </div>
              </el-table-column>
              <el-table-column :min-width="200" align="left" label="Address">
                <div slot-scope="props">
                  <div>
                    <div>{{ props.row.address }}</div>
                  </div>
                </div>
              </el-table-column>

              <el-table-column :min-width="135" align="right" label="Password">
                <div slot-scope="props">
                  {{ props.row.password }}
                </div>
              </el-table-column>
            </el-table>
          </div>
          <div
            slot="footer"
            class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
          >
            <div class="">
              <p class="card-category">
                Showing {{ from + 1 }} to {{ to }} of {{ total }} entries
              </p>
            </div>
            <base-pagination
              class="pagination-no-border"
              v-model="pagination.currentPage"
              :per-page="pagination.perPage"
              :total="total"
            >
            </base-pagination>
          </div>
        </card>
      </div>
    </div>

    <div class="row loader-pos">
      <div class="sk-chase" v-if="loading">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>

      <div class="no-data-message" v-if="noDataMessage">
        <div>There are no records found</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Select, Option } from "element-ui";
import { BasePagination } from "src/components";
import users from "./orders";
import Fuse from "fuse.js";
import swal from "sweetalert2";
import { Modal, BaseAlert } from "src/components";

export default {
  components: {
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Modal,
    BaseAlert,
  },
  computed: {
    /***
     * Returns a page from the searched data or the whole data. Search is performed in the watch section below
     */
    queriedData() {
      let result = this.tableData;
      if (this.searchedData.length > 0) {
        result = this.searchedData;
      }
      return result.slice(this.from, this.to);
    },
    to() {
      let highBound = this.from + this.pagination.perPage;
      if (this.total < highBound) {
        highBound = this.total;
      }
      return highBound;
    },
    from() {
      return this.pagination.perPage * (this.pagination.currentPage - 1);
    },
    total() {
      return this.searchedData.length > 0
        ? this.searchedData.length
        : this.tableData.length;
    },
  },
  data() {
    return {
      noDataMessage: "",
      loading: false,
      modals_classic: false,
      actions: [],
      pagination: {
        perPage: 10,
        currentPage: 1,
        perPageOptions: [5, 10, 25, 50],
        total: 0,
      },
      searchQuery: "",
      propsToSearch: ["name", "email", "age"],
      tableColumns: [
        {
          prop: "name",
          label: "Name",
          minWidth: 200,
        },
        {
          prop: "email",
          label: "Email",
          minWidth: 250,
        },
        {
          prop: "age",
          label: "Age",
          minWidth: 100,
        },
        {
          prop: "salary",
          label: "Salary",
          minWidth: 120,
        },
      ],
      tableData: [],
      searchedData: [],
      fuseSearch: null,
      currentOrder: {},
    };
  },

  

  async mounted() {
    debugger;
    // Fuse search initialization.
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ["name", "email"],
      threshold: 0.3,
    });
    this.loading = true;
    let test = await this.$apiService.getCall("user/all-users");
    console.log(test);
    this.tableData = test.apidata.Data || [];
    this.loading = false;
  },
  watch: {
    /**
     * Searches through the table data by a given query.
     * NOTE: If you have a lot of data, it's recommended to do the search on the Server Side and only display the results here.
     * @param value of the query
     */
    searchQuery(value) {
      let result = this.tableData;
      if (value !== "") {
        result = this.fuseSearch.search(this.searchQuery);
      }
      this.searchedData = result;
    },
  },
  
};
</script>
<style>
.pagination-select,
.search-input {
  width: 200px;
}
.swal2-icon-content {
  font-size: inherit !important;
}
</style>
