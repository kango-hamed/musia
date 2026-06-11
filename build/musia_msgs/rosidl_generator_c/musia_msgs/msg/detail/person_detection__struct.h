// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from musia_msgs:msg/PersonDetection.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/person_detection.h"


#ifndef MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__STRUCT_H_
#define MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

// Constants defined in the message

// Include directives for member types
// Member 'header'
#include "std_msgs/msg/detail/header__struct.h"

/// Struct defined in msg/PersonDetection in the package musia_msgs.
typedef struct musia_msgs__msg__PersonDetection
{
  std_msgs__msg__Header header;
  bool person_detected;
  float distance_m;
  float confidence;
} musia_msgs__msg__PersonDetection;

// Struct for a sequence of musia_msgs__msg__PersonDetection.
typedef struct musia_msgs__msg__PersonDetection__Sequence
{
  musia_msgs__msg__PersonDetection * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__msg__PersonDetection__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__STRUCT_H_
