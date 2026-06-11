// generated from rosidl_typesupport_cpp/resource/idl__type_support.cpp.em
// with input from musia_msgs:srv/PlayAudio.idl
// generated code does not contain a copyright notice

#include "cstddef"
#include "rosidl_runtime_c/message_type_support_struct.h"
#include "musia_msgs/srv/detail/play_audio__functions.h"
#include "musia_msgs/srv/detail/play_audio__struct.hpp"
#include "rosidl_typesupport_cpp/identifier.hpp"
#include "rosidl_typesupport_cpp/message_type_support.hpp"
#include "rosidl_typesupport_c/type_support_map.h"
#include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
#include "rosidl_typesupport_cpp/visibility_control.h"
#include "rosidl_typesupport_interface/macros.h"

namespace musia_msgs
{

namespace srv
{

namespace rosidl_typesupport_cpp
{

typedef struct _PlayAudio_Request_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _PlayAudio_Request_type_support_ids_t;

static const _PlayAudio_Request_type_support_ids_t _PlayAudio_Request_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _PlayAudio_Request_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _PlayAudio_Request_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _PlayAudio_Request_type_support_symbol_names_t _PlayAudio_Request_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, musia_msgs, srv, PlayAudio_Request)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, musia_msgs, srv, PlayAudio_Request)),
  }
};

typedef struct _PlayAudio_Request_type_support_data_t
{
  void * data[2];
} _PlayAudio_Request_type_support_data_t;

static _PlayAudio_Request_type_support_data_t _PlayAudio_Request_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _PlayAudio_Request_message_typesupport_map = {
  2,
  "musia_msgs",
  &_PlayAudio_Request_message_typesupport_ids.typesupport_identifier[0],
  &_PlayAudio_Request_message_typesupport_symbol_names.symbol_name[0],
  &_PlayAudio_Request_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t PlayAudio_Request_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_PlayAudio_Request_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &musia_msgs__srv__PlayAudio_Request__get_type_hash,
  &musia_msgs__srv__PlayAudio_Request__get_type_description,
  &musia_msgs__srv__PlayAudio_Request__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace srv

}  // namespace musia_msgs

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<musia_msgs::srv::PlayAudio_Request>()
{
  return &::musia_msgs::srv::rosidl_typesupport_cpp::PlayAudio_Request_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, musia_msgs, srv, PlayAudio_Request)() {
  return get_message_type_support_handle<musia_msgs::srv::PlayAudio_Request>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "musia_msgs/srv/detail/play_audio__functions.h"
// already included above
// #include "musia_msgs/srv/detail/play_audio__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace musia_msgs
{

namespace srv
{

namespace rosidl_typesupport_cpp
{

typedef struct _PlayAudio_Response_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _PlayAudio_Response_type_support_ids_t;

static const _PlayAudio_Response_type_support_ids_t _PlayAudio_Response_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _PlayAudio_Response_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _PlayAudio_Response_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _PlayAudio_Response_type_support_symbol_names_t _PlayAudio_Response_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, musia_msgs, srv, PlayAudio_Response)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, musia_msgs, srv, PlayAudio_Response)),
  }
};

typedef struct _PlayAudio_Response_type_support_data_t
{
  void * data[2];
} _PlayAudio_Response_type_support_data_t;

static _PlayAudio_Response_type_support_data_t _PlayAudio_Response_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _PlayAudio_Response_message_typesupport_map = {
  2,
  "musia_msgs",
  &_PlayAudio_Response_message_typesupport_ids.typesupport_identifier[0],
  &_PlayAudio_Response_message_typesupport_symbol_names.symbol_name[0],
  &_PlayAudio_Response_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t PlayAudio_Response_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_PlayAudio_Response_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &musia_msgs__srv__PlayAudio_Response__get_type_hash,
  &musia_msgs__srv__PlayAudio_Response__get_type_description,
  &musia_msgs__srv__PlayAudio_Response__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace srv

}  // namespace musia_msgs

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<musia_msgs::srv::PlayAudio_Response>()
{
  return &::musia_msgs::srv::rosidl_typesupport_cpp::PlayAudio_Response_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, musia_msgs, srv, PlayAudio_Response)() {
  return get_message_type_support_handle<musia_msgs::srv::PlayAudio_Response>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
// already included above
// #include "rosidl_runtime_c/message_type_support_struct.h"
// already included above
// #include "musia_msgs/srv/detail/play_audio__functions.h"
// already included above
// #include "musia_msgs/srv/detail/play_audio__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
// already included above
// #include "rosidl_typesupport_cpp/message_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace musia_msgs
{

namespace srv
{

namespace rosidl_typesupport_cpp
{

typedef struct _PlayAudio_Event_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _PlayAudio_Event_type_support_ids_t;

static const _PlayAudio_Event_type_support_ids_t _PlayAudio_Event_message_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _PlayAudio_Event_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _PlayAudio_Event_type_support_symbol_names_t;

#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _PlayAudio_Event_type_support_symbol_names_t _PlayAudio_Event_message_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, musia_msgs, srv, PlayAudio_Event)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, musia_msgs, srv, PlayAudio_Event)),
  }
};

typedef struct _PlayAudio_Event_type_support_data_t
{
  void * data[2];
} _PlayAudio_Event_type_support_data_t;

static _PlayAudio_Event_type_support_data_t _PlayAudio_Event_message_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _PlayAudio_Event_message_typesupport_map = {
  2,
  "musia_msgs",
  &_PlayAudio_Event_message_typesupport_ids.typesupport_identifier[0],
  &_PlayAudio_Event_message_typesupport_symbol_names.symbol_name[0],
  &_PlayAudio_Event_message_typesupport_data.data[0],
};

static const rosidl_message_type_support_t PlayAudio_Event_message_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_PlayAudio_Event_message_typesupport_map),
  ::rosidl_typesupport_cpp::get_message_typesupport_handle_function,
  &musia_msgs__srv__PlayAudio_Event__get_type_hash,
  &musia_msgs__srv__PlayAudio_Event__get_type_description,
  &musia_msgs__srv__PlayAudio_Event__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace srv

}  // namespace musia_msgs

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
get_message_type_support_handle<musia_msgs::srv::PlayAudio_Event>()
{
  return &::musia_msgs::srv::rosidl_typesupport_cpp::PlayAudio_Event_message_type_support_handle;
}

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_message_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__MESSAGE_SYMBOL_NAME(rosidl_typesupport_cpp, musia_msgs, srv, PlayAudio_Event)() {
  return get_message_type_support_handle<musia_msgs::srv::PlayAudio_Event>();
}

#ifdef __cplusplus
}
#endif
}  // namespace rosidl_typesupport_cpp

// already included above
// #include "cstddef"
#include "rosidl_runtime_c/service_type_support_struct.h"
#include "rosidl_typesupport_cpp/service_type_support.hpp"
// already included above
// #include "musia_msgs/srv/detail/play_audio__struct.hpp"
// already included above
// #include "rosidl_typesupport_cpp/identifier.hpp"
// already included above
// #include "rosidl_typesupport_c/type_support_map.h"
#include "rosidl_typesupport_cpp/service_type_support_dispatch.hpp"
// already included above
// #include "rosidl_typesupport_cpp/visibility_control.h"
// already included above
// #include "rosidl_typesupport_interface/macros.h"

namespace musia_msgs
{

namespace srv
{

namespace rosidl_typesupport_cpp
{

typedef struct _PlayAudio_type_support_ids_t
{
  const char * typesupport_identifier[2];
} _PlayAudio_type_support_ids_t;

static const _PlayAudio_type_support_ids_t _PlayAudio_service_typesupport_ids = {
  {
    "rosidl_typesupport_fastrtps_cpp",  // ::rosidl_typesupport_fastrtps_cpp::typesupport_identifier,
    "rosidl_typesupport_introspection_cpp",  // ::rosidl_typesupport_introspection_cpp::typesupport_identifier,
  }
};

typedef struct _PlayAudio_type_support_symbol_names_t
{
  const char * symbol_name[2];
} _PlayAudio_type_support_symbol_names_t;
#define STRINGIFY_(s) #s
#define STRINGIFY(s) STRINGIFY_(s)

static const _PlayAudio_type_support_symbol_names_t _PlayAudio_service_typesupport_symbol_names = {
  {
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_fastrtps_cpp, musia_msgs, srv, PlayAudio)),
    STRINGIFY(ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_introspection_cpp, musia_msgs, srv, PlayAudio)),
  }
};

typedef struct _PlayAudio_type_support_data_t
{
  void * data[2];
} _PlayAudio_type_support_data_t;

static _PlayAudio_type_support_data_t _PlayAudio_service_typesupport_data = {
  {
    0,  // will store the shared library later
    0,  // will store the shared library later
  }
};

static const type_support_map_t _PlayAudio_service_typesupport_map = {
  2,
  "musia_msgs",
  &_PlayAudio_service_typesupport_ids.typesupport_identifier[0],
  &_PlayAudio_service_typesupport_symbol_names.symbol_name[0],
  &_PlayAudio_service_typesupport_data.data[0],
};

static const rosidl_service_type_support_t PlayAudio_service_type_support_handle = {
  ::rosidl_typesupport_cpp::typesupport_identifier,
  reinterpret_cast<const type_support_map_t *>(&_PlayAudio_service_typesupport_map),
  ::rosidl_typesupport_cpp::get_service_typesupport_handle_function,
  ::rosidl_typesupport_cpp::get_message_type_support_handle<musia_msgs::srv::PlayAudio_Request>(),
  ::rosidl_typesupport_cpp::get_message_type_support_handle<musia_msgs::srv::PlayAudio_Response>(),
  ::rosidl_typesupport_cpp::get_message_type_support_handle<musia_msgs::srv::PlayAudio_Event>(),
  &::rosidl_typesupport_cpp::service_create_event_message<musia_msgs::srv::PlayAudio>,
  &::rosidl_typesupport_cpp::service_destroy_event_message<musia_msgs::srv::PlayAudio>,
  &musia_msgs__srv__PlayAudio__get_type_hash,
  &musia_msgs__srv__PlayAudio__get_type_description,
  &musia_msgs__srv__PlayAudio__get_type_description_sources,
};

}  // namespace rosidl_typesupport_cpp

}  // namespace srv

}  // namespace musia_msgs

namespace rosidl_typesupport_cpp
{

template<>
ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_service_type_support_t *
get_service_type_support_handle<musia_msgs::srv::PlayAudio>()
{
  return &::musia_msgs::srv::rosidl_typesupport_cpp::PlayAudio_service_type_support_handle;
}

}  // namespace rosidl_typesupport_cpp

#ifdef __cplusplus
extern "C"
{
#endif

ROSIDL_TYPESUPPORT_CPP_PUBLIC
const rosidl_service_type_support_t *
ROSIDL_TYPESUPPORT_INTERFACE__SERVICE_SYMBOL_NAME(rosidl_typesupport_cpp, musia_msgs, srv, PlayAudio)() {
  return ::rosidl_typesupport_cpp::get_service_type_support_handle<musia_msgs::srv::PlayAudio>();
}

#ifdef __cplusplus
}
#endif
