// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from musia_msgs:msg/AudioCommand.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/audio_command.hpp"


#ifndef MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__TRAITS_HPP_
#define MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__TRAITS_HPP_

#include <stdint.h>

#include <sstream>
#include <string>
#include <type_traits>

#include "musia_msgs/msg/detail/audio_command__struct.hpp"
#include "rosidl_runtime_cpp/traits.hpp"

// Include directives for member types
// Member 'header'
#include "std_msgs/msg/detail/header__traits.hpp"

namespace musia_msgs
{

namespace msg
{

inline void to_flow_style_yaml(
  const AudioCommand & msg,
  std::ostream & out)
{
  out << "{";
  // member: header
  {
    out << "header: ";
    to_flow_style_yaml(msg.header, out);
    out << ", ";
  }

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
  const AudioCommand & msg,
  std::ostream & out, size_t indentation = 0)
{
  // member: header
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "header:\n";
    to_block_style_yaml(msg.header, out, indentation + 2);
  }

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

inline std::string to_yaml(const AudioCommand & msg, bool use_flow_style = false)
{
  std::ostringstream out;
  if (use_flow_style) {
    to_flow_style_yaml(msg, out);
  } else {
    to_block_style_yaml(msg, out);
  }
  return out.str();
}

}  // namespace msg

}  // namespace musia_msgs

namespace rosidl_generator_traits
{

[[deprecated("use musia_msgs::msg::to_block_style_yaml() instead")]]
inline void to_yaml(
  const musia_msgs::msg::AudioCommand & msg,
  std::ostream & out, size_t indentation = 0)
{
  musia_msgs::msg::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use musia_msgs::msg::to_yaml() instead")]]
inline std::string to_yaml(const musia_msgs::msg::AudioCommand & msg)
{
  return musia_msgs::msg::to_yaml(msg);
}

template<>
inline const char * data_type<musia_msgs::msg::AudioCommand>()
{
  return "musia_msgs::msg::AudioCommand";
}

template<>
inline const char * name<musia_msgs::msg::AudioCommand>()
{
  return "musia_msgs/msg/AudioCommand";
}

template<>
struct has_fixed_size<musia_msgs::msg::AudioCommand>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<musia_msgs::msg::AudioCommand>
  : std::integral_constant<bool, false> {};

template<>
struct is_message<musia_msgs::msg::AudioCommand>
  : std::true_type {};

}  // namespace rosidl_generator_traits

#endif  // MUSIA_MSGS__MSG__DETAIL__AUDIO_COMMAND__TRAITS_HPP_
