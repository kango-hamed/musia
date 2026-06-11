// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from musia_msgs:msg/TourState.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/tour_state.h"


#ifndef MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__STRUCT_H_
#define MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

// Constants defined in the message

/// Constant 'VEILLE'.
enum
{
  musia_msgs__msg__TourState__VEILLE = 0
};

/// Constant 'ACCUEIL'.
enum
{
  musia_msgs__msg__TourState__ACCUEIL = 1
};

/// Constant 'TRAITEMENT'.
enum
{
  musia_msgs__msg__TourState__TRAITEMENT = 2
};

/// Constant 'GUIDAGE'.
enum
{
  musia_msgs__msg__TourState__GUIDAGE = 3
};

/// Constant 'PRESENTATION'.
enum
{
  musia_msgs__msg__TourState__PRESENTATION = 4
};

/// Constant 'DEGRADE'.
enum
{
  musia_msgs__msg__TourState__DEGRADE = 5
};

/// Constant 'RETOUR'.
enum
{
  musia_msgs__msg__TourState__RETOUR = 6
};

// Include directives for member types
// Member 'header'
#include "std_msgs/msg/detail/header__struct.h"
// Member 'state_label'
// Member 'current_zone'
#include "rosidl_runtime_c/string.h"

/// Struct defined in msg/TourState in the package musia_msgs.
typedef struct musia_msgs__msg__TourState
{
  std_msgs__msg__Header header;
  uint8_t state;
  rosidl_runtime_c__String state_label;
  rosidl_runtime_c__String current_zone;
  uint8_t current_waypoint;
  bool network_available;
} musia_msgs__msg__TourState;

// Struct for a sequence of musia_msgs__msg__TourState.
typedef struct musia_msgs__msg__TourState__Sequence
{
  musia_msgs__msg__TourState * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__msg__TourState__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__STRUCT_H_
