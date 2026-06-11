// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from musia_msgs:msg/PersonDetection.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/person_detection.hpp"


#ifndef MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__TRAITS_HPP_
#define MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__TRAITS_HPP_

#include <stdint.h>

#include <sstream>
#include <string>
#include <type_traits>

#include "musia_msgs/msg/detail/person_detection__struct.hpp"
#include "rosidl_runtime_cpp/traits.hpp"

// Include directives for member types
// Member 'header'
#include "std_msgs/msg/detail/header__traits.hpp"

namespace musia_msgs
{

namespace msg
{

inline void to_flow_style_yaml(
  const PersonDetection & msg,
  std::ostream & out)
{
  out << "{";
  // member: header
  {
    out << "header: ";
    to_flow_style_yaml(msg.header, out);
    out << ", ";
  }

  // member: person_detected
  {
    out << "person_detected: ";
    rosidl_generator_traits::value_to_yaml(msg.person_detected, out);
    out << ", ";
  }

  // member: distance_m
  {
    out << "distance_m: ";
    rosidl_generator_traits::value_to_yaml(msg.distance_m, out);
    out << ", ";
  }

  // member: confidence
  {
    out << "confidence: ";
    rosidl_generator_traits::value_to_yaml(msg.confidence, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const PersonDetection & msg,
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

  // member: person_detected
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "person_detected: ";
    rosidl_generator_traits::value_to_yaml(msg.person_detected, out);
    out << "\n";
  }

  // member: distance_m
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "distance_m: ";
    rosidl_generator_traits::value_to_yaml(msg.distance_m, out);
    out << "\n";
  }

  // member: confidence
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "confidence: ";
    rosidl_generator_traits::value_to_yaml(msg.confidence, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const PersonDetection & msg, bool use_flow_style = false)
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
  const musia_msgs::msg::PersonDetection & msg,
  std::ostream & out, size_t indentation = 0)
{
  musia_msgs::msg::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use musia_msgs::msg::to_yaml() instead")]]
inline std::string to_yaml(const musia_msgs::msg::PersonDetection & msg)
{
  return musia_msgs::msg::to_yaml(msg);
}

template<>
inline const char * data_type<musia_msgs::msg::PersonDetection>()
{
  return "musia_msgs::msg::PersonDetection";
}

template<>
inline const char * name<musia_msgs::msg::PersonDetection>()
{
  return "musia_msgs/msg/PersonDetection";
}

template<>
struct has_fixed_size<musia_msgs::msg::PersonDetection>
  : std::integral_constant<bool, has_fixed_size<std_msgs::msg::Header>::value> {};

template<>
struct has_bounded_size<musia_msgs::msg::PersonDetection>
  : std::integral_constant<bool, has_bounded_size<std_msgs::msg::Header>::value> {};

template<>
struct is_message<musia_msgs::msg::PersonDetection>
  : std::true_type {};

}  // namespace rosidl_generator_traits

#endif  // MUSIA_MSGS__MSG__DETAIL__PERSON_DETECTION__TRAITS_HPP_
