// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from musia_msgs:srv/SetTourMode.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/set_tour_mode.h"


#ifndef MUSIA_MSGS__SRV__DETAIL__SET_TOUR_MODE__STRUCT_H_
#define MUSIA_MSGS__SRV__DETAIL__SET_TOUR_MODE__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>


// Constants defined in the message

/// Struct defined in srv/SetTourMode in the package musia_msgs.
typedef struct musia_msgs__srv__SetTourMode_Request
{
  uint8_t target_state;
} musia_msgs__srv__SetTourMode_Request;

// Struct for a sequence of musia_msgs__srv__SetTourMode_Request.
typedef struct musia_msgs__srv__SetTourMode_Request__Sequence
{
  musia_msgs__srv__SetTourMode_Request * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__srv__SetTourMode_Request__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'message'
#include "rosidl_runtime_c/string.h"

/// Struct defined in srv/SetTourMode in the package musia_msgs.
typedef struct musia_msgs__srv__SetTourMode_Response
{
  bool success;
  rosidl_runtime_c__String message;
} musia_msgs__srv__SetTourMode_Response;

// Struct for a sequence of musia_msgs__srv__SetTourMode_Response.
typedef struct musia_msgs__srv__SetTourMode_Response__Sequence
{
  musia_msgs__srv__SetTourMode_Response * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__srv__SetTourMode_Response__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'info'
#include "service_msgs/msg/detail/service_event_info__struct.h"

// constants for array fields with an upper bound
// request
enum
{
  musia_msgs__srv__SetTourMode_Event__request__MAX_SIZE = 1
};
// response
enum
{
  musia_msgs__srv__SetTourMode_Event__response__MAX_SIZE = 1
};

/// Struct defined in srv/SetTourMode in the package musia_msgs.
typedef struct musia_msgs__srv__SetTourMode_Event
{
  service_msgs__msg__ServiceEventInfo info;
  musia_msgs__srv__SetTourMode_Request__Sequence request;
  musia_msgs__srv__SetTourMode_Response__Sequence response;
} musia_msgs__srv__SetTourMode_Event;

// Struct for a sequence of musia_msgs__srv__SetTourMode_Event.
typedef struct musia_msgs__srv__SetTourMode_Event__Sequence
{
  musia_msgs__srv__SetTourMode_Event * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__srv__SetTourMode_Event__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // MUSIA_MSGS__SRV__DETAIL__SET_TOUR_MODE__STRUCT_H_
