<template>
  <div class="user container-fluid">
    <!-- Header action -->
    <div class="user-heading row">
      <div class="col-md-4 col-sm-12 col-lg-4">
        <b-input-group>
          <b-form-input trim placeholder="Search by name"></b-form-input>
          <template #append>
            <button class="btn btn-primary">Search</button>
          </template>
        </b-input-group>
      </div>
      <div class="col-md-4 col-sm-12 col-lg-4">
        <b-form-select v-model="selected" :options="options"></b-form-select>
      </div>
      <div class="col-md-2 col-sm-12 col-lg-2">
        <button class="btn btn-primary" @click="handleShowModal()">
          Thêm người dùng
        </button>
      </div>
    </div>
    <!-- End header action -->

    <!-- Table -->
    <b-table
      :items="items"
      :fields="fields"
      responsive
      :outlined="false"
      :fixed="false"
      id="my-table"
    >
      <template #cell(is_active)="data">
        <b-badge v-if="data.item.is_active" variant="success">Active</b-badge>
        <b-badge v-else variant="danger">Inactive</b-badge>
      </template>
      <template #cell(is_deleted)="data">
        <b-badge v-if="data.item.is_deleted" variant="danger">Deleted</b-badge>
        <b-badge v-else variant="success">Not Delete</b-badge>
      </template>
      <template #cell(created_at)="data">
        {{ data.item.created_at.slice(0, 10) }}
      </template>
      <template #cell(action)="data">
        <button class="btn btn-primary" @click="handleShowModal(data.item._id)">
          Edit
        </button>
        <button class="btn btn-danger" @click="handleDeleteUser()">
          Delete
        </button>
      </template>
    </b-table>
    <!-- End Table -->

    <!-- Pagination -->
    <b-pagination
      v-model="pagination.currentPage"
      :total-rows="total"
      :per-page="pagination.perPage"
      aria-controls="my-table"
    ></b-pagination>
    <!-- End Pagination -->

    <!-- Modal User-->
    <b-modal
      id="modal-1"
      v-model="is_show_modal"
      :title="action === 'CREATE' ? 'Create User' : 'Edit User'"
      centered
      no-close-on-backdrop
      no-close-on-esc
      size="lg"
    >
      <b-form-group id="input-group-1" label="Your name" label-for="input-1">
        <b-form-input
          id="input-1"
          type="text"
          placeholder="Enter your name"
          v-model="user.name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your email" label-for="input-2">
        <b-form-input
          id="input-2"
          placeholder="Enter your name"
          required
          :disabled="action==='UPDATE'"
          v-model="user.email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Role:" label-for="input-3">
        <b-form-select
          id="input-3"
          :options="role"
          v-model="user.role"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group
        id="input-group-4"
        label="Your Date of Birth"
        label-for="input-4"
      >
        <b-form-input
          id="input-4"
          type="date"
          v-model="user.dob"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group v-if="action === 'UPDATE'" id="input-group-4">
        <b-form-checkbox v-model="user.is_active">Active</b-form-checkbox>
      </b-form-group>

      <template #modal-footer>
        <button class="btn btn-danger" @click="handleCloseModal()">
          Cancel
        </button>
        <button
          class="btn btn-primary"
          @click="action === 'CREATE' ? handleCreateUser() : handleEditUser()"
          :disabled="is_processing"
        >
          <span v-show="!is_processing">
            {{ action === "CREATE" ? "Create" : "Edit" }}
          </span>
          <b-spinner v-if="is_processing" small></b-spinner>
        </button>
      </template>
    </b-modal>
    <!-- End Modal User-->
  </div>
</template>

<script>
import { getUser, createUser, getUserById } from "../../api/module/user";
import { MakeToast } from "../../utils/MakeToast";

export default {
  name: "UserIndex",
  data() {
    return {
      fields: [
        {
          key: "_id",
          label: "ID",
        },
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "email",
          label: "Email",
        },
        {
          key: "dob",
          label: "Date of birth",
        },
        {
          key: "role",
          label: "Role",
        },
        {
          key: "is_active",
          label: "Active",
        },
        {
          key: "created_at",
          label: "Created",
        },
        {
          key: "action",
          label: "Action",
        },
      ],
      items: [],
      selected: null,
      total: 0,
      options: [
        { value: null, text: "Please select an option" },
        { value: true, text: "Active" },
        { value: false, text: "Inactive" },
      ],
      pagination: {
        currentPage: 1,
        perPage: 10,
      },
      user: {
        role: "admin",
        email: "",
        name: "",
        dob: "",
        is_active: false,
      },
      is_show_modal: false,
      action: null,
      is_processing: false,
      role: [
        { value: "admin", text: "Admin" },
        { value: "user", text: "User" },
      ],
    };
  },
  created() {
    this.getAllUser();
  },

  computed: {
    handleChangePage() {
      return this.pagination.currentPage;
    },
  },
  watch: {
    handleChangePage() {
      this.getAllUser();
    },
  },
  methods: {
    async getAllUser() {
      try {
        const params = {
          per_page: this.pagination.perPage,
          current_page: this.pagination.currentPage,
        };
        const res = await getUser(params);
        this.total = res.pagination.total_page;
        this.items = res.data;
      } catch (error) {
        console.log(error);
      }
    },
    async handleCreateUser() {
      this.is_processing = true;

      const data = {
        name: this.user.name,
        email: this.user.email,
        dob: this.user.dob,
        role: this.user.role,
      };
      try {
        const response = await createUser(data);
        if (response.status) {
          MakeToast({
            variant: "success",
            message: response.message,
            title: "Success",
          });
          this.is_processing = false;
          this.is_show_modal = false;
          this.getAllUser();
        } else {
          MakeToast({
            variant: "warning",
            title: "Warning",
            message: response.message,
          });
          this.is_processing = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleEditUser() {
      this.is_processing = true;
      const data = {
        name: this.user.name,
        email: this.user.email,
        dob: this.user.dob,
        role: this.user.role,
        is_active: this.user.is_active,
      };
      console.log(data);
    },
    async handleShowModal(id) {
      this.resetData();
      this.is_show_modal = true;
      if (id) {
        this.action = "UPDATE";
        try {
          const response = await getUserById(id);
          this.user.email = response.data.email;
          this.user.name = response.data.name;
          this.user.dob = response.data.dob;
          this.user.role = response.data.role;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.action = "CREATE";
      }
    },
    handleCloseModal() {
      this.is_show_modal = false;
      this.is_processing = false;
      this.user = {
        role: "admin",
        email: "",
        name: "",
        dob: "",
      };
    },
    resetData() {
      this.user = {
        role: "admin",
        email: "",
        name: "",
        dob: "",
      };
    },
  },
};
</script>
