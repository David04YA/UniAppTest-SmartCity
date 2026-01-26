<template>
  <view class="simple-calendar">
    <!-- 顶部年月及切换 -->
    <view class="calendar-header">
      <text @click="changeMonth(-1)">◀</text>
      <text>{{ currentYear }}年{{ currentMonth + 1 }}月</text>
      <text @click="changeMonth(1)">▶</text>
    </view>
    
    <!-- 星期栏 -->
    <view class="weekdays">
      <text v-for="w in ['日','一','二','三','四','五','六']" :key="w">{{ w }}</text>
    </view>
    
    <!-- 日期格子 -->
    <view class="days-grid">
      <text
        v-for="(day, index) in calendarDays"
        :key="index"
        class="day"
        :class="{ 'not-current-month': !day.isCurrentMonth, 'today': day.isToday }"
        @click="selectDay(day)">
        {{ day.date }}
      </text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';

// 当前展示的年月
const currentDate = ref(new Date());
const currentYear = computed(() => currentDate.value.getFullYear());
const currentMonth = computed(() => currentDate.value.getMonth());

// 核心：生成日历数组
const calendarDays = computed(() => {
  const days = [];
  const year = currentYear.value;
  const month = currentMonth.value;
  
  // 1. 获取当月第一天和最后一天
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0); // 注意：month+1, day=0 得到当月最后一天
  const daysInMonth = lastDay.getDate();
  
  // 2. 计算当月1号是星期几（0是周日）
  const firstDayOfWeek = firstDay.getDay();
  
  // 3. 补上前一个月的日期
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = 0; i < firstDayOfWeek; i++) {
    days.push({ date: prevMonthLastDay - firstDayOfWeek + i + 1, isCurrentMonth: false });
  }
  
  // 4. 填入当前月的日期
  const today = new Date();
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === i;
    days.push({ date: i, isCurrentMonth: true, isToday });
  }
  
  // 5. 补全剩余格子至42个（6行）
  const totalCells = 42;
  while (days.length < totalCells) {
    days.push({ date: days.length - daysInMonth - firstDayOfWeek + 1, isCurrentMonth: false });
  }
  
  return days;
});

// 切换月份
const changeMonth = (direction) => {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + direction));
};

// 选择日期
const selectDay = (day) => {
  if (!day.isCurrentMonth) return; // 示例：不允许选择非本月日期
  console.log('选中日期:', `${currentYear.value}-${currentMonth.value + 1}-${day.date}`);
};
</script>

<style scoped>
.simple-calendar { font-family: sans-serif; }
.calendar-header { display: flex; justify-content: space-between; padding: 10px; }
.weekdays, .days-grid { display: flex; flex-wrap: wrap; }
.weekdays text, .day { width: calc(100% / 7); text-align: center; padding: 10px 0; }
.day.not-current-month { color: #ccc; } /* 非本月日期灰色显示 */
.day.today { background-color: #e0f0ff; } /* 今日高亮 */
</style>