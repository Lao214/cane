<template>
    <div class="custom-select">
      <label v-if="label" class="custom-label">{{ label }}</label>
      <el-select v-model="selectedValue" v-bind="$attrs" clearable filterable v-on="$listeners">
        <el-option v-for="option in options" :key="option.value" :label="option.label" :value="option.value" ></el-option>
      </el-select>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: [String, Number],
      label: String,
      options: {
        type: Array,
        required: true,
      },
    },
    computed: {
      selectedValue: {
        get() {
          return this.value;
        },
        set(val) {
          this.$emit('input', val);
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .custom-select {
    display: flex;
    width: 22vw;
    min-width: 290px;
    margin-bottom: 1rem;
    align-items: center;
    /* flex-direction: column; */
  }
  .custom-label {
    margin-right: .5rem;
    align-items: center;
    border-radius: .15rem;
    font-size: 14px;
    color: #333;
    background: #eaeaea;
    height: 100%;
    padding: .5rem;
  }
  </style>
  