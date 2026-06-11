cmake_minimum_required(VERSION 3.8)
project(musia_msgs)

find_package(ament_cmake REQUIRED)
find_package(std_msgs REQUIRED)
find_package(geometry_msgs REQUIRED)
find_package(rosidl_default_generators REQUIRED)

rosidl_generate_interfaces(${PROJECT_NAME}
  "msg/TourState.msg"
  "msg/PersonDetection.msg"
  "msg/AudioCommand.msg"
  "srv/SetTourMode.srv"
  "srv/GetCurrentZone.srv"
  "srv/NavigateToPOI.srv"
  "srv/PlayAudio.srv"
  "srv/DetectPerson.srv"
  DEPENDENCIES std_msgs geometry_msgs
)

ament_package()
