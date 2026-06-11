// generated from rosidl_typesupport_cpp/resource/idl__type_support.cpp.em
// with input from musia_msgs:msg/AudioCommand.idl
// generated code does not contain a copyright notice

#include "cstddef"
#include "rosidl_runtime_c/message_type_support_struct.h"
#include "musia_msgs/msg/detail/audio_command__functions.h"
#include "musia_msgs/msg/detail/audio_command__struct.hpp"
#include "rosidl_typesupport_cpp/identifier.hpp"
#include "rosidl_typesupport_cpp/message_type_support.hpp"
#include "rosidl_typesupport_c/type_support_map.h"
#include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
#include "rosidl_typesupport_cpp/visibility_control.h"
#include "rosidl_typesupport_interface/macros.h"

namespace musia_msgs
{

namespace msg
{

namespace rosidl_typesupport_cpp
{

typedef struct _AudioCommand_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _AudioCommand_type_support_ids_t;

static const _AudioCommand_type_support_ids_t _AudioCommand_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _AudioCommand_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _AudioCommand_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _AudioCommand_type_support_symbol_names_t _AudioCommand_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, musia_msgs, msg, AudioCommand)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, musia_msgs, msg, AudioCommand)),
  }
};

typedef struct _AudioCommand_type_support_data_t
{
  void * data[2];
} _AudioCommand_type_support_data_t;

static _AudioCommand_type_support_data_t _AudioCommand_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _AudioCommand_message_typesupport_map = {
  2,
  "musia_msgs",
  &_AudioCommand_message_typesupport_ids.typesupport_identifier[0],
  &_AudioCommand_message_typesupport_symbol_names.symbol_name[0],
  &_AudioCommand_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t AudioCommand_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_AudioCommand_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &musia_msgs__msg__AudioCommand__get_type_hash,
  &musia_msgs__msg__AudioCommand__get_type_description,
  &musia_msgs__msg__AudioCommand__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace msg

}  // namespace musia_msgs

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<musia_msgs::msg::AudioCommand>()
{
  return &::musia_msgs::msg::rosidl_typesupport_cpp::AudioCommand_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, musia_msgs, msg, AudioCommand)() {
  return get_message_type_support_handle<musia_msgs::msg::AudioCommand>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp
