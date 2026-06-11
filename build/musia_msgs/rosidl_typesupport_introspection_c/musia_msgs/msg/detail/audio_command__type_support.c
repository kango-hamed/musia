// generated from rosidl_typesupport_introspection_c/resource/idl__type_support.c.em
// with input from musia_msgs:msg/AudioCommand.idl
// generated code does not contain a copyright notice

#include <stddef.h>
#include "musia_msgs/msg/detail/audio_command__rosidl_typesupport_introspection_c.h"
#include "musia_msgs/msg/rosidl_typesupport_introspection_c__visibility_control.h"
#include "rosidl_typesupport_introspection_c/field_types.h"
#include "rosidl_typesupport_introspection_c/identifier.h"
#include "rosidl_typesupport_introspection_c/message_introspection.h"
#include "musia_msgs/msg/detail/audio_command__functions.h"
#include "musia_msgs/msg/detail/audio_command__struct.h"


// Include directives for member types
// Member `header`
#include "std_msgs/msg/header.h"
// Member `header`
#include "std_msgs/msg/detail/header__rosidl_typesupport_introspection_c.h"
// Member `payload`
// Member `language`
#include "rosidl_runtime_c/string_functions.h"

#ifdef __cplusplus
extern "C"
{
#endif

void musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_init_function(
  void * message_memory, enum rosidl_runtime_c__message_initialization _init)
{
  // TODO(karsten1987): initializers are not yet implemented for typesupport c
  // see https://github.com/ros2/ros2/issues/397
  (void) _init;
  musia_msgs__msg__AudioCommand__init(message_memory);
}

void musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_fini_function(void * message_memory)
{
  musia_msgs__msg__AudioCommand__fini(message_memory);
}

static rosidl_typesupport_introspection_c__MessageMember musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_message_member_array[5] = {
  {
    "header",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_MESSAGE,  // type
    0,  // upper bound of string
    NULL,  // members of sub message (initialized later)
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(musia_msgs__msg__AudioCommand, header),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "mode",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_UINT8,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(musia_msgs__msg__AudioCommand, mode),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "payload",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_STRING,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(musia_msgs__msg__AudioCommand, payload),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "language",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_STRING,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(musia_msgs__msg__AudioCommand, language),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  },
  {
    "volume",  // name
    rosidl_typesupport_introspection_c__ROS_TYPE_FLOAT,  // type
    0,  // upper bound of string
    NULL,  // members of sub message
    false,  // is key
    false,  // is array
    0,  // array size
    false,  // is upper bound
    offsetof(musia_msgs__msg__AudioCommand, volume),  // bytes offset in struct
    NULL,  // default value
    NULL,  // size() function pointer
    NULL,  // get_const(index) function pointer
    NULL,  // get(index) function pointer
    NULL,  // fetch(index, &value) function pointer
    NULL,  // assign(index, value) function pointer
    NULL  // resize(index) function pointer
  }
};

static const rosidl_typesupport_introspection_c__MessageMembers musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_message_members = {
  "musia_msgs__msg",  // message namespace
  "AudioCommand",  // message name
  5,  // number of fields
  sizeof(musia_msgs__msg__AudioCommand),
  false,  // has_any_key_member_
  musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_message_member_array,  // message members
  musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_init_function,  // function to initialize message memory (memory has to be allocated)
  musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_fini_function  // function to terminate message instance (will not free memory)
};

// this is not const since it must be initialized on first access
// since C does not allow non-integral compile-time constants
static rosidl_message_type_support_t musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_message_type_support_handle = {
  0,
  &musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_message_members,
  get_message_typesupport_handle_function,
  &musia_msgs__msg__AudioCommand__get_type_hash,
  &musia_msgs__msg__AudioCommand__get_type_description,
  &musia_msgs__msg__AudioCommand__get_type_description_sources,
};

ROSIDL_TYPESUPPORT_INTROSPECTION_C_EXPORT_musia_msgs
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, musia_msgs, msg, AudioCommand)() {
  musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_message_member_array[0].members_ =
    ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, std_msgs, msg, Header)();
  if (!musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_message_type_support_handle.typesupport_identifier) {
    musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_message_type_support_handle.typesupport_identifier =
      rosidl_typesupport_introspection_c__identifier;
  }
  return &musia_msgs__msg__AudioCommand__rosidl_typesupport_introspection_c__AudioCommand_message_type_support_handle;
}
#ifdef __cplusplus
}
#endif
