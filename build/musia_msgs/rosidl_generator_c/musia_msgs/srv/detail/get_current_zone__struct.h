// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from musia_msgs:srv/GetCurrentZone.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/get_current_zone.h"


#ifndef MUSIA_MSGS__SRV__DETAIL__GET_CURRENT_ZONE__STRUCT_H_
#define MUSIA_MSGS__SRV__DETAIL__GET_CURRENT_ZONE__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>


// Constants defined in the message

/// Struct defined in srv/GetCurrentZone in the package musia_msgs.
typedef struct musia_msgs__srv__GetCurrentZone_Request
{
  uint8_t structure_needs_at_least_one_member;
} musia_msgs__srv__GetCurrentZone_Request;

// Struct for a sequence of musia_msgs__srv__GetCurrentZone_Request.
typedef struct musia_msgs__srv__GetCurrentZone_Request__Sequence
{
  musia_msgs__srv__GetCurrentZone_Request * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__srv__GetCurrentZone_Request__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'zone_name'
#include "rosidl_runtime_c/string.h"

/// Struct defined in srv/GetCurrentZone in the package musia_msgs.
typedef struct musia_msgs__srv__GetCurrentZone_Response
{
  rosidl_runtime_c__String zone_name;
  uint8_t current_waypoint;
  bool success;
} musia_msgs__srv__GetCurrentZone_Response;

// Struct for a sequence of musia_msgs__srv__GetCurrentZone_Response.
typedef struct musia_msgs__srv__GetCurrentZone_Response__Sequence
{
  musia_msgs__srv__GetCurrentZone_Response * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__srv__GetCurrentZone_Response__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'info'
#include "service_msgs/msg/detail/service_event_info__struct.h"

// constants for array fields with an upper bound
// request
enum
{
  musia_msgs__srv__GetCurrentZone_Event__request__MAX_SIZE = 1
};
// response
enum
{
  musia_msgs__srv__GetCurrentZone_Event__response__MAX_SIZE = 1
};

/// Struct defined in srv/GetCurrentZone in the package musia_msgs.
typedef struct musia_msgs__srv__GetCurrentZone_Event
{
  service_msgs__msg__ServiceEventInfo info;
  musia_msgs__srv__GetCurrentZone_Request__Sequence request;
  musia_msgs__srv__GetCurrentZone_Response__Sequence response;
} musia_msgs__srv__GetCurrentZone_Event;

// Struct for a sequence of musia_msgs__srv__GetCurrentZone_Event.
typedef struct musia_msgs__srv__GetCurrentZone_Event__Sequence
{
  musia_msgs__srv__GetCurrentZone_Event * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__srv__GetCurrentZone_Event__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // MUSIA_MSGS__SRV__DETAIL__GET_CURRENT_ZONE__STRUCT_H_
