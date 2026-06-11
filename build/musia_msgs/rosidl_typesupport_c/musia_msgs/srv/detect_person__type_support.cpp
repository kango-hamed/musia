// generated from rosidl_typesupport_c/resource/idl__type_support.cpp.em
// with input from musia_msgs:srv/DetectPerson.idl
// generated code does not contain a copyright notice

#include "cstddef"
#include "rosidl_runtime_c/message_type_support_struct.h"
#include "musia_msgs/srv/detail/detect_person__struct.h"
#include "musia_msgs/srv/detail/detect_person__type_support.h"
#include "musia_msgs/srv/detail/detect_person__functions.h"
#include "rosidl_typesupport_c/identifier.h"
#include "rosidl_typesupport_c/message_type_support_dispatch.h"
#include "rosidl_typesupport_c/type_support_map.h"
#include "rosidl_typesupport_c/visibility_control.h"
#include "rosidl_typesupport_interface/macros.h"

namespace musia_msgs
{

namespace srv
{

namespace rosidl_typesupport_c
{

typedef struct _DetectPerson_Request_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _DetectPerson_Request_type_support_ids_t;

static const _DetectPerson_Request_type_support_ids_t _DetectPerson_Request_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_c",  // ::rosidl_typesupport_fastrtps_c::typesupport_identifier,
    "rosidl_typesupport_introspection_c",  // ::rosidl_typesupport_introspection_c::typesupport_identifier,
  }
};

typedef struct _DetectPerson_Request_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _DetectPerson_Request_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _DetectPerson_Request_type_support_symbol_names_t _DetectPerson_Request_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, musia_msgs, srv, DetectPerson_Request)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, musia_msgs, srv, DetectPerson_Request)),
  }
};

typedef struct _DetectPerson_Request_type_support_data_t
{
  void * data[2];
} _DetectPerson_Request_type_support_data_t;

static _DetectPerson_Request_type_support_data_t _DetectPerson_Request_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _DetectPerson_Request_message_typesupport_map = {
  2,
  "musia_msgs",
  &_DetectPerson_Request_message_typesupport_ids.typesupport_identifier[0],
  &_DetectPerson_Request_message_typesupport_symbol_names.symbol_name[0],
  &_DetectPerson_Request_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t DetectPerson_Request_message_type_support_handle = {
  rosidl_typesupport_c__typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_DetectPerson_Request_message_typesupport_map),
  rosidl_typesupport_c__get_message_typesupport_handle_function,
  &musia_msgs__srv__DetectPerson_Request__get_type_hash,
  &musia_msgs__srv__DetectPerson_Request__get_type_description,
  &musia_msgs__srv__DetectPerson_Request__get_type_description_sources,
};

}  // namespace rosidl_typesupport_c

}  // namespace srv

}  // namespace musia_msgs

#ifdef __cplusplus
extern "C"
{
#endif

const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_c, musia_msgs, srv, DetectPerson_Request)() {
  return &::musia_msgs::srv::rosidl_typesupport_c::DetectPerson_Request_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "musia_msgs/srv/detail/detect_person__struct.h"
// already included above
// #include "musia_msgs/srv/detail/detect_person__type_support.h"
// already included above
// #include "musia_msgs/srv/detail/detect_person__functions.h"
// already included above
// #include "rosidl_typesupport_c/identifier.h"
// already included above
// #include "rosidl_typesupport_c/message_type_support_dispatch.h"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_c/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace musia_msgs
{

namespace srv
{

namespace rosidl_typesupport_c
{

typedef struct _DetectPerson_Response_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _DetectPerson_Response_type_support_ids_t;

static const _DetectPerson_Response_type_support_ids_t _DetectPerson_Response_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_c",  // ::rosidl_typesupport_fastrtps_c::typesupport_identifier,
    "rosidl_typesupport_introspection_c",  // ::rosidl_typesupport_introspection_c::typesupport_identifier,
  }
};

typedef struct _DetectPerson_Response_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _DetectPerson_Response_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _DetectPerson_Response_type_support_symbol_names_t _DetectPerson_Response_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, musia_msgs, srv, DetectPerson_Response)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, musia_msgs, srv, DetectPerson_Response)),
  }
};

typedef struct _DetectPerson_Response_type_support_data_t
{
  void * data[2];
} _DetectPerson_Response_type_support_data_t;

static _DetectPerson_Response_type_support_data_t _DetectPerson_Response_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _DetectPerson_Response_message_typesupport_map = {
  2,
  "musia_msgs",
  &_DetectPerson_Response_message_typesupport_ids.typesupport_identifier[0],
  &_DetectPerson_Response_message_typesupport_symbol_names.symbol_name[0],
  &_DetectPerson_Response_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t DetectPerson_Response_message_type_support_handle = {
  rosidl_typesupport_c__typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_DetectPerson_Response_message_typesupport_map),
  rosidl_typesupport_c__get_message_typesupport_handle_function,
  &musia_msgs__srv__DetectPerson_Response__get_type_hash,
  &musia_msgs__srv__DetectPerson_Response__get_type_description,
  &musia_msgs__srv__DetectPerson_Response__get_type_description_sources,
};

}  // namespace rosidl_typesupport_c

}  // namespace srv

}  // namespace musia_msgs

#ifdef __cplusplus
extern "C"
{
#endif

const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_c, musia_msgs, srv, DetectPerson_Response)() {
  return &::musia_msgs::srv::rosidl_typesupport_c::DetectPerson_Response_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "musia_msgs/srv/detail/detect_person__struct.h"
// already included above
// #include "musia_msgs/srv/detail/detect_person__type_support.h"
// already included above
// #include "musia_msgs/srv/detail/detect_person__functions.h"
// already included above
// #include "rosidl_typesupport_c/identifier.h"
// already included above
// #include "rosidl_typesupport_c/message_type_support_dispatch.h"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_c/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace musia_msgs
{

namespace srv
{

namespace rosidl_typesupport_c
{

typedef struct _DetectPerson_Event_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _DetectPerson_Event_type_support_ids_t;

static const _DetectPerson_Event_type_support_ids_t _DetectPerson_Event_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_c",  // ::rosidl_typesupport_fastrtps_c::typesupport_identifier,
    "rosidl_typesupport_introspection_c",  // ::rosidl_typesupport_introspection_c::typesupport_identifier,
  }
};

typedef struct _DetectPerson_Event_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _DetectPerson_Event_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _DetectPerson_Event_type_support_symbol_names_t _DetectPerson_Event_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, musia_msgs, srv, DetectPerson_Event)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_c, musia_msgs, srv, DetectPerson_Event)),
  }
};

typedef struct _DetectPerson_Event_type_support_data_t
{
  void * data[2];
} _DetectPerson_Event_type_support_data_t;

static _DetectPerson_Event_type_support_data_t _DetectPerson_Event_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _DetectPerson_Event_message_typesupport_map = {
  2,
  "musia_msgs",
  &_DetectPerson_Event_message_typesupport_ids.typesupport_identifier[0],
  &_DetectPerson_Event_message_typesupport_symbol_names.symbol_name[0],
  &_DetectPerson_Event_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t DetectPerson_Event_message_type_support_handle = {
  rosidl_typesupport_c__typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_DetectPerson_Event_message_typesupport_map),
  rosidl_typesupport_c__get_message_typesupport_handle_function,
  &musia_msgs__srv__DetectPerson_Event__get_type_hash,
  &musia_msgs__srv__DetectPerson_Event__get_type_description,
  &musia_msgs__srv__DetectPerson_Event__get_type_description_sources,
};

}  // namespace rosidl_typesupport_c

}  // namespace srv

}  // namespace musia_msgs

#ifdef __cplusplus
extern "C"
{
#endif

const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_c, musia_msgs, srv, DetectPerson_Event)() {
  return &::musia_msgs::srv::rosidl_typesupport_c::DetectPerson_Event_message_type_support_handle;
}

#ifdef __cplusplus
}
#endif

// already included above
// #include "cstddef"
#include "rosidl_runtime_c/service_type_support_struct.h"
// already included above
// #include "musia_msgs/srv/detail/detect_person__type_support.h"
// already included above
// #include "rosidl_typesupport_c/identifier.h"
#include "rosidl_typesupport_c/service_type_support_dispatch.h"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"
#include "service_msgs/msg/service_event_info.h"
#include "builtin_interfaces/msg/time.h"

namespace musia_msgs
{

namespace srv
{

namespace rosidl_typesupport_c
{
typedef struct _DetectPerson_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _DetectPerson_type_support_ids_t;

static const _DetectPerson_type_support_ids_t _DetectPerson_service_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_c",  // ::rosidl_typesupport_fastrtps_c::typesupport_identifier,
    "rosidl_typesupport_introspection_c",  // ::rosidl_typesupport_introspection_c::typesupport_identifier,
  }
};

typedef struct _DetectPerson_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _DetectPerson_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _DetectPerson_type_support_symbol_names_t _DetectPerson_service_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_fastrtps_c, musia_msgs, srv, DetectPerson)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_introspection_c, musia_msgs, srv, DetectPerson)),
  }
};

typedef struct _DetectPerson_type_support_data_t
{
  void * data[2];
} _DetectPerson_type_support_data_t;

static _DetectPerson_type_support_data_t _DetectPerson_service_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _DetectPerson_service_typesupport_map = {
  2,
  "musia_msgs",
  &_DetectPerson_service_typesupport_ids.typesupport_identifier[0],
  &_DetectPerson_service_typesupport_symbol_names.symbol_name[0],
  &_DetectPerson_service_typesupport_data.data[0],
};

static const rosidl_service_type_support_t DetectPerson_service_type_support_handle = {
  rosidl_typesupport_c__typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_DetectPerson_service_typesupport_map),
  rosidl_typesupport_c__get_service_typesupport_handle_function,
  &DetectPerson_Request_message_type_support_handle,
  &DetectPerson_Response_message_type_support_handle,
  &DetectPerson_Event_message_type_support_handle,
  ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_CREATE_EVENT_MESSAGE_SYMBOL_NAME(
    rosidl_typesupport_c,
    musia_msgs,
    srv,
    DetectPerson
  ),
  ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_DESTROY_EVENT_MESSAGE_SYMBOL_NAME(
    rosidl_typesupport_c,
    musia_msgs,
    srv,
    DetectPerson
  ),
  &musia_msgs__srv__DetectPerson__get_type_hash,
  &musia_msgs__srv__DetectPerson__get_type_description,
  &musia_msgs__srv__DetectPerson__get_type_description_sources,
};

}  // namespace rosidl_typesupport_c

}  // namespace srv

}  // namespace musia_msgs

#ifdef __cplusplus
extern "C"
{
#endif

const rosidl_service_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_c, musia_msgs, srv, DetectPerson)() {
  return &::musia_msgs::srv::rosidl_typesupport_c::DetectPerson_service_type_support_handle;
}

#ifdef __cplusplus
}
#endif
