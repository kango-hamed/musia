// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from musia_msgs:srv/SetTourMode.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/set_tour_mode.hpp"


#ifndef MUSIA_MSGS__SRV__DETAIL__SET_TOUR_MODE__TRAITS_HPP_
#define MUSIA_MSGS__SRV__DETAIL__SET_TOUR_MODE__TRAITS_HPP_

#include <stdint.h>

#include <sstream>
#include <string>
#include <type_traits>

#include "musia_msgs/srv/detail/set_tour_mode__struct.hpp"
#include "rosidl_runtime_cpp/traits.hpp"

namespace musia_msgs
{

namespace srv
{

inline void to_flow_style_yaml(
  const SetTourMode_Request & msg,
  std::ostream & out)
{
  out << "{";
  // member: target_state
  {
    out << "target_state: ";
    rosidl_generator_traits::value_to_yaml(msg.target_state, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const SetTourMode_Request & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: target_state
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "target_state: ";
    rosidl_generator_traits::value_to_yaml(msg.target_state, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const SetTourMode_Request & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace srv

}  // namespace musia_msgs

namespace rosidl_generator_traits
{

[[deprecated("use musia_msgs::srv::to_block_style_yaml() instead")]]
inline void to_yaml(
  const musia_msgs::srv::SetTourMode_Request & msg,
  std::ostream & out, size_t indentation = 0)
{
  musia_msgs::srv::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use musia_msgs::srv::to_yaml() instead")]]
inline std::string to_yaml(const musia_msgs::srv::SetTourMode_Request & msg)
{
  return musia_msgs::srv::to_yaml(msg);
}

template<>
inline const char * data_type<musia_msgs::srv::SetTourMode_Request>()
{
  return "musia_msgs::srv::SetTourMode_Request";
}

template<>
inline const char * name<musia_msgs::srv::SetTourMode_Request>()
{
  return "musia_msgs/srv/SetTourMode_Request";
}

template<>
struct has_fixed_size<musia_msgs::srv::SetTourMode_Request>
  : std::integral_constant<bool, true> {};

template<>
struct has_bounded_size<musia_msgs::srv::SetTourMode_Request>
  : std::integral_constant<bool, true> {};

template<>
struct is_message<musia_msgs::srv::SetTourMode_Request>
  : std::true_type {};

}  // namespace rosidl_generator_traits

namespace musia_msgs
{

namespace srv
{

inline void to_flow_style_yaml(
  const SetTourMode_Response & msg,
  std::ostream & out)
{
  out << "{";
  // member: success
  {
    out << "success: ";
    rosidl_generator_traits::value_to_yaml(msg.success, out);
    out << ", ";
  }

  // member: message
  {
    out << "message: ";
    rosidl_generator_traits::value_to_yaml(msg.message, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const SetTourMode_Response & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: success
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "success: ";
    rosidl_generator_traits::value_to_yaml(msg.success, out);
    out << "\n";
  }

  // member: message
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "message: ";
    rosidl_generator_traits::value_to_yaml(msg.message, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const SetTourMode_Response & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace srv

}  // namespace musia_msgs

namespace rosidl_generator_traits
{

[[deprecated("use musia_msgs::srv::to_block_style_yaml() instead")]]
inline void to_yaml(
  const musia_msgs::srv::SetTourMode_Response & msg,
  std::ostream & out, size_t indentation = 0)
{
  musia_msgs::srv::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use musia_msgs::srv::to_yaml() instead")]]
inline std::string to_yaml(const musia_msgs::srv::SetTourMode_Response & msg)
{
  return musia_msgs::srv::to_yaml(msg);
}

template<>
inline const char * data_type<musia_msgs::srv::SetTourMode_Response>()
{
  return "musia_msgs::srv::SetTourMode_Response";
}

template<>
inline const char * name<musia_msgs::srv::SetTourMode_Response>()
{
  return "musia_msgs/srv/SetTourMode_Response";
}

template<>
struct has_fixed_size<musia_msgs::srv::SetTourMode_Response>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<musia_msgs::srv::SetTourMode_Response>
  : std::integral_constant<bool, false> {};

template<>
struct is_message<musia_msgs::srv::SetTourMode_Response>
  : std::true_type {};

}  // namespace rosidl_generator_traits

// Include directives for member types
// Member 'info'
#include "service_msgs/msg/detail/service_event_info__traits.hpp"

namespace musia_msgs
{

namespace srv
{

inline void to_flow_style_yaml(
  const SetTourMode_Event & msg,
  std::ostream & out)
{
  out << "{";
  // member: info
  {
    out << "info: ";
    to_flow_style_yaml(msg.info, out);
    out << ", ";
  }

  // member: request
  {
    if (msg.request.size() == 0) {
      out << "request: []";
    } else {
      out << "request: [";
      size_t pending_items = msg.request.size();
      for (auto item : msg.request) {
        to_flow_style_yaml(item, out);
        if (--pending_items > 0) {
          out << ", ";
        }
      }
      out << "]";
    }
    out << ", ";
  }

  // member: response
  {
    if (msg.response.size() == 0) {
      out << "response: []";
    } else {
      out << "response: [";
      size_t pending_items = msg.response.size();
      for (auto item : msg.response) {
        to_flow_style_yaml(item, out);
        if (--pending_items > 0) {
          out << ", ";
        }
      }
      out << "]";
    }
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const SetTourMode_Event & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: info
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "info:\n";
    to_block_style_yaml(msg.info, out, indentation + 2);
  }

  // member: request
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    if (msg.request.size() == 0) {
      out << "request: []\n";
    } else {
      out << "request:\n";
      for (auto item : msg.request) {
        if (indentation > 0) {
          out << std::string(indentation, ' ');
        }
        out << "-\n";
        to_block_style_yaml(item, out, indentation + 2);
      }
    }
  }

  // member: response
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    if (msg.response.size() == 0) {
      out << "response: []\n";
    } else {
      out << "response:\n";
      for (auto item : msg.response) {
        if (indentation > 0) {
          out << std::string(indentation, ' ');
        }
        out << "-\n";
        to_block_style_yaml(item, out, indentation + 2);
      }
    }
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const SetTourMode_Event & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace srv

}  // namespace musia_msgs

namespace rosidl_generator_traits
{

[[deprecated("use musia_msgs::srv::to_block_style_yaml() instead")]]
inline void to_yaml(
  const musia_msgs::srv::SetTourMode_Event & msg,
  std::ostream & out, size_t indentation = 0)
{
  musia_msgs::srv::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use musia_msgs::srv::to_yaml() instead")]]
inline std::string to_yaml(const musia_msgs::srv::SetTourMode_Event & msg)
{
  return musia_msgs::srv::to_yaml(msg);
}

template<>
inline const char * data_type<musia_msgs::srv::SetTourMode_Event>()
{
  return "musia_msgs::srv::SetTourMode_Event";
}

template<>
inline const char * name<musia_msgs::srv::SetTourMode_Event>()
{
  return "musia_msgs/srv/SetTourMode_Event";
}

template<>
struct has_fixed_size<musia_msgs::srv::SetTourMode_Event>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<musia_msgs::srv::SetTourMode_Event>
  : std::integral_constant<bool, has_bounded_size<musia_msgs::srv::SetTourMode_Request>::value && has_bounded_size<musia_msgs::srv::SetTourMode_Response>::value && has_bounded_size<service_msgs::msg::ServiceEventInfo>::value> {};

template<>
struct is_message<musia_msgs::srv::SetTourMode_Event>
  : std::true_type {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<musia_msgs::srv::SetTourMode>()
{
  return "musia_msgs::srv::SetTourMode";
}

template<>
inline const char * name<musia_msgs::srv::SetTourMode>()
{
  return "musia_msgs/srv/SetTourMode";
}

template<>
struct has_fixed_size<musia_msgs::srv::SetTourMode>
  : std::integral_constant<
    bool,
    has_fixed_size<musia_msgs::srv::SetTourMode_Request>::value &&
    has_fixed_size<musia_msgs::srv::SetTourMode_Response>::value
  >
{
};

template<>
struct has_bounded_size<musia_msgs::srv::SetTourMode>
  : std::integral_constant<
    bool,
    has_bounded_size<musia_msgs::srv::SetTourMode_Request>::value &&
    has_bounded_size<musia_msgs::srv::SetTourMode_Response>::value
  >
{
};

template<>
struct is_service<musia_msgs::srv::SetTourMode>
  : std::true_type
{
};

template<>
struct is_service_request<musia_msgs::srv::SetTourMode_Request>
  : std::true_type
{
};

template<>
struct is_service_response<musia_msgs::srv::SetTourMode_Response>
  : std::true_type
{
};

}  // namespace rosidl_generator_traits

#endif  // MUSIA_MSGS__SRV__DETAIL__SET_TOUR_MODE__TRAITS_HPP_
