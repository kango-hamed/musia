// generated from rosidl_typesupport_c/resource/idl__type_support.cpp.em
// with input from musia_msgs:msg/TourState.idl
// generated code does not contain a copyright notice

#include "cstddef"
#include "rosidl_runtime_c/message_type_support_struct.h"
#include "musia_msgs/msg/detail/tour_state__struct.h"
#include "musia_msgs/msg/detail/tour_state__type_support.h"
#include "musia_msgs/msg/detail/tour_state__functions.h"
#include "rosidl_typesupport_c/identifier.h"
#include "rosidl_typesupport_c/message_type_support_dispatch.h"
#include "rosidl_typesupport_c/type_support_map.h"
#include "rosidl_typesupport_c/visibility_control.h"
#include "rosidl_typesupport_interface/macros.h"

namespace musia_msgs
{

namespace msg
{

namespace rosidl_typesupport_c
{

typedef struct _TourState_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _TourState_type_support_ids_t;

static const _TourState_type_support_ids_t _TourState_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_c",  // ::rosidl_typesupport_fastrtps_c::typesupport_identifier,
    "rosidl_typesupport_introspection_c",  // ::rosidl_typesupport_introspection_c::typesupport_identifier,
  }
};

typedef struct _TourState_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _TourState_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _TourState_type_support_symbol_names_t _TourState_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, musia_msgs, msg, TourState)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, musia_msgs, msg, TourState)),
  }
};

typedef struct _TourState_type_support_data_t
{
  void * data[2];
} _TourState_type_support_data_t;

static _TourState_type_support_data_t _TourState_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _TourState_message_typesupport_map = {
  2,
  "musia_msgs",
  &_TourState_message_typesupport_ids.typesupport_identifier[0],
  &_TourState_message_typesupport_symbol_names.symbol_name[0],
  &_TourState_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t TourState_message_type_support_handle = {
  rosidl_typesupport_c__typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_TourState_message_typesupport_map),
  rosidl_typesupport_c__get_message_typesupport_handle_function,
  &musia_msgs__msg__TourState__get_type_hash,
  &musia_msgs__msg__TourState__get_type_description,
  &musia_msgs__msg__TourState__get_type_description_sources,
};

}  // namespace rosidl_typesupport_c

}  // namespace msg

}  // namespace musia_msgs

#ifdef __cplusplus
extern "C"
{
#endif

const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_c, musia_msgs, msg, TourState)() {
  return &::musia_msgs::msg::rosidl_typesupport_c::TourState_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif
