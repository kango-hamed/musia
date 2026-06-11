// generated from rosidl_generator_c/resource/idl__struct.h.em
// with input from musia_msgs:msg/AudioCommand.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/audio_command.h"


#ifndef MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__STRUCT_H_
#define MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__STRUCT_H_

#ifdef __cplusplus
extern "C"
{
#endif

#include <stdbool.h>
#include <stddef.h>
#include <stdint.h>

// Constants defined in the message

/// Constant 'MODE_FILE'.
enum
{
  musia_msgs__msg__AudioCommand__MODE_FILE = 0
};

/// Constant 'MODE_TTS_OFFLINE'.
enum
{
  musia_msgs__msg__AudioCommand__MODE_TTS_OFFLINE = 1
};

/// Constant 'MODE_TTS_ONLINE'.
enum
{
  musia_msgs__msg__AudioCommand__MODE_TTS_ONLINE = 2
};

// Include directives for member types
// Member 'header'
#include "std_msgs/msg/detail/header__struct.h"
// Member 'payload'
// Member 'language'
#include "rosidl_runtime_c/string.h"

/// Struct defined in msg/AudioCommand in the package musia_msgs.
typedef struct musia_msgs__msg__AudioCommand
{
  std_msgs__msg__Header header;
  uint8_t mode;
  rosidl_runtime_c__String payload;
  rosidl_runtime_c__String language;
  float volume;
} musia_msgs__msg__AudioCommand;

// Struct for a sequence of musia_msgs__msg__AudioCommand.
typedef struct musia_msgs__msg__AudioCommand__Sequence
{
  musia_msgs__msg__AudioCommand * data;
  /// The number of valid items in data
  size_t size;
  /// The number of allocated items in data
  size_t capacity;
} musia_msgs__msg__AudioCommand__Sequence;

#ifdef __cplusplus
}
#endif

#endif  // MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__STRUCT_H_
