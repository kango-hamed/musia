// generated from rosidl_typesupport_fastrtps_c/resource/idl__rosidl_typesupport_fastrtps_c.h.em
// with input from musia_msgs:msg/TourState.idl
// generated code does not contain a copyright notice
#ifndef MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__ROSIDL_TYPESUPPORT_FASTRTPS_C_H_
#define MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__ROSIDL_TYPESUPPORT_FASTRTPS_C_H_


#include <stddef.h>
#include "rosidl_runtime_c/message_type_support_struct.h"
#include "rosidl_typesupport_interface/macros.h"
#include "musia_msgs/msg/rosidl_typesupport_fastrtps_c__visibility_control.h"
#include "musia_msgs/msg/detail/tour_state__struct.h"
#include "fastcdr/Cdr.h"

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_musia_msgs
bool cdr_serialize_musia_msgs__msg__TourState(
  const musia_msgs__msg__TourState * ros_message,
  eprosima::fastcdr::Cdr & cdr);

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_musia_msgs
bool cdr_deserialize_musia_msgs__msg__TourState(
  eprosima::fastcdr::Cdr &,
  musia_msgs__msg__TourState * ros_message);

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_musia_msgs
size_t get_serialized_size_musia_msgs__msg__TourState(
  const void * untyped_ros_message,
  size_t current_alignment);

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_musia_msgs
size_t max_serialized_size_musia_msgs__msg__TourState(
  bool & full_bounded,
  bool & is_plain,
  size_t current_alignment);

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_musia_msgs
bool cdr_serialize_key_musia_msgs__msg__TourState(
  const musia_msgs__msg__TourState * ros_message,
  eprosima::fastcdr::Cdr & cdr);

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_musia_msgs
size_t get_serialized_size_key_musia_msgs__msg__TourState(
  const void * untyped_ros_message,
  size_t current_alignment);

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_musia_msgs
size_t max_serialized_size_key_musia_msgs__msg__TourState(
  bool & full_bounded,
  bool & is_plain,
  size_t current_alignment);

ROSIDL_TYPESUPPORT_FASTRTPS_C_PUBLIC_musia_msgs
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, musia_msgs, msg, TourState)();

#ifdef __cplusplus
}
#endif

#endif  // MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__ROSIDL_TYPESUPPORT_FASTRTPS_C_H_
