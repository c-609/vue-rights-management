<template>
<div>
     <el-button type="text" @click="dialogFormVisible = true" icon="el-icon-edit" >+权限</el-button>
     <el-dialog title="添加权限" :visible.sync="dialogFormVisible" >
  <el-transfer align="left"
    filterable
    :titles="['未有权限', '已有权限']"
    :filter-method="filterMethod"
    filter-placeholder="请输入城市拼音"
    v-model="value2"
    :data="data2" >
  </el-transfer>
  <div align="right"  vertical="center">
 <el-button type="primary">确定</el-button>
 <el-button type="danger">取消</el-button>
  </div>
    </el-dialog>
</div>
</template>

<script>
  export default {
    data() {
      const generateData2 = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index]
          });
        });
        return data;
      };
      return {
          dialogFormVisible:false,
        data2: generateData2(),
        value2: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1;
        }
      };
    }
  };
</script>