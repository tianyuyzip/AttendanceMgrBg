# AttendanceMgrBg
学生签到系统采用express框架的node.js后台

#### 基本功能

  + 通过学号获取学生信息
    - http://localhost/v1/stu/:stuno
  + 加载某位学生的所有签到记录次数
    - http://localhost/v1/stu/signin/:stuno
  + 获取当天所有课程信息
    - http://localhost/v1/stu/course/:date
  + 修改学生的签到记录次数
    - http://localhost/v1/stu/signCnt/:stuno/:status
