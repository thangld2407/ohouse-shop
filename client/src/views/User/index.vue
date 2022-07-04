<template>
  <div class="user container-fluid">
    <!-- Header action -->
    <div class="user-heading row">
      <div class="col-md-4 col-sm-12 col-lg-4">
        <b-input-group>
          <b-form-input trim placeholder="Search by name"></b-form-input>
          <template #append>
            <button class="btn btn-primary">Tìm kiếm</button>
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
        <b-badge v-if="data.item.is_active" variant="success">Đang hoạt động</b-badge>
        <b-badge v-else variant="danger">Chưa kích hoạt</b-badge>
      </template>
      <template #cell(is_deleted)="data">
        <b-badge v-if="data.item.is_deleted" variant="danger">Đã xoá</b-badge>
        <b-badge v-else variant="success">Not Delete</b-badge>
      </template>
      <template #cell(created_at)="data">
        {{ data.item.created_at.slice(0, 10) }}
      </template>
      <template #cell(action)="data">
        <button class="btn btn-primary" @click="handleShowModal(data.item._id)">
          Edit
        </button>

        <button
          v-if="!data.item.is_deleted"
          class="btn btn-danger ml-2"
          @click="handleDeleteUser(data.item._id)"
        >
          Xoá
        </button>
        <button
          v-else
          class="btn btn-warning ml-2"
          @click="handleRestoreUser(data.item._id)"
        >
          Khôi phục
        </button>
      </template>
    </b-table>
    <!-- End Table -->

    <!-- Pagination -->
    <b-pagination
      v-model="pagination.currentPage"
      :total-rows="total"
      :per-page="pagination.perPage"
      class="float-right position-absolute pagination-user"
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
          :disabled="action === 'UPDATE'"
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
      <b-form-group v-if="action === 'UPDATE'" id="input-group-4">
        <b-form-checkbox v-model="user.is_deleted">Restore</b-form-checkbox>
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
import {
  getUser,
  createUser,
  getUserById,
  editUserById,
  deleteUserById,
} from "../../api/module/user";
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
        id: null,
        is_deleted: false,
      },
      is_show_modal: false,
      action: null,
      is_processing: false,
      role: [
        { value: "admin", text: "Admin" },
        { value: "user", text: "User" },
      ],
      arr: [1,23,4,5,5,6,7,78]
    };
  },
  created() {
    this.getAllUser();
    this.testReduce()
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
        is_deleted: this.user.is_deleted,
      };
      try {
        const response = await editUserById(this.user.id, data);
        if (response.status) {
          this.getAllUser();
          MakeToast({
            variant: "success",
            message: response.message,
            title: "Success",
          });
          this.is_show_modal = false;
          this.is_processing = false;
        } else {
          this.is_processing = false;
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async handleShowModal(id) {
      this.resetData();
      this.is_show_modal = true;
      if (id) {
        this.user.id = id;
        this.action = "UPDATE";
        try {
          const response = await getUserById(id);
          this.user.email = response.data.email;
          this.user.name = response.data.name;
          this.user.dob = response.data.dob;
          this.user.role = response.data.role;
          this.user.is_active = response.data.is_active;
          this.user.is_deleted = response.data.is_deleted;
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
    handleRestoreUser(id) {
      const is_deleted = false;
      editUserById(id, { is_deleted })
        .then((res) => {
          if (res.status) {
            MakeToast({
              variant: "success",
              message: res.message,
              title: "Success",
            });
            this.getAllUser();
          } else {
            MakeToast({
              variant: "warning",
              title: "Warning",
              message: res.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleDeleteUser(id) {
      deleteUserById(id)
        .then((res) => {
          console.log(res);
          if (res.status) {
            MakeToast({
              variant: "success",
              message: res.message,
              title: "Success",
            });
            this.getAllUser();
          } else {
            MakeToast({
              variant: "warning",
              title: "Warning",
              message: res.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetData() {
      this.user = {
        role: "admin",
        email: "",
        name: "",
        dob: "",
      };
    },
    testReduce() {
      let sum = this.arr.reduce((acc, currentValue, currentIndex, array)=> {
          return acc + currentValue
      }, 0) 
      console.log(sum)
    }
    
  },
};
</script>
