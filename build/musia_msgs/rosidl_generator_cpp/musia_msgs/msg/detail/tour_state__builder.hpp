// generated from rosidl_generator_cpp/resource/idl__builder.hpp.em
// with input from musia_msgs:msg/TourState.idl
// generated code does not contain a copyright notice

// IWYU pragma: private, include "musia_msgs/msg/tour_state.hpp"


#ifndef MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__BUILDER_HPP_
#define MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__BUILDER_HPP_

#include <algorithm>
#include <utility>

#include "musia_msgs/msg/detail/tour_state__struct.hpp"
#include "rosidl_runtime_cpp/message_initialization.hpp"


namespace musia_msgs
{

namespace msg
{

namespace builder
{

class Init_TourState_network_available
{
public:
  explicit Init_TourState_network_available(::musia_msgs::msg::TourState & msg)
  : msg_(msg)
  {}
  ::musia_msgs::msg::TourState network_available(::musia_msgs::msg::TourState::_network_available_type arg)
  {
    msg_.network_available = std::move(arg);
    return std::move(msg_);
  }

private:
  ::musia_msgs::msg::TourState msg_;
};

class Init_TourState_current_waypoint
{
public:
  explicit Init_TourState_current_waypoint(::musia_msgs::msg::TourState & msg)
  : msg_(msg)
  {}
  Init_TourState_network_available current_waypoint(::musia_msgs::msg::TourState::_current_waypoint_type arg)
  {
    msg_.current_waypoint = std::move(arg);
    return Init_TourState_network_available(msg_);
  }

private:
  ::musia_msgs::msg::TourState msg_;
};

class Init_TourState_current_zone
{
public:
  explicit Init_TourState_current_zone(::musia_msgs::msg::TourState & msg)
  : msg_(msg)
  {}
  Init_TourState_current_waypoint current_zone(::musia_msgs::msg::TourState::_current_zone_type arg)
  {
    msg_.current_zone = std::move(arg);
    return Init_TourState_current_waypoint(msg_);
  }

private:
  ::musia_msgs::msg::TourState msg_;
};

class Init_TourState_state_label
{
public:
  explicit Init_TourState_state_label(::musia_msgs::msg::TourState & msg)
  : msg_(msg)
  {}
  Init_TourState_current_zone state_label(::musia_msgs::msg::TourState::_state_label_type arg)
  {
    msg_.state_label = std::move(arg);
    return Init_TourState_current_zone(msg_);
  }

private:
  ::musia_msgs::msg::TourState msg_;
};

class Init_TourState_state
{
public:
  explicit Init_TourState_state(::musia_msgs::msg::TourState & msg)
  : msg_(msg)
  {}
  Init_TourState_state_label state(::musia_msgs::msg::TourState::_state_type arg)
  {
    msg_.state = std::move(arg);
    return Init_TourState_state_label(msg_);
  }

private:
  ::musia_msgs::msg::TourState msg_;
};

class Init_TourState_header
{
public:
  Init_TourState_header()
  : msg_(::rosidl_runtime_cpp::MessageInitialization::SKIP)
  {}
  Init_TourState_state header(::musia_msgs::msg::TourState::_header_type arg)
  {
    msg_.header = std::move(arg);
    return Init_TourState_state(msg_);
  }

private:
  ::musia_msgs::msg::TourState msg_;
};

}  // namespace builder

}  // namespace msg

template<typename MessageType>
auto build();

template<>
inline
auto build<::musia_msgs::msg::TourState>()
{
  return musia_msgs::msg::builder::Init_TourState_header();
}

}  // namespace musia_msgs

#endif  // MUSIA_MSGS__MSG__DETAIL__TOUR_STATE__BUILDER_HPP_
