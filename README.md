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
  + 添加签到记录到签到记录表
    - http://localhost/v1/stu/signinfo/info
  + 通过学号、课程号、日期、课程开始时间获取签到记录
    - http://localhost/v1/stu/signinfo/:stuno/:courseno/:date/:begintime
  + 加载该学生所有签到记录
    - http://localhost/v1/stu/signinfo/:stuno
  + 分页加载该学生所有签到记录
    - http://localhost/v1/stu/signinfo/:stuno/:pageNo/:pageSize
  + 加载该课程的所有学生签到记录
    - http://localhost/v1/stu/signinfo/course
  + 更改密码
    - http://localhost/v1/stu/:stuno/:password
