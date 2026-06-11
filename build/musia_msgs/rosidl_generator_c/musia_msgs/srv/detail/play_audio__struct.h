// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from musia_msgs:srv/PlayAudio.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/play_audio.h"


#ifndef MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__STRUCT_H_
#define MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>


// Constants defined in the message

// Include directives for member types
// Member 'payload'
// Member 'language'
#include "rosidl_runtime_c/string.h"

/// Struct defined in srv/PlayAudio in the package musia_msgs.
typedef struct musia_msgs__srv__PlayAudio_Request
{
  uint8_t mode;
  rosidl_runtime_c__String payload;
  rosidl_runtime_c__String language;
  float volume;
} musia_msgs__srv__PlayAudio_Request;

// Struct for a sequence of musia_msgs__srv__PlayAudio_Request.
typedef struct musia_msgs__srv__PlayAudio_Request__Sequence
{
  musia_msgs__srv__PlayAudio_Request * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__srv__PlayAudio_Request__Sequence;

// Constants defined in the message

/// Struct defined in srv/PlayAudio in the package musia_msgs.
typedef struct musia_msgs__srv__PlayAudio_Response
{
  bool success;
  float duration_s;
} musia_msgs__srv__PlayAudio_Response;

// Struct for a sequence of musia_msgs__srv__PlayAudio_Response.
typedef struct musia_msgs__srv__PlayAudio_Response__Sequence
{
  musia_msgs__srv__PlayAudio_Response * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__srv__PlayAudio_Response__Sequence;

// Constants defined in the message

// Include directives for member types
// Member 'info'
#include "service_msgs/msg/detail/service_event_info__struct.h"

// constants for array fields with an upper bound
// request
enum
{
  musia_msgs__srv__PlayAudio_Event__request__MAX_SIZE = 1
};
// response
enum
{
  musia_msgs__srv__PlayAudio_Event__response__MAX_SIZE = 1
};

/// Struct defined in srv/PlayAudio in the package musia_msgs.
typedef struct musia_msgs__srv__PlayAudio_Event
{
  service_msgs__msg__ServiceEventInfo info;
  musia_msgs__srv__PlayAudio_Request__Sequence request;
  musia_msgs__srv__PlayAudio_Response__Sequence response;
} musia_msgs__srv__PlayAudio_Event;

// Struct for a sequence of musia_msgs__srv__PlayAudio_Event.
typedef struct musia_msgs__srv__PlayAudio_Event__Sequence
{
  musia_msgs__srv__PlayAudio_Event * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__srv__PlayAudio_Event__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__STRUCT_H_
