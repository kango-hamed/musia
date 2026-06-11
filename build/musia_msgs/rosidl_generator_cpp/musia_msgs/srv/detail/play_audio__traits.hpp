// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from musia_msgs:srv/PlayAudio.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/srv/play_audio.hpp"


#ifndef MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__TRAITS_HPP_
#define MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__TRAITS_HPP_

#include <stdint.h>

#include <sstream>
#include <string>
#include <type_traits>

#include "musia_msgs/srv/detail/play_audio__struct.hpp"
#include "rosidl_runtime_cpp/traits.hpp"

namespace musia_msgs
{

namespace srv
{

inline void to_flow_style_yaml(
  const PlayAudio_Request & msg,
  std::ostream & out)
{
  out << "{";
  // member: mode
  {
    out << "mode: ";
    rosidl_generator_traits::value_to_yaml(msg.mode, out);
    out << ", ";
  }

  // member: payload
  {
    out << "payload: ";
    rosidl_generator_traits::value_to_yaml(msg.payload, out);
    out << ", ";
  }

  // member: language
  {
    out << "language: ";
    rosidl_generator_traits::value_to_yaml(msg.language, out);
    out << ", ";
  }

  // member: volume
  {
    out << "volume: ";
    rosidl_generator_traits::value_to_yaml(msg.volume, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const PlayAudio_Request & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: mode
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "mode: ";
    rosidl_generator_traits::value_to_yaml(msg.mode, out);
    out << "\n";
  }

  // member: payload
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "payload: ";
    rosidl_generator_traits::value_to_yaml(msg.payload, out);
    out << "\n";
  }

  // member: language
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "language: ";
    rosidl_generator_traits::value_to_yaml(msg.language, out);
    out << "\n";
  }

  // member: volume
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "volume: ";
    rosidl_generator_traits::value_to_yaml(msg.volume, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const PlayAudio_Request & msg, bool use_flow_style = false)
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
  const musia_msgs::srv::PlayAudio_Request & msg,
  std::ostream & out, size_t indentation = 0)
{
  musia_msgs::srv::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use musia_msgs::srv::to_yaml() instead")]]
inline std::string to_yaml(const musia_msgs::srv::PlayAudio_Request & msg)
{
  return musia_msgs::srv::to_yaml(msg);
}

template<>
inline const char * data_type<musia_msgs::srv::PlayAudio_Request>()
{
  return "musia_msgs::srv::PlayAudio_Request";
}

template<>
inline const char * name<musia_msgs::srv::PlayAudio_Request>()
{
  return "musia_msgs/srv/PlayAudio_Request";
}

template<>
struct has_fixed_size<musia_msgs::srv::PlayAudio_Request>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<musia_msgs::srv::PlayAudio_Request>
  : std::integral_constant<bool, false> {};

template<>
struct is_message<musia_msgs::srv::PlayAudio_Request>
  : std::true_type {};

}  // namespace rosidl_generator_traits

namespace musia_msgs
{

namespace srv
{

inline void to_flow_style_yaml(
  const PlayAudio_Response & msg,
  std::ostream & out)
{
  out << "{";
  // member: success
  {
    out << "success: ";
    rosidl_generator_traits::value_to_yaml(msg.success, out);
    out << ", ";
  }

  // member: duration_s
  {
    out << "duration_s: ";
    rosidl_generator_traits::value_to_yaml(msg.duration_s, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const PlayAudio_Response & msg,
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

  // member: duration_s
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "duration_s: ";
    rosidl_generator_traits::value_to_yaml(msg.duration_s, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const PlayAudio_Response & msg, bool use_flow_style = false)
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
  const musia_msgs::srv::PlayAudio_Response & msg,
  std::ostream & out, size_t indentation = 0)
{
  musia_msgs::srv::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use musia_msgs::srv::to_yaml() instead")]]
inline std::string to_yaml(const musia_msgs::srv::PlayAudio_Response & msg)
{
  return musia_msgs::srv::to_yaml(msg);
}

template<>
inline const char * data_type<musia_msgs::srv::PlayAudio_Response>()
{
  return "musia_msgs::srv::PlayAudio_Response";
}

template<>
inline const char * name<musia_msgs::srv::PlayAudio_Response>()
{
  return "musia_msgs/srv/PlayAudio_Response";
}

template<>
struct has_fixed_size<musia_msgs::srv::PlayAudio_Response>
  : std::integral_constant<bool, true> {};

template<>
struct has_bounded_size<musia_msgs::srv::PlayAudio_Response>
  : std::integral_constant<bool, true> {};

template<>
struct is_message<musia_msgs::srv::PlayAudio_Response>
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
  const PlayAudio_Event & msg,
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
  const PlayAudio_Event & msg,
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

inline std::string to_yaml(const PlayAudio_Event & msg, bool use_flow_style = false)
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
  const musia_msgs::srv::PlayAudio_Event & msg,
  std::ostream & out, size_t indentation = 0)
{
  musia_msgs::srv::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use musia_msgs::srv::to_yaml() instead")]]
inline std::string to_yaml(const musia_msgs::srv::PlayAudio_Event & msg)
{
  return musia_msgs::srv::to_yaml(msg);
}

template<>
inline const char * data_type<musia_msgs::srv::PlayAudio_Event>()
{
  return "musia_msgs::srv::PlayAudio_Event";
}

template<>
inline const char * name<musia_msgs::srv::PlayAudio_Event>()
{
  return "musia_msgs/srv/PlayAudio_Event";
}

template<>
struct has_fixed_size<musia_msgs::srv::PlayAudio_Event>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<musia_msgs::srv::PlayAudio_Event>
  : std::integral_constant<bool, has_bounded_size<musia_msgs::srv::PlayAudio_Request>::value && has_bounded_size<musia_msgs::srv::PlayAudio_Response>::value && has_bounded_size<service_msgs::msg::ServiceEventInfo>::value> {};

template<>
struct is_message<musia_msgs::srv::PlayAudio_Event>
  : std::true_type {};

}  // namespace rosidl_generator_traits

namespace rosidl_generator_traits
{

template<>
inline const char * data_type<musia_msgs::srv::PlayAudio>()
{
  return "musia_msgs::srv::PlayAudio";
}

template<>
inline const char * name<musia_msgs::srv::PlayAudio>()
{
  return "musia_msgs/srv/PlayAudio";
}

template<>
struct has_fixed_size<musia_msgs::srv::PlayAudio>
  : std::integral_constant<
    bool,
    has_fixed_size<musia_msgs::srv::PlayAudio_Request>::value &&
    has_fixed_size<musia_msgs::srv::PlayAudio_Response>::value
  >
{
};

template<>
struct has_bounded_size<musia_msgs::srv::PlayAudio>
  : std::integral_constant<
    bool,
    has_bounded_size<musia_msgs::srv::PlayAudio_Request>::value &&
    has_bounded_size<musia_msgs::srv::PlayAudio_Response>::value
  >
{
};

template<>
struct is_service<musia_msgs::srv::PlayAudio>
  : std::true_type
{
};

template<>
struct is_service_request<musia_msgs::srv::PlayAudio_Request>
  : std::true_type
{
};

template<>
struct is_service_response<musia_msgs::srv::PlayAudio_Response>
  : std::true_type
{
};

}  // namespace rosidl_generator_traits

#endif  // MUSIA_MSGS__SRV__DETAIL__PLAY_AUDIO__TRAITS_HPP_
