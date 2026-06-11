// generated from rosidl_generator_cpp/resource/idl__traits.hpp.em
// with input from musia_msgs:msg/TourState.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/tour_state.hpp"


#ifndef MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__TRAITS_HPP_
#define MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__TRAITS_HPP_

#include <stdint.h>

#include <sstream>
#include <string>
#include <type_traits>

#include "musia_msgs/msg/detail/tour_state__struct.hpp"
#include "rosidl_runtime_cpp/traits.hpp"

// Include directives for member types
// Member 'header'
#include "std_msgs/msg/detail/header__traits.hpp"

namespace musia_msgs
{

namespace msg
{

inline void to_flow_style_yaml(
  const TourState & msg,
  std::ostream & out)
{
  out << "{";
  // member: header
  {
    out << "header: ";
    to_flow_style_yaml(msg.header, out);
    out << ", ";
  }

  // member: state
  {
    out << "state: ";
    rosidl_generator_traits::value_to_yaml(msg.state, out);
    out << ", ";
  }

  // member: state_label
  {
    out << "state_label: ";
    rosidl_generator_traits::value_to_yaml(msg.state_label, out);
    out << ", ";
  }

  // member: current_zone
  {
    out << "current_zone: ";
    rosidl_generator_traits::value_to_yaml(msg.current_zone, out);
    out << ", ";
  }

  // member: current_waypoint
  {
    out << "current_waypoint: ";
    rosidl_generator_traits::value_to_yaml(msg.current_waypoint, out);
    out << ", ";
  }

  // member: network_available
  {
    out << "network_available: ";
    rosidl_generator_traits::value_to_yaml(msg.network_available, out);
  }
  out << "}";
}  // NOLINT(readability/fn_size)

inline void to_block_style_yaml(
  const TourState & msg,
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

  // member: state
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "state: ";
    rosidl_generator_traits::value_to_yaml(msg.state, out);
    out << "\n";
  }

  // member: state_label
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "state_label: ";
    rosidl_generator_traits::value_to_yaml(msg.state_label, out);
    out << "\n";
  }

  // member: current_zone
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "current_zone: ";
    rosidl_generator_traits::value_to_yaml(msg.current_zone, out);
    out << "\n";
  }

  // member: current_waypoint
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "current_waypoint: ";
    rosidl_generator_traits::value_to_yaml(msg.current_waypoint, out);
    out << "\n";
  }

  // member: network_available
  {
    if (indentation > 0) {
      out << std::string(indentation, ' ');
    }
    out << "network_available: ";
    rosidl_generator_traits::value_to_yaml(msg.network_available, out);
    out << "\n";
  }
}  // NOLINT(readability/fn_size)

inline std::string to_yaml(const TourState & msg, bool use_flow_style = false)
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
  const musia_msgs::msg::TourState & msg,
  std::ostream & out, size_t indentation = 0)
{
  musia_msgs::msg::to_block_style_yaml(msg, out, indentation);
}

[[deprecated("use musia_msgs::msg::to_yaml() instead")]]
inline std::string to_yaml(const musia_msgs::msg::TourState & msg)
{
  return musia_msgs::msg::to_yaml(msg);
}

template<>
inline const char * data_type<musia_msgs::msg::TourState>()
{
  return "musia_msgs::msg::TourState";
}

template<>
inline const char * name<musia_msgs::msg::TourState>()
{
  return "musia_msgs/msg/TourState";
}

template<>
struct has_fixed_size<musia_msgs::msg::TourState>
  : std::integral_constant<bool, false> {};

template<>
struct has_bounded_size<musia_msgs::msg::TourState>
  : std::integral_constant<bool, false> {};

template<>
struct is_message<musia_msgs::msg::TourState>
  : std::true_type {};

}  // namespace rosidl_generator_traits

#endif  // MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__TRAITS_HPP_
